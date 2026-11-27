![Windows Hardware Monitor](assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
  <img src="https://img.shields.io/badge/Platform-Windows-blue" alt="Windows">
  <img src="https://img.shields.io/badge/Price-Free-brightgreen" alt="Free">
  <img src="https://img.shields.io/badge/Status-Open%20Source-orange" alt="Open Source">
</p>

**Windows Hardware Monitor is a free, open-source PC hardware monitoring application for Windows that gives you a clear view of your computer's temperatures, fan speeds, voltages, clock speeds, and component utilization.** Monitor CPU, GPU, motherboard, memory, and storage hardware through an accessible desktop interface without using the command line.

Whether you're a PC enthusiast, gamer, system administrator, developer, or hardware troubleshooting professional, get the system information you need in one convenient place.

## ⬇️ Installation

**Download the Windows application**

1. Open the repository's [Releases](https://github.com/Ash793318/windows-hardware-monitor/releases) page.
2. Download the latest release archive **`Windows Hardware Monitor 4.1.0.zip`**.
3. Extract the archive into a folder of your choice.
4. Keep **`Windows Hardware Monitor 4.1.0.exe`** and `libvlc.dll` together in that folder.
5. Double-click **`Windows Hardware Monitor 4.1.0.exe`** to launch the application.


## ✨ Features

- 🌡️ **CPU Temperature Monitoring** — Track processor temperatures, utilization, clock frequencies, and voltage readings in real time.
- 🎮 **GPU Hardware Monitoring** — Keep an eye on graphics card temperatures, workloads, clock speeds, and sensor information.
- 🌬️ **Fan Speed Monitoring** — View available cooling fan RPM readings to understand your system's cooling performance.
- ⚡ **Voltage Monitoring** — Inspect motherboard and component voltage sensors to help identify unusual hardware readings.
- 🧠 **RAM Usage Statistics** — Monitor memory-related hardware information and available system sensor readings.
- 💾 **SSD and HDD Monitoring** — Discover supported storage devices and inspect their available temperatures and sensor data.
- 🖥️ **Motherboard Monitoring** — Access hardware information from supported motherboard sensors and embedded controllers.
- 📊 **Real-Time System Statistics** — View changing hardware readings through a graphical Windows desktop interface.
- 🔍 **Multi-Component Detection** — Inspect supported Intel, AMD, and NVIDIA hardware alongside other compatible devices.
- 🛠️ **Developer-Friendly Architecture** — Use the monitoring library as a foundation for integrating hardware sensor readings into .NET applications.

## 🖼️ Overview

![Features](assets/features.png)

### Hardware Components at a Glance

| Component | Available Monitoring Information |
|---|---|
| CPU | Temperature, load, voltage, clock speed |
| GPU | Temperature, utilization, clock speed |
| Motherboard | Temperatures, voltages, sensors |
| Cooling | Supported fan speeds and RPM |
| Memory | Available memory sensor readings |
| SSD / HDD | Supported drive temperatures and sensors |
| Network | Available network hardware information |

*Actual sensor availability depends on your hardware, manufacturer, firmware, drivers, and operating system permissions.*

## 🚀 Usage

Getting started with Windows Hardware Monitor is straightforward:

1. **Launch the application** — Open the Windows desktop application after installation.
2. **Initialize hardware detection** — Allow the application to discover supported hardware components and sensors.
3. **Explore system information** — Expand the available hardware categories to inspect individual devices.
4. **Check live readings** — Review temperatures, fan speeds, voltages, utilization, and clock frequencies.
5. **Investigate unusual values** — Compare readings across components to help diagnose cooling or performance problems.

### Supported Hardware Platforms

The application is designed to retrieve sensor information from a broad range of modern and legacy PC hardware.

| Hardware Manufacturer | Supported Categories |
|---|---|
| Intel | Processors and integrated graphics |
| AMD | Ryzen processors and Radeon graphics |
| NVIDIA | GeForce graphics cards |
| Motherboard vendors | Supported motherboard sensors and controllers |
| Storage vendors | Compatible HDD, SSD, and NVMe devices |

**Note:** Hardware monitoring capabilities vary by individual model. Not every component exposes every sensor, and some readings require elevated system permissions.

## 💻 Desktop Application and Developer Library

Windows Hardware Monitor combines an accessible graphical application with reusable hardware-monitoring functionality.

### Windows Desktop Interface

- Browse detected hardware in an organized component hierarchy.
- Inspect individual temperature, voltage, clock, and utilization sensors.
- Monitor available cooling and fan speed information.
- View hardware information without requiring terminal commands.

### .NET Hardware Monitoring Integration

Developers can integrate compatible hardware-monitoring functionality into their own Windows applications.

Typical integration scenarios include:

- PC diagnostics and hardware inventory software.
- System performance dashboards.
- Computer temperature monitoring utilities.
- Custom hardware information applications.
- Automated hardware testing and diagnostics.

The underlying monitoring architecture is suitable for .NET-based development and can be extended to support additional hardware and sensor configurations.

## 🔧 Troubleshooting

### No CPU or GPU temperature readings

- Verify that your processor or graphics card exposes compatible temperature sensors.
- Check whether the application has sufficient permissions.
- Update motherboard firmware and hardware drivers where appropriate.
- Remember that some devices do not expose every sensor through standard interfaces.

### Fan speeds are missing

- Confirm that your fans are connected to a supported motherboard or controller.
- Check whether your motherboard exposes fan RPM information.
- Review firmware settings if sensor information is unavailable.

### Some hardware is not detected

- Restart the application.
- Check hardware and chipset driver versions.
- Verify that the device is supported by the monitoring implementation.
- Report missing hardware information with your device model and relevant diagnostic details.

### Temperature readings appear unusual

Sensor readings can vary between manufacturers and hardware models. Compare readings with manufacturer documentation and other trusted diagnostic tools before drawing conclusions.

## 🔒 Security

Windows Hardware Monitor is designed around transparency and local hardware inspection.

- **Open Source:** The source code is available for public inspection and independent auditing.
- **Privacy Focused:** Hardware monitoring is performed locally; no telemetry or tracking is required.
- **No Account Required:** Hardware inspection does not depend on creating an online account.
- **Transparent Operation:** Review the code and understand how hardware information is accessed.
- **Community Reporting:** Submit reproducible bug reports and security concerns through the repository's appropriate reporting channels.

For security issues, avoid publishing sensitive system information or potential vulnerabilities in public issue discussions. Use a private reporting channel when available.

## 🤝 Contributing

Contributions help improve hardware compatibility, monitoring accuracy, and application reliability.

You can help by:

- Reporting incorrectly detected hardware sensors.
- Testing CPU, GPU, and motherboard compatibility.
- Improving hardware detection and sensor support.
- Fixing bugs and improving application performance.
- Improving documentation and developer examples.
- Reviewing pull requests and suggesting enhancements.

When submitting a hardware compatibility report, include the device manufacturer, model, relevant firmware information, and a description of the missing or incorrect readings.

## ❓ Frequently Asked Questions

### Is Windows Hardware Monitor free?

Yes. It is intended as free, open-source desktop software distributed under the MIT License.

### Does it support AMD and Intel processors?

The monitoring architecture supports compatible Intel and AMD processor hardware. Individual sensor availability depends on the processor and platform.

### Can I monitor NVIDIA and AMD graphics cards?

Yes, supported NVIDIA and AMD graphics hardware can expose temperature, clock, and utilization information.

### Can I check my PC temperature?

Yes. You can inspect available CPU, GPU, motherboard, and storage temperatures through the desktop interface.

### Does it show fan RPM?

Yes, where compatible motherboard sensors and fan controllers expose speed information.

### Does every computer show the same sensors?

No. Hardware manufacturers implement sensor access differently. Available readings depend on the particular hardware, firmware, and system configuration.

### Is it suitable for gaming PCs?

Yes. It can help gamers inspect processor and graphics card temperatures, clock speeds, and utilization when investigating thermal or performance issues.

### Does it require command-line knowledge?

No. The Windows desktop application provides a graphical interface for browsing hardware and sensor information.

## 📄 License

This project is distributed under the **MIT License**. You are free to use, modify, distribute, and incorporate the software into other projects under the terms of that license.

@