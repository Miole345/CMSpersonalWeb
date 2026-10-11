// --- INITIAL DYNAMIC DATA STORE ---
let portfolioData = JSON.parse(localStorage.getItem('kape_portfolio')) || [
  { id: 1, title: 'Adaptive User Interface ML Prototype', tech: 'HTML/CSS, JS, Machine Learning', desc: 'Personalized UI layout recommendation engine for Human-Computer Interaction research.' },
  { id: 2, title: 'Student Billing & Exam Permit System', tech: 'MS Access, SQL, VBA', desc: 'Database permit generator and automated fee computation software.' },
  { id: 3, title: 'Java Swing GUI Applications', tech: 'Java, Swing', desc: 'Modular desktop tools including grade computation and developer profiler modules.' }
];

let blogData = JSON.parse(localStorage.getItem('kape_blog')) || [
  { id: 1, title: 'Configuring VLAN Names in Cisco Switch CLI', date: '2026-08-20', content: 'Updating VLAN IDs to IT (VLAN 10) and HRM (VLAN 20) for optimal assessment network scoring.' },
  { id: 2, title: 'Optimizing SFF Hardware with SSD Storage', date: '2026-08-15', content: 'Resolving boot loops on HP Compaq Pro 6300 systems by replacing failing drives with SATA SSDs.' }
];

let inboxData = JSON.parse(localStorage.getItem('kape_inbox')) || [
  { id: 1, name: 'Academic Evaluation Team', email: 'evaluator@arellano.edu.ph', message: 'Website submission and CMS portal verified successfully.', date: '2026-10-10' }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderPortfolio();
  renderBlog();
  renderInbox();
  
  // Sync hash navigation
  const hash = window.location.hash.replace('#', '') || 'home';
  navTo(hash);
});

// --- NAVIGATION CONTROLLER (10+ VIEWS) ---
function navTo(viewId) {
  const views = ['home', 'about', 'portfolio', 'blog', 'services', 'resume', 'gallery', 'testimonials', 'faq', 'contact', 'cms'];
  if (!views.includes(viewId)) viewId = 'home';

  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.add('hidden');
    
    const navBtn = document.getElementById(`nav-${v}`);
    if (navBtn) {
      navBtn.classList.remove('bg-slate-800', 'text-amber-500');
      navBtn.classList.add('text-slate-300');
    }
  });

  const activeView = document.getElementById(`view-${viewId}`);
  if (activeView) activeView.classList.remove('hidden');

  const activeNav = document.getElementById(`nav-${viewId}`);
  if (activeNav) {
    activeNav.classList.add('bg-slate-800', 'text-amber-500');
  }

  window.location.hash = viewId;
  document.getElementById('mobile-menu').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
}

