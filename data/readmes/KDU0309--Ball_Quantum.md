# Ball Quantum

**Ball Computing + Qiskit Backend + Qiskit Machine Learning**

Repository: KDU0309/Ball_Quantum

This project packages the Ball Computing model into a reusable Qiskit `BackendV2`. The backend uses per-qubit Ball objects for logical value, phase, amplitude and relations, while compressed algorithmic models can represent very large logical spaces without allocating a full `2^N` statevector.

## Core Ball model

Each Ball tracks:

- logical bit value
- amplitude
- phase
- complex field
- entanglement group ID
- relations to other Balls
- probability

The Ball engine follows the supplied path model: H creates a per-shot binary path, X/Y flip the logical bit, Z/S/T transform phase, RZ applies a continuous phase parameter, CX/CZ establish relations and apply conditional transformations, and SWAP exchanges Ball state.

## Qiskit backend

`ball_backend/backend.py` provides:

- `Ball`
- `BallEngine`
- `BallInterference`
- `BallBackend`
- `BallJob`

Supported Qiskit operations:

`H`, `X`, `Y`, `Z`, `S`, `T`, `RZ`, `CX`, `CZ`, `SWAP`, `barrier`, `measure`

Measurement is registered directly in the backend `Target`, so circuits containing `measure` can pass through Qiskit's `transpile()` without the previous high-level-synthesis measurement error.

### Per-shot Ball path replay

For each requested shot, the backend creates a fresh Ball engine and replays the circuit. This is important because H is a path split in the Ball model. A later CX therefore acts on the same shot's Ball values, preserving the direct correlation represented by the Ball relation model.

## Qiskit Machine Learning integration

The repository now includes `qiskit-machine-learning` and a training example that uses the Qiskit ML `NeuralNetworkClassifier` while executing every forward evaluation on `BallBackend`.

`examples/15_qml_ball_training.py` demonstrates the complete path:

```text
training data
    ↓
Qiskit Machine Learning
    ↓
BallQNN
    ↓
parameterized Qiskit circuit
    ↓
BallBackend.run()
    ↓
Ball measurement
    ↓
QML loss / optimizer
    ↓
trained weight
```

The example uses a parameterized `RZ` feature/weight circuit, finite-difference weight gradients for the custom QNN interface, and Qiskit Machine Learning's `NeuralNetworkClassifier` with COBYLA. This is an experimental Ball-model QML integration, not a claim of physical quantum learning or equivalence to a full quantum state simulator.

## 4-bit 2x2 Ball toy cipher

`examples/16_toy_cipher_ball_recovery.py` demonstrates a reversible 4-bit toy cipher arranged as a 2x2 grid. Each cell owns a Ball carrying logical value, amplitude and phase. A known XOR key transforms the plaintext into ciphertext, the ciphertext is encoded into the Ball states, and the original 4 bits are recovered cell-by-cell from the Ball amplitude/phase signature and the key.

This is intentionally a toy reversible encoding example for inspecting Ball state recovery. It is not a secure cryptanalytic method and does not represent a break of modern encryption.

## Compressed Grover model

`examples/11_grover_64.py` implements a 64-qubit single-target Grover calculation using two Ball amplitudes:

- one Ball for the marked target state
- one Ball for the `2^N - 1` equivalent non-target states

The Grover rotation is evaluated analytically in the two-dimensional target/other subspace. The example does not allocate a `2^64` array or execute billions of individual Grover iterations.

## Large practical workloads

### 13. Large parity / syndrome computation

`examples/13_large_parity_syndrome.py` builds a practical error-detection workload with:

- 8,192 data bits
- 1,024 parity checks
- 9,216 logical Ball qubits
- 65,536 CX operations

Each parity check is computed as an XOR of selected data bits. The example measures the syndrome and independently verifies the returned 1,024-bit result against the original input.

### 14. Large subset / knapsack search workload

`examples/14_large_search_optimization.py` defines a 64-item weighted-value subset problem with a `2^64` candidate search space. The compressed Ball model evaluates the symmetric single-target Grover probability without allocating `2^64` states. The target is supplied explicitly as a marked workload state rather than presented as a general constant-memory NP-hard solver.

## No matplotlib / IPython dependency

The reusable package is CLI/backend-oriented. Matplotlib and IPython are not required by the project.

## Final examples

1. `examples/01_bell.py` — Bell / H + CX
2. `examples/02_ghz.py` — 8-qubit GHZ-style coupling
3. `examples/03_phase_gates.py` — phase gates and Ball metadata
4. `examples/04_large_logical.py` — 10,000 logical-qubit resource example
5. `examples/06_grover_style.py` — exact 3-qubit compressed Grover model
6. `examples/11_grover_64.py` — compressed 64-qubit Grover calculation
7. `examples/12_ball_path_circuit.py` — 8-qubit Ball path/phase/entanglement trace
8. `examples/13_large_parity_syndrome.py` — 9,216-qubit parity/syndrome workload
9. `examples/14_large_search_optimization.py` — 64-variable subset/knapsack workload
10. `examples/15_qml_ball_training.py` — Qiskit Machine Learning training on BallBackend
11. `examples/16_toy_cipher_ball_recovery.py` — 4-bit 2x2 Ball toy cipher recovery

## Run

```bash
pip install -r requirements.txt

python examples/01_bell.py
python examples/11_grover_64.py
python examples/13_large_parity_syndrome.py
python examples/15_qml_ball_training.py
python examples/16_toy_cipher_ball_recovery.py
```

## Scope

This is an experimental computational model. The repository does not claim that the Ball representation is a physical quantum computer or a mathematically equivalent implementation of quantum mechanics. It exposes the Ball model as an inspectable software research framework and now demonstrates a Qiskit Machine Learning training loop whose circuit evaluations execute on the Ball backend, plus toy Ball-state recovery experiments.
