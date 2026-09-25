<a href="https://clearance.sh/register?ref=UQ428VM">
  <img src="./assets/cf-clearance.png" alt="Clearance - get a valid cf_clearance cookie in 1.3 seconds, $0.40 per 1,000" width="100%">
</a>

# cf-clearance

A small, dependency-free Python client and CLI for the [Clearance](https://clearance.sh/register?ref=UQ428VM) API.

It clears the Cloudflare Challenge and returns a valid `cf_clearance` cookie, or solves a Cloudflare Turnstile widget and returns a `cf-turnstile-response` token. Two REST calls do the work; this package adds the parts a correct client needs — typed errors, retries with `Retry-After` honouring, sitekey discovery, and the browser identity block you need to replay a token from your own request.

<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>
&nbsp;
<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-pricing.png" alt="Pricing" height="46"></a>
&nbsp;
<a href="https://clearance.sh/docs/quickstart"><img src="./assets/btn-docs.png" alt="Read the docs" height="46"></a>

- **Free credits on sign-up.** No card, no trial countdown — create an account and start solving.
- **$0.40 per 1,000** for both Cloudflare services. $0.00040 a solve.
- **451ms** average Turnstile solve, **1.3s** for the Challenge.
- **Failed solves are refunded** in full — you pay for tokens you received.
- **No runtime dependencies.** Standard library only, Python 3.8+.

---

## Contents

- [Pricing](#pricing)
- [What `cf_clearance` actually is](#what-cf_clearance-actually-is)
- [Install](#install)
- [Quickstart](#quickstart)
- [Authentication](#authentication)
- [Task types](#task-types)
- [The response: a token and its identity](#the-response-a-token-and-its-identity)
- [The polling rhythm](#the-polling-rhythm)
- [Error handling](#error-handling)
- [Sitekey discovery](#sitekey-discovery)
- [CLI reference](#cli-reference)
- [Batch runs](#batch-runs)
- [FAQ](#faq)

---

## Pricing

Two services, one price. Billed per solve, with no subscription and no minimum spend.

| Service | `task.type` | Price / 1,000 | Per solve | Avg solve |
| --- | --- | --- | --- | --- |
| **Cloudflare Turnstile** | `AntiTurnstileTask` | **$0.40** | $0.00040 | **451ms** |
| **Cloudflare Challenge** | `AntiCloudflareTask` | **$0.40** | $0.00040 | **1.3s** |

**Free credits on sign-up** — enough to run your first integration before you spend anything.

**Unlimited plans** are available for sustained volume — ask for pricing.

### How that compares

Published per-1,000 rates for Cloudflare Turnstile, gathered from each provider's own pricing page:

| Provider | Turnstile / 1,000 |
| --- | --- |
| **Clearance** | **$0.40** |
| CapMonster Cloud | $0.80 |
| CapSolver | $0.80 – $1.00 |
| Anti-Captcha | $1.50 |
| CaptchaSonic | $1.45 |
| 2Captcha | $1.45 – $1.99 |

At $0.40 that is roughly a third of what the field charges, without giving up solve time — Turnstile averages **451ms** here against a published field average of about 8 seconds.

<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>

---

## What `cf_clearance` actually is

When a request arrives from an IP or a client that Cloudflare does not fully trust, the edge serves an interstitial — "Just a moment…" — instead of the page. Passing it sets a short-lived `cf_clearance` cookie on your browser.

Two properties of that cookie matter when you are automating:

1. **It is bound to the identity that earned it.** The User-Agent, the TLS handshake and the HTTP/2 settings present when the challenge was solved are baked into it. Replay the cookie from a different client and the edge rejects it as if you had never solved anything.
2. **It expires.** Treat it as a session artefact, not a permanent credential, and re-solve when the target stops accepting it.

This package handles both. It asks Clearance to solve the challenge on real infrastructure, then hands back the cookie **together with** the User-Agent, the browser profile id and the exact TLS/HTTP2 emulation block used to earn it, so your follow-up request can present the same identity.

---

## Install

```bash
pip install cf-clearance
```

Or straight from source:

```bash
git clone https://github.com/<you>/cf-clearance.git
cd cf-clearance
pip install .
```

No dependency resolution is needed — the package installs nothing else.

---

## Quickstart

Create an account to get your key — it takes about a minute and comes with **free credits**:

<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>

Then export the key from **Dashboard → Settings**:

```bash
export CLEARANCE_API_KEY="your_key_here"
```

### From the command line

```bash
cf-clearance challenge --url https://example.com/login
cf-clearance turnstile --sitekey 0x4AAAAAAAxxxx --url https://example.com/login
cf-clearance turnstile --page https://example.com/login --url https://example.com/login
cf-clearance balance
cf-clearance extract --page https://example.com/login
```

The token is printed to stdout; progress goes to stderr, so the output is safe to pipe.

### As a library

```python
from cf_clearance import Client

client = Client.from_env()

solution = client.solve_challenge("https://example.com/login")
print(solution.token)          # the cf_clearance value
print(solution.profile_id)     # e.g. "brave151-windows-b0ddf2db"

# replay with the identity that earned it
cookies = {"cf_clearance": solution.token}
headers = dict(solution.headers)
```

For a Turnstile widget, pass the sitekey:

```python
solution = client.solve_turnstile("0x4AAAAAAAxxxx", "https://example.com/login")
print(solution.token)          # submit as the widget response
```

### With curl

Two calls, no SDK, no browser:

```bash
# 1. create the task
curl -s https://api.clearance.sh/createTask \
  -H 'content-type: application/json' \
  -H 'x-private-key: YOUR_API_KEY' \
  -d '{
    "task": {
      "type": "AntiCloudflareTask",
      "websiteURL": "https://example.com/login"
    }
  }'
```

```json
{ "errorId": 0, "status": "idle", "taskId": "0f5a5b6c-9a5a-4a1e-9d3f-2b8c5a9e4d71" }
```

```bash
# 2. read the result (sleep ~500ms first, then poll every 200-300ms)
curl -s https://api.clearance.sh/getTaskResult \
  -H 'content-type: application/json' \
  -H 'x-private-key: YOUR_API_KEY' \
  -d '{"taskId": "0f5a5b6c-9a5a-4a1e-9d3f-2b8c5a9e4d71"}'
```

```json
{
  "errorId": 0,
  "taskId": "0f5a5b6c-9a5a-4a1e-9d3f-2b8c5a9e4d71",
  "status": "ready",
  "solution": {
    "token": "kXPq7Rl0oB4mS2xN.9tVc1uYw-hZ8fGdJ6eA",
    "type": "cloudflare",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "profileId": "brave151-windows-b0ddf2db",
    "cookies": { "cf_clearance": "kXPq7Rl0oB4mS2xN.9tVc1uYw-hZ8fGdJ6eA" },
    "headers": { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..." }
  }
}
```

---

## Authentication

One key. No OAuth flow, no bearer token, no expiry.

```bash
# in the body
-d '{"clientKey": "YOUR_API_KEY", "task": { ... }}'

# or in a header (preferred)
-H 'x-private-key: YOUR_API_KEY'
```

Both forms work on every endpoint. Prefer the header — request bodies end up in debug logs, error trackers, replayed fixtures and captured payloads pasted into tickets, and headers are far easier to redact centrally.

- **The API key is not your dashboard session.** A leaked key cannot read your account, change settings or move funds.
- **Rotation is immediate**, with no grace period. Deploy the new key everywhere first, then rotate.
- **`GET /status` needs no key at all** — it is public so you can check capacity from a monitor that should not hold a credential.
- **`cf-clearance balance`** is the cheapest way to confirm a key works before wiring up the rest.

---

## Task types

| Service | `task.type` | Required | Optional | Price | Avg solve |
| --- | --- | --- | --- | --- | --- |
| Cloudflare Challenge | `AntiCloudflareTask` | `websiteURL` | `proxy` | $0.40 / 1k | 1.3s |
| Cloudflare Turnstile | `AntiTurnstileTask` | `websiteURL`, `websiteKey` | `proxy`, `metadata.action` | $0.40 / 1k | 451ms |

`websiteURL` must be an absolute `http` or `https` URL, at most 2,048 characters.

```python
from cf_clearance import TASK_CHALLENGE, TASK_TURNSTILE
```

Two field rules that catch people out:

- **`websiteKey` is required for Turnstile only.** The Challenge lane reads what it needs from the page itself.
- **`metadata.cdata` is rejected, not ignored.** Sending it produces `ERROR_INVALID_TASK_DATA`. Leave it out.

```python
# correct Turnstile task
{
    "type": "AntiTurnstileTask",
    "websiteURL": "https://example.com/login",
    "websiteKey": "0x4AAAAAAAAjq6WYeRDKmebM",
    "proxy": "http://user:pass@host:port",   # optional
    "metadata": {"action": "login"},          # optional
}
```

### Proxies

Every task accepts an optional proxy so the solve happens from your own exit IP, which matters when the target is IP-sensitive:

```python
client = Client(key, proxy="http://user:pass@host:port")
```

This package also accepts the shorter `host:port:user:pass` form and normalises it. Leave the proxy off and the solve uses Clearance's egress instead.

---

## The response: a token and its identity

This is the part most clients get wrong, and it is why a solve can succeed and your request still bounce.

A `ready` result carries:

| Field | Meaning |
| --- | --- |
| `solution.token` | What you submit. For the Challenge this equals `solution.cookies.cf_clearance`. |
| `solution.userAgent` | The User-Agent the token was earned with. |
| `solution.profileId` | The browser profile that solved it, e.g. `brave151-windows-b0ddf2db`. |
| `solution.cookies` | Cookies to replay (`cf_clearance`). |
| `solution.headers` | Headers to replay alongside them. |
| `solution.emulation` | The TLS and HTTP2 fingerprint block. |

The emulation block is what makes the replay work:

```json
"emulation": {
  "alpn": ["h2", "http/1.1"],
  "curves_list": "X25519MLKEM768:X25519:P-256:P-384",
  "key_shares": ["X25519MLKEM768", "X25519"],
  "min_tls_version": "1.2",
  "max_tls_version": "1.3",
  "permute_extensions": true,
  "http2": {
    "settings_order": [1, 2, 4, 6],
    "headers_pseudo_order": ["m", "a", "s", "p"]
  }
}
```

Send your follow-up request with **all** of it:

```python
solution = client.solve_challenge(url)

final = get(
    url,
    headers={**solution.headers, "User-Agent": solution.user_agent},
    cookies=solution.cookies,
    # ... and a TLS/HTTP2 stack configured from solution.emulation
)
```

In this package, `solution.identity` returns the three pieces together:

```python
solution.identity
# {"userAgent": "...", "profileId": "...", "emulation": {...}}
```

A client that checks only `response.ok` and replays the cookie with a default HTTP library will present a different handshake, and the clearance is thrown away. That is the failure people blame on the solver.

---

## The polling rhythm

Everything is asynchronous. `/createTask` returns an id immediately; `/getTaskResult` returns the solution once a node has produced it.

- Sleep about **500ms** after creating the task.
- Then poll every **200–300ms**. Sooner mostly buys you `processing` responses; slower adds latency that has nothing to do with the solver.
- A result lives for **five minutes**, and **reading it does not consume it**. The same solution comes back until it expires, so a retry after a dropped connection is free and you never lose a solve you already paid for.
- After five minutes the id is gone and returns `ERROR_TASKID_INVALID`.

The `Client` does all of this for you:

```python
solution = client.poll(task_id)          # 500ms grace, then 250ms polls
```

Or drive it yourself:

```python
task_id = client.create({"type": "AntiCloudflareTask", "websiteURL": url})
time.sleep(0.5)
while True:
    data = client.result(task_id)
    if data["status"] == "ready":
        break
    if data["status"] == "failed":
        raise RuntimeError(data["errorCode"])
    time.sleep(0.25)
```

---

## Error handling

Seven codes cover everything the API can refuse or fail to do. Three are worth retrying, four are not.

Protocol errors arrive as **HTTP 200 with `errorId: 1`** — that is deliberate, so a client that only checks the status code will happily read a failed solve as a success. Branch on the body, check `errorId`, then switch on `errorCode`.

| `errorCode` | HTTP | Retry? | Meaning |
| --- | --- | --- | --- |
| `ERROR_KEY_DOES_NOT_EXIST` | 401 | no | The key is wrong or missing. Fix the credential. |
| `ERROR_INVALID_TASK_DATA` | 200 | no | A required field is missing, malformed, or rejected. |
| `ERROR_TASK_NOT_SUPPORTED` | 200 | no | Unknown `task.type`, or the service is disabled. |
| `ERROR_TASKID_INVALID` | 200 | no | No such id, or it is older than five minutes. |
| `ERROR_CAPTCHA_UNSOLVABLE` | 200 | **yes** | Attempted and failed. Often transient; refunded. |
| `ERROR_SERVICE_UNAVAILABLE` | 200 | **yes** | Solver did not answer in time, or maintenance. |
| `ERROR_NO_SLOT_AVAILABLE` | 503 | **yes** | No capacity. Nothing attempted, nothing charged. Honour `Retry-After`. |

This package models all of that:

```python
from cf_clearance import ClearanceError, RETRYABLE_CODES

try:
    solution = client.solve_challenge(url)
except ClearanceError as exc:
    if exc.code == "ERROR_KEY_DOES_NOT_EXIST":
        ...                       # fix the key, do not retry
    elif exc.retryable:
        ...                       # back off and try again
    else:
        raise                     # a bug in the request
```

`Client` already applies exponential backoff to retryable codes and prefers `Retry-After` over its own guess whenever the server sends one. The retry budget is capped so an incident cannot turn into a silent hang.

---

## Billing

- **$0.40 per 1,000 solves** — $0.00040 each — for both Cloudflare services.
- **A failed solve is refunded in full and is not billed.**
- **Capacity is checked before any money moves.** `ERROR_NO_SLOT_AVAILABLE` never charges you at all.
- **No subscription, no minimum spend.** Pay for what clears.

Check your balance without touching anything else:

```bash
cf-clearance balance
# 303.43519
```

<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>

---

## Sitekey discovery

You do not always have the sitekey to hand. If it is not already in your config, pull it off the page:

```python
from cf_clearance import extract_sitekey, extract_sitekeys, read_page

html = read_page("https://example.com/login")
sitekey = extract_sitekey(html)     # first match, or None
every = extract_sitekeys(html)      # all unique matches, in order
```

The scanner recognises the three shapes Turnstile keys actually appear in:

```html
<div class="cf-turnstile" data-sitekey="0x4AAAAAAAabc123"></div>
```
```js
turnstile.render(el, { sitekey: "0x4AAAAAAAabc123" });
```
```
/cdn-cgi/challenge-platform/...?k=0x4AAAAAAAabc123
```

From the shell:

```bash
cf-clearance extract --page https://example.com/login
```

---

## CLI reference

```
cf-clearance turnstile --url URL [--sitekey KEY | --page URL] [--action NAME]
cf-clearance challenge --url URL
cf-clearance extract   --page URL
cf-clearance balance
cf-clearance batch     FILE [--kind turnstile|challenge] [--sitekey KEY]
```

Global flags: `--api-key`, `--proxy`, `--timeout`, `--retries`, `--quiet`, `--verbose`, `--version`.

| Flag | Default | Notes |
| --- | --- | --- |
| `--api-key` | `$CLEARANCE_API_KEY` | Falls back to the environment variable. |
| `--proxy` | — | `http://user:pass@host:port`, `host:port:user:pass` or `host:port`. |
| `--timeout` | `30` | Per-request timeout in seconds. |
| `--retries` | `4` | Budget for retryable codes only. |
| `--verbose` | off | Prints the full solution JSON, including the identity block. |
| `--quiet` | off | Suppresses progress output on stderr. |

Exit codes: `0` success, `1` solve failed, `2` usage or credential problem.

---

## Batch runs

```bash
python examples/batch_urls.py targets.txt --kind challenge > results.json
```

One URL per line; blank lines and `#` comments are skipped. A failure on one URL never aborts the batch — the error is recorded next to its URL:

```json
[
  { "url": "https://a.example/", "ok": true,  "token": "…", "elapsed": 0.451 },
  { "url": "https://b.example/", "ok": false, "code": "ERROR_CAPTCHA_UNSOLVABLE" }
]
```

The CLI has the same thing built in:

```bash
cf-clearance batch targets.txt --kind challenge
```

---

## FAQ

**How much does a solve cost?**
**$0.40 per 1,000** — $0.00040 each — for both Cloudflare Turnstile and the Cloudflare Challenge. Failed solves are refunded. New accounts start with free credits.

**How fast is a solve?**
Turnstile averages **451ms**, Cloudflare Challenge about **1.3s**. Live figures for both are published on the [status page](https://clearance.sh/status) without needing an account.

**Do I need a browser?**
No. Two REST calls, no SDK, nothing to install on your side.

**Can I use my own proxy?**
Yes — every task accepts an optional `proxy`. Leave it off and the solve uses Clearance's egress instead.

**Why did my token fail even though the solve succeeded?**
Almost always the identity. The token is bound to the User-Agent and TLS handshake that earned it. Replay `solution.headers`, `solution.user_agent` and a stack configured from `solution.emulation`, not your default HTTP client.

**How long does `cf_clearance` last?**
It is a session artefact; treat it as short-lived and re-solve when the target stops accepting it.

**What happens if a solve fails?**
You are refunded in full and not billed. The code is `ERROR_CAPTCHA_UNSOLVABLE` and it is retryable.

**Is there a public status page?**
Yes — [clearance.sh/status](https://clearance.sh/status) publishes solve activity, queue depth and node capacity, refreshing every 30 seconds, and the same figures are available as JSON with no API key.

**How do I get volume pricing?**
Unlimited plans are arranged directly on request.

---

## Start solving

Free credits on sign-up, no card required.

<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>
&nbsp;
<a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-pricing.png" alt="Pricing" height="46"></a>
&nbsp;
<a href="https://clearance.sh/docs/quickstart"><img src="./assets/btn-docs.png" alt="Read the docs" height="46"></a>
&nbsp;
<a href="https://clearance.sh/status"><img src="./assets/btn-status.png" alt="Live status" height="46"></a>

---

<p align="center">
  <b>Clear captchas in 451ms.</b><br>
  <i>Cloudflare Turnstile &amp; Challenge at $0.40 per 1,000 — fully automated, no humans involved, failed solves refunded.</i>
</p>

<p align="center">
  ⚡ <b>451ms avg</b> &nbsp;·&nbsp; 💸 <b>$0.40 / 1K</b> &nbsp;·&nbsp; 🆓 <b>Free credits</b> &nbsp;·&nbsp; 🔁 <b>Failures refunded</b>
</p>

<p align="center">
  <a href="https://clearance.sh/register?ref=UQ428VM"><img src="./assets/btn-credits.png" alt="Get free credits" height="46"></a>
</p>

## License

MIT — see [LICENSE](LICENSE).

See [CHANGELOG.md](CHANGELOG.md) for release history, [CONTRIBUTING.md](CONTRIBUTING.md) for the ground rules, and [SECURITY.md](SECURITY.md) for private vulnerability reporting.

This is an unofficial client. Clearance is a separate service; see [clearance.sh](https://clearance.sh/register?ref=UQ428VM) for terms.
