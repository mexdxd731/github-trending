<div align="center">

<a href="https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored">
  <img src="./assets/routerhub-banner.png" width="100%" alt="RouterHub — one key for all frontier AI models">
</a>

# DeepSeek Uncensored — the abliterated cyber workhorse, V4 Pro to Flash 1017

**DeepSeek uncensored models are DeepSeek variants with refusal behavior reduced — served as hosted API variants or published as abliterated open weights. The one built for security work is DeepSeek V4.1 Flash 1017 Abliterated: DeepSeek V4.1 Flash ranks third on the AA Cyber benchmark behind only GPT-6 Sol and Kimi K3.1 Pro — ahead of Grok 4.7, Muse and Mistral — and the abliterated 1017 build removes the refusal layer on top. Hosted from $0.30 input / $1.25 output per million tokens; community GGUF builds run locally in llama.cpp and Ollama.**

<p align="center">
  <a href="https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored"><img src="./assets/visit-website.svg" width="208" height="74" alt="Visit RouterHub website"></a>
  <a href="https://t.me/routerhubsi"><img src="./assets/telegram.svg" width="216" height="74" alt="Join RouterHub on Telegram"></a>
  <a href="https://routerhub.si/register?next=onboarding&utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored"><img src="./assets/get-api-key.svg" width="183" height="74" alt="Get a RouterHub API key"></a>
</p>

</div>

---

Maintained by [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) · Community-maintained — corrections and new builds welcome via issues.

Every variant has its own page under [`models/`](models/):

- [`deepseek-v4.1-flash-1017-abliterated`](models/deepseek-v4.1-flash-1017-abliterated.md) — the pinned build this repo is built around
- [`deepseek-v4.1-flash-abliterated`](models/deepseek-v4.1-flash-abliterated.md) — the rolling abliterated build
- [`deepseek-v4-pro-abliterated`](models/deepseek-v4-pro-abliterated.md) — the flagship size, abliterated
- [`deepseek-v4.1-flash-uncensored`](models/deepseek-v4.1-flash-uncensored.md) and [`deepseek-v4-pro-uncensored`](models/deepseek-v4-pro-uncensored.md) — the tuned variants

To add or correct an entry, open an issue.

## Why this model for cyber work

Two facts make V4.1 Flash the default no-refusal security model:

1. **The benchmark position.** On the AA Cyber benchmark, DeepSeek V4.1 Flash ranks third among all models — behind only GPT-6 Sol and Kimi K3.1 Pro, and ahead of Grok 4.7, Muse, Mistral and previous GPT versions — at a fraction of their serving cost.
2. **The refusal layer comes off.** The abliterated builds remove refusal behavior at the weight level, so a pentest agent stops pausing to ask whether it is allowed to answer.

The result is a model that does offensive-security tasks like a tool instead of like an assistant — which is what you want when it is running inside an agent loop.

## Which uncensored DeepSeek should you use?

| Your situation | Pick | Why |
|---|---|---|
| Red-team agent that must behave the same every run | `deepseek-v4.1-flash-1017-abliterated` | Pinned checkpoint, reproducible behavior |
| Cheapest hosted no-refusal workhorse | `deepseek-v4.1-flash-uncensored` | $0.15 input / $0.60 output |
| Big agentic jobs on the flagship size | `deepseek-v4-pro-abliterated` | V4 Pro capability, abliterated |
| Uncensored DeepSeek on your own machine | Any GGUF build above | Runs in llama.cpp, Ollama or LM Studio |
| Full-precision GPU serving | `dealignai/DeepSeek-V4.1-Flash-UNCENSORED-FP8` | FP8 for inference servers |

## Test results: DeepSeek vs Kimi for cyber work

We ran the cyber battery from [`prompts.md`](prompts.md) through **DeepSeek V4.1 Flash 1017 Abliterated** and **Kimi K3.1 Pro Uncensored** side by side. **DeepSeek ranked higher for cyber capabilities** — it answered exploit-style probes more directly and needed less framing to engage, which fits the benchmark position above.

Kimi's edge is elsewhere: the 1,048,576-token context window and native image input. Full write-up of the comparison: [kimi-uncensored](https://github.com/routerhubSI/kimi-uncensored).

## Every DeepSeek uncensored build

**Hosted API variants** — all served through one OpenAI- and Anthropic-compatible endpoint:

| Model | Input | Cached input | Output | Context window | Served by |
|---|---:|---:|---:|---:|---|
| `deepseek-v4-pro-uncensored` | $0.20 | $0.0016 | $0.40 | not published | [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) |
| `deepseek-v4.1-flash-uncensored` | $0.15 | $0.0027 | $0.60 | not published | [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) |
| `deepseek-v4.1-flash-abliterated` | $0.30 | $0.055 | $1.25 | 1,000,000 | [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) |
| `deepseek-v4.1-flash-1017-abliterated` | $0.30 | $0.055 | $1.25 | 1,000,000 | [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) |
| `deepseek-v4-pro-abliterated` | $0.40 | $0.04 | $1.60 | 1,000,000 | [RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored) |

