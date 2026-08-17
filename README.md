# AltWorld Comics

Official website repository for **AltWorld Comics**.

The site is published with GitHub Pages and contains the AltWorld Comics catalogue, series pages, character and lore sections, and links to current releases.

## Site Architecture

The site uses a shared publisher layer with separate visual themes for individual series.

### Global publisher layer

- `index.html` — main AltWorld Comics homepage and catalogue portals
- `styles.css` — homepage layout and components
- `work.css` — shared layouts for books, comics, series, and individual releases
- `brand-theme.css` — global AltWorld Comics theme, header, navigation, footer, shared colors, and common UI rules
- `app.js` — homepage catalogue/filter behavior
- `footer.js` — shared footer enhancements
- `data.json` — catalogue/store data
- `sitemap.xml` and `robots.txt` — search-engine discovery

The publisher header and its navigation are defined globally. Series themes should not redefine the global header geometry.

## Books

### Chronicles of Ankhara

Path: `books/chronicles-of-ankhara/`

Ankhara uses a dedicated theme file:

`books/chronicles-of-ankhara/ankhara.css`

This stylesheet imports the shared site layers and applies the Ankhara gold fantasy palette and series-specific components. All Ankhara pages — Home, Lore, Characters, Books, character profiles, lore articles, and individual book pages — use this shared theme.

### KnowAll

Path: `books/knowall/`

KnowAll uses the standard AltWorld Comics work-page architecture.

## Comics

### Dark Tales

Path: `comics/dark-tales/`

Dark Tales uses:

`comics/dark-tales/dark-tales.css`

The theme imports the shared site layers and applies the Dark Tales red/black palette. Home, Lore, Characters, Issues, character profiles, and individual issue pages all inherit the same Dark Tales visual system.

### Fantomah

Path: `comics/fantomah/`

Fantomah is part of the **Remastered Classics** line and uses the shared AltWorld Comics work-page architecture.

## Images

Shared artwork and site assets are stored in:

`images/`

Series pages reference these assets directly. Before deleting an image, verify that it is not referenced by HTML, CSS, JavaScript, catalogue data, metadata, or social preview tags.

## Adding New Pages

For a normal AltWorld Comics book/comic page, use the shared `work.css` + `brand-theme.css` structure.

For a new **Chronicles of Ankhara** page, load:

```html
<link rel="stylesheet" href="/books/chronicles-of-ankhara/ankhara.css">
```

For a new **Dark Tales** page, load:

```html
<link rel="stylesheet" href="/comics/dark-tales/dark-tales.css">
```

Do not create page-specific patch stylesheets when the rule belongs to the global or series theme.

## Publishing

The repository is deployed through GitHub Pages. Changes pushed to the publishing branch become part of the live AltWorld Comics site after GitHub Pages completes deployment.

Live site: https://altworldcomics.github.io/
