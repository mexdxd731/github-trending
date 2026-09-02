<a href="https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-challenge-clearance">
  <img src="./assets/peak-banner.png" alt="Peak - solve Cloudflare Turnstile & the 5s challenge in ~1s" width="100%">
</a>

# How to Bypass the Cloudflare Challenge and Get cf_clearance in Python: Complete Guide

The Cloudflare challenge - the "Just a moment..." or "Checking your browser"
interstitial - is the most common wall on the modern web. It does not ask for a
CAPTCHA. It runs a JavaScript challenge that a headless client cannot execute,
and until it passes, Cloudflare issues no **`cf_clearance`** cookie and returns
nothing but the interstitial. For scrapers, automated browsers, and API clients,
that page stops data collection cold.

In this guide we explain what the Cloudflare challenge actually does, how to
detect it, and how to bypass it in Python - including automated-browser
approaches and a CAPTCHA-solving service that returns a usable `cf_clearance`
cookie.

**Table of Contents:**
- Understanding the Cloudflare Challenge
- What the interstitial checks
    - JavaScript proof-of-work
    - Browser environment signals
    - IP and TLS reputation
- How to Bypass Cloudflare in Python
    - Automated browsers
    - High-quality proxies
    - CAPTCHA solving services
- Getting cf_clearance with the Peak API
- Bonus Code
## Understanding the 5s Challenge

Cloudflare serves the "Just a moment..." page when it wants to verify a visitor
is a real browser before issuing a clearance cookie. Unlike a Turnstile widget,
there is no visible puzzle: the page runs a short scripted challenge in the
background and, a few seconds later, sets a `cf_clearance` cookie that unlocks
the real content.

The page has a few tell-tale markers:

```html
<script>window._cf_chl_opt = { cvId: "...", ... }</script>
```

Headless and scripted clients cannot run that script, so they sit on the
interstitial forever - the "Just a moment..." loop.

## What the interstitial checks

### JavaScript proof-of-work

The challenge runs a small computation in the page. Real browsers finish it in
a second or two. Clients with no JS engine (plain HTTP libraries) never finish
it at all.

### Browser environment signals

The script inspects canvas, fonts, and DOM behaviour - the same fingerprints
Turnstile uses - to confirm a real rendering engine is present.

### IP and TLS reputation

Cloudflare also weighs the connection: proxy and datacenter IPs are more likely
to be challenged, and a mismatch between the TLS fingerprint and the claimed
user agent raises suspicion.

## How to get past it

### Automated browsers

A real browser (Playwright, Selenium, Puppeteer) can load the page and wait for
the challenge to finish, then capture the `cf_clearance` cookie. This is the most
realistic route, but it is heavy and slow at scale, and Cloudflare can still
decide the automation is suspicious.

### High-quality proxies

Because IP reputation matters, residential and mobile proxies are far less
likely to be challenged. The same rule applies as everywhere: **the proxy used
to clear the challenge must match the proxy used for the real request**, or the
cookie will be rejected.

### CAPTCHA solving services

When you need speed and volume without a browser, a solving service is the
fastest path. You send the target URL, and the service returns the clearance
cookies (and often a matching user agent) ready to attach to your session.

This guide uses **Peak** (peak.fo) for the example, because it clears the 5s
challenge in about a second and you only pay for successful solves.

## Clearing it with the Peak API

Detecting the interstitial from a response body is a simple substring check:

```python
from cf5s_challenge import detect_interstitial

if detect_interstitial(resp.text):
    print("5s challenge detected")
```

### Step 1: Submit the solve task

```json
POST https://api.peak.fo/solve
{
  "task_type": "cloudflare5stask",
  "url": "https://example.com/",
  "proxy": "http://user:pass@1.2.3.4:8080"
}
```

### Step 2: Apply the returned cookies

The response carries a `cookies` map (with `cf_clearance`) and optionally a
`user_agent` to match:

```json
{
  "success": true,
  "data": {
    "cookies": { "cf_clearance": "abc123..." },
    "user_agent": "Mozilla/5.0 ..."
  }
}
```

In Python:

```python
from cf5s_challenge import solve_5s, apply_to_session

result = solve_5s("pk_...", "https://example.com/", proxy="http://u:p@ip:8080")
apply_to_session(session, result)   # sets cookies + UA on your session
```

> ⚠️ **If the cookie is rejected**, check the basics. `cf_clearance` is bound to
> the IP and user agent that generated it. Use the returned user agent and the
> same proxy for the follow-up request.

## Powered by Peak

This package uses [Peak](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-challenge-clearance) to solve Turnstile.
- Solve Cloudflare Turnstile & the 5s challenge in about a second
- Pay only for successful solves - from $1 / 1,000
- Free API key, no card. Use code **`PEAKGH`** for bonus trial credit.

[Get your free API key](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-challenge-clearance) • [Docs](https://peak.fo/docs/turnstile?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-challenge-clearance) • [Pricing](https://peak.fo/pricing?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-challenge-clearance)

## License

MIT