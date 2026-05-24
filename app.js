const state = { data: null };

async function loadData(){
  const response = await fetch('data.json', { cache: 'no-store' });
  state.data = await response.json();
  renderSite();
}

function $(selector){ return document.querySelector(selector); }
function el(tag, className, html){
  const node = document.createElement(tag);
  if(className) node.className = className;
  if(html !== undefined) node.innerHTML = html;
  return node;
}
function safeText(value){ return String(value || ''); }
function setImage(node, src, fallback){ node.src = src || fallback; }

function renderSite(){
  const { site, posts, store, about } = state.data;
  document.title = site.title || 'AltWorld Comics';
  $('#siteLogo').src = site.logo || 'images/logo.png';
  $('#heroBanner').src = site.heroImage || 'images/banner.png';
  $('#twitterLink').href = site.twitter || '#';
  $('#instagramLink').href = site.instagram || '#';

  const postGrid = $('#postGrid');
  postGrid.innerHTML = '';
  [...(posts || [])]
    .sort((a,b)=> String(b.date).localeCompare(String(a.date)))
    .forEach(post => {
      const card = el('article', 'card');
      card.innerHTML = `
        <img src="${safeText(post.image)}" alt="${safeText(post.title)}">
        <div class="card-content">
          <p class="date">${safeText(post.date)}</p>
          <h3>${safeText(post.title)}</h3>
          <p>${safeText(post.excerpt || post.body)}</p>
          ${post.buttonUrl ? `<a class="small-button" href="${safeText(post.buttonUrl)}" target="_blank" rel="noopener">${safeText(post.buttonText || 'Read more')}</a>` : ''}
        </div>`;
      postGrid.appendChild(card);
    });

  const storeGrid = $('#storeGrid');
  storeGrid.innerHTML = '';
  (store || []).forEach(item => {
    const card = el('article', 'store-card');
    const isDisabled = !item.buttonUrl || item.buttonUrl === '#';
    card.innerHTML = `
      <img src="${safeText(item.cover)}" alt="${safeText(item.title)} cover">
      <p class="status">${safeText(item.status)}</p>
      <h3>${safeText(item.title)}</h3>
      <p><strong>${safeText(item.subtitle)}</strong></p>
      <p>${safeText(item.description)}</p>
      <a class="small-button" href="${isDisabled ? '#' : safeText(item.buttonUrl)}" ${isDisabled ? '' : 'target="_blank" rel="noopener"'}>${safeText(item.buttonText || 'Read on Kindle')}</a>`;
    storeGrid.appendChild(card);
  });

  $('#aboutTitle').textContent = about?.title || 'About AltWorld Comics';
  $('#aboutBody').textContent = about?.body || '';
  $('#aboutContact').textContent = about?.contact || '';
  $('#aboutContact').href = `mailto:${about?.contact || ''}`;
  setImage($('#aboutImage'), about?.image, 'images/about-altworld-comics.jpg');
  $('#year').textContent = new Date().getFullYear();
}

function setRoute(route){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.querySelectorAll('.top-nav a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById(route) || document.getElementById('main');
  page.classList.add('active-page');
  document.querySelectorAll(`[data-route="${route}"]`).forEach(a => a.classList.add('active'));
}

document.addEventListener('click', e => {
  const link = e.target.closest('[data-route]');
  if(!link) return;
  e.preventDefault();
  const route = link.dataset.route;
  history.pushState(null, '', `#${route}`);
  setRoute(route);
});
window.addEventListener('popstate', () => setRoute(location.hash.replace('#','') || 'main'));

loadData().then(() => setRoute(location.hash.replace('#','') || 'main')).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML('afterbegin', '<div style="padding:16px;background:#5b1010;color:white">data.json could not be loaded. Check file path and JSON format.</div>');
});
