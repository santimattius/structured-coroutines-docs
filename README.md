# Structured Coroutines — Documentation Site

Documentation website for **Structured Coroutines**, a toolkit that enforces safety, predictability, and efficiency in Kotlin Coroutines through compile-time checks, static analysis, IDE support, and Android Lint.

This repository contains the documentation site (Vite + React) and the source documentation (Markdown in `docs/`). The site is built and deployed to GitHub Pages via GitHub Actions.

---

## For Content Writers and Technical Writers

Website content is driven by **source documentation** in the `docs/` folder and by **website content** in `constants.tsx` and this README.

- **Source docs:** `docs/ANNOTATIONS.md`, `docs/BEST_PRACTICES_COROUTINES.md`, `docs/COMPILER.md`, `docs/GRADLE-PLUGIN.md`, `docs/INTELLIJ-PLUGIN.md`, `docs/LINT-RULES.md`, `docs/DETEKT-RULES.md`, `docs/DEPLOY-TUTORIAL.md`, etc.
- **Website content:** `constants.tsx` (`DOCS_CONTENT`, `SIDEBAR_NAV`, `MODULES`, `COMPARISON_DATA`), `README.md`.

See **[Content Writers Guide](docs/CONTENT-WRITERS-GUIDE.md)** for:

- How source docs map to website pages
- Where to edit content (constants, README)
- Formatting rules and step-by-step update workflow
- Quality checklist and tone/style

---

## Deploy to GitHub Pages

The project deploys automatically via GitHub Actions. See **[Deploy tutorial](docs/DEPLOY-TUTORIAL.md)** for:

- Enabling GitHub Pages in your repository (Source: **GitHub Actions**)
- How the workflow and project config work
- How to trigger a deploy and troubleshoot

---

## Run Locally

**Prerequisites:** Node.js (v18 or 20 recommended)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the app:

   ```bash
   npm run dev
   ```

   Then open **http://localhost:3000/** in your browser.

---

## Project Structure

| Path | Purpose |
|------|--------|
| `docs/` | Source documentation (Markdown). Content writers update these and sync to the website. |
| `constants.tsx` | Website content: doc pages (`DOCS_CONTENT`), sidebar (`SIDEBAR_NAV`), modules (`MODULES`), comparison table (`COMPARISON_DATA`). |
| `.github/workflows/deploy.yml` | GitHub Actions workflow for building and deploying to GitHub Pages. |
| `pages/`, `components/` | React app (DocPage, Layout, Home, etc.). |

For full content pipeline and update instructions, use **[docs/CONTENT-WRITERS-GUIDE.md](docs/CONTENT-WRITERS-GUIDE.md)**.
