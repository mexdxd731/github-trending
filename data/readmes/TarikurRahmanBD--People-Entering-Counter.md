<div align="center">
  <h1>🚪 People Entering Counter | Smart Line-Crossing Tracker</h1>
  <p>Computer vision entry/exit monitoring dashboard using YOLO and object tracking logic.</p>
  <p>
    <a href="https://www.python.org/">
      <img src="https://img.shields.io/badge/Python-3.12+-blue?style=flat&logo=python" alt="Python 3.12+" />
    </a>
    <a href="https://github.com/ultralytics/ultralytics">
      <img src="https://img.shields.io/badge/YOLOv8-✅-blue?style=flat" alt="YOLOv8" />
    </a>
    <a href="https://github.com/roboflow/supervision">
      <img src="https://img.shields.io/badge/Supervision-✅-blue?style=flat" alt="Supervision" />
    </a>
    <a href="https://opencv.org/">
      <img src="https://img.shields.io/badge/OpenCV-4.x+-blue?style=flat&logo=opencv" alt="OpenCV" />
    </a>
    <a href="/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green?style=flat" alt="MIT License" />
    </a>
    <a href="#-open-source-collaboration--call-for-contributors">
      <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat" alt="PRs Welcome" />
    </a>
  </p>
</div>

---

## 🌟 Overview & Quick Summary

`people_entering_counter` tracks individuals crossing a virtual boundary line and computes live IN and OUT tallies on an interactive dashboard. It uses object tracking logic to monitor each person's center Y trajectory and updates counts in real time.

---

## 🔥 Key Features

- 🔄 **Directional line-crossing detection**
  - Distinguishes `IN` vs `OUT` movement across a horizontal boundary
- 🎯 **Center-Y trajectory tracking**
  - Assigns unique object IDs and tracks vertical movement for each person
- 📊 **Real-time visual counting dashboard**
  - Displays live `IN` and `OUT` totals in a clean interface
- 🎥 **Automatic video/webcam source fallback**
  - Uses video file if available, otherwise falls back to webcam input

---

## 🛠️ Tech Stack & Dependencies

- Python 3.12+
- OpenCV
- Ultralytics YOLOv8
- Supervision

Install dependencies:

```powershell
pip install opencv-python ultralytics supervision
```

---

## 🚀 How to Run Locally

```powershell
git clone https://github.com/tarikurrahmanbd/YOLO_Projects-main.git
cd YOLO_Projects-main/people_entering_counter
python people_entering_counter.py
```

---

## 👨‍💻 Developer & Lead Engineer

**Designed & Developed by Tarikur Rahman**

GitHub: [TarikurRahmanBD](https://github.com/TarikurRahmanBD)

---

## 🤝 Open-Source Collaboration & Call for Contributors

Contributions are welcome to extend this project with features like:

- multi-line counters
- time-series analytics charts
- IoT smart door integration

---

## 📄 License & Attribution

This project is licensed under the **MIT License**.

**Designed & Developed by Tarikur Rahman**
