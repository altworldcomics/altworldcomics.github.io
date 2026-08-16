(() => {
  const footer = document.querySelector("footer");

  if (footer) {
    footer.classList.add("altworld-footer");

    // Avoid duplicating the social block if the script is loaded twice.
    if (!footer.querySelector(".footer-social")) {
      const social = document.createElement("nav");
      social.className = "footer-social";
      social.setAttribute("aria-label", "AltWorld Comics social media");

      const accounts = [
        {
          name: "Instagram",
          url: "https://www.instagram.com/altworldcomics/",
          svg: `<svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm8.95 1.5a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
          </svg>`
        },
        {
          name: "X",
          url: "https://x.com/altworldcomix",
          svg: `<svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.25 2H21l-6.01 6.87L22 22h-5.49l-4.3-5.62L7.3 22H4.55l6.37-7.28L4.2 2h5.63l3.89 5.14L18.25 2Zm-.96 17.69h1.52L9 4.19H7.37l9.92 15.5Z"/>
          </svg>`
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/altworldcomics",
          svg: `<svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.7 22v-8.4h2.82l.42-3.28H13.7V8.23c0-.95.26-1.6 1.63-1.6h1.74V3.7c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.53-4.22 4.34v2.42H7.5v3.28h2.82V22h3.38Z"/>
          </svg>`
        }
      ];

      accounts.forEach(account => {
        const link = document.createElement("a");
        link.href = account.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `AltWorld Comics on ${account.name}`);
        link.title = account.name;
        link.innerHTML = account.svg;
        social.appendChild(link);
      });

      const tagline = footer.querySelector("span:last-child");
      if (tagline) footer.insertBefore(social, tagline);
      else footer.appendChild(social);
    }
  }

  // Homepage: replace the large text-heavy Books & Comics cards
  // with compact visual portals. No index.html edit is required.
  const home = document.querySelector("#home");
  const splitCards = home?.querySelector(".split-cards");

  if (splitCards && !splitCards.classList.contains("visual-portals")) {
    const sectionTitle = splitCards.previousElementSibling;
    if (sectionTitle?.classList.contains("section-title")) {
      sectionTitle.classList.add("portal-section-title");
    }

    const portals = [
      { label: "Books", image: "images/books.webp", href: "#books", tab: "books" },
      { label: "Comics", image: "images/comics.webp", href: "#comics", tab: "comics" }
    ];

    splitCards.classList.add("visual-portals");
    splitCards.innerHTML = "";

    portals.forEach(item => {
      const link = document.createElement("a");
      link.className = "visual-portal";
      link.href = item.href;
      link.dataset.tab = item.tab;
      link.setAttribute("aria-label", `Explore ${item.label}`);

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = `${item.label} — AltWorld Comics`;
      img.width = 480;
      img.height = 480;
      img.loading = "eager";

      link.appendChild(img);
      splitCards.appendChild(link);
    });
  }

  // Keep this homepage-only styling self-contained so no other page changes.
  if (document.querySelector("#home .visual-portals") && !document.querySelector("#altworld-home-portals-style")) {
    const style = document.createElement("style");
    style.id = "altworld-home-portals-style";
    style.textContent = `
      #home .portal-section-title{
        text-align:center;
        margin-bottom:14px;
      }
      #home .portal-section-title p,
      #home .portal-section-title h1{
        text-align:center;
      }
      #home .visual-portals{
        width:min(100%,680px);
        margin:0 auto;
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:22px;
        align-items:center;
      }
      #home .visual-portal{
        display:block;
        position:relative;
        aspect-ratio:1;
        overflow:hidden;
        border:1px solid rgba(76,151,255,.20);
        border-radius:14px;
        background:#03070c;
        text-decoration:none;
        transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
      }
      #home .visual-portal img{
        width:100%;
        height:100%;
        display:block;
        object-fit:cover;
      }
      #home .visual-portal:hover,
      #home .visual-portal:focus-visible{
        transform:translateY(-3px);
        border-color:rgba(76,151,255,.65);
        box-shadow:0 14px 30px rgba(0,79,180,.14);
        outline:none;
      }
      @media(max-width:700px){
        #home .visual-portals{
          width:min(100%,520px);
          gap:12px;
        }
      }
      @media(max-width:480px){
        #home .visual-portals{
          width:min(100%,360px);
          gap:8px;
        }
        #home .visual-portal{
          border-radius:10px;
        }
      }
    `;
    document.head.appendChild(style);
  }
})();
