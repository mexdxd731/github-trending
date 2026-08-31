# 🎬 LAST FRAME

**A playable film.** Every shot is generated as you watch — and the video
model is the dice: **whatever happens on screen is what happened**, whatever
you intended. You asked to leap the chasm; the frame shows you dangling from
the ledge by one hand? That's what happened. Take the damage.

Powered by [fal](https://fal.ai) + [MiniMax H3 Max](https://fal.ai/models/minimax/h3-max/text-to-video),
a video model faster than realtime, which makes a *game* rendered by a video
model possible: choices pre-film while you decide, so picking one plays
instantly.

## The rules

- **100 vitality, one life.** The Adjudicator — a vision LLM that watches
  every shot's final frame — rules on what it *sees* and charges you for it.
  Every HP change carries an evidence still of the frame that justified it.
- **Three choices per beat, or type your own.** The three options pre-film
  in parallel while you read them (watch the tape labels go `filming` →
  `in the can`). Typed moves are refereed against the current frame and
  risky ones roll a visible d20 — the roll decides whether the success or
  the failure shot gets filmed.
- **Hesitate and the world moves.** The choice timer is real. Let it run
  out and the world takes its own shot — never in your favor.
- **What you see is what you take.** Objects your hero visibly grabs become
  inventory cards (with the frame they came from). An item is a stored
  prompt fragment: arm one and it is written into your next shot, guaranteed.
- **Win on screen.** Each world has a goal the Adjudicator must *see*
  accomplished. Death gets a final generated cinematic; either way you get
  the full timeline of your run, shot by shot, with every roll and wound.

## Quick start

```bash
npm install
cp .env.example .env.local   # put your fal API key in it
npm run dev
```

Get a key at [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys). Open
[http://localhost:3000](http://localhost:3000) and pick a world.

## How it works

```
opening (t2v) ──► play ──► ADJUDICATOR rules on the last frame
                   │            (during playback: zero wall-clock)
                   ▼
             freeze-frame choice phase ── 3 branches pre-film in parallel
                   │                          (i2v from the same frame)
        pick / type / timeout
                   ▼
             chosen shot plays (usually already in the can) ──► loop
```

- **Continuity is the frame, novelty is the text.** Every shot chains from
  the previous shot's last frame (`image_url`), so the film never breaks;
  prompts only ever describe *change*.
- **The Adjudicator** (Gemini Flash Lite via fal's vision router) returns
  strict JSON per shot: scene ground truth, narration, HP delta + reason,
  items gained/lost, a ≤60-word synopsis of completed facts, death/victory
  flags, the next three options, and the world's move if you stall. It runs
  while the clip plays, so verdicts are free.
- **The Referee** judges typed actions against the frame: risk tier
  (safe / risky ≥8 / deadly ≥13 on a d20) plus a success shot and a failure
  shot. Moderation (strict ALLOW/BLOCK, injection-hardened, fail-closed)
  runs in parallel server-side.
- **Branch pre-generation** is the trick that makes it feel like a game:
  the choice phase *is* the generation window. All three branches fan out
  in parallel from the frozen frame; a pick lands instantly.
- Your `FAL_KEY` stays server-side (`@fal-ai/server-proxy`), and clips
  stream through a same-origin media proxy so canvas frame grabs never hit
  CORS.

## Cost note

A run films ~3 branch clips per choice plus one shot that plays, at 480P /
10s each, plus two small LLM calls per beat. Keep an eye on your fal usage —
dying is the cheapest way to stop.
