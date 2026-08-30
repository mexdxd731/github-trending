# Data Fusion & Entity Profiling Analytics Platform

## Project Overview

A modular and extensible web-based analytics platform designed for **Multi-Source Data Fusion** and **Intelligent Entity Profiling**. It demonstrates how to integrate heterogeneous data sources, configure analytical rules, and compute multi-dimensional health/engagement metrics using parameterized non-linear mathematical models.

## Key Features

- **Modular Architecture**: Built with Flask blueprints, SQLAlchemy ORM, and responsive Bootstrap 5 components.
- **Configurable Analytical Models**: Demonstrates non-linear algorithms (Sigmoid curves, exponential decay models, saturation indices) for entity scoring and data quality assessment.
- **Dynamic Rule Engine**: Manage fusion rules, scenario templates, and access policies through an interactive dashboard.
- **Interactive UI**: Includes dynamic sorting, data visualization tables, and contextual analytical modals.
- **Secure by Design**: PBKDF2 password hashing, session control, and transaction safety with automatic database rollback.

## Functional Modules

1. **Dashboard**: Centralized metrics dashboard with quick-action navigations.
2. **Profile Management**: Multi-dimensional entity profiling and engagement index calculations.
3. **Data Source Management**: Data source tracking and dynamic activity scoring.
4. **Algorithm Configuration**: Parameterized configuration for analytical functions.
5. **Fusion Rule Management**: Multi-source data aggregation and concentration metrics.
6. **Scenario Template Management**: Lifecycle and stability modeling for custom scenarios.
7. **Permission & Security**: Dynamic access policies and decay-based security scoring.

## Quick Start

### Prerequisites
- Python 3.8+
- pip

### Installation and Execution
1. **Install Dependencies**:
   ```bash
   bash install.sh
   ```
2. **Initialize Database**:
   ```bash
   python3 init_db.py
   ```
3. **Run the Application**:
   ```bash
   bash run.sh
   ```
4. **Access the Web Interface**:
   Open `http://127.0.0.1:5001` in your browser.
   - Default Username: `admin`
   - Default Password: `admin123`

## Project Architecture

```
crossPlatformAi/
├── app.py                  # Main Flask application engine
├── main.py                 # Desktop wrapper entrypoint (optional)
├── config.py               # Application configuration
├── init_db.py              # Database initialization & default admin setup
├── install.sh              # Dependency installation script
├── run.sh                  # Application startup script
├── test_app.py             # Basic functional tests
├── algorithms/             # Analytical & mathematical scoring modules
├── models/                 # SQLAlchemy ORM models
├── routes/                 # Blueprint route controllers
├── static/                 # Static assets (CSS, JS, images)
└── templates/              # Jinja2 HTML templates
```

## License

Licensed under the [Apache-2.0 License](LICENSE).
