# crypto-rag

Asisten crypto berbahasa Indonesia yang menggabungkan **RAG** (Retrieval-Augmented Generation) dengan **data pasar realtime**. Menjawab pertanyaan konsep/edukasi dari korpus pengetahuan, sekaligus menyajikan harga, market cap, funding rate, TVL, dan sentimen langsung dari sumber live — tanpa API key untuk data pasar.

## Filosofi arsitektur

Prinsip inti crypto RAG yang benar: **jangan pernah menaruh angka pasar ke dalam vector store** karena instan basi. Data numerik (harga, funding, TVL) diambil live saat query lewat tool-call; RAG hanya untuk konsep, deskripsi, dan konteks statis. Angka tidak pernah lewat LLM sehingga bebas dari halusinasi harga.

```
Pertanyaan
   │
   ▼
Router (deteksi intent)
   ├── Konsep/edukasi ─────► Korpus pengetahuan (FAISS) ─┐
   ├── Harga realtime ─────► 6 bursa + WebSocket          │
   ├── Derivatif/funding ─► Binance Futures               ├─► (opsional) LLM synthesis
   ├── TVL / on-chain ────► DefiLlama                      │    grounded + sitasi + timestamp
   ├── Sentimen ──────────► Fear & Greed Index             │
   └── Market cap/kategori► RAG statis koin (FAISS + RRF) ─┘
```

## Fitur

**Data pasar realtime (keyless):**
- Harga spot dari 6 bursa (Binance, OKX, Bybit, KuCoin, Kraken, Coinbase) — dibandingkan untuk spread & arbitrase
- Streaming harga sub-detik via Binance WebSocket (`--watch`, `--live`)
- Tren harga historis (candle OHLC Binance) + SMA & analisis arah
- Order book depth + estimasi slippage untuk notional tertentu
- Funding rate + open interest (Binance Futures)
- TVL protokol & per-chain (DefiLlama)
- Fear & Greed Index (+tren)
- Ringkasan pasar global (total mcap, dominasi BTC/ETH) + top gainer/loser
- **On-chain live**: fee & mempool Bitcoin (Mempool.space), hashrate/transaksi jaringan BTC, difficulty & countdown halving, gas fee Ethereum (EIP-1559), supply stablecoin (DefiLlama), volume DEX 24 jam, supply/epoch/inflasi Solana

**RAG:**
- Retrieval hybrid: BM25 (keyword) + dense embedding (FAISS), digabung via Reciprocal Rank Fusion
- Cross-encoder reranker opsional (`--rerank`)
- Korpus pengetahuan 146+ topik Bahasa Indonesia (konsep, teknologi, kategori, trading, risiko, protokol, strategi, sejarah, jaringan, keamanan, metrik, ekosistem, praktis, protokol lanjutan, regulasi)
- Filter kategori koin (defi, meme, AI, stablecoin, layer-1, dll.) — 615 koin ter-tag

**Fitur pengguna:**
- Chat interaktif dengan memori follow-up (default bila tanpa argumen)
- Watch mode multi-koin dengan **alert harga bersyarat** (`BTC>65000`, `ETH<1800`)
- **Portfolio tracker** — tambah holding, hitung nilai live, P/L, alokasi
- **Streaming output LLM** token-by-token (`--stream`)
- **Tool-calling agent** — query kompleks/multi-langkah otomatis dirutekan ke LLM yang memilih tool sendiri (mis. "bandingkan funding BTC dan ETH", "koin defi mana funding tertinggi")

**LLM synthesis (opsional):**
- Merangkai konteks (pengetahuan + data live) jadi jawaban natural, grounded, dengan sitasi & disclaimer
- Kompatibel endpoint OpenAI (StepFun, OpenAI, Groq, LM Studio, Ollama, dll.)
- Fallback otomatis ke jawaban ekstraktif bila LLM tidak tersedia

## Setup

```bash
python3 -m venv venv
venv/bin/pip install requests numpy faiss-cpu fastembed websocket-client

# Ambil data koin & bangun index (sekali)
venv/bin/python fetch_data.py
venv/bin/python index.py
venv/bin/python knowledge_index.py

# (opsional) perkaya kategori koin dari CoinGecko (defi, meme, AI, gaming, dll)
venv/bin/python enrich_categories.py --pages 1
venv/bin/python index.py            # rebuild index dengan kategori baru
```

### Konfigurasi LLM (opsional)

Salin `config.example.json` menjadi `config.json` lalu isi API key:

```json
{
  "OPENAI_BASE_URL": "https://api.stepfun.ai/step_plan/v1",
  "OPENAI_API_KEY": "your-key",
  "OPENAI_MODEL": "step-3.5-flash"
}
```

ENV var (`OPENAI_BASE_URL`, `OPENAI_API_KEY`, `OPENAI_MODEL`) juga didukung dan menang atas config.json. Tanpa konfigurasi ini, sistem berjalan dengan jawaban ekstraktif.

## Pemakaian

