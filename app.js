// Language -> color (subset of github linguist)
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Go: '#00ADD8', Rust: '#dea584', Java: '#b07219', 'C++': '#f34b7d',
  C: '#555555', 'C#': '#178600', Ruby: '#701516', PHP: '#4F5D95',
  Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', HTML: '#e34c26',
  CSS: '#563d7c', Vue: '#41b883', Shell: '#89e051', Lua: '#000080',
  Jupyter: '#DA5B0B', R: '#198CE7', Markdown: '#083fa1', Dockerfile: '#384d54',
  Makefile: '#427819', Zig: '#ec915c', Nim: '#ffc200', Astro: '#ff5a03',
  Svelte: '#ff3e00', Solidity: '#AA6746', Nix: '#7e7eff', OCaml: '#3be133'
};
const langColor = lang => LANG_COLORS[lang] || '#8b949e';

function el(tag, props = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') n.className = v;
    else if (k === 'style') n.setAttribute('style', v);
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  (children || []).forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}

const fmt = n => n >= 1000 ? ((n >= 10000 ? n/1000 : n/1000).toFixed(n >= 10000 ? 0 : 1) + 'k') : String(n);
const esc = s => (s || '').replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));

function renderCard(item) {
  const dot = el('span', { class: 'lang-dot', style: `background:${langColor(item.language)}` });
  const langPill = item.language
    ? el('span', { class: 'pill' }, [dot, document.createTextNode(' ' + item.language)])
    : null;
  const starPill = el('span', { class: 'pill' }, [document.createTextNode('★ ' + fmt(item.stargazers_count))]);
  const forkPill = el('span', { class: 'pill' }, [document.createTextNode('⑂ ' + fmt(item.forks_count))]);
  const foot = el('div', { class: 'card-foot' }, [starPill, forkPill, langPill].filter(Boolean));

  return el('div', { class: 'card', tabindex: '0', role: 'button' }, [
    el('div', { class: 'card-rank' }, ['#' + item.rank]),
    el('div', { class: 'card-head' }, [
      el('img', { class: 'card-avatar', src: item.owner_avatar_url, alt: item.owner_login, loading: 'lazy' }),
      el('div', { class: 'card-name' }, [item.full_name])
    ]),
    el('p', { class: 'card-desc' }, [item.description || '(no description)']),
    foot
  ]);
}

function renderList(items, updatedAt) {
  document.getElementById('loading').hidden = true;
  document.getElementById('error').hidden = true;
  const list = document.getElementById('list');
  list.innerHTML = '';
  items.forEach(item => {
    const card = renderCard(item);
    card.addEventListener('click', () => openModal(item));
    list.appendChild(card);
  });
  document.getElementById('updatedAt').textContent = updatedAt
    ? new Date(updatedAt).toLocaleString('zh-CN', { hour12: false })
    : '—';
}

async function loadPeriod(period) {
  const loading = document.getElementById('loading');
  const errEl = document.getElementById('error');
  loading.hidden = false;
  errEl.hidden = true;
  document.getElementById('list').innerHTML = '';
  try {
    const url = `data/${period}.json?v=${Date.now()}`;
    const resp = await fetch(url, { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    if (!data.items || !data.items.length) throw new Error('数据为空');
    renderList(data.items, data.updatedAt);
  } catch (e) {
    loading.hidden = true;
    errEl.hidden = false;
    errEl.innerHTML = `<div>Failed to load</div><div style="font-size:12px;margin-top:8px;word-break:break-all">${esc(e.message)}</div><button onclick="loadPeriod('${period}')" style="margin-top:16px;padding:10px 20px;background:var(--accent);color:#fff;border:0;border-radius:8px">Retry</button>`;
  }
}

function openModal(item) {
  const modal = document.getElementById('modal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  document.getElementById('modalAvatar').src = item.owner_avatar_url;
  document.getElementById('modalTitle').textContent = item.full_name;
  const link = document.getElementById('modalLink');
  link.href = item.html_url;
  link.textContent = item.html_url;
  document.getElementById('modalLinkBtn').href = item.html_url;
  document.getElementById('modalDesc').textContent = item.description || '(no description)';
  document.getElementById('modalStars').innerHTML = `★ <strong>${item.stargazers_count}</strong>`;
  document.getElementById('modalForks').innerHTML = `⑂ <strong>${item.forks_count}</strong>`;
  document.getElementById('modalIssues').innerHTML = `! <strong>${item.open_issues_count || 0}</strong>`;
  document.getElementById('modalLang').innerHTML = item.language
    ? `Language: <strong>${item.language}</strong>` : '';

  const topicsEl = document.getElementById('modalTopics');
  topicsEl.innerHTML = '';
  (item.topics || []).slice(0, 12).forEach(t => {
    topicsEl.appendChild(el('span', { class: 'topic' }, ['#' + t]));
  });

  const readmeWrap = document.getElementById('modalReadme');
  const text = (item.readme || '').trim();
  if (!text || text.startsWith('<!-- no README found -->')) {
    readmeWrap.innerHTML = `<p style="color:var(--text-dim)">No README available. Please visit the repository homepage.</p>`;
  } else if (window.marked) {
    readmeWrap.innerHTML = window.marked.parse(text);
  } else {
    readmeWrap.innerHTML = `<pre>${esc(text)}</pre>`;
  }
}

function closeModal() {
  document.getElementById('modal').hidden = true;
  document.body.style.overflow = '';
}

// wiring
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    loadPeriod(t.dataset.period);
  });
});

document.getElementById('modal').addEventListener('click', e => {
  if (e.target.dataset.close === 'true') closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// initial
loadPeriod('daily');