Prices in USD per million tokens; live rates at the [public catalogue](https://routerhub.si/models.json).

## What the 1017 in the name means

`deepseek-v4.1-flash-1017-abliterated` is a **pinned build**: the abliteration was applied to the October 2026 checkpoint and the resulting behavior is frozen, so prompts, agents and evaluations behave the same way next week as they did last week. The rolling `deepseek-v4.1-flash-abliterated` tracks newer checkpoints — you get updates, at the cost of behavior drift between versions.

Rule of thumb: pin the 1017 build for agents and evaluations, take the rolling build when you want the latest checkpoint.

## Running it locally

With [Ollama](https://ollama.com/):

```sh
ollama run hf.co/huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF
```

Or with [llama.cpp](https://github.com/ggml-org/llama.cpp) — pick a quantization file from the build's Files tab that fits your VRAM:

```sh
llama-cli -m Huihui-DeepSeek-V4-Flash-0731-abliterated-Q4_K_M.gguf -p "List five real-world techniques used to guess weak passwords."
```

The FP8 build is for GPU serving when you want the full-precision behavior.

## Hosted setup

One base-URL change in the OpenAI SDK:

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["ROUTERHUB_API_KEY"],
    base_url=os.environ["ROUTERHUB_BASE_URL"],  # copy from the dashboard
)

response = client.chat.completions.create(
    model="deepseek-v4.1-flash-1017-abliterated",
    messages=[{"role": "user", "content": "Reply with exactly OK."}],
)
print(response.choices[0].message.content)
```

RouterHub serves these variants — full disclosure, we run the repo. [Setup guides](https://github.com/routerhubSI/uncensored-ai-api) cover the OpenAI, Anthropic and agent-tool paths.

## Red-team prompt library

[`prompts.md`](prompts.md) — the cyber-focused prompt battery used in this repo's comparisons: refusal probes, defensive reframings, multi-turn probes and exploit-style questions. Run them against any DeepSeek variant and log what you get; retain failed attempts alongside successes. Method notes: [docs/06-red-teaming-guide.md](docs/06-red-teaming-guide.md).

## Documentation

| Guide | Contents |
| --- | --- |
| [What is DeepSeek V4.1 Flash 1017 Abliterated](./docs/01-what-is-deepseek-v4.1-flash-1017-abliterated.md) | The pinned build, why it exists, and what the variants are |
| [Abliterated vs. uncensored](./docs/02-abliterated-vs-uncensored.md) | Weight changes, tuning, and variant selection |
| [DeepSeek API quickstart](./docs/03-api-quickstart.md) | Account, model IDs, requests, and billing |
| [Claude Code, Cursor, OpenCode](./docs/04-tool-compatibility.md) | Matching clients to supported protocols |
| [Running locally](./docs/05-running-locally.md) | Ollama and llama.cpp for the GGUF builds |
| [Red-teaming guide](./docs/06-red-teaming-guide.md) | Test design and refusal-behavior measurement |
| [FAQ](./docs/07-faq.md) | Common DeepSeek uncensored and variant questions |
| [Glossary](./docs/08-glossary.md) | Model, prompt, and variant terms |

## FAQ

**Is DeepSeek V4.1 Flash censored?**
The stock release includes refusal behavior; the abliterated builds listed here remove it at the weight level, and the tuned uncensored variants reduce it. Refusal behavior varies by prompt and version.

**What is the 1017 build?**
The abliteration applied to the October 2026 checkpoint and pinned there, so behavior stays reproducible across weeks — the right default for agents and evaluations.

**Which uncensored DeepSeek should I use?**
Pinned reproducible behavior → `deepseek-v4.1-flash-1017-abliterated`. Lowest price → `deepseek-v4.1-flash-uncensored` at $0.15/$0.60. Flagship capability → `deepseek-v4-pro-abliterated`. Local hardware → any GGUF build in the open-weights table.

**Can you run uncensored DeepSeek locally?**
Yes — the GGUF builds above run in llama.cpp, Ollama or LM Studio on consumer hardware.

**Does DeepSeek abliterated work with Ollama?**
Yes — point Ollama at any of the Hugging Face GGUF builds, e.g. `ollama run hf.co/huihui-ai/Huihui-DeepSeek-V4-Flash-0731-abliterated-GGUF`.

**DeepSeek uncensored vs Kimi uncensored — which is better?**
For cyber and exploit-style work, our testing put DeepSeek ahead (see the comparison section above). Kimi K3.1 Pro Uncensored wins on 1M-token context and native image input. Details in [kimi-uncensored](https://github.com/routerhubSI/kimi-uncensored).

**Is DeepSeek V4 uncensored free?**
The GGUF builds are free to download and run locally. Hosted access is pay-per-token, starting at $0.15 input / $0.60 output per million tokens.

## Compared to

- [Kimi uncensored](https://github.com/routerhubSI/kimi-uncensored) — every uncensored Kimi build, and the other half of our cross-model comparison
- [Uncensored models index](https://github.com/routerhubSI/uncensored-models) — the full library across GLM, DeepSeek and Qwen
- [uncensored-ai-api](https://github.com/routerhubSI/uncensored-ai-api) — what an uncensored AI API is, with setup guides
- [routerhub-model-evals](https://github.com/routerhubSI/routerhub-model-evals) — recorded GLM comparisons with raw outputs and sandbox scores

## Related

- **[RouterHub models](https://routerhub.si/models?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored):** compare model families, protocols, and published prices.
- **[Kimi uncensored index](https://github.com/routerhubSI/kimi-uncensored):** the Moonshot trim story and the K3 generation builds.
- **[Uncensored models index](https://github.com/routerhubSI/uncensored-models):** every uncensored and abliterated entry across families.
- **[RouterHub](https://routerhub.si/?utm_source=github&utm_medium=readme&utm_campaign=deepseek-uncensored):** account access, prepaid credits, and API keys.
- **[Telegram](https://t.me/routerhubsi):** RouterHub's community channel.

Documentation fixes and redacted reproductions are welcome: [contributing](./CONTRIBUTING.md) · [security](./SECURITY.md) · [MIT license](./LICENSE).

---

<div align="center">

**Found a useful DeepSeek uncensored or abliterated resource? Star the repository and share your documentation improvements.**

<sub>Maintained by RouterHub. Model names and trademarks belong to their respective owners; this repository does not imply endorsement by model providers. Use the APIs in accordance with applicable laws and service policies.</sub>

</div>