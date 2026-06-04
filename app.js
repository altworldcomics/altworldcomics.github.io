let siteData = null;
const fallbackImg = "images/banner.png";

async function loadData() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("data.json could not be loaded.");
    siteData = await res.json();
  } catch (e) {
    console.error(e);
    siteData = { site: {}, posts: [], store: [], about: {} };
  }
  renderSite();
  bindTabs();
}

function safe(v, f = "") { return v || f; }
function escapeAttr(v) { return String(v || "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }
function setImage(id, src) { const el = document.getElementById(id); if (el && src) el.src = src; }

function renderSite() {
  const s = siteData.site || {};
  document.title = safe(s.title, "AltWorld Comics");
  document.getElementById("siteTitle").textContent = safe(s.title, "ALTWORLD COMICS");
  document.getElementById("siteTagline").textContent = safe(s.tagline, "Old tales. New adventures.");
  document.getElementById("siteIntro").textContent = safe(s.intro, "");
  setImage("siteLogo", safe(s.logo, "images/logo.png"));
  setImage("heroBanner", safe(s.banner, "images/banner.png"));
  renderPosts(siteData.posts || []);
  renderStore(siteData.store || []);
  renderAbout(siteData.about || {});
}

function renderPosts(posts) {
  const modal = document.getElementById("postModal");
  const modalBody = document.getElementById("modalContent");

  window.openPost = function(index) {
    const p = posts[index];
    if (!p) return;
    const fullText = safe(p.body, p.excerpt || "");
    const extraLink = (p.link && p.link !== "#")
      ? `<div class="modal-actions"><a class="btn" href="${escapeAttr(p.link)}" target="_blank" rel="noopener">${safe(p.linkText,"Open Link")}</a></div>`
      : "";

    modalBody.innerHTML = `
      <article class="modal-post">
        <img class="modal-img modal-img-post" src="${escapeAttr(safe(p.image, fallbackImg))}" alt="${escapeAttr(safe(p.title,""))}" onerror="this.src='${fallbackImg}'">
        <div class="modal-inner">
          <div class="card-date">${safe(p.date,"")}</div>
          <h2>${safe(p.title,"")}</h2>
          <div class="modal-text">${fullText}</div>
          ${extraLink}
        </div>
      </article>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  document.getElementById("postsGrid").innerHTML = posts.map((p, i) => `
    <article class="card post-card">
      <div class="card-media post-media">
        <img src="${escapeAttr(safe(p.image, fallbackImg))}" alt="${escapeAttr(safe(p.title,"AltWorld Comics post"))}" onerror="this.src='${fallbackImg}'">
      </div>
      <div class="card-body">
        <div class="card-date">${safe(p.date,"")}</div>
        <h3>${safe(p.title,"")}</h3>
        <p>${safe(p.excerpt,"")}</p>
        <button class="btn" onclick="openPost(${i})">Read More</button>
      </div>
    </article>`).join("");
}

function renderStore(items) {
  document.getElementById("storeGrid").innerHTML = items.map(i => `
    <article class="card store-card">
      <div class="card-media store-media">
        <img src="${escapeAttr(safe(i.image, fallbackImg))}" alt="${escapeAttr(safe(i.title,"AltWorld Comics release"))}" onerror="this.src='${fallbackImg}'">
      </div>
      <div class="card-body">
        <div class="card-status">${safe(i.status,"")}</div>
        <h3>${safe(i.title,"")}</h3>
        <p>${safe(i.description,"")}</p>
        ${i.link && i.link !== "#" ? `<a class="btn" href="${escapeAttr(i.link)}" target="_blank" rel="noopener">${safe(i.button,"Open")}</a>` : `<span class="btn muted-btn">${safe(i.button,"Coming Soon")}</span>`}
      </div>
    </article>`).join("");
}

function renderAbout(a) {
  document.getElementById("aboutHeading").textContent = safe(a.heading, "About AltWorld Comics");
  document.getElementById("aboutBody").textContent = safe(a.body, "");
  document.getElementById("aboutContact").textContent = safe(a.contact, "");
  document.getElementById("aboutX").href = safe(a.x, "#");
  document.getElementById("aboutInstagram").href = safe(a.instagram, "#");
}

function closePost() {
  const modal = document.getElementById("postModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
window.closePost = closePost;

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePost(); });

function bindTabs() {
  document.querySelectorAll("[data-tab]").forEach(b => {
    b.addEventListener("click", e => {
      e.preventDefault();
      showTab(b.dataset.tab);
    });
  });
  if (location.hash) {
    const t = location.hash.replace("#", "");
    if (document.getElementById(t)) showTab(t, false);
  }
}

function showTab(t, shouldScroll = true) {
  document.querySelectorAll(".page-section").forEach(s => s.classList.remove("active-section"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  document.getElementById(t)?.classList.add("active-section");
  document.querySelector(`.nav-link[data-tab="${t}"]`)?.classList.add("active");
  history.replaceState(null, "", `#${t}`);
  if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

loadData();
