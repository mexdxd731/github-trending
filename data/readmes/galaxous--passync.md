# passync

**Zero-Disk-Plaintext, 3-Way Password Manager Synchronizer for macOS (`iCloud Passwords` ↔ `Google Password Manager`).**

`passync` is a lightweight native **Rust + Tauri v2 macOS Menu Bar application** (and companion CLI) that keeps **Apple Passwords (iCloud Keychain)** and **Google Password Manager (Chrome)** in sync with full **3-way merge detection** (additions, password updates, and deletions) while ensuring **not a single byte of plaintext password ever touches your SSD**.

---

## Architecture

1. **`crates/passync-core`**:
   - `model`: Canonical credential normalization (`(host, port, username)`), `Zeroizing<String>` memory guards, and round-trip `OTPAuth` preservation.
   - `state`: Zero-knowledge SQLite state database using a 256-bit HMAC key stored in the macOS login Keychain (`com.galaxous.passync.state-key`) and keyed `BLAKE3` hashes.
   - `merge`: Deterministic 12-case 3-way merge engine handling additions, single-sided password/metadata updates, single-sided deletions, and true modify-modify / modify-delete conflicts.
   - `chrome`: Direct discovery and in-memory AES-128-CBC (`v10`) decryption of Chrome's `Login Data` and `Login Data For Account` databases via macOS Keychain `"Chrome Safe Storage"`, plus direct SQLite deletion when Chrome is closed and deep-link generation.
   - `apple`: Apple Passwords CSV reader/writer (`Title,URL,Username,Password,Notes,OTPAuth`) and macOS Passwords.app deep links.
   - `ramdisk`: Ephemeral `hdiutil` + `diskutil` HFS+ RAM disk mounted at `/Volumes/PassyncRAM` (`chmod 700`) with automatic file zeroization and force-unmount on drop.
   - `watcher`: Real-time `notify` (`FSEvents`) watcher monitoring Chrome SQLite databases without polling or cron jobs.
2. **`crates/passync-cli`**:
   - Command-line interface for headless inspection, status checks, RAM-disk lifecycle testing, and 3-way diffing.
3. **`crates/passync-app` & `ui/`**:
   - Native macOS Menu Bar app built with **Tauri v2** and **React + TypeScript + Tailwind CSS**, providing a Visual Diff & Merge Review window before applying any change.

---

## Quick Start

### Prerequisites
- macOS 13+ (Ventura, Sonoma, Sequoia, or newer)
- Rust toolchain (`cargo`, `rustc`)
- Node.js 20+ (for building the Tauri frontend in `ui/`)

### Run Tests
```bash
cargo test --workspace
```

### Run CLI
```bash
# Inspect Chrome profiles & live diff status
cargo run -p passync-cli -- status

# Run interactive 3-way diff with ephemeral RAM disk
cargo run -p passync-cli -- sync
```

### Run Menu Bar App
```bash
cd ui && npm install && npm run build
cargo run -p passync-app
```

---

## License
MIT
