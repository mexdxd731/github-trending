# 3D Print Tools - 3D Printing Tools 2026

> **3D Print Tools is a client-side browser toolkit for viewing, editing, inspecting, and preparing common 3D-printing files, including support generation and toolpath visualization.**

[![Platform](https://img.shields.io/badge/Platform-Web%20browser-blue?style=flat-square)](https://github.com)
[![Version](https://img.shields.io/badge/Version-Latest-green?style=flat-square)](https://github.com)
[![Updated](https://img.shields.io/badge/Updated-2026-red?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/License-GPL--3.0-yellow?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/danielmillersr2593/3d-print-tools-editor?style=flat-square)](https://github.com/danielmillersr2593/3d-print-tools-editor)

---

<p align="center">
  <a href="https://danielmillersr2593.github.io/3d-print-tools-editor/">
    <img src="https://img.shields.io/badge/Download-3D%20Print%20Tools%20Latest-brightgreen?style=for-the-badge" alt="Download 3D Print Tools">
  </a>
</p>

> **[Download 3D Print Tools Latest](https://danielmillersr2593.github.io/3d-print-tools-editor/)**

---

[Download Latest Build](https://danielmillersr2593.github.io/3d-print-tools-editor/)

---

## Overview

3D Print Tools combines useful modeling and print-preparation workflows in a browser-based application. Load mesh files or toolpaths, inspect them through a drag-and-drop 3D viewer, and examine object dimensions and surfaces in millimeters.

The toolkit is built for makers, designers, and other 3D-printing users who need a fast way to review or modify files. Mesh editing, object organization, support creation, and sliced toolpath viewing all run client-side, meaning a backend and mandatory file upload are not required.

---

## What You Can Do

- Create low-contact support structures intended to remove more easily.
- Import and export STL and 3MF models.
- Load STL, 3MF, OBJ, PLY, glTF, GLB, and G-code files.
- Explore models in a 3D viewer using drag and drop.
- Modify meshes through extrude, stretch, cut, and add operations.
- Select individual objects and detach, duplicate, or remove them.
- Check surfaces with a ruler and monitor dimensions in millimeters.
- Visualize sliced 3MF toolpaths as well as raw G-code.
- Work entirely in the browser without requiring file uploads.
- Use the project without a build process or backend service.

---

## Getting Started

### Open the hosted version

Start the current browser build here:

[Launch 3D Print Tools](https://danielmillersr2593.github.io/3d-print-tools-editor/)

### Serve a local checkout

First, clone the repository and enter its directory:

```bash
git clone https://github.com/danielmillersr2593/3d-print-tools-editor.git
cd REPO
```

The project does not need to be compiled. Serve the files with any static file server, such as Python's built-in server:

```bash
python3 -m http.server 8000
```

Once the server is running, visit:

```text
http://localhost:8000/
```

---

## Using the Toolkit

1. Open the hosted application or launch the local static server.
2. Drop an STL, 3MF, OBJ, PLY, glTF, GLB, or G-code file into the viewer.
3. Select objects or surfaces to examine the loaded model.
4. Use the ruler to measure dimensions in millimeters.
5. Modify the mesh with operations such as extrude, stretch, cut, and add.
6. Manage selected objects by detaching, duplicating, or deleting them.
7. Create low-contact supports for areas that need support during printing.
8. Inspect sliced 3MF toolpaths or raw G-code in the viewer.
9. Export the supported result as STL or 3MF.

---

## Configuration and Local Hosting

No configuration file, backend, or build pipeline is needed. For normal use, open the application in a supported modern browser and load files through the viewer.

When working locally, the only hosting consideration is how the static project files are served. Use a local web server or publish the files through a static hosting service.

---

## Requirements

- A modern web browser capable of 3D rendering.
- A desktop or laptop is recommended when working with larger models or performing detailed inspection.
- Internet access is required for the hosted build.
- Local operation requires a static file server or another method of serving the project files.
- Supported formats are STL, 3MF, OBJ, PLY, glTF, GLB, and G-code.
- Required storage varies with the project files and the models loaded.

---

## Frequently Asked Questions

### Are my files sent to a server?

No. The application runs on the client side and handles files within the browser session without requiring a backend.

### What formats does the viewer support?

You can open STL, 3MF, OBJ, PLY, glTF, GLB, and G-code files. STL and 3MF files are also available as export formats.

### Is toolpath viewing supported?

Yes. 3D Print Tools can display sliced 3MF toolpaths and raw G-code for visual review.

### Is there a settings file to edit?

No separate settings service or required configuration file is provided. Use the hosted browser build, or serve the repository locally when working from a checkout.

### Why might the application fail to open?

Check that the browser is modern and supports 3D rendering. For local use, make sure the project is being served through a local web server instead of being opened through an unsupported file path.

### How do I use the newest version?

Open the latest hosted build at the project URL, or pull the latest repository changes before launching the local copy.

---

## Future Direction

- Further streamline browser-based model inspection.
- Continue improving mesh editing and support-generation workflows.
- Preserve compatibility with widely used 3D-printing model and toolpath formats.

---

## License

GNU GPL v3.0 - see [LICENSE](LICENSE) for details.