```bash
# Mode chat interaktif (default bila tanpa argumen) — punya memori follow-up
venv/bin/python rag.py
#   > apa itu Bitcoin
#   > berapa harganya sekarang     (otomatis merujuk Bitcoin)
#   > tren nya seminggu terakhir   (idem)
#   > keluar

# Konsep (RAG + LLM synthesis)
venv/bin/python rag.py "apa itu Bitcoin"
venv/bin/python rag.py "jelaskan impermanent loss"

# Harga realtime lintas bursa
venv/bin/python rag.py "harga BTC sekarang"
venv/bin/python rag.py "bandingkan harga ETH di semua exchange"
venv/bin/python rag.py --live "harga SOL"          # + harga WS sub-detik

# Tren harga historis (candle Binance)
venv/bin/python rag.py "harga BTC seminggu terakhir"
venv/bin/python rag.py "tren ETH sebulan terakhir"

# Streaming live di terminal (multi-koin + alert)
venv/bin/python rag.py --watch BTC ETH SOL          # pantau harga
venv/bin/python rag.py --watch "BTC>65000"          # alert saat tembus 65k
venv/bin/python rag.py --watch "ETH<1800" SOL       # alert ETH + pantau SOL

# Portfolio tracker
venv/bin/python rag.py "portfolio tambah 0.5 BTC harga 60000"
venv/bin/python rag.py "portfolio tambah 2 ETH"
venv/bin/python rag.py "portfolio"                   # lihat nilai & P/L

# Streaming LLM
venv/bin/python rag.py --stream "apa itu Hyperliquid"

# Data pasar
venv/bin/python rag.py "funding rate BTC"
venv/bin/python rag.py "TVL Aave"
venv/bin/python rag.py "fear and greed index"
venv/bin/python rag.py "ringkasan pasar crypto"
venv/bin/python rag.py "top gainer hari ini"
venv/bin/python rag.py "slippage beli BTC 5 juta"

# RAG statis koin
venv/bin/python rag.py "koin defi terbesar"
venv/bin/python rag.py "tren market cap Solana"

# Flag
#   --chat     mode percakapan interaktif (default bila tanpa argumen)
#   --rule     paksa jawaban ekstraktif (tanpa LLM)
#   --rerank   pakai cross-encoder reranker (lebih presisi, lebih lambat)
#   --realtime paksa mode harga realtime
#   --live     tampilkan harga WS Binance di jawaban realtime
#   --watch    streaming harga live di terminal (dukung alert: BTC>65000)
#   --stream   tampilkan jawaban LLM token-by-token
#   --agent    paksa pakai tool-calling agent (query kompleks multi-langkah)
#   --k N      jumlah dokumen yang di-retrieve (default 5)

# Evaluasi kualitas retrieval (golden set 87 query)
venv/bin/python eval_rag.py
```

## Referensi Command Lengkap

### Script setup / data
| Command | Fungsi |
|---|---|
| `python fetch_data.py` | Ambil data koin (market cap, harga, histori) dari CoinGecko |
| `python fetch_data.py --fresh` | Paksa ambil ulang walau cache masih segar |
| `python fetch_data.py --limit 1000 --history 50` | Atur jumlah koin & kedalaman histori |
| `python index.py` | Bangun embedding + FAISS index koin |
| `python knowledge_index.py` | Bangun FAISS index korpus pengetahuan |
| `python enrich_categories.py --pages 1` | Perkaya kategori koin per-kategori CoinGecko |

### rag.py — flag CLI
| Flag | Fungsi | Default |
|---|---|---|
| `--chat` | Mode percakapan interaktif dengan memori follow-up | aktif bila tanpa argumen |
| `--rule` | Paksa jawaban ekstraktif (tanpa LLM) | off |
| `--llm` | Paksa pakai LLM synthesis | auto bila config ada |
| `--stream` | Output LLM token-by-token (SSE) | off |
| `--rerank` | Cross-encoder reranker (presisi tinggi, lebih lambat) | off |
| `--realtime` | Paksa mode harga realtime lintas bursa | off |
| `--live` | Tampilkan harga WS Binance di jawaban realtime | off |
| `--watch` | Streaming harga live di terminal (multi-koin + alert) | off |
| `--k N` | Jumlah dokumen yang di-retrieve | 5 |
| `--index PATH` | Lokasi file index koin | `data/index.json` |
| `--data PATH` | Lokasi file data koin | `data/coins.json` |
| `--history PATH` | Lokasi file histori | `data/history.json` |
| `--faiss-out PATH` | Lokasi FAISS index | `data/faiss.index` |

