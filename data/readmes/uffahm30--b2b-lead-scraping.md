# Struggling to Build B2B Lead Lists That Don't Bounce? A Hands-On Look at B2B Lead Scraping With ScraperAPI — Sources, Credit Costs, Plan Picks, and Real-World Scenarios (With a Free 5,000-Credit Trial)

If you've ever spent an afternoon pasting prospect names into a spreadsheet, you already know the dream: a pipeline that fills itself while you sleep. That dream has a name, and it's **b2b lead scraping**. It also has a tendency to wake you up at 2 a.m. when your scraper gets a 403, your proxy bill doubles, and your "10,000 leads" file turns out to be 9,800 dead inboxes.

I've been on both sides of that 2 a.m. call. So have a lot of the sales devs I talk to. The good news is that the tooling has gotten genuinely good — and one name that keeps coming up in those conversations is ScraperAPI, a proxy-rendering API that's been quietly powering lead-gen pipelines for years. This piece walks through what b2b lead scraping actually involves, where it tends to break, and how ScraperAPI fits into the picture — including the credit math that determines whether your $49 plan lasts a week or a month.

## What B2B Lead Scraping Actually Is (And Why It Refuses to Be Easy)

At its core, b2b lead scraping is the practice of programmatically collecting contact and firmographic data — names, job titles, company names, emails, phone numbers, social profiles — from publicly available online sources. The sources are usually a mix of LinkedIn, company websites, industry directories, niche registries, Google Maps listings, and search engine results pages.

The reason it refuses to be easy is that almost every one of those sources is actively trying to stop you. LinkedIn sues scrapers. Google rate-limits aggressively. Industry directories slap Cloudflare in front of their listings. Even a small SaaS company's "Team" page can be hidden behind a JavaScript render that a naive `requests.get()` will never see. So the real work of b2b lead scraping isn't writing the parser — it's keeping the requests flowing past the bouncers.

That's the gap a service like ScraperAPI is built to fill. You send it a URL, it handles proxy rotation, JavaScript rendering, basic CAPTCHA solving, and retries, then hands you back the HTML (or, for a handful of structured endpoints, JSON). Your scraper code stays focused on parsing; the unblocking becomes someone else's problem.

## Where B2B Lead Scraping Actually Happens: The Source Map

Different sources cost different amounts of effort — and, as we'll see, different amounts of money. Here's a quick map of the usual suspects:

- **Company websites and "About / Team" pages.** The cheapest targets. Plain HTML, 1 credit per request in ScraperAPI's system. Great for enriching a list you already have.
- **Industry directories and niche registries.** Also usually 1 credit, unless the directory is behind a WAF — then add 10 for the bypass. This is where the genuinely under-prospected leads live, the ones your competitors won't touch because they're too lazy to write a custom scraper.
- **Amazon and other e-commerce targets.** 5 credits. Not strictly lead-gen, but relevant if you're scraping seller directories or vendor lists.
- **Google and Bing SERPs.** 25 credits. The classic move: search `"site:linkedin.com/in/ "VP Engineering" "fintech"`, scrape the results, then enrich. Expensive in credits, but the targeting is unmatched.
- **LinkedIn.** 30 credits. The holy grail and the hardest target. Expect to layer bypass on top of those 30 if LinkedIn's anti-bot is feeling frisky.

That credit map is the single most important thing to internalize before you pick a plan. A "100,000 credits" headline means very different things depending on whether you're scraping 100K plain company pages or 3,300 LinkedIn profiles.

## The Pain Points That Kill B2B Lead Scraping Projects

Before we get to the solution, it's worth naming the four ways these projects usually die:

1. **The block wall.** Your scraper works locally, you push to production, and within an hour every request returns a Cloudflare challenge. You didn't change anything; the target just noticed your datacenter IP.
2. **The render gap.** Half the "Team" pages you want are SPAs that load contacts via XHR after the page paints. Your `BeautifulSoup` parse returns an empty `<div>`.
3. **The cost surprise.** You budgeted for "100K requests," forgot that LinkedIn costs 30 credits each, and burned through your month in a weekend.
4. **The maintenance treadmill.** Selectors break every time a directory redesigns. You spend more time fixing parsers than actually generating leads.

ScraperAPI directly addresses the first three. The fourth is still on you — but the structured-data endpoints and the `autoparse=true` parameter trim it down.

## Enter ScraperAPI: A Drop-In Unblocker for Your Existing Scraping Code

Here's the mental model that took me a while to land on: ScraperAPI is not a scraping platform. It's infrastructure for your scraping code. You keep the parser, the storage, the scheduling, the CRM sync. ScraperAPI owns the proxy layer.

