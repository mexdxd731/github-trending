#!/usr/bin/env node
/* Fetch GitHub trending (daily/weekly/monthly) via Search API + READMEs.
 * Zero dependencies. Uses GITHUB_TOKEN if present for higher rate limit.
 * Outputs: data/{daily,weekly,monthly}.json and data/readmes/{owner--repo}.md
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN || '';
const DATA_DIR = path.join(__dirname, '..', 'data');
const READMES_DIR = path.join(DATA_DIR, 'readmes');

const PERIODS = [
  { key: 'daily',   days: 1  },
  { key: 'weekly',  days: 7  },
  { key: 'monthly', days: 30 }
];

function ghRequest(pathname) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': 'trending-dashboard',
      'Accept': 'application/vnd.github+json'
    };
    if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
    const req = https.request({
      hostname: 'api.github.com',
      path: pathname,
      method: 'GET',
      headers
    }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(body)); }
          catch (e) { reject(new Error(`JSON parse fail: ${e.message}`)); }
        } else {
          reject(new Error(`${pathname} -> ${res.statusCode}: ${body.slice(0,200)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function isoDaysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0,10);
}

async function fetchTop10(period) {
  const date = isoDaysAgo(period.days);
  const q = `created:>${date}`;
  const pathName = `/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=12`;
  console.log(`[${period.key}] ${pathName}`);
  const data = await ghRequest(pathName);
  return (data.items || []).map((item, i) => ({
    rank: i + 1,
    full_name: item.full_name,
    name: item.name,
    html_url: item.html_url,
    description: item.description,
    stargazers_count: item.stargazers_count,
    forks_count: item.forks_count,
    open_issues_count: item.open_issues_count,
    language: item.language,
    topics: item.topics || [],
    owner_login: item.owner.login,
    owner_avatar_url: item.owner.avatar_url
  }));
}

async function fetchReadme(owner, repo) {
  // Try main, then master, then default branch via repo meta
  const branches = ['main', 'master'];
  for (const branch of branches) {
    const candidates = ['README.md', 'readme.md', 'README.MD', 'README', 'docs/README.md'];
    for (const file of candidates) {
      const p = `/repos/${owner}/${repo}/contents/${file}?ref=${branch}`;
      try {
        const data = await ghRequest(p);
        if (data && data.content && data.encoding === 'base64') {
          return Buffer.from(data.content, 'base64').toString('utf8');
        }
      } catch (e) { /* try next */ }
    }
  }
  return null;
}

async function fetchMultiReadme(repos) {
  const results = {};
  for (const repo of repos) {
    const [owner, name] = repo.full_name.split('/');
    console.log(`  readme: ${repo.full_name}`);
    let content = null;
    try { content = await fetchReadme(owner, name); }
    catch (e) { content = null; }
    const fileBase = `${owner}--${name}.md`;
    if (content) {
      fs.writeFileSync(path.join(READMES_DIR, fileBase), content);
    } else {
      // write a stub so frontend has something to fall back to
      fs.writeFileSync(path.join(READMES_DIR, fileBase), `<!-- no README found -->\n\nREADME 暂无，请访问 [${repo.full_name}](${repo.html_url}) 主页查看。`);
    }
    results[repo.full_name] = content ? true : false;
    await sleep(300); // gentle on rate limit
  }
  return results;
}

function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

function loadExistingReadmes() {
  const map = {};
  if (!fs.existsSync(READMES_DIR)) return map;
  for (const file of fs.readdirSync(READMES_DIR)) {
    if (!file.endsWith('.md')) continue;
    const key = file.slice(0, -3).replace('--', '/');
    try { map[key] = fs.readFileSync(path.join(READMES_DIR, file), 'utf8'); }
    catch (e) {}
  }
  return map;
}

async function main() {
  if (!fs.existsSync(READMES_DIR)) fs.mkdirSync(READMES_DIR, { recursive: true });

  // 1) fetch top 10 for each period
  const periodItems = {};
  for (const period of PERIODS) {
    try {
      periodItems[period.key] = await fetchTop10(period);
      console.log(`[${period.key}] got ${periodItems[period.key].length} items`);
    } catch (e) {
      console.error(`[${period.key}] FAIL:`, e.message);
      process.exit(1);
    }
  }

  // 2) dedupe repos across all periods and fetch any missing readmes
  const cachedReadmes = loadExistingReadmes();
  const allRepos = new Set();
  for (const items of Object.values(periodItems)) {
    for (const item of items) allRepos.add(item.full_name);
  }
  const toFetch = [...allRepos].filter(r => !cachedReadmes[r]);
  console.log(`Fetching ${toFetch.length} new readmes (${allRepos.size} total, ${Object.keys(cachedReadmes).length} cached)`);

  const repoMap = {};
  for (const items of Object.values(periodItems)) {
    for (const item of items) repoMap[item.full_name] = item;
  }
  const reposToFetchObjs = toFetch.map(fn => repoMap[fn]).filter(Boolean);
  const fetchedMap = await fetchMultiReadme(reposToFetchObjs);

  const readmeMap = { ...cachedReadmes };
  for (const r of reposToFetchObjs) {
    if (fetchedMap[r.full_name] === true) {
      const fileBase = r.full_name.replace('/', '--');
      const fp = path.join(READMES_DIR, fileBase + '.md');
      try { readmeMap[r.full_name] = fs.readFileSync(fp, 'utf8'); } catch (e) {}
    }
  }

  // 3) write JSON with README inlined
  for (const period of PERIODS) {
    const items = periodItems[period.key].map(item => ({
      ...item,
      readme: readmeMap[item.full_name] || ''
    }));
    writeJson(path.join(DATA_DIR, `${period.key}.json`), {
      updatedAt: new Date().toISOString(),
      period: period.key,
      items
    });
    const sizeKB = (fs.statSync(path.join(DATA_DIR, `${period.key}.json`)).size / 1024).toFixed(0);
    console.log(`[${period.key}] JSON written (${sizeKB} KB)`);
  }

  console.log('Done.');
}

main().catch(e => { console.error(e); process.exit(1); });