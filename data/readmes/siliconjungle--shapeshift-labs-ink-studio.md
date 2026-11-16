# @shapeshift-labs/ink-studio

A JavaScript toolkit for sculpting signed-distance solids, baking them into pixel-art Gaussian splats, and making them move, react, break, grow and remember what happened to them. Use it from Node, drive it through the `ink-studio` command, or embed the source bundle in an Inkwell or browser application.

The package includes geometry, materials, lighting, animation, character controls, particles, physics, procedural environment tools and a headless renderer. Scene authors can use JavaScript or JSON. A host application supplies its own interactive viewport and editor interface.

## Contents

- [Install and run](#install-and-run)
- [First sculpted scene](#first-sculpted-scene)
- [Using the library in Node](#using-the-library-in-node)
- [Scene lifecycle and splat data](#scene-lifecycle-and-splat-data)
- [Geometry and materials](#geometry-and-materials)
- [Scenes as JSON](#scenes-as-json)
- [Animation and puppets](#animation-and-puppets)
- [Particles and interaction](#particles-and-interaction)
- [Physics and persistent effects](#physics-and-persistent-effects)
- [Importing meshes](#importing-meshes)
- [Procedural worlds](#procedural-worlds)
- [Rendering and command reference](#rendering-and-command-reference)
- [Embedding and custom scene collections](#embedding-and-custom-scene-collections)
- [Module reference](#module-reference)
- [Validation and development](#validation-and-development)

## Install and run

Requires **Node 18 or later**. There are no declared runtime dependencies. This is a private package; the scoped package name does not mean it has been published to a package registry.

From a checkout:

```sh
node cli/ink-studio.js help
node cli/ink-studio.js scenes
node cli/ink-studio.js render watcher --t 2.6
node cli/ink-studio.js render watcher --t 2.6 --colored
npm test
```

Install from GitHub with credentials that can read the private repository:

```sh
npm install github:siliconjungle/shapeshift-labs-ink-studio
npx ink-studio help
```

To install a local checkout into another project:

```sh
npm install /absolute/path/to/ink-studio
npx ink-studio help
npx ink-studio render watcher --colored
```

The installed package is named `@shapeshift-labs/ink-studio`; its executable remains `ink-studio`. A private Git repository install requires Git access to that repository. The `private` setting prevents accidental registry publication.

Generated pictures normally go into `studio/out/`. Image baselines go into `studio/snaps/`. Use `--out file.png` for an explicit output path, or configure the directories with `ink-studio.config.js`.

The examples below use `npx ink-studio` from a consuming project. In this checkout, replace that prefix with `node cli/ink-studio.js`.

## First sculpted scene

Save this as `model.js`. A JavaScript scene exports a function receiving the toolkit and returning `{ id, name, seed, build(seed) }`. `build` returns the finished world.

<!-- include: examples/sculpt.js -->

```js
module.exports = ({ makeBuilder, makeSculpt, KIT: K }) => ({
  id: 'sculpt-example',
  name: 'Carved stone',
  seed: 7,
  build(seed) {
    const palette = [0x080b10, 0x26313d, 0x566778, 0x9baeb8, 0xe5e9dc, 0x387548, 0x8fc75e];
    const B = makeBuilder(seed, palette);
    const S = K.sculpt(makeSculpt(B));
    const stone = { r: [1, 2, 3, 4] };

    S.ground({ r: [1, 1, 2] }, { rad: 4, res: 0.18 });
    S.box([0, 1.2, 0], [1, 1.2, 1], stone, { res: 0.12 });
    S.ball([0, 1.4, 0.9], 0.65, stone, { neg: true });
    S.ball([0, 2.7, 0], 0.5, { r: [1, 5, 6] }, { res: 0.1 });
    S.bake();

    return B.finish({
      cam: { target: [0, 1.4, 0], dist: 12, pitch: 0.2, yaw: 0.45 },
      detail: 14,
      dither: 0.25,
      radius: 5
    });
  }
});
```

Render it without opening a browser:

```sh
npx ink-studio render model.js --colored
npx ink-studio turn model.js --n 8
npx ink-studio stats model.js
```

The same runnable scene is included as [examples/sculpt.js](examples/sculpt.js). Position vectors use `[x, y, z]`, with Y up. `S.box` takes half-extents, so `[1, 1.2, 1]` makes a box 2 units wide, 2.4 high and 2 deep. `res` is the surface sampling spacing: smaller values generally create more splats and cost more to bake and render.

## Using the library in Node

```js
const studio = require('@shapeshift-labs/ink-studio');
const { makeBuilder, makeSculpt, KIT: K, SCENES } = studio.load();

const B = makeBuilder(7);
const S = K.sculpt(makeSculpt(B));
S.ball([0, 1, 0], 1, { r: [1, 2, 3, 4] }, { res: 0.15 });
S.bake();
const world = B.finish({
  cam: { target: [0, 1, 0], dist: 10, pitch: 0.2, yaw: 0.4 },
  detail: 14
});

console.log(world.count, world.data instanceof Float32Array);
console.log(SCENES.map(scene => scene.id));
```

`makeSculpt(B)` creates the base sculptor. `K.sculpt(...)` adds the toolkit's extended shape operations. `load()` compiles and caches a concatenated CommonJS bundle in the package's `dist/standalone.js`; it needs a writable package directory on first use or after source changes.

The package entry point exposes:

| Export | Result / purpose |
| --- | --- |
| `load()` | `{ makeBuilder, makeSculpt, KIT, SCENES, PixelLook, VOX, ... }` ready for Node. |
| `files()` | Absolute source paths in dependency order. |
| `demoFiles()` | Absolute demo source paths. |
| `bundle()` | Toolkit source as one script string, without demo scenes. |
| `demos()` | Demo source that appends to an existing `SCENES` array. |
| `readMesh(file)` | Read an OBJ, glTF or GLB file and its supported companion files. |
| `lint(files)` | Return lines rejected by the source comment guard. |
| `EXPORTS` | Comma-separated names defined by the source bundle. |
| `version` | Package version string. |

`load()` also exports `basis`, `flame`, `motes`, `pondMat`, `lilies`, `courses`, `PALETTES` and `PAL_HEX`. Use the `KIT` namespace for the main authoring APIs.

## Scene lifecycle and splat data

1. Create the builder and sculptor with a stable seed and palette.
2. Install hooks such as a rig, light capture or deformation tags **before** baking the solids they must capture.
3. Add solids and call `S.bake()` to sample their surfaces, light them and write splats.
4. Allocate particle pools, cloth, hair and other systems that emit splats **before** `B.finish()` fixes the world's data span.
5. Finish with camera and rendering metadata.
6. Attach a stage, puppet or other animation driver to the finished world.

Bake static scenery before adding moving objects when scenery should not contain holes or baked shadows from those moving objects. The puppet example uses this pattern.

A world includes `data`, `count`, `pal`, `seed`, rendering metadata, and optionally `anim`. `data` is a `Float32Array` with **16 floats per splat**:

```text
[x, y, z, density]
[c00, c01, c02, packedRGB]
[c11, c12, c22, kind]
[phase, speed, range, extra]
```

The `c` values encode a symmetric covariance matrix describing the splat's shape. Use toolkit systems to modify the data when possible so covariance, color and changed-row tracking stay consistent.

`K.stage(world)` installs `world.anim`. Systems run in the order added; painters combine color effects in their own addition order. A stage normalizes its clock to its first update and clamps individual simulation steps to 0.05 seconds. For reproducible simulation, initialize at zero and use fixed forward steps:

```js
const { KIT: K, SCENES } = require('@shapeshift-labs/ink-studio').load();
const scene = SCENES.find(scene => scene.id === 'burn');
const world = scene.build(scene.seed);
world.anim.update(0, 0);
for (let frame = 1; frame <= 120; frame++) {
  world.anim.update(1 / 60, frame / 60);
}
```

Stateful worlds need their intervening simulation steps. Rebuild them to return to an earlier time. Pure clips can be sampled directly at arbitrary times. The CLI handles forward stepping and bone projection for rendered animation.

## Geometry and materials

The core sculptor provides `ball`, `box`, `lathe`, `torus`, `tube`, `rock`, `ground` and vegetation helpers. The extended sculptor adds joins, folds, warps, shells, extrusion, revolution, text, grid operations and other modeling tools.

This complete scene cuts a cylindrical opening through a box. `hold: true` creates operands without emitting them as separate visible solids; the join emits the combined result.

```js
module.exports = ({ makeBuilder, makeSculpt, KIT: K }) => ({
  id: 'arch-example', name: 'Carved arch', seed: 1,
  build(seed) {
    const B = makeBuilder(seed);
    const S = K.sculpt(makeSculpt(B));
    const material = { r: [1, 2, 3, 4] };
    const held = { hold: true };
    const block = S.box([0, 1, 0], [1.2, 1, 0.45], material, held);
    const opening = S.tube([[0, 0.7, -1], [0, 0.7, 1]], 0.65, 0.65, material, held);
    S.join('cut', block, opening, { res: 0.12 });
    S.bake();
    return B.finish({
      cam: { target: [0, 1, 0], dist: 10, pitch: 0.2, yaw: 0.4 },
      detail: 14
    });
  }
});
```

Useful options include `tag` for ownership, `neg` for subtraction, `ghost` for geometry that is drawn without ordinary solid occlusion, and `ax` for an orientation frame. Join kinds include `union`, `cut`, `common`, `round`, `chamfer`, `stairs`, `columns`, `pipe`, `engrave`, `groove` and `tongue`.

Materials normally use palette indices in a dark-to-light ramp:

```js
const stone = { r: [1, 2, 3, 4] };
const glow = { r: [5, 6, 7], em: true };
const bands = { r: [1, 2, 3, 4], mod: K.tex.range(K.tex.wave(5), 0, 1, -0.2, 0.2) };
const wax = K.look.wax([1, 2, 3, 4], { depth: 0.5 });
const jelly = K.look.jelly([5, 6, 7], { depth: 1.3, k: 0.85 });
const glass = K.look.glass([2, 3, 4], { a: 0.085 });
const fur = K.look.fur([1, 2, 3, 4], { len: 0.2, droop: 0.3 });
```

This fragment assumes an existing `K` namespace and a palette containing every referenced index. Material callbacks can choose ramps, shift tones or color individual surface points. Patterns include noise, Voronoi cells, waves, bricks, checkers and gradients. Surface attributes can drive wear, grime, root shading and coats of material.

See [lab/shapes.js](lab/shapes.js) and [lab/warps.js](lab/warps.js) for complete shape galleries. The [Night Cabinet demo](demos/labscenes.js) combines glass, translucency, fur and smoke.

## Scenes as JSON

JSON scenes describe materials by role, then a style maps each role to a palette. Built-in styles are `slate`, `moss` and `ember`.

<!-- include: examples/scene.json -->

```json
{
  "id": "json-example",
  "name": "Floating gem",
  "seed": 2,
  "style": "moss",
  "camera": { "target": [0, 1.5, 0], "dist": 12, "pitch": 0.2, "yaw": 0.4 },
  "solids": [
    { "kind": "ground", "mat": "earth", "rad": 4, "res": 0.2 },
    { "kind": "ball", "at": [0, 1.8, 0], "r": 0.7, "mat": "accent", "part": "gem", "res": 0.12 }
  ],
  "parts": { "gem": { "joint": [0, 1.8, 0] } },
  "motion": [
    { "do": "spin", "part": "gem", "axis": [0, 1, 0], "speed": 0.8 },
    { "do": "bob", "part": "gem", "amount": 0.2, "period": 3 }
  ],
  "tap": { "do": "sparks", "colours": "glow", "n": 12 }
}
```

```sh
npx ink-studio validate examples/scene.json
npx ink-studio render examples/scene.json --t 1.5
npx ink-studio render examples/scene.json --style ember --t 1.5
npx ink-studio clip examples/scene.json --from 0 --to 3 --fps 12
```

Programmatic validation returns all diagnosed problems rather than only the first one:

```js
const { KIT: K } = require('@shapeshift-labs/ink-studio').load();
const spec = {
  id: 'small-scene', name: 'Stone', seed: 1, style: 'slate',
  camera: { target: [0, 1, 0], dist: 10, pitch: 0.2, yaw: 0.4 },
  solids: [{ kind: 'ball', at: [0, 1, 0], r: 1, mat: 'stone', res: 0.15 }]
};
const problems = K.diorama.check(spec);
if (problems.some(problem => problem.level === 'error')) {
  throw new Error(K.diorama.report(problems));
}
const world = K.diorama.build(spec);
console.log(world.count);
```

`K.diorama.scene(spec)` wraps a specification as a scene with a `build` method. `K.diorama.kinds` exposes the supported solid fields, and `K.diorama.styles` exposes style definitions. Programmatic mesh assets go in the second argument as `{ assets: { name: mesh } }`.

The larger [lab/data-shrine.json](lab/data-shrine.json) demonstrates joins, folded and warped geometry, parented parts, lights, particles and tap effects.

## Animation and puppets

Use `K.rig` for tagged rigid parts, `K.creature` for a creature rig, and `K.puppet` for hierarchical parts with deformation. `K.anim` provides clips, easing, layers, state machines, constraints, facial controls and presentation cues. `K.acts` provides ready-made action and reaction clips.

<!-- include: examples/puppet.js -->

```js
module.exports = ({ makeBuilder, makeSculpt, KIT: K }) => ({
  id: 'puppet-example',
  name: 'Celebrating puppet',
  seed: 3,
  build(seed) {
    const B = makeBuilder(seed);
    const S = K.sculpt(makeSculpt(B));
    S.ground({ r: [1, 1, 2] }, { rad: 4, res: 0.2 });
    S.bake();

    const tags = K.deform.tags(S);
    S.ball([0, 1, 0], [0.55, 1, 0.55], { r: [1, 2, 3, 4] }, { tag: 'body', res: 0.12 });
    S.ball([0, 2.25, 0], 0.4, { r: [5, 6, 7] }, { tag: 'head', res: 0.1 });
    S.bake();

    const W = B.finish({
      cam: { target: [0, 1.5, 0], dist: 12, pitch: 0.15, yaw: 0.4 },
      detail: 14,
      dither: 0.25
    });
    const clip = K.acts.clip('victory', { part: 'body', unit: 0.01 });
    K.puppet(W, {
      react: true,
      parts: {
        body: { ids: tags.body, pivot: [0, 0, 0], slices: 6 },
        head: { ids: tags.head, pivot: [0, 2, 0], parent: 'body' }
      },
      pose(t, dt, puppet) {
        clip.sample(t % 2, puppet.pose);
        puppet.look('head', [3, 2, 2], { limit: 45 });
      }
    });
    return W;
  }
});
```

```sh
npx ink-studio render examples/puppet.js --t 0.6
npx ink-studio sheet examples/puppet.js --from 0 --to 2 --n 8
npx ink-studio ghost examples/puppet.js --t 0.6 --spacing 0.12 --n 2
npx ink-studio acts
```

Clips can also be sampled as plain pose data, independently of a world:

```js
const { KIT: K } = require('@shapeshift-labs/ink-studio').load();
const clip = K.anim.clip({
  dur: 2,
  loop: true,
  tracks: {
    'head.rot': [[0, [0, 0, 0]], [1, [0, 30, 0], 'out-back'], [2, [0, 0, 0]]]
  }
});
const pose = {};
clip.sample(0.5, pose);
console.log(pose.head.rot);
```

Clip pose rotations use degrees; matrix rotations and many geometry options use radians. Check the relevant module's opening API comment before combining the two.

Additional animation APIs include `K.anim.machine`, `K.anim.face`, `K.anim.path`, `K.anim.steer`, `K.anim.track` and `K.anim.support`. Deformation maps include body squash/stretch, noodles, folds, lattices, morphs, smears, reaction fields, foliage and line boil. Apply maps on the CPU with `K.deform.apply`, or use puppet/bone skinning with an appropriate host renderer.

`K.character(B, spec, lane)` creates an input-driven character with movement, running, jumping, dashing, attacks, casting and crouching. Its specification supplies geometry and rig points; it is a toolkit for authoring a character, rather than a bundled cast of character assets. The API is documented at the top of [kk-character.js](src/kit/kk-character.js).

## Particles and interaction

Allocate a pool before finishing the world. Then attach particles and emission systems to a stage:

<!-- include: examples/particles.js -->

```js
module.exports = ({ makeBuilder, makeSculpt, KIT: K }) => ({
  id: 'particles-example',
  name: 'Embers in a current',
  seed: 4,
  build(seed) {
    const B = makeBuilder(seed);
    const S = K.sculpt(makeSculpt(B));
    S.ground({ r: [1, 1, 2] }, { rad: 4, res: 0.2 });
    S.ball([0, 0.4, 0], 0.4, { r: [5, 6, 7], em: true }, { res: 0.12 });
    S.bake();

    const pool = K.pool(B, 160);
    const W = B.finish({
      cam: { target: [0, 1.2, 0], dist: 12, pitch: 0.2, yaw: 0.4 },
      detail: 14,
      dither: 0.25
    });
    const stage = K.stage(W);
    const particles = stage.add(K.particles(stage, pool, {
      flow: K.flow.sum(K.flow.wind([0.3, 1, 0]), K.flow.curl(1, 0.4)),
      ground: () => 0
    }));
    let next = 0;
    stage.add({
      update(dt, t) {
        if (t >= next) {
          particles.embers([0, 0.6, 0], 3, [6, 7, 5]);
          next = t + 0.1;
        }
      },
      poke(hit) {
        if (hit) particles.sparks(hit.p, 16, [7, 6, 5]);
      }
    });
    return W;
  }
});
```

```sh
npx ink-studio clip examples/particles.js --from 0 --to 2 --fps 12
npx ink-studio render examples/particles.js --t 1.2 --poke '1:0,0.4,0'
```

A stage's `poke(eye, direction)` picks the surface and dispatches the result to systems with a `poke` method. `--poke` scripts the same interaction for headless commands; separate multiple timed taps with semicolons and quote the entire value.

Particle helpers include `dust`, `sparks`, `embers`, `smoke`, `chips`, `ring`, `bolt` and `rain`. `emit` exposes velocity, lifetime, gravity, drag, size, palette colors and flow response. Flow fields can combine wind, curl, vortices and sinks; `K.flow.around(flow, sdf, margin)` turns a current along solid boundaries.

## Physics and persistent effects

There are several simulation levels:

| API | Use |
| --- | --- |
| `K.breaker`, `K.rubble`, `K.debris` | Breaking, unsupported pieces, falling rubble and loose fragments. |
| `K.jelly`, `K.sand` | Lightweight shape deformation or granular motion. |
| `K.mpm` | A material-point solver for elastic jelly, yielding clay, granular sand and water. |
| `K.inside` | Interior splats revealed by bites and cuts. |
| `K.xpbd.sim`, `K.cloth`, `K.hair` | Constraint-based points, cloth and groomed strands with pins, collisions and wind. |
| `K.xpbd.rope`, `K.xpbd.carry`, `K.xpbd.blades` | Ropes, chains, objects carried by simulated points, kelp and reeds. |
| `K.voxels` | Persistent per-cell channels, spreading fire/frost/growth, and support queries. |

A complete cloth scene:

<!-- include: examples/cloth.js -->

```js
module.exports = ({ makeBuilder, makeSculpt, KIT: K }) => ({
  id: 'cloth-example',
  name: 'Cloth in the wind',
  seed: 1,
  build(seed) {
    const B = makeBuilder(seed);
    const S = K.sculpt(makeSculpt(B));
    S.ground({ r: [1, 1, 2] }, { rad: 4, res: 0.2 });
    S.bake();

    const cloth = K.cloth(B, {
      at: [-1, 3, 0],
      u: [2, 0, 0],
      v: [0, -2, 0],
      nu: 12,
      nv: 10,
      pins: (i, j) => j === 0,
      wind: K.xpbd.gust([2, 0, 1]),
      pattern: (u, v) => (Math.floor(u * 6) + Math.floor(v * 6)) % 2 ? [1, 2, 3] : [5, 6, 7],
      sdf: S.sdf
    });
    const W = B.finish({
      cam: { target: [0, 1.5, 0], dist: 12, pitch: 0.2, yaw: 0.5 },
      detail: 14,
      dither: 0.25
    });
    K.stage(W).add(cloth);
    return W;
  }
});
```

```sh
npx ink-studio render examples/cloth.js --t 1
npx ink-studio clip stuff --from 0 --to 3 --fps 12
npx ink-studio render idol --t 2 --poke '1:0,2,0'
```

For persistent effects, use an existing sculpted `S` and finished world's `stage`:

```js
const voxels = K.voxels(stage, { cell: 0.4, sdf: S.sdf });
stage.add(voxels.fire({ look: { flame: [6, 7], soot: [1] } }));
stage.add(voxels.frost({ look: { pale: [3, 4] } }));
voxels.brush('heat', [0, 1, 0], 0.8, 1);
const heat = voxels.get('heat', 0, 1, 0);
```

The channels are created on demand. Fire behavior depends on the sampled scene's fuel/material properties. See `burn` for fire and frost, `idol` for destruction, `bench` for the lightweight solvers, and `stuff` for the material-point solver.

## Importing meshes

```sh
npx ink-studio mesh lab/assets/totem.obj --size 5 --cells 64 --res 0.1
npx ink-studio turn lab/mesh.js --n 8
npx ink-studio render model.glb --size 6 --up z
```

Programmatic import:

```js
const studio = require('@shapeshift-labs/ink-studio');
const { makeBuilder, makeSculpt, KIT: K } = studio.load();
const mesh = K.mesh.fit(studio.readMesh('lab/assets/totem.obj'), { size: 5 });
const look = K.mesh.look(mesh, { hues: 5, shades: 4 });
const B = makeBuilder(1, look.pal);
const S = K.sculpt(makeSculpt(B));
S.mesh(mesh, look, { cells: 64, res: 0.1 });
S.bake();
const world = B.finish({
  cam: { target: [0, 2.5, 0], dist: 15, pitch: 0.2, yaw: 0.4 },
  detail: 14
});
console.log(world.count);
```

The file example assumes the current working directory is this repository. OBJ supports a companion MTL; glTF supports companion buffers; GLB is read from binary data. Material and vertex colors become palette ramps. Texture images are not imported. Open meshes become sheets with thickness. Imported geometry becomes a distance-field solid, so it can join, be carved, receive materials and break like authored geometry.

## Procedural worlds

The environment tools produce normal solids, placements or stage systems, so their outputs use the same lighting, tags and interaction APIs:

- `K.curve` and `K.sweep`: paths, ribbons, leaves, planks and swept profiles.
- `K.grow`: surface-aware scattering, branching, species variation, instancing, rocks, creepers and spreading patches.
- `K.form`: crystals, geodes, basalt columns, stalactites, flowstone, icicles, layered rock, plants and creature parts.
- `K.erode`: hydraulic erosion and thermal slides over a height field.
- `K.fracture`: Voronoi fracture cells with placement and settling helpers.
- `K.build`: fitted pillars, fences, stairs, arches and pipes; recipes and attachment sockets.
- `K.weather`: falling rain, snow and leaves; `K.form.drifts` and `K.form.frost` add accumulated snow and frost patterns.
- `K.flock`: birds, fish and fireflies; `K.morph` blends two splat shapes over time.

For example, in a scene with `K`, `S` and a suitable palette:

```js
const places = K.grow.scatter(S, { disc: [0, 0, 4], n: 12, gap: 0.6, seed: 8 });
const species = K.grow.species({
  name: 'stone',
  vary: { size: [0.15, 0.4] },
  make(S, at, values) {
    S.ball(at, values.size, { r: [1, 2, 3, 4] }, { res: 0.12 });
  }
});
species.sow(S, places);
S.bake();
```

Each module opens with signatures and option descriptions. Use `ink-studio catalog <words>` to locate an existing feature, then follow its `where` field to the implementation.

## Rendering and command reference

| Command | Purpose |
| --- | --- |
| `help` | Print supported commands and options. |
| `scenes` | List scenes from the default demos or configured collection. |
| `catalog [words] [--full]` | Search feature names, descriptions and tags. |
| `acts` | List action clips, reactions, easing names and cues. |
| `render <scene> --t 1.5` | Render one PNG at a chosen time. |
| `sheet <scene> --from 0 --to 3 --n 12` | Make a labeled sheet of animation frames. |
| `turn <scene> --n 8` | Make a sheet from multiple viewing angles. |
| `clip <scene> --from 0 --to 3 --fps 12` | Save an animated PNG. |
| `ghost <scene> --t 1 --spacing 0.12 --n 2` | Overlay neighboring animation poses. |
| `mesh <file.obj\|.gltf\|.glb>` | Import, inspect and render a mesh from multiple angles. |
| `validate <file.json>` | Report scene-data errors and suggestions. |
| `ramps <scene>` | Inspect the scene's color ramps. |
| `values <scene>` | Check readability in dark, middle and light tones. |
| `stats <scene>` | Report splat counts, extents, palette use, build and animation costs. |
| `perf <scene> --secs 5 --fps 60` | Measure animation work and changed-data upload estimates. |
| `motion <scene> --from 0 --to 3` | Inspect speed, jumps, low points, still regions and loop error. |
| `snap <scene\|all> --t 0,2` | Save exact rendered baselines. |
| `check [scene ...]` | Re-render and compare to saved baselines. |
| `selftest` | Run numerical toolkit and demo checks. |

`<scene>` can be a built-in scene ID, a JavaScript scene file, a JSON scene file or a supported mesh file. The built-in IDs are `watcher`, `burn`, `idol`, `bench`, `stuff`, `cabinet` and `rehearsal`.

Common rendering controls:

| Option | Effect |
| --- | --- |
| `--t`, `--from`, `--to`, `--n`, `--fps` | Time, frame count and sampling rate, depending on command. |
| `--yaw`, `--pitch`, `--zoom`, `--target x,y,z` | Camera controls; angles are radians. |
| `--w`, `--h`, `--out` | Output viewport size and destination. The renderer resolves a lower-resolution pixel grid derived from the scene's detail settings. |
| `--seed` | Override the scene seed. |
| `--colored` | Use palette-aware smoothing of silhouettes and body-colored contours. |
| `--raw` | Bypass palette styling. |
| `--fine` | Bake surface detail tiles for per-pixel color lookup. |
| `--bounce` | Bake indirect lighting. |
| `--focus x,y,z,near,far,coarse` | Concentrate surface detail around a point. |
| `--follow` | Align splat shapes along the surface form. |
| `--clean` | Remove isolated pixels in the final pass. |
| `--style slate\|moss\|ember` | Change a JSON scene's style. |
| `--poke '1:x,y,z;2:x,y,z'` | Script timed taps into a simulated scene. |

The default look uses palette quantization and dithering. `--colored` preserves native interior detail while smoothing silhouettes; it does not fit a new palette every frame. `PixelLook` exposes shared CPU and shader helpers for hosts implementing the same look.

## Embedding and custom scene collections

The browser-facing toolkit sources are plain scripts concatenated in dependency order. Generate a bundle from Node:

```js
const fs = require('node:fs');
const studio = require('@shapeshift-labs/ink-studio');
fs.writeFileSync('ink-studio.browser.js', studio.bundle());
```

The bundle defines `makeBuilder`, `makeSculpt`, `KIT`, `PixelLook` and the other names in `studio.EXPORTS` in script scope. It includes no DOM interface or complete interactive WebGL viewport. A host supplies rendering, calls `world.anim.update(dt, time)`, handles input, and uses changed-row and bone data as appropriate. The included software renderer is used by the CLI.

To append the demos to a browser script, write `const SCENES = [];` after the toolkit bundle and append `studio.demos()`. Keep source files in the order returned by `files()` when embedding individually.

For a consuming project's own scene collection, save `ink-studio.config.js` in that project's working directory:

```js
module.exports = {
  load() {
    const kit = require('@shapeshift-labs/ink-studio').load();
    return { ...kit, SCENES: [require('./model.js')(kit)] };
  },
  out: 'studio/out',
  snaps: 'studio/snaps'
};
```

Then `ink-studio scenes`, `render`, `snap` and other commands operate on that collection. The load callback returns the toolkit exports alongside `SCENES`.

## Module reference

| File in `src/` | Main responsibilities |
| --- | --- |
| `builder.js` | Seeded generation, palettes, low-level splat emission and world buffers. |
| `sculpt.js` | Base distance-field solids, materials, surface attributes, sampling and baking. |
| `pixel-look.js` | Palette-aware pixel resolve and shader helpers. |
| `kit/k0-math.js` | Vectors, matrices, easing, keyed values and springs. |
| `kit/k1-stage.js` | Stage, painter stack, rigs, pools, selection, sockets and bones. |
| `kit/k2-motion.js` | Spines, IK, clips, state machines, ropes and gait. |
| `kit/k3-shapes.js` | Joins, folds, warps, outlines, extrusion and revolution. |
| `kit/k4-art.js` | SVG/pixel artwork on solid faces. |
| `kit/k5-fields.js` | Spatial fields, tint, displacement, reveal and grading. |
| `kit/k6-voxels.js` | Persistent channels, fire, frost, growth and support detection. |
| `kit/k7-particles.js` | Particles, emitters and flow fields. |
| `kit/k8-light.js` | Captured lighting, moving lamps, shadows and relighting. |
| `kit/k9-matter.js` | Support, rubble, debris, breaking, jelly and sand. |
| `kit/ka-build.js` | Fitted procedural construction and sockets. |
| `kit/kb-mesh.js` | Mesh readers, fitting, palette conversion and mesh solids. |
| `kit/kc-data.js` | JSON scene schema, validation, styles and building. |
| `kit/kd-mpm.js` | Material-point simulation and interior filling. |
| `kit/ke-volume.js` | Translucency, glass, fur, smoke, mist and light shafts. |
| `kit/kf-creature.js` | Creature rigging. |
| `kit/kg-play.js` | Gameplay particles, debris and ground ecology. |
| `kit/kh-animate.js` | Pose clips, layers, machines, controls, faces and presentation. |
| `kit/ki-deform.js` | Point maps, skinning, puppets and constraints. |
| `kit/kj-acts.js` | Action clips, reactions, impact timing and secondary motion. |
| `kit/kk-character.js` | Controllable characters, combat and animation overlays. |
| `kit/kl-vox.js` | Letter-grid model authoring. |
| `kit/km-ramp.js` | Palette ramp construction and hue shifts. |
| `kit/kn-effects.js` | Window light, reflections, shatter and dissolve. |
| `kit/ko-grow.js` | Scattering, species, branching, instancing and iterative growth. |
| `kit/kp-curve.js` | Curve construction, sampling and sweeping. |
| `kit/kr-tex.js` | Procedural texture fields and remapping. |
| `kit/ks-xpbd.js` | Constraint solver, cloth, hair and wind. |
| `kit/kt-nodes.js` | Text, engraving, displacement and distance-grid processing. |
| `kit/ku-motion.js` | Simulated ropes, chains, carried objects, blades, flocks and morphing. |
| `kit/kv-form.js` | Crystals, geodes, columns and cave formations. |
| `kit/kw-erode.js` | Fracture, erosion, strata, mud and loose stone. |
| `kit/kx-life.js` | Plants, shells, horns, antlers, ribs, feathers, scales and tentacles. |
| `kit/ky-built.js` | Masonry walls, worn steps and fences. |
| `kit/kz-weather.js` | Falling weather, snowdrifts and frost. |

Other directories:

- `cli/`: command dispatch, software rendering, PNG/APNG encoding and self-tests.
- `demos/`: the seven bundled interactive dioramas.
- `examples/`: small runnable scenes corresponding to this guide.
- `lab/`: larger shape experiments, mesh examples and the data-driven shrine.
- `tests/`: pixel-rendering unit tests.
- `scripts/`: source checks and formatting support.
- `catalog.json`: searchable descriptions of features available in this package.
- `storage-retention.json`: exact retained inputs and disposable generated outputs.

## Validation and development

```sh
npm test
npm run lint
node cli/ink-studio.js validate examples/scene.json
node cli/ink-studio.js render examples/sculpt.js --colored
node cli/ink-studio.js snap watcher --t 0,2
node cli/ink-studio.js check watcher
```

`npm test` runs five pixel-rendering unit tests and 171 numerical self-checks covering the toolkit and simulated demos. `npm run lint` runs a focused comment guard; it is not a general JavaScript linter. The guard rejects source-like statements after `//` because they would be silently commented out. Put usage examples in block comments.

Visual baselines are created explicitly by `snap`; no baseline images are bundled. `check` compares rendered pixels against those baselines. Keep baselines when they provide useful regression evidence; generated previews and the compiled `dist/` bundle can be regenerated.

The package is currently version `0.1.0` and marked private.

## License

Licensed under the [MIT License](LICENSE).