### Contoh per kategori intent
| Kategori | Contoh command |
|---|---|
| Konsep/edukasi | `python rag.py "apa itu Bitcoin"` · `"jelaskan proof of stake"` · `"apa itu MEV"` |
| Harga realtime | `python rag.py "harga BTC sekarang"` · `"bandingkan harga ETH di semua exchange"` |
| Harga live WS | `python rag.py --live "harga SOL"` |
| Tren historis | `python rag.py "harga BTC seminggu terakhir"` · `"tren ETH sebulan"` |
| Derivatif | `python rag.py "funding rate BTC"` · `"open interest ETH"` |
| Order book | `python rag.py "likuiditas BTC"` · `"slippage beli BTC 5 juta"` |
| Sentimen | `python rag.py "fear and greed index"` · `"tren sentimen seminggu"` |
| TVL / DeFi | `python rag.py "TVL Aave"` · `"TVL per chain"` |
| On-chain | `python rag.py "fee bitcoin"` · `"hashrate jaringan bitcoin"` · `"supply stablecoin"` · `"supply sol"` |
| Overview pasar | `python rag.py "ringkasan pasar crypto"` · `"dominasi BTC"` |
| Top movers | `python rag.py "top gainer hari ini"` · `"top loser"` |
| Kategori koin | `python rag.py "koin defi terbesar"` · `"koin meme"` · `"koin AI"` · `"koin RWA"` |
| RAG statis | `python rag.py "koin market cap terbesar"` · `"tren market cap Solana"` |
| Watch + alert | `python rag.py --watch BTC ETH SOL` · `--watch "BTC>65000"` · `--watch "ETH<1800"` |
| Portfolio | `python rag.py "portfolio tambah 0.5 BTC harga 60000"` · `"portfolio"` · `"portfolio hapus BTC"` |

### Environment variable
| Variabel | Fungsi |
|---|---|
| `OPENAI_BASE_URL` | Endpoint LLM (OpenAI-compatible). Menang atas config.json |
| `OPENAI_API_KEY` | API key LLM |
| `OPENAI_MODEL` | Nama model (mis. `step-3.5-flash`) |
| `CRYPTO_RAG_DEBUG=1` | Tampilkan log error WebSocket ke stderr |

## Tips Performa

- **Startup ~15-17 detik** per run one-shot didominasi loading model embedding. Untuk banyak pertanyaan, pakai **mode `--chat`**: model di-load sekali, tiap pertanyaan berikutnya 0.1-1 detik.
- **Data live di-cache** dengan TTL pendek (harga 3s, funding/overview 30-60s, TVL 5m). Panggilan berulang koin yang sama hampir instan.
- **LLM synthesis** menambah 8-9 detik (latency API). Pakai `--stream` agar jawaban mulai tampil lebih cepat, atau `--rule` untuk jawaban instan tanpa LLM.
- Query non-semantik (harga, funding, TVL, kategori, market cap) tidak butuh LLM dan sangat cepat setelah warm.

## Struktur modul

| File | Fungsi |
|---|---|
| `rag.py` | Router utama + orkestrasi tool + generator jawaban |
| `fetch_data.py` | Ambil data koin (CoinGecko): market cap, harga, kategori, histori |
| `index.py` | Bangun embedding + FAISS index koin |
| `knowledge_index.py` | Bangun FAISS index korpus pengetahuan |
| `realtime.py` | Agregator harga 6 bursa + order book + slippage |
| `stream.py` | Streaming harga Binance WebSocket |
| `history.py` | Candle OHLC historis + analisis tren (SMA) |
| `market.py` | Funding rate, OI, TVL, Fear & Greed, overview, movers |
| `onchain.py` | On-chain live: fee/mempool BTC, hashrate, stablecoin & SOL supply |
| `agent.py` | Tool-calling agent (LLM pilih tool untuk query multi-langkah) |
| `eval_rag.py` | Evaluasi kualitas retrieval (golden set, hit@k, MRR) |
| `alerts.py` | Parse alert + check kondisi harga |
| `portfolio.py` | Tracker holding + valuasi live |
| `symbols.py` | Normalisasi simbol lintas platform |
| `cache.py` | Cache TTL in-memory |
| `rerank.py` | Cross-encoder reranker |
| `llm.py` | Sintesis jawaban via LLM (OpenAI-compatible) |
| `common.py` | Util format, tokenisasi, HTTP helper (retry+429), trend_text |
| `enrich_categories.py` | Perkaya kategori koin per-kategori CoinGecko |
| `knowledge/*.md` | Korpus pengetahuan crypto (Bahasa Indonesia) |

## Sumber data

| Sumber | Data | API key |
|---|---|---|
| Binance (REST + WS) | harga spot, order book, funding, OI | tidak |
| OKX, Bybit, KuCoin, Kraken, Coinbase | harga spot | tidak |
| DefiLlama | TVL protokol & chain, supply stablecoin | tidak |
| alternative.me | Fear & Greed Index | tidak |
| Mempool.space + Blockchain.info | fee/mempool BTC, hashrate, transaksi | tidak |
| Solana RPC | supply SOL | tidak |
| CoinGecko | market cap, kategori, histori, global | tidak (free tier) |

## Catatan

- Bukan nasihat keuangan. Semua jawaban bersifat edukatif (DYOR).
- Data pasar bergantung ketersediaan bursa; koin tanpa stream trade (mis. delisted) memakai fallback REST.
