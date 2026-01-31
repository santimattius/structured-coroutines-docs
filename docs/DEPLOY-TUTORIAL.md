# Deploy to GitHub Pages — Tutorial

This tutorial explains how the project is configured to deploy to GitHub Pages and how to use it.

---

## Table of contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Enable GitHub Pages in your repository](#enable-github-pages-in-your-repository)
4. [How the workflow runs](#how-the-workflow-runs)
5. [Workflow configuration explained](#workflow-configuration-explained)
6. [Project configuration for GitHub Pages](#project-configuration-for-github-pages)
7. [Triggering a deploy](#triggering-a-deploy)
8. [Your site URL](#your-site-url)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The project uses **GitHub Actions** to build the Vite + React app and deploy it to **GitHub Pages**. No separate hosting or manual uploads are needed—pushing to `main` (or running the workflow manually) builds and publishes the site.

**What gets configured:**

- A GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys.
- Vite’s `base` path so assets and routes work under `https://<user>.github.io/<repo>/`.
- React Router’s `basename` so client-side routing works on GitHub Pages.
- A `404.html` copy so direct/refresh URLs still load the single-page app.

---

## Prerequisites

- A GitHub account.
- This repository pushed to GitHub (e.g. `your-username/structured-coroutines-docs`).
- **Pages** built with **GitHub Actions** (see next section).

---

## Enable GitHub Pages in your repository

1. Open your repository on GitHub.
2. Go to **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** choose **GitHub Actions** (not “Deploy from a branch”).

That’s all. The workflow will build and deploy; you don’t need to pick a branch or folder here.

---

## How the workflow runs

The workflow file is:

```text
.github/workflows/deploy.yml
```

**When it runs:**

- **Automatically:** on every push to the `main` branch.
- **Manually:** in the **Actions** tab, select “Deploy to GitHub Pages”, then “Run workflow”.

**What it does:**

1. **Build job:** Checkout code → install Node 20 → install deps → build with the correct base path → copy `index.html` to `404.html` → upload the `dist` folder as a Pages artifact.
2. **Deploy job:** Takes that artifact and deploys it to GitHub Pages using the `github-pages` environment.

---

## Workflow configuration explained

### Triggers

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

- **`push` to `main`:** Every merge or push to `main` triggers a deploy.
- **`workflow_dispatch`:** Lets you run the workflow by hand from the Actions tab.

To deploy from another branch (e.g. `master`), change `branches: [main]` to `branches: [master]`.

### Permissions

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

- **`contents: read`:** Clone the repo.
- **`pages: write`:** Deploy to GitHub Pages.
- **`id-token: write`:** Required by the official deploy action for authentication.

### Concurrency

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

Only one Pages deployment runs at a time; new runs wait instead of cancelling the current one.

### Build job steps

| Step | Purpose |
|------|--------|
| **Checkout** | Get the repository code. |
| **Setup Node.js** | Install Node 20 and use npm cache for faster installs. |
| **Install dependencies** | `npm ci` for a clean, reproducible install. |
| **Build** | `npm run build` with `VITE_BASE_PATH=/<repo-name>/` so the app is built for the correct GitHub Pages URL. |
| **Copy index.html to 404.html** | So that any path (e.g. `/docs/foo`) still serves the SPA; GitHub Pages will serve `404.html` and the app handles the route. |
| **Upload artifact** | Upload the `dist` folder so the deploy job can publish it. |

### Deploy job

- **`needs: build`:** Runs only after the build job succeeds.
- **`environment: github-pages`:** Uses GitHub’s built-in Pages environment and its URL.
- **`actions/deploy-pages`:** Official action that deploys the uploaded artifact to GitHub Pages.

---

## Project configuration for GitHub Pages

These changes make the app work when served from `https://<user>.github.io/<repo>/`.

### 1. Vite base path (`vite.config.ts`)

```ts
base: process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || '/',
```

- **On GitHub Actions:** The workflow sets `VITE_BASE_PATH=/${{ github.event.repository.name }}/` (e.g. `/structured-coroutines-docs/`), so scripts and assets load from the right path.
- **Locally:** No `VITE_BASE_PATH` is set, so `base` is `'/'` and `npm run dev` works as usual.

### 2. React Router basename (`App.tsx`)

```tsx
<Router basename={import.meta.env.BASE_URL}>
```

- **`import.meta.env.BASE_URL`** is set by Vite from the `base` option (e.g. `/structured-coroutines-docs/` in production).
- **`basename`** tells React Router that all routes live under that path, so links and direct URLs work correctly on GitHub Pages.

### 3. SPA routing with 404.html

GitHub Pages doesn’t support server-side routing. For a path like `/structured-coroutines-docs/docs/some-doc`:

- Without `404.html`, GitHub would return a 404 page.
- With `404.html` identical to `index.html`, GitHub serves the same app; the app then uses the URL and `basename` to show the right route.

The workflow runs this after the build:

```bash
cp dist/index.html dist/404.html
```

---

## Triggering a deploy

**Option A — Push to main**

```bash
git add .
git commit -m "Update content"
git push origin main
```

Then open the **Actions** tab and watch the “Deploy to GitHub Pages” workflow.

**Option B — Manual run**

1. GitHub → your repo → **Actions**.
2. Click “Deploy to GitHub Pages” in the left sidebar.
3. Click “Run workflow”, choose the branch (e.g. `main`), then “Run workflow”.

---

## Your site URL

After the first successful deploy, the site is available at:

```text
https://<your-github-username>.github.io/<repository-name>/
```

Example:

```text
https://octocat.github.io/structured-coroutines-docs/
```

The workflow uses `github.event.repository.name` for the base path, so if you rename the repository, the next deploy will use the new name automatically.

---

## Troubleshooting

### Build fails with “VITE_BASE_PATH” or wrong base path

- The workflow sets `VITE_BASE_PATH`; you don’t need to set it in the repo.
- If you use a custom domain or a different repo name, ensure the workflow’s `env.VITE_BASE_PATH` matches how the site is served (e.g. `/repo-name/` with a trailing slash).

### 404 on refresh or direct link

- Confirm the workflow step “Copy index.html to 404.html” runs and that `dist/404.html` exists in the artifact.
- Confirm `App.tsx` uses `<Router basename={import.meta.env.BASE_URL}>`.

### Assets (JS/CSS) 404 or blank page

- Check that `base` in `vite.config.ts` uses `VITE_BASE_PATH` (or `env.VITE_BASE_PATH`) and that the workflow passes `VITE_BASE_PATH=/<repo-name>/`.
- Repo name must match the repository name on GitHub (e.g. `structured-coroutines-docs`).

### “Resource not found” or deploy job fails

- In **Settings** → **Pages**, **Source** must be **GitHub Actions**.
- Ensure the **github-pages** environment exists (it’s usually created automatically when you use GitHub Actions for Pages).

### Deploy from a different branch

Edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [master]   # or your default branch
```

---

For local development, see the main [README](../README.md).
