# Content Writers Guide — Updating Website Content from Documentation

This guide explains how **technical writers** and **content writers** keep the documentation website in sync with the source documentation and maintain professional, consistent content.

---

## Table of Contents

1. [Content Pipeline Overview](#content-pipeline-overview)
2. [Source Documents → Website Mapping](#source-documents--website-mapping)
3. [Where Website Content Lives](#where-website-content-lives)
4. [Formatting Rules for Website Content](#formatting-rules-for-website-content)
5. [Step-by-Step Update Workflow](#step-by-step-update-workflow)
6. [Quality Checklist](#quality-checklist)
7. [Tone and Style](#tone-and-style)

---

## Content Pipeline Overview

```
Source docs (docs/*.md)     →     Website content (constants.tsx, README.md)
        │                                      │
        │   Technical writer / Content writer   │
        └────────────── sync & adapt ─────────┘
```

- **Source of truth:** Markdown files in the `docs/` folder (e.g. `ANNOTATIONS.md`, `GRADLE-PLUGIN.md`).
- **Website surface:** The React app reads content from `constants.tsx` (`DOCS_CONTENT`, `SIDEBAR_NAV`, `MODULES`, etc.) and from `README.md` for the repo/project description.
- **Your role:** Adapt and condense source docs for the web, keep wording professional, and ensure links and code samples stay accurate.

---

## Source Documents → Website Mapping

Use this table to know which source file(s) feed each part of the site.

| Website page / area | Source document(s) | constants.tsx key(s) |
|---------------------|--------------------|------------------------|
| **Introduction** | `README.md`, `docs/BEST_PRACTICES_COROUTINES.md` (intro) | `introduction` |
| **Core Concepts** | `docs/BEST_PRACTICES_COROUTINES.md` | `core-concepts` |
| **Annotations** | `docs/ANNOTATIONS.md` | `annotations` |
| **Detekt Rules** | `docs/DETEKT-RULES.md` | `detekt-rules` |
| **IntelliJ Plugin** | `docs/INTELLIJ-PLUGIN.md` | `intellij-plugin` |
| **Gradle Plugin** | `docs/GRADLE-PLUGIN.md` | `gradle-plugin` |
| **Lint Rules** | `docs/LINT-RULES.md` | `lint-rules` |
| **Compiler Plugin** | `docs/COMPILER.md` | `compiler` |
| **API Reference** | (Generated or external; placeholder in constants) | `api` |
| **Changelog** | (Releases; maintain in constants or sync from CHANGELOG) | `changelog` |
| **Deploy / Run locally** | `docs/DEPLOY-TUTORIAL.md`, `README.md` | N/A (README + deploy tutorial) |
| **Home hero / modules** | All docs (summaries) | `MODULES`, `COMPARISON_DATA` |

When you update a source doc, update the corresponding website content (and vice versa if you change the website first).

---

## Where Website Content Lives

| What | File | What to edit |
|------|------|----------------|
| **Doc pages (markdown)** | `constants.tsx` | `DOCS_CONTENT` object: each key (e.g. `"annotations"`, `"gradle-plugin"`) is the page slug; the value is the markdown string shown on the site. |
| **Sidebar navigation** | `constants.tsx` | `SIDEBAR_NAV`: section titles and list of `{ title, path, icon }`. |
| **Home module cards** | `constants.tsx` | `MODULES`: `title`, `description`, `icon`, `path` for each toolkit module. |
| **Feature comparison table** | `constants.tsx` | `COMPARISON_DATA`: rows for Compiler / Detekt / Lint / IDE. |
| **Project readme** | `README.md` | Project title, short description, run locally, deploy link. |

Path slugs in `SIDEBAR_NAV` and `MODULES` must match the keys in `DOCS_CONTENT` (e.g. `path: "gradle-plugin"` → `DOCS_CONTENT["gradle-plugin"]`).

---

## Formatting Rules for Website Content

The website renders a **subset of Markdown** inside `constants.tsx`:

- **Headings:** `#`, `##`, `###` (for title and sections).
- **Paragraphs:** Plain text; line breaks matter.
- **Bold:** `**text**`.
- **Inline code:** `` `code` ``.
- **Code blocks:** Fenced with ` ``` ` and optional language (e.g. ` ```kotlin `). Use **three backticks** and a newline after the opening fence.
- **Lists:** `- item` for bullets.
- **Tables:** `| Col1 | Col2 |` with a header row and optional separator row.
- **Links:** `[text](/docs/slug)` for in-app docs; use paths like `/docs/gradle-plugin` (no `.md`).

**Escaping in `constants.tsx`:** Inside template literals, escape backticks as `\`` so they don’t close the string. For a literal backtick in output use `\`\`\`` in the string.

**Keep web content scannable:** Prefer short paragraphs, clear headings, and one main idea per section. Long reference docs can stay in the source `.md`; the website can summarize and link to them if needed.

---

## Step-by-Step Update Workflow

### When a source document changes (e.g. `docs/ANNOTATIONS.md`)

1. **Identify the mapping**  
   Use the table above (e.g. `ANNOTATIONS.md` → `annotations` in `DOCS_CONTENT`).

2. **Open both files**  
   - Source: `docs/ANNOTATIONS.md`  
   - Website: `constants.tsx` → `DOCS_CONTENT["annotations"]`.

3. **Adapt for the web**  
   - Copy or summarize the sections that belong on the doc page.  
   - Apply the [formatting rules](#formatting-rules-for-website-content).  
   - Preserve code samples and tables; shorten long prose if needed.  
   - Fix any internal links to use `/docs/...` paths.

4. **Update the string in `constants.tsx`**  
   Replace the value of `DOCS_CONTENT["annotations"]` with the new markdown string (mind escaping backticks).

5. **Check the site**  
   Run `npm run dev`, open the corresponding doc page (e.g. `/docs/annotations`), and verify headings, code blocks, tables, and links.

6. **Optional:** If the change affects the home page or sidebar, update `MODULES` or `SIDEBAR_NAV` in `constants.tsx` as well.

### When you add a new doc page

1. Add a new key to `DOCS_CONTENT` (e.g. `"new-topic"`) with the full markdown content.
2. Add an item to the appropriate section in `SIDEBAR_NAV` (e.g. `{ title: "New Topic", path: "new-topic", icon: "..." }`).
3. If it’s a toolkit module, add an entry to `MODULES` with `title`, `description`, `icon`, `path: "/docs/new-topic"`.
4. Create or update a source doc in `docs/` (e.g. `docs/NEW-TOPIC.md`) and add it to the [mapping table](#source-documents--website-mapping) in this guide.

### When README or deploy instructions change

1. **README.md:** Update project title, description, “Run locally”, and “Deploy” sections so they match the current setup.
2. **Deploy:** Keep `docs/DEPLOY-TUTORIAL.md` as the detailed deploy guide; link to it from the README.

---

## Quality Checklist

Before publishing content changes:

- [ ] **Accuracy:** Code snippets, artifact names, and versions match the source docs and current project.
- [ ] **Links:** Internal links use `/docs/slug` and point to existing pages.
- [ ] **Formatting:** Code blocks use triple backticks and optional language tag; tables and lists render correctly.
- [ ] **Consistency:** Terminology matches the rest of the site (e.g. “Compiler Plugin”, “Gradle Plugin”, “@StructuredScope”).
- [ ] **Tone:** Professional, clear, and consistent with the [tone and style](#tone-and-style) below.
- [ ] **Search:** If you add new concepts or page titles, consider whether the in-app search (which indexes `DOCS_CONTENT` and nav) will still return relevant results.

---

## Tone and Style

- **Audience:** Developers (Kotlin/Android) who want to adopt structured concurrency and use the toolkit.
- **Voice:** Authoritative but approachable: “we recommend”, “you can”, “this rule detects”.
- **Conventions:**  
  - Use **bold** for important terms and rule/feature names on first use.  
  - Use `code` for API names, rule IDs, config keys, and file names.  
  - Prefer active voice and short sentences.  
  - Keep code samples minimal and runnable where possible; link to full examples in the repo or source docs if needed.

---

## Quick Reference: File Locations

| Purpose | Path |
|--------|------|
| Source documentation | `docs/ANNOTATIONS.md`, `docs/BEST_PRACTICES_COROUTINES.md`, `docs/COMPILER.md`, `docs/DEPLOY-TUTORIAL.md`, `docs/DETEKT-RULES.md`, `docs/GRADLE-PLUGIN.md`, `docs/INTELLIJ-PLUGIN.md`, `docs/LINT-RULES.md` |
| Website content (doc bodies, nav, modules) | `constants.tsx` |
| Project readme | `README.md` |
| This guide | `docs/CONTENT-WRITERS-GUIDE.md` |

Use this guide as the single place to understand how documentation flows from source files to the website and how to keep both professional and in sync.
