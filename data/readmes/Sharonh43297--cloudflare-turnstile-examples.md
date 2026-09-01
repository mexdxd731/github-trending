# Cloudflare Turnstile Examples

<a href="https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples">
  <img src="./assets/peak-banner.png" alt="Peak - solve Cloudflare Turnstile & the 5s challenge in ~1s" width="100%">
</a>

A collection of practical examples for integrating Cloudflare Turnstile into
web projects. Each example shows a real pattern for reading the widget, handling
the challenge, and exchanging a token with your backend.

## What you'll find here

- A minimal HTML widget setup (managed and non-interactive modes)
- Reading the `sitekey` and widget state from the page
- Server-side token verification flow
- Automated-browser examples (Playwright, Selenium, Puppeteer) that let the
  widget run naturally
- API-based token injection when you need it headless

## Table of contents

- [Prerequisites](#prerequisites)
- [1. Basic widget setup](#1-basic-widget-setup)
- [2. Reading the sitekey](#2-reading-the-sitekey)
- [3. Server-side verification](#3-server-side-verification)
- [4. Automated browser flow](#4-automated-browser-flow)
- [5. API token injection](#5-api-token-injection)
- [License](#license)

## Prerequisites

- A Cloudflare Turnstile **sitekey** (from your Cloudflare dashboard)
- A normal web server or framework for the examples
- Optional: a [Peak](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples)
  API key for the API-based token example

## 1. Basic widget setup

Turnstile embeds through a single div. In **managed** mode Cloudflare decides
whether to show an interactive challenge:

```html
<div class="cf-turnstile" data-sitekey="0x4AAAAAAAxxxx" data-theme="light"></div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

In **non-interactive** mode the widget runs invisibly and real users never see it:

```html
<div class="cf-turnstile" data-sitekey="0x4AAAAAAAxxxx" data-mode="non-interactive"></div>
```

The widget sets a hidden `cf-turnstile-response` field that your form submits
with the rest of the data.

## 2. Reading the sitekey

Sometimes you need the sitekey at runtime rather than hard-coding it. Reading it
from the DOM is a stable approach:

```javascript
const el = document.querySelector(".cf-turnstile");
const sitekey = el && el.getAttribute("data-sitekey");
console.log("sitekey:", sitekey);
```

The same attribute is present in server-rendered markup, so a scraper can also
extract it without executing the widget.

## 3. Server-side verification

A token from the widget must be verified with Cloudflare's siteverify endpoint
before you trust it. A minimal example in Node.js:

```javascript
const res = await fetch(
  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: req.body["cf-turnstile-response"],
    }),
  }
);
const data = await res.json();
console.log("success:", data.success);
```

## 4. Automated browser flow

If you automate a browser, let the widget run in a real page and wait for the
challenge to finish, then capture the token. Example with Puppeteer:

```javascript
const page = await browser.newPage();
await page.goto("https://example.com/protected");
await page.waitForSelector(".cf-turnstile iframe", { timeout: 15000 });
const token = await page.evaluate(() => {
  const el = document.querySelector(".cf-turnstile");
  return el && el._callback ? el._callback("") : null;
});
console.log("token:", token);
```

## 5. API token injection

When you need a token without driving a full browser, an API can produce one
from the sitekey and page URL. The example below uses
[Peak](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples):

```json
POST https://api.peak.fo/solve
{
  "task_type": "turnstiletask",
  "sitekey": "0x4AAAAAAAxxxx",
  "url": "https://example.com/protected"
}
```

Then submit the returned token as `cf-turnstile-response`:

```
cf-turnstile-response: 0.abc123...
```

## Powered by Peak

This collection uses [Peak](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples) to solve Turnstile.
- Solve Cloudflare Turnstile & the 5s challenge in about a second
- Pay only for successful solves - from $1 / 1,000
- Free API key, no card. Use code **`PEAKGH`** for bonus trial credit.

[Get your free API key](https://peak.fo/?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples) • [Docs](https://peak.fo/docs/turnstile?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples) • [Pricing](https://peak.fo/pricing?utm_source=github&utm_medium=readme&utm_campaign=packages&utm_content=cloudflare-turnstile-examples)

## License

MIT