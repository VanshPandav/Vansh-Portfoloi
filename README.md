# Vansh Pandav — Personal Portfolio

A responsive, light-theme portfolio built with **React and Vite**, using plain CSS. It is frontend-only: no backend, database, login, or AI integration.

React organizes the page into reusable pieces, such as project cards. Vite provides a local development server and builds the files needed for hosting.

## Run locally

Install Node.js 22.12 or newer, then open a terminal in this folder:

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. Changes appear as you save files. Stop the server with Ctrl+C.

## Edit your portfolio

| File | What to change |
| --- | --- |
| `src/content.js` | Introduction, projects, tools, outcomes, experience, education, skills, and contact links |
| `public/assets/Vansh_Pandav.pdf` | Replace with your updated résumé, keeping the same filename |
| `src/styles.css` | Colors, spacing, fonts, and mobile layouts; main colors are at the top |
| `src/App.jsx` | Page sections and reusable components |
| `index.html` | Browser title and search-engine description |

For routine content updates, edit `src/content.js`. Each project is an object with a name, description, contribution, tools, outcome, and links. The first three projects appear immediately; others are inside “Explore more projects.” Use `links: []` when a project has no public link. No screenshots are needed.

Text is enclosed in quotes. If text contains an apostrophe, use double quotes around the string or escape the apostrophe: `I\'m`.

## Build and check

```bash
npm run build
npm run preview
```

`build` creates the production website in `dist/`. `preview` serves that build locally so you can check it before publishing. Do not edit `dist/` directly.

## Content sources

Content is based on the supplied résumé and project portfolio. Your directly supplied LinkedIn URL takes precedence over the older URL inside the résumé. The downloadable PDF is unchanged and still contains its original links.

Credible Atlas links to [the supplied live site](https://community.credibledata.com/atlas/) and [Credible’s project article](https://www.credibledata.com/blog/posts/building-atlas). Individual contributions come from your documents rather than attributing all team work in the article to you.

## Hosting

The generated `dist/` folder can be published to static hosting. Relative asset paths support hosting under a repository path, such as GitHub Pages. GitHub Pages will need a build-and-deploy workflow for React; serving the source files directly is not sufficient. Hosting is not configured yet, and no custom domain is required.

## Skills display

The rotating skills globe reads the `skills` groups in `src/content.js`. Edit those groups to update both the globe and the categorized list. The component lives in `src/Skills.jsx`, with its appearance in `src/skills.css`. Visitors can pause rotation; reduced-motion preferences disable animation automatically.

The cloud displays the shorter `cloudSkills` list in `src/content.js`; the categorized list retains every skill. Drag with a mouse or touch, or focus the cloud and use arrow keys. Manrope and DM Sans are bundled locally through Fontsource. The background texture is CSS, with no image downloads.
