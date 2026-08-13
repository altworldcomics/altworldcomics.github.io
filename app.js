let siteData=null;
const fallbackImg="images/banner.png";
const safe=(v,f="")=>v||f;
const esc=v=>String(v||"").replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");

async function loadData(){
  try{
    const res=await fetch("data.json",{cache:"no-store"});
    if(!res.ok) throw new Error("data.json could not be loaded.");
    siteData=await res.json();
  }catch(e){
    console.error(e);
    siteData={site:{},posts:[],store:[],about:{}};
  }
  renderSite(); bindTabs(); bindFilters();
}

function renderSite(){
  const s=siteData.site||{};
  document.getElementById("siteTitle").textContent=safe(s.title,"ALTWORLD COMICS");
  document.getElementById("siteTagline").textContent=safe(s.tagline,"Old tales. New adventures. Different worlds.");
  document.getElementById("siteIntro").textContent=safe(s.intro,"");
  if(s.logo) document.getElementById("siteLogo").src=s.logo;
  if(s.banner) document.getElementById("heroBanner").src=s.banner;
  renderPosts(siteData.posts||[]);
  renderBooks();
  renderComics();
  renderStore("all");
  renderAbout(siteData.about||{});
}

function itemCard(i){
  return `<article class="card catalog-card">
    <div class="card-media cover-media"><img src="${esc(safe(i.image,fallbackImg))}" alt="${esc(i.title)}"></div>
    <div class="card-body">
      <div class="card-meta">${esc(i.genre)} · ${esc(i.collection)}</div>
      <h3>${esc(i.title)}</h3><p>${esc(i.description)}</p>
      <div class="card-actions">
        <a class="btn secondary" href="${esc(i.detailUrl)}">View Details</a>
        <a class="btn" href="${esc(i.link)}" target="_blank" rel="noopener">Amazon ↗</a>
      </div>
    </div></article>`;
}

function renderBooks(){
  const items=(siteData.store||[]).filter(i=>i.type==="book");
  document.getElementById("booksGrid").innerHTML=items.map(itemCard).join("");
}
function renderComics(){
  const all=(siteData.store||[]).filter(i=>i.type==="comic");
  document.getElementById("originalsGrid").innerHTML=all.filter(i=>i.collection==="Originals").map(itemCard).join("");
  document.getElementById("remasteredGrid").innerHTML=all.filter(i=>i.collection==="Remastered Classics").map(itemCard).join("");
}
function renderStore(filter){
  const items=(siteData.store||[]).filter(i=>filter==="all"||i.type===filter||i.collection===filter);
  document.getElementById("storeGrid").innerHTML=items.map(itemCard).join("");
}
function bindFilters(){
  document.querySelectorAll(".filter-btn").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active"); renderStore(b.dataset.filter);
  }));
}
function renderPosts(posts){
  const modal=document.getElementById("postModal"), body=document.getElementById("modalContent");
  window.openPost=index=>{
    const p=posts[index]; if(!p)return;
    body.innerHTML=`<article class="modal-post"><img class="modal-img" src="${esc(safe(p.image,fallbackImg))}" alt="${esc(p.title)}">
      <div class="modal-inner"><div class="card-meta">${esc(p.date)}</div><h2>${esc(p.title)}</h2>
      <div class="modal-text">${esc(safe(p.body,p.excerpt))}</div>
      ${p.link&&p.link!=="#"?`<div class="card-actions" style="margin-top:24px"><a class="btn" href="${esc(p.link)}">${esc(safe(p.linkText,"Open"))}</a></div>`:""}
      </div></article>`;
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
  };
  document.getElementById("postsGrid").innerHTML=posts.map((p,i)=>`<article class="card post-card">
    <div class="card-media post-media"><img src="${esc(safe(p.image,fallbackImg))}" alt="${esc(p.title)}"></div>
    <div class="card-body"><div class="card-meta">${esc(p.date)}</div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>
    <button class="btn" onclick="openPost(${i})">Read More</button></div></article>`).join("");
}
function renderAbout(a){
  document.getElementById("aboutHeading").textContent=safe(a.heading,"About AltWorld Comics");
  document.getElementById("aboutBody").textContent=safe(a.body,"");
  document.getElementById("aboutContact").textContent=safe(a.contact,"");
  document.getElementById("aboutX").href=safe(a.x,"#");
  document.getElementById("aboutInstagram").href=safe(a.instagram,"#");
}
function closePost(){const m=document.getElementById("postModal");m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.style.overflow=""}
window.closePost=closePost;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePost()});
function bindTabs(){
  document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();showTab(b.dataset.tab)}));
  const t=location.hash.replace("#",""); if(t&&document.getElementById(t))showTab(t,false);
}
function showTab(t,scroll=true){
  document.querySelectorAll(".page-section").forEach(s=>s.classList.remove("active-section"));
  document.querySelectorAll(".nav-link").forEach(l=>l.classList.remove("active"));
  document.getElementById(t)?.classList.add("active-section");
  document.querySelector(`.nav-link[data-tab="${t}"]`)?.classList.add("active");
  history.replaceState(null,"",`#${t}`); if(scroll)window.scrollTo({top:0,behavior:"smooth"});
}
loadData();
