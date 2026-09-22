# bryte-dev.github.io

Personal portfolio website for GitHub Pages.

## Local structure

```text
/
├── index.html
├── README.md
└── assets/
    ├── script.js
    └── styles.css
```

## Customize the portfolio

The site is intentionally simple: plain HTML, CSS, and JavaScript so it can be published directly with GitHub Pages.

Main edit points:

- Update text content directly in `index.html`
- Tweak colors, spacing, and layout in `assets/styles.css`
- Adjust interactions in `assets/script.js`

### Useful content placeholders

- Replace GitHub placeholder links in the **Featured Projects** section with direct repository or demo URLs
- Update the LinkedIn placeholder button with the final profile URL
- Add screenshots or visuals inside `assets/` and replace the project preview placeholder text
- Add a CV PDF at `assets/Milian-CV.pdf` and convert the current placeholder button into a real download link

## Publish on GitHub Pages

Because this repository is a user Pages repository (`bryte-dev.github.io`), deployment can stay extremely simple:

1. Push the portfolio files to the default branch
2. In GitHub, open **Settings → Pages**
3. Set the source to **Deploy from a branch**
4. Select the default branch and `/ (root)`
5. Save and wait for GitHub Pages to publish the site

The homepage will be served from the root `index.html`.
