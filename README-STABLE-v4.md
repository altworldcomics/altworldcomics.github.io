# AltWorld Comics Website — Stable Theme Architecture v4

This package replaces the patch-on-patch styling model with three predictable layers.

## 1. Global publisher layer

`brand-theme.css` owns:

- the AltWorld Comics top header
- global navigation sizing and alignment
- the footer
- default blue/steel publisher colors
- generic work-page color variables
- shared compact typography

The **header structure must never be redefined inside a series theme**.

The standard header is:

```html
<header class="topbar">
  <a class="brand-wrap" href="/">
    <img class="site-logo" src="/images/altworld-comics-logo.jpg" alt="AltWorld Comics logo">
    <span>ALTWORLD COMICS</span>
  </a>
  <nav class="nav">
    <a class="nav-link" href="/#home">Home</a>
    <a class="nav-link" href="/#books">Books</a>
    <a class="nav-link" href="/#comics">Comics</a>
    <a class="nav-link" href="/#store">Store</a>
    <a class="nav-link" href="/#about">About</a>
  </nav>
</header>
```

## 2. Chronicles of Ankhara theme

Every Ankhara page should load only:

```html
<link rel="stylesheet" href="/books/chronicles-of-ankhara/ankhara.css">
```

`ankhara.css` imports the generic work layout and publisher theme, then switches the section variables to the Ankhara gold fantasy palette.

Future Ankhara pages therefore inherit:

- the exact same publisher header dimensions
- the gold Ankhara palette
- the Ankhara sub-navigation and components

The former `ankhara-home.css` is merged into `ankhara.css`.

## 3. Dark Tales theme

Every Dark Tales page should load only:

```html
<link rel="stylesheet" href="/comics/dark-tales/dark-tales.css">
```

`dark-tales.css` imports the generic work layout and publisher theme, then switches the section variables to the Dark Tales red/black palette.

Future Dark Tales pages therefore inherit:

- the exact same publisher header dimensions
- the red Dark Tales palette
- the Dark Tales sub-navigation and components

The former `final-fixes.css` is merged into `dark-tales.css`.

## Homepage portals

The Books / Comics visual portals are now real HTML in `index.html`.

`footer.js` no longer rewrites the homepage or injects homepage CSS. It only adds the social links to the footer.

## Sitemap

Old `/stories/` Ankhara URLs were removed and replaced with `/lore/`.
The newer Dark Tales Lore, Characters and Issues URLs are included.

## Images

The current repository `/images/` directory is intentionally preserved.

The GitHub connector used to build this package can read the repository tree and text files but cannot export the binary image files as a downloadable repository archive. All CSS/HTML references in this package point to the image files that already exist in the live repository.

**Do not delete `/images/` when deploying this package.**