The integration is genuinely trivial. If you already have a scraper — Scrapy, Playwright, a Python script, whatever — you point it at ScraperAPI's endpoint instead of the target directly:

python
import requests

response = requests.post(
    "https://api.scraperapi.com",
    json={
        "url": "https://www.example.com/team",
        "render": True,         # JS rendering, +10 credits
        "country_code": "US",   # free, no extra credits
    },
)


That's the whole retrofit. The reason this matters for b2b lead scraping specifically is that most lead-gen teams already have working scrapers — they just can't keep them running in production. ScraperAPI is the fastest path from "works on my laptop" to "works at 3 a.m. on a Tuesday."

What you get across every paid tier: 40M+ rotating IPs across 50+ countries, automatic proxy rotation, headless Chrome rendering, basic CAPTCHA and anti-bot bypass (Cloudflare, Datadome, PerimeterX), custom sessions for login flows, automatic retries, unlimited bandwidth, and a 99.9% uptime SLA. What you don't get: pre-built scrapers for arbitrary sites, hosted code execution, dataset storage, or built-in scheduling. You bring the logic; they bring the plumbing.

## The Credit System: The One Number You Actually Need to Understand

Every ScraperAPI plan hands you a monthly bucket of API credits, and every request burns some number of them. The base rate is 1 credit for a plain, unprotected page. From there, two things multiply the cost: the domain you're hitting and the parameters you turn on.

**Domain multipliers:**

| Target | Credits per request |
| --- | --- |
| Standard pages | 1 |
| Amazon | 5 |
| Google / Bing (all subdomains) | 25 |
| LinkedIn | 30 |
| Cloudflare / Datadome / PerimeterX bypass | +10 |

**Parameter multipliers:**

| Parameter | Extra credits |
| --- | --- |
| `premium=true` | +10 |
| `render=true` | +10 |
| `screenshot=true` | +10 |
| `ultra_premium=true` | +30 |
| `premium=true` + `render=true` | 25 total |
| `ultra_premium=true` + `render=true` | 75 total |

There's one genuinely fair detail buried in here: **you're only billed for successful requests** (HTTP 200 and 404). If ScraperAPI's own proxy fails to deliver, you don't pay. That's a meaningful protection when you're scraping defended targets where some failure is inevitable.

The practical implication for b2b lead scraping: a LinkedIn profile scrape with rendering and a Cloudflare bypass can run 40–75 credits. That "100,000 credits" on the Hobby plan is roughly 1,300–2,500 LinkedIn profiles, not 100,000. Run your real targets through the dashboard's Domain Cost Estimator before you commit to a tier.

## The Full Plan Lineup: Every Tier on the ScraperAPI Pricing Page

Here's the complete current set of plans, pulled from the official pricing page and the May 2026 release notes that introduced the new Growth tiers. Nothing omitted.