// --- CMS PORTAL CONTROLLER ---
function switchCmsTab(tab) {
  ['portfolio', 'blog', 'inbox'].forEach(t => {
    document.getElementById(`cms-tab-${t}`).classList.add('hidden');
    const btn = document.getElementById(`tab-cms-${t}`);
    btn.classList.remove('bg-amber-500', 'text-slate-950');
    btn.classList.add('text-slate-400');
  });

  document.getElementById(`cms-tab-${tab}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`tab-cms-${tab}`);
  activeBtn.classList.add('bg-amber-500', 'text-slate-950');
  activeBtn.classList.remove('text-slate-400');
}

// --- RENDER FUNCTIONS ---
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  const cmsTable = document.getElementById('cms-portfolio-table');
  
  grid.innerHTML = '';
  cmsTable.innerHTML = '';

  portfolioData.forEach(item => {
    // Front-End View
    grid.innerHTML += `
      <div class="border border-slate-800 bg-slate-900/50 p-5 rounded-lg space-y-3 flex flex-col justify-between glow-hover">
        <div>
          <span class="text-[10px] font-mono bg-slate-800 text-amber-400 px-2 py-0.5 rounded">${item.tech}</span>
          <h3 class="font-bold text-white text-base mt-2">${item.title}</h3>
          <p class="text-slate-400 text-xs mt-2 leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `;

    // CMS Table View
    cmsTable.innerHTML += `
      <tr>
        <td class="p-3 font-medium text-white">${item.title}</td>
        <td class="p-3 text-xs text-amber-500 font-mono">${item.tech}</td>
        <td class="p-3 text-right">
          <button onclick="deletePortfolioItem(${item.id})" class="text-xs text-rose-400 hover:text-rose-300">Delete</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem('kape_portfolio', JSON.stringify(portfolioData));
}

function renderBlog() {
  const list = document.getElementById('blog-list');
  const cmsTable = document.getElementById('cms-blog-table');
  
  list.innerHTML = '';
  cmsTable.innerHTML = '';

  blogData.forEach(post => {
    // Front-End View
    list.innerHTML += `
      <article class="border border-slate-800 bg-slate-900/40 p-5 rounded-lg space-y-2">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="text-amber-500 font-mono">${post.date}</span>
          <span>Article #${post.id}</span>
        </div>
        <h3 class="text-lg font-bold text-white">${post.title}</h3>
        <p class="text-slate-300 text-sm leading-relaxed">${post.content}</p>
      </article>
    `;

    // CMS Table View
    cmsTable.innerHTML += `
      <tr>
        <td class="p-3 font-medium text-white">${post.title}</td>
        <td class="p-3 text-xs text-slate-400 font-mono">${post.date}</td>
        <td class="p-3 text-right">
          <button onclick="deleteBlogPost(${post.id})" class="text-xs text-rose-400 hover:text-rose-300">Delete</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem('kape_blog', JSON.stringify(blogData));
}

function renderInbox() {
  const container = document.getElementById('cms-inbox-list');
  const badge = document.getElementById('inbox-badge');
  container.innerHTML = '';

  if (inboxData.length > 0) {
    badge.classList.remove('hidden');
    badge.innerText = inboxData.length;
  } else {
    badge.classList.add('hidden');
  }

  if (inboxData.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-slate-500 text-xs">No messages in inbox.</div>`;
    return;
  }

  inboxData.forEach(msg => {
    container.innerHTML += `
      <div class="border border-slate-800 bg-slate-950 p-4 rounded-lg space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-white">${msg.name} <span class="text-slate-400 font-normal">(${msg.email})</span></span>
          <span class="text-slate-500 font-mono">${msg.date}</span>
        </div>
        <p class="text-slate-300 text-xs leading-relaxed bg-slate-900 p-2.5 rounded border border-slate-800/50">${msg.message}</p>
      </div>
    `;
  });
  localStorage.setItem('kape_inbox', JSON.stringify(inboxData));
}

// --- DATA MUTATIONS (CMS CRUD) ---
function addPortfolioItem(e) {
  e.preventDefault();
  const title = document.getElementById('cms-port-title').value;
  const tech = document.getElementById('cms-port-tech').value;
  const desc = document.getElementById('cms-port-desc').value;

  portfolioData.unshift({ id: Date.now(), title, tech, desc });
  renderPortfolio();
  e.target.reset();
  alert('Portfolio item published dynamically!');
}

function deletePortfolioItem(id) {
  portfolioData = portfolioData.filter(i => i.id !== id);
  renderPortfolio();
}

function addBlogPost(e) {
  e.preventDefault();
  const title = document.getElementById('cms-blog-title').value;
  const content = document.getElementById('cms-blog-content').value;
  const date = new Date().toISOString().split('T')[0];

  blogData.unshift({ id: Date.now(), title, date, content });
  renderBlog();
  e.target.reset();
  alert('Blog post published dynamically!');
}

function deleteBlogPost(id) {
  blogData = blogData.filter(p => p.id !== id);
  renderBlog();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;
  const date = new Date().toISOString().split('T')[0];

  inboxData.unshift({ id: Date.now(), name, email, message, date });
  renderInbox();
  e.target.reset();
  alert('Message sent successfully! It is now logged in the CMS Inbox.');
  navTo('cms');
  switchCmsTab('inbox');
}

function clearInbox() {
  if (confirm('Clear all incoming messages?')) {
    inboxData = [];
    renderInbox();
  }
}