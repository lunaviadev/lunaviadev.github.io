# Lunavia · Game Developer Portfolio

**Live site:** <https://lunavia.dev>
**Generated docs:** <https://lunavia.dev/api/>

![The portfolio live in the browser](docs/images/live-site.png)

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
docs/images/                  Screenshots used in the documentation
index.html                    Landing page
project-*.html                Individual project pages
```

## Documentation

The code in `src/` is documented with [JSDoc](https://jsdoc.app/) comments. On every push to `main`, GitHub Actions generates the HTML documentation and publishes it alongside the site at **[lunavia.dev/api](https://lunavia.dev/api/)**.

See [`docs/setup.md`](docs/setup.md) for a full explanation of the workflow and the GitHub Pages configuration.

### Building the docs locally

Requires [Node.js](https://nodejs.org/) (v18 or newer).

```bash
npx jsdoc src -r -d api
```

Then open `api/index.html` in your browser. The `api/` folder is generated output and does not need to be committed.

### Previewing the site locally

The site is plain HTML/CSS/JS, so you can open `index.html` directly in a browser, or serve the folder with:

```bash
npx serve .
```

## Deployment

Deployment is fully automatic: pushing to `main` triggers `.github/workflows/pages.yml`, which builds the docs and deploys the site to GitHub Pages under the custom domain `lunavia.dev`.