| Plan | Monthly Price | Annual Price (10% off) | API Credits / Month | Concurrent Threads | Geotargeting | Notable Perks | Get Started |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Free Plan** | $0 | — | 1,000 (renews monthly) | 5 | US & EU | Permanent, no card | [Start free](https://www.scraperapi.com/?fp_ref=coupons#free) |
| **Free Trial** | $0 (7 days) | — | 5,000 (one-time) | 5 | US & EU | No card required | [Start 7-day trial](https://www.scraperapi.com/?fp_ref=coupons#trial) |
| **Hobby** | $49/mo | $44.10/mo | 100,000 | 20 | US & EU only | Full crawler access | [Get Hobby](https://www.scraperapi.com/?fp_ref=coupons#hobby) |
| **Startup** | $149/mo | $134.10/mo | 1,000,000 | 50 | US & EU only | 30-day analytics history | [Get Startup](https://www.scraperapi.com/?fp_ref=coupons#startup) |
| **Business** | $299/mo | $269.10/mo | 3,000,000 | 100 | Global | Unlimited analytics history | [Get Business](https://www.scraperapi.com/?fp_ref=12325#business) |
| **Scaling** (Most Popular) | $475/mo | $427.50/mo | 5,000,000 | 200 | Global | Pay-as-you-go overflow | [Get Scaling](https://www.scraperapi.com/?fp_ref=coupons#scaling) |
| **Professional** | $975/mo | $877.50/mo | 10,500,000 (+250K bonus, limited offer) | 300 | Global | Pay-as-you-go, priority support | [Get Professional](https://www.scraperapi.com/?fp_ref=coupons#professional) |
| **Advanced** | $1,975/mo | $1,777.50/mo | 21,500,000 (+500K bonus, limited offer) | 500 | Global | Pay-as-you-go, priority support | [Get Advanced](https://www.scraperapi.com/?fp_ref=coupons#advanced) |
| **Enterprise** | Custom | Custom | 22,000,000+ | 500+ | Global | Custom SLAs, PAYG, dedicated support | [Contact sales](https://www.scraperapi.com/?fp_ref=coupons#enterprise) |

A few things worth flagging that aren't obvious from the table:

- **Geotargeting is gated by tier.** Hobby and Startup are locked to US & EU proxies. If your b2b lead scraping needs country-level targeting anywhere else — UK-only directories, German industry registries, APAC firmographic data — you need at least Business.
- **Pay-as-you-go starts at Scaling.** On Hobby, Startup, and Business, running out mid-month means upgrading or talking to support. From Scaling up, you keep scraping at a fixed overflow rate, with a configurable spend cap so you don't get a surprise bill.
- **Credits don't roll over.** Whatever you don't use resets at renewal. Size the plan to your actual monthly volume, not to a "just in case" buffer.
- **Annual billing is an automatic 10% off**, no code needed.
- **The Professional and Advanced bonus credits (250K and 500K) are time-limited**, per the May 2026 release notes. Treat them as a temporary sweetener, not a permanent feature.

## Which ScraperAPI Plan Fits Which B2B Lead Scraping Workflow

This is the question that matters more than the raw price tag, because the "right" plan depends entirely on what you're scraping and how often.

**Pick Free / Trial if** you're evaluating the API against your real targets. The 7-day, 5,000-credit trial is enough to actually test — not a toy. Point it at the directories and LinkedIn pages you intend to scrape for real, watch the credit consumption, and *then* decide.

**Pick Hobby ($49/mo) if** you're a solo founder or small shop scraping mostly unprotected company pages and a handful of directories. 100,000 credits goes a long way when each request costs 1 credit. It evaporates fast the moment LinkedIn (30 cr) or Google SERPs (25 cr) enter the mix.

**Pick Startup ($149/mo) if** you've outgrown casual scraping — a small SaaS doing competitive intel, an agency running jobs for a few clients, a recruitment team building candidate lists from industry directories. The 10x credit jump from Hobby is meaningful, but you're still capped at US/EU geo.

**Pick Business ($299/mo) if** you need global geotargeting, unlimited analytics history, or you're running production infrastructure other parts of your business depend on. This is also the first tier where the thread count (100) starts to matter for parallel lead enrichment jobs.

**Pick Scaling and above if** you're past "which plan" and into "how do we keep this predictable at high volume." Pay-as-you-go overflow means you're never hard-capped mid-campaign, and priority support kicks in at Professional.

**Pick Enterprise if** you need custom SLAs, dedicated support, or credit volumes north of 22M/month. Talk to sales — the standard tiers stop being the right shape well before that point.

## Real-World Cost Scenarios for B2B Lead Scraping

Let's model what a few common lead-gen workloads actually cost, because the headline price and the real price are different animals.

**Scenario 1: Niche directory enrichment, no rendering.** You have a list of 50,000 company URLs and you're pulling firmographic data from their "About" pages. Plain HTML, 1 credit each. 50,000 credits. Hobby ($49) covers it with room to spare. Effective cost: about $0.98 per 1,000 pages.

**Scenario 2: Google SERP → LinkedIn enrichment pipeline.** You run 20,000 Google searches (25 credits each = 500,000 credits) to discover LinkedIn profile URLs, then scrape 20,000 profiles (30 credits each = 600,000 credits). Total: 1,100,000 credits. Hobby and Startup don't cover it. Business ($299) handles it, with ~1.9M credits to spare for follow-up enrichment. Effective cost: ~$0.27 per lead.

**Scenario 3: High-volume LinkedIn with Cloudflare bypass and rendering.** 100,000 LinkedIn profiles, each costing 30 (LinkedIn) + 10 (render) + 10 (bypass) = 50 credits. That's 5,000,000 credits. Scaling ($475) lands you right at the cap. Effective cost: ~$0.48 per profile. If LinkedIn's anti-bot gets nastier and you need `ultra_premium`, that same workload jumps to 75 credits per profile = 7.5M credits, which pushes you into Professional ($975).

The takeaway: **run your real numbers before you pick a tier.** The Domain Cost Estimator in the dashboard is your friend, and the 5,000-credit trial exists precisely so you can do this math on actual data instead of guessing.

## What Users Actually Say About ScraperAPI

Independent review aggregations are fairly consistent. ScraperAPI sits around **4.5/5 on Trustpilot** (across roughly 40+ reviews) and **4.4/5 on G2**. The recurring praise is the same on most platforms: clean documentation, genuinely simple integration (the "drop it in as a proxy replacement" pattern works as advertised), and responsive support. One long-time reviewer specifically called out that upgrading or downgrading plans was painless.

The most common criticism isn't about reliability — it's about the credit math being less intuitive than the headline number suggests, especially once you start mixing rendering and premium proxies on harder targets. Independent benchmarking has also noted that performance varies by target: ScraperAPI does very well on mainstream sites (Amazon, GitHub, standard e-commerce, most company websites) and less consistently on sites with aggressive, frequently-changing anti-bot systems. For b2b lead scraping specifically, that means it's excellent for directories and company pages, solid for Google SERP, and "test before you commit" for LinkedIn at scale.

## Best Practices for B2B Lead Scraping With ScraperAPI

A short list of the things that actually move the needle, gathered from the docs and from people running this in production:

1. **Define your ICP before you write a line of code.** Industry, headcount, geography, job title. Targeted scraping beats volume scraping every time — 500 well-qualified leads will out-perform 50,000 scraped-at-random names.
2. **Use the Domain Cost Estimator on every new target.** It's a free API endpoint (`/account/urlcost`) that tells you exactly what a request will cost before you run it at scale.
3. **Lean on `autoparse=true` for structured endpoints.** For Amazon and Google, ScraperAPI returns JSON directly — skip the parser maintenance entirely.
4. **Respect robots.txt and public-data boundaries.** The legal posture for b2b lead scraping is much safer when you're collecting publicly available business contact data rather than personal data behind logins. When in doubt, talk to a lawyer.
5. **Sync to your CRM in real time, not in batches.** The longer scraped leads sit in a CSV, the staler they get. Pipe directly into HubSpot, Salesforce, or whatever you run.
6. **Set a Pay-As-You-Go spend cap if you're on Scaling or above.** It protects you from a runaway job that would otherwise rack up a surprise bill.
7. **Test the 7-day trial against your hardest target first.** If ScraperAPI can't get your toughest directory on the trial, no plan tier will magically fix it — and you'll know before you've paid a cent.

## The Honest Verdict

ScraperAPI is a solid, focused product. It does one thing well: proxy rendering for code you already have. If that's the gap in your b2b lead scraping stack — and for most teams with working scrapers that keep getting blocked, it is — it's a no-brainer at small scale and a defensible choice at medium scale.

Where it starts to creak is at very high volume on the hardest targets, where the credit multipliers compound and a full platform with included rendering and pre-built scrapers can end up cheaper on total cost. If you're scraping 1M+ LinkedIn profiles a month with full anti-bot bypass, model the math against alternatives before you commit. For everyone else — the agency enriching a few thousand company pages, the SaaS doing competitive intel, the recruiter building niche candidate lists — ScraperAPI is one of the cleanest entry points in the category.

The cleanest way to find out which camp you're in: take the free trial, point it at your real targets, and watch the credit burn. The numbers will tell you everything you need to know.

👉 [Start your free 5,000-credit ScraperAPI trial — no credit card required](https://www.scraperapi.com/?fp_ref=coupons)

## Frequently Asked Questions

**Does one API request always cost one credit?**
No. The base rate is 1 credit for a standard page, but the domain (Amazon 5, Google/Bing 25, LinkedIn 30) and any parameters (render +10, premium +10, ultra_premium +30) multiply that cost. Use the dashboard's cost estimator before scaling.

**What happens if I run out of credits mid-month?**
On Hobby, Startup, and Business, you upgrade to the next tier or contact support. On Scaling, Professional, Advanced, and Enterprise, pay-as-you-go overflow kicks in at a fixed rate (with an optional spend cap).

**Can I cancel anytime?**
Yes — cancellation is available from the dashboard or via support, with no further charges. There's also a 7-day, no-questions-asked refund policy.

**Do unused credits roll over?**
No. Credits reset at each renewal, so match your plan size to your actual monthly usage rather than stockpiling.

**Is b2b lead scraping legal?**
It depends on what you scrape and how you use it. Publicly available business data is lower risk, but terms of service, privacy laws (GDPR, CCPA), and data-handling rules still apply. Review each target and consult counsel for your specific case.

**Does ScraperAPI handle CAPTCHAs?**
Basic CAPTCHA and anti-bot handling (Cloudflare, Datadome, PerimeterX) is included, at +10 credits per bypass. Aggressive or custom anti-bot systems may still require additional tooling.

**Can it scrape LinkedIn?**
Yes, at 30 credits per request (more with rendering and bypass). It's the hardest mainstream target, so test on the trial first and budget for the multiplier.
