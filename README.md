# Lunavia · Game Developer Portfolio

**Live site:** <https://lunavia.dev>
**Generated docs:** <https://lunavia.dev/api/>

![The portfolio live in the browser](docs/images/live-site.png)

## Contents

1. [About](#about)
2. [Repository structure](#repository-structure)
3. [Documentation](#documentation)
4. [Setup: GitHub Actions & GitHub Pages](#setup-github-actions--github-pages)
5. [Dev Log](#dev-log)

---

## About

This is my personal portfolio as a game developer, director and artist. It brings my projects together in one place so studios, collaborators and players can see what I've made and get in touch.

The site includes:

- **Landing page:** my name, a short bio, and contact links (Discord, Twitter, itch.io, Steam).
- **Project pages:** BCKSPCE, Within Time, Protocol: Shutdown, Colourways and more, each with a description, screenshots and store links.
- **Consistent styling:** a cybercore / early-2000s skeuomorphic theme (chrome bevel panels, neon cyan accents, Orbitron + Share Tech Mono type) used across every page.

## Repository structure

```
.github/workflows/pages.yml   GitHub Actions workflow (build docs + deploy)
src/portfolio.js              Documented JavaScript sample (carousel, scroll reveal, nav, clipboard)
docs/setup.md                 How the workflow and GitHub Pages are set up
docs/images/                  Screenshots used in this README
index.html                    Landing page
project-*.html                Individual project pages
```

## Documentation

The code in `src/` is documented with [JSDoc](https://jsdoc.app/) comments. On every push to `main`, GitHub Actions generates the HTML documentation and publishes it alongside the site at **[lunavia.dev/api](https://lunavia.dev/api/)**.

### Building the docs locally

Requires [Node.js](https://nodejs.org/) (v18 or newer).

```bash
npx jsdoc src -r -d api
```

Then open `api/index.html` in your browser. The `api/` folder is generated output and is ignored by git.

### Previewing the site locally

The site is plain HTML/CSS/JS, so you can open `index.html` directly in a browser, or serve the folder with:

```bash
npx serve .
```

---

## Setup: GitHub Actions & GitHub Pages

This section explains how the portfolio site and its generated documentation are built and deployed automatically.

### 1. How the GitHub Actions workflow works

The workflow lives in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). It runs automatically every time a commit is pushed to the `main` branch, and can also be started manually from the **Actions** tab (`workflow_dispatch`).

It is split into two jobs.

#### Build job

| Step | What it does |
|---|---|
| **Check out the repository** | `actions/checkout` downloads the repo onto a fresh Ubuntu runner provided by GitHub. |
| **Set up Node.js** | `actions/setup-node` installs Node 22 so `npx` is available. |
| **Generate documentation with JSDoc** | Runs `npx jsdoc src -r -d api`. JSDoc reads the `/** ... */` comments in `src/portfolio.js` and writes an HTML documentation site into an `api/` folder. |
| **Configure GitHub Pages** | `actions/configure-pages` prepares the Pages deployment settings. |
| **Upload site and docs** | `actions/upload-pages-artifact` packages the whole repository (the portfolio pages **plus** the freshly generated `api/` folder) as a Pages artifact. |

#### Deploy job

The deploy job waits for the build to finish (`needs: build`), then publishes the uploaded artifact to GitHub Pages with `actions/deploy-pages`.

The workflow is granted `pages: write` and `id-token: write` permissions so it is allowed to deploy, and a `concurrency` group makes sure only one deployment runs at a time.

```
push to main ──► build job ──────────────────────────────► deploy job ──► lunavia.dev
                 checkout → setup Node → jsdoc → upload       deploy-pages
```

![Successful workflow runs in the Actions tab](docs/images/actions-run.png)

### 2. How GitHub Pages is enabled

1. Open the repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions** instead of *Deploy from a branch*. This hands deployment over to the custom workflow above (the suggested Jekyll / Static HTML templates are not needed).
3. Under **Custom domain**, the site uses `lunavia.dev` (backed by the `CNAME` file in the repo), with **Enforce HTTPS** turned on.

![GitHub Pages settings with GitHub Actions selected as the source](docs/images/pages-settings.png)

### 3. Where the generated docs appear

| Page | URL |
|---|---|
| Portfolio | <https://lunavia.dev/> |
| Generated JSDoc documentation | <https://lunavia.dev/api/> |

The `api/` folder is **not** committed to the repository. It is generated fresh by the workflow on every push, so the documentation always matches the latest code in `src/`.

![Generated JSDoc documentation live at lunavia.dev/api/](docs/images/api-docs.png)

---

## Dev Log

### What I planned to do

- I already had a finished portfolio at lunavia.dev, so the plan was to adapt it to the brief instead of starting over
- What was left: a documented code sample, automated docs generation, and deployment through GitHub Actions
- *Why did I pick JSDoc over Doxygen or pdoc?* (The site is HTML/JS, and JSDoc runs with `npx` without installing anything)

### How I did it

- Pulled the real JavaScript out of `index.html` (carousel, scroll reveal, active nav, Discord copy) into `src/portfolio.js` and added JSDoc comments (`@file`, `@param`, `@returns`)
- Wrote `.github/workflows/pages.yml` with two jobs: **build** (checkout → Node → `jsdoc` → upload) and **deploy**
- Changed Settings → Pages → Source from "Deploy from a branch" to "GitHub Actions", keeping the custom domain

### Changes and adaptations

- The `.github` folder was first created inside `src/` by mistake, so the workflow wouldn't have been found. I had to move it to the repo root
- After switching Pages to Actions, `/api/` gave a 404. The changes hadn't been committed and pushed yet, so the workflow had never run
- Docs are output to `api/` rather than `docs/` so they don't clash with the `docs/setup.md` file the brief asks for
- Found that a stray `memory/` notes folder would have been published publicly, because everything in a Pages repo gets served
- *Anything else that surprised me or that I'd do differently?*

### What I learned

- How GitHub Actions workflows are structured: triggers (`on`), `permissions`, jobs, steps, `needs`
- Deploying from a branch vs. deploying from Actions, and why a build step needs the latter
- Writing JSDoc comments and how they turn into a docs site
- *Skills I'd use again, e.g. automating docs for future game tools or jam projects*
