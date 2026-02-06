# Pathology Informatics Lectures

Interactive web-based lectures for pathology residents, built with Reveal.js, D3.js, and a custom JSON-driven slide engine.

**Author:** Peter Gershkovich, MD. MHA — Yale University School of Medicine

## Available Lectures

| # | Title | Docs | Presentation |
| --- | ----- | ---- | ------------ |
| 1 | Regulations, Technology, and the Future of Pathology | [Outline](docs/updated_outline.md) · [PRD](docs/PRD.md) | `index.html` |
| 2 | Software Development for Clinical Use in Pathology | [Outline](docs/software_dev_clinical_outline.md) · [Overview](docs/software_dev_clinical_use.md) | `software_dev_clinical_use.html` |
| 3 | Pathology Informatics for Residents *(JSON-driven)* | [Outline](docs/Introduction/intro.md) | `lecture.html?lecture=intro_pathology_informatics` |

## Quick Start

```bash
cd pathology-node-presentation
npm install
node server.js
```

Then open:

- **Lecture 1:** <http://localhost:8000/index.html>
- **Lecture 2:** <http://localhost:8000/software_dev_clinical_use.html>
- **Lecture 3:** <http://localhost:8000/lecture/intro_pathology_informatics>

## Project Structure

```text
pathology-informatics-lectures/
├── docs/                          # Lecture outlines and documentation
├── data/                          # Raw data files (breach CSV)
├── ppt_gen/                       # Python scripts for PowerPoint generation
└── pathology-node-presentation/   # Main web application
    ├── server.js                  # Express server
    ├── index.html                 # Lecture 1 (self-contained)
    ├── software_dev_clinical_use.html  # Lecture 2
    ├── lecture.html               # Generic shell for JSON-driven lectures
    ├── css/                       # Stylesheets (theme, base, intro)
    ├── js/                        # Slide engine, visualizations, widgets
    └── data/lectures/             # JSON lecture definitions
```

## JSON-Driven Lecture System

Lecture 3+ uses a modular architecture:

- **`data/lectures/*.json`** — slide content and structure
- **`js/slide-engine.js`** — renders slides from JSON into Reveal.js sections
- **`js/viz-library.js`** — D3.js visualizations (workflow pipeline, abstraction layers, etc.)
- **`js/widgets.js`** — interactive polls, micro-case voting, timers

To create a new lecture, add a JSON file to `data/lectures/` and open `lecture.html?lecture=<name>`.

## License

- **Content** (slides, text, teaching materials): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code**: [MIT License](LICENSE)
