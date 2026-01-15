# Pakistan Education Policy Audit (2013-2016)

**A Research-to-Interactive Data Publication**

This project follows a "Data-First" philosophy: fundamental research and metric engineering were conducted in **Python**, then translated into an **interactive cinematic experience** using modern web technologies.

## The Research Workflow

Unlike traditional websites, this platform is a direct extension of a data science pipeline:

1.  **Analysis (Python)**: Raw data from Kaggle was cleaned and analyzed in a Jupyter environment.
2.  **Engineering**: Multi-dimensional metrics (GPI, SFS, ICC) were calculated to reveal hidden patterns.
3.  **Presentation (Next.js)**: The findings were materialized into an Awwwards-level interactive narrative using GSAP and p5.js.

## Data Science Core (Python & Jupyter)

The heart of the project lies in the [Exploratory Data Analysis (EDA)](notebook/pakistan_education_analysis.ipynb).

- **Metric Engineering**:
  - **GPI**: Gender Parity Index for enrollment equality.
  - **SFS**: Security Fragility Score (log-normalized threat assessment).
  - **ICC**: Infrastructure Composite Index for resource mapping.
- **Transparency**: Every chart on the website corresponds to an analysis cell in the notebook.

## Cinematic Tech Stack

- **Data Pipeline**: Python (Pandas, NumPy, Plotly) via [Jupyter Notebook](notebook/pakistan_education_analysis.ipynb)
- **Framework**: Next.js (App Router)
- **Animation**: GSAP (ScrollTrigger) & Lenis (Smooth Scroll)
- **Visualizations**: p5.js (Generative Particle Maps)
- **Styling**: Tailwind CSS 4

## Narrative Structure

The site unfolds in 5 distinct chapters, each answering a critical policy question:

1. **CONTEXT**: Why Pakistan's education landscape matters.
2. **DISPARITIES**: Where the regional and gender divides are deepest.
3. **SYSTEMS VIEW**: How resources, security, and outcomes interact.
4. **HIDDEN PATTERNS**: Positive deviance and resilience in conflict zones.
5. **INTERPRETATION**: What the data suggests for future policy.

## Design Philosophy

- **Research-Grade Motion**: Animations are descriptive, not decorative.
- **Calm Confidence**: A sophisticated light-theme (Slate & Emerald) designed for long-form editorial reading.
- **Full-Width Canvas**: Immersive interaction that respects the scale of the data.

## Getting Started

**Frontend:**

```bash
npm install && npm run dev
```

**Research Notebook:**

1. Navigate to `/notebook`
2. Run `pakistan_education_analysis.ipynb` in any Jupyter environment.

---

_Developed by Salman — Bridging the gap between Data Science and Digital Storytelling._
