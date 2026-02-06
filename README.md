# Pathology Informatics Lectures

Interactive web-based lectures for pathology residents, built with Reveal.js, D3.js, and a custom JSON-driven slide engine.

**Author:** Peter Gershkovich, MD. MHA — Yale University School of Medicine

## Available Lectures

| # | Title | Docs |
| --- | ----- | ---- |
| 1 | Regulations, Technology, and the Future of Pathology | [Outline](docs/updated_outline.md) · [PRD](docs/PRD.md) |
| 2 | Software Development for Clinical Use in Pathology | [Outline](docs/software_dev_clinical_outline.md) · [Overview](docs/software_dev_clinical_use.md) |
| 3 | Relevance of Pathology Informatics *(interactive, JSON-driven)* | [Outline](docs/Introduction/intro.md) |

## Quick Start

```bash
cd pathology-node-presentation
npm install
npm start
```

Open <http://localhost:8000> — you'll see a **landing page** where you can select any lecture.

### Development Mode

For auto-reload on file changes (useful when editing lectures):

```bash
npm run dev
```

This uses [nodemon](https://nodemon.io/) to restart the server automatically when you save changes.

## Project Structure

```text
pathology-informatics-lectures/
├── docs/                          # Lecture outlines and documentation
├── data/                          # Raw data files (breach CSV)
├── ppt_gen/                       # Python scripts for PowerPoint generation
└── pathology-node-presentation/   # Main web application
    ├── server.js                  # Express server (port 8000)
    ├── home.html                  # Landing page — lecture selector
    ├── index.html                 # Lecture 1 (self-contained Reveal.js)
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

To create a new lecture, add a JSON file to `data/lectures/` and access it at `/lecture/<name>`.

## Deployment

The application is a standard Node.js/Express server. To deploy:

1. Clone the repo on your server
2. `cd pathology-node-presentation && npm install --production`
3. `npm start` (or use a process manager like [PM2](https://pm2.keymetrics.io/))
4. Point your reverse proxy (nginx/ALB) at port 8000

Set the `PORT` environment variable to override the default port:

```bash
PORT=3000 npm start
```

## License

- **Content** (slides, text, teaching materials): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Code**: [MIT License](LICENSE)
