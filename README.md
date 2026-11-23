# Atelier Vérane: architecture studio

Static website (HTML, CSS, JavaScript). No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or run `npx serve .` in this folder.

## Deploy (free)
- **Vercel / Netlify:** drag this folder (or the .zip) into the dashboard. Done.
- **GitHub Pages:** push the files to a repo, then Settings > Pages > Deploy from branch.

## Make the form(s) work (contact form)
1. Create a free form at https://formspree.io (or https://web3forms.com).
2. Copy the endpoint URL they give you.
3. In the HTML, find the `<form ... data-endpoint="">` and paste the URL between the quotes.
4. Redeploy and send a test message.

## Add a project
Open `app.js`, duplicate an object in `PROJECTS`, and choose a `shape` (house, tower, pavilion, barrel, terrace, saw). To use real photos instead, replace the `drawing()` call with an `<img>` tag.

## Customise
Colours and fonts are CSS variables at the top of `style.css`. Replace the placeholder names, texts and prices with the client's real content.

