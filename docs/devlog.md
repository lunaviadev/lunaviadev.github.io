# Dev Log: Portfolio Website with Auto Documentation

## What I planned to do

- I already had a finished portfolio at lunavia.dev, so the plan was to adapt it to the brief instead of starting over
- What was left: a documented code sample, automated docs generation, and deployment through GitHub Actions
- *Why did I pick JSDoc over Doxygen or pdoc?* (The site is HTML/JS, and JSDoc runs with `npx` without installing anything)

## How I did it

- Pulled the real JavaScript out of `index.html` (carousel, scroll reveal, active nav, Discord copy) into `src/portfolio.js` and added JSDoc comments (`@file`, `@param`, `@returns`)
- Wrote `.github/workflows/pages.yml` with two jobs: **build** (checkout → Node → `jsdoc` → upload) and **deploy**
- Changed Settings → Pages → Source from "Deploy from a branch" to "GitHub Actions", keeping the custom domain

## Changes and adaptations

- The `.github` folder was first created inside `src/` by mistake, so the workflow wouldn't have been found. I had to move it to the repo root
- After switching Pages to Actions, `/api/` gave a 404. The changes hadn't been committed and pushed yet, so the workflow had never run
- Docs are output to `api/` rather than `docs/` so they don't clash with the `docs/setup.md` file the brief asks for
- Found that a stray `memory/` notes folder would have been published publicly, because everything in a Pages repo gets served
- *Anything else that surprised me or that I'd do differently?*

## What I learned

- How GitHub Actions workflows are structured: triggers (`on`), `permissions`, jobs, steps, `needs`
- Deploying from a branch vs. deploying from Actions, and why a build step needs the latter
- Writing JSDoc comments and how they turn into a docs site
- *Skills I'd use again, e.g. automating docs for future game tools or jam projects*
