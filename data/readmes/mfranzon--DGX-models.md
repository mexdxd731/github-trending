# dgx-models

3D models of the DGX Spark and ASUS Ascent GX10 enclosure studies, plus a browser viewer for
looking at them.

<img width="924" height="917" alt="Screenshot 2026-08-04 alle 10 06 22" src="https://github.com/user-attachments/assets/935d6e97-a2a0-4afe-a1e8-0181fd7434a8" />


Ten models. Each ships as a binary glTF in `models/` and as the Blender file that authored it in
`source/`, so you can either drop the glb into your own scene or open the blend and change it.

```
npm install
npm run dev          # viewer at http://localhost:5173
```

## The catalogue

Triangle counts are instanced, matching what three.js reports after a traverse. Sizes are the
world-space bounding box in glTF axes. Every number here is produced by `npm run inspect` and
checked by `npm run verify`, so none of it is typed by hand.

| Model | Size (mm) | Triangles | glb | Rotors |
|---|---|---|---|---|
| `gx10` | 150 x 53.2 x 150.5 | 62,426 | 1.85 MB | 2 |
| `gx10-solo` | 172.6 x 106.5 x 180.8 | 22,236 | 0.65 MB | 2 |
| `gx10-case` | 156 x 112.7 x 304.8 | 70,278 | 2.06 MB | 3 |
| `gx10-case-4` | 156 x 311.9 x 304.8 | 263,772 | 6.88 MB | 9 |
| `gx10-case-ff` | 156 x 112.7 x 324.1 | 73,822 | 2.16 MB | 5 |
| `dgx-solo` | 172.6 x 105.5 x 184.8 | 55,122 | 1.44 MB | 2 |
| `dgx-rig-4node` | 418.7 x 231.5 x 263.9 | 630,907 | 22.34 MB | 6 |
| `dgx-rig-louvre` | 170 x 412.8 x 204.8 | 198,386 | 2.39 MB | 8 |
| `dgx-louvre-solo` | 171 x 187.4 x 205.2 | 58,944 | 1.54 MB | 2 |
| `dgx-flow` | 150 x 64 x 150.8 | 44,866 | 1.05 MB | 0 |

`dgx-rig-4node` is an outlier on every axis: it is the only model with cabling, third-party
hardware and a printable chassis in it, and it is 2.4x the triangle count of everything else
combined. Load it last if you are on a weak GPU.

## Viewer

One page, one stage, one catalogue. Adding a model is an entry in `src/models.js` and a file in
`models/`, never a new page.

| Key | Action |
|---|---|
| `[` `]` | previous / next model |
| `R` | reset to the hero view |
| `X` | x-ray, drops the enclosure to alpha |
| `W` | wireframe |
| `F` | rotors on / off |
| `T` | turntable |

State is in the URL, so a view is shareable: `?model=gx10-case-4&view=rear&xray=1`.

X-ray is only enabled for the three extraction-case models, because they are the only ones with
an enclosure worth seeing through. The button disables itself rather than doing nothing on the
others.

## Conventions

These matter if you are dropping a glb into your own scene.

**Axes.** Blender `(x, y, z)` became glTF `(x, z, -y)` on export. Every machine in the set faces
Blender `-Y`, so in the glb it faces `+Z`. Y is up.

**Floor.** Most models are authored with their feet at `y = 0`, but `dgx-rig-4node` sits 53.5 mm
above the origin. The viewer measures the bounding box and drops each model to the deck rather
than assuming, and warns in the console if what it measures disagrees with the manifest.

**Rotors.** Anything that spins is a node whose name ends in `_spin`, so `/_spin$/` finds all of
them. Beyond that the set uses three different conventions, which is why rotor handling is per
model data in `src/models.js` and not one regex:

- `dgx-rig-4node` carries `flow_spin_axis`, `flow_rpm` and `flow_role` in glTF node extras on
  each rotor's parent. Axis and rate are read out of the file. Bays 0 and 1 are 1800 rpm intake
  blowers; bays 2 and 3 are 3200 and 2800 rpm rear exhaust pairs.
- The GX10 case models use `[L<level>_]Cool_node_fan_<group>_<k>_spin`, where group 0 is a
  machine's own blowers, group 1 is the case cap's single 140 mm rotor and group 2 is the
  front-fan variant's pair. The level prefix exists so `/_spin$/` still matches in the four-high
  model. Group 2 turns about local Z, because those rotors are stood upright by their parent
  empty's own rotation.
- Everything else spins uniformly. The Spark's fans turn about Z, the GX10's about Y.

**Rotor rates are not physical.** They are display rates in rad/s, carried over from the viewers
these models were originally built for. The real cap rotor turns at about 450 rpm and the
front-fan variant's at about 4500, and animating either at true rate would strobe or blur at
60 fps. What is preserved is the ratio between families, because on the extraction case that
ratio is the acoustic argument. Two entries are marked `inferred` in the manifest: the louvre
models were never animated in the original viewer, so their axis and rate are taken from
`dgx-solo` on the grounds that it is the same hardware.

**Materials are flatter than the renders.** The anodising in the original Cycles stills is two
noise scales driving roughness and a few-micron bump. glTF has no procedural textures, so the
exporter was handed flat constants. That is a property of the format, not a regression.

## Re-exporting

The blends in `source/` are outputs of the scripts in `source/scripts/`, which build each scene
from scratch rather than editing it in place. To rebuild one:

```
/Applications/Blender.app/Contents/MacOS/Blender -b -P source/scripts/author_gx10_case.py -- --glb
```

Then update the manifest and confirm nothing drifted:

```
npm run inspect      # prints measured metadata for every model
npm run verify       # checks src/models.js against the files, exits non-zero on drift
```

`npm run verify` is the thing to run before committing. It re-derives every measured field from
the glb, and also checks the claims the viewer depends on but cannot see for itself: that each
declared source blend exists, that the rotor count matches the number of `_spin` nodes actually
in the file, that a model claiming the `extras` rotor rule really carries usable `flow_rpm`, that
the x-ray material names exist, and that no glb in `models/` is missing from the manifest.

## Large files

`.glb`, `.blend` and `.hdr` are tracked with Git LFS, set up in `.gitattributes`. You need
`git lfs install` once on a new machine before cloning, or you will get pointer text files
instead of models.

## Layout

```
models/           the ten glb. The product of this repo.
source/           the ten .blend that author them
source/scripts/   the Blender scripts that build the blends
src/
  main.js         the viewer app
  stage.js        renderer, environment, lamps, shadow, AO, view presets
  models.js       the catalogue, with measured metadata and rotor rules
tools/
  inspect_glb.mjs reads a glb's JSON chunk directly, no three.js needed
  verify_manifest.mjs
public/
  studio.hdr      environment map, optional: the viewer falls back to a gradient
```

## Provenance

These models were authored for a DGX Spark and GX10 enclosure study, which also holds the
airflow work, the LBM solve and the written cooling argument. That project keeps its own copies
in `public/`; this repo is a standalone extraction and does not modify it.

Two things were deliberately left behind: `dgx-rig-4node.pre-realism.glb` and its blend, which
are a superseded earlier pass referenced by nothing, and the third-party reference CAD (Apple's
Mac mini STEP, an NVIDIA DGX Spark STL, press photography) which has its own licensing and is
not ours to redistribute.

The models here are original work. The `dgx-rig-4node` scene contains geometry derived from
third-party reference CAD for the Mac mini and the AMD Halo box; if you plan to redistribute
that model, check where those came from first.
