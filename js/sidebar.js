/* ============================================================
   La-Fierce — sidebar.js
   Injects shared sidebar HTML, handles theme + hamburger
   ============================================================ */

(function () {
  // ── 1. Detect active page ─────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { href: 'index.html',    label: 'Introduction',         icon: 'bi-house-door' },
    { href: 'purpose.html',  label: 'Purpose',              icon: 'bi-bullseye'   },
    { href: 'success.html',  label: 'Success Stories',      icon: 'bi-trophy'     },
    { href: 'software.html', label: 'Software / Application', icon: 'bi-phone'    },
    { href: 'transparency.html', label: 'Transparency',     icon: 'bi-shield-check' },
    { href: 'download.html', label: 'Download',             icon: 'bi-download'   },
  ];

  const navHTML = navItems.map(item => {
    const active = page === item.href ? ' active' : '';
    return `<a class="nav-link${active}" href="${item.href}">
              <i class="bi ${item.icon}"></i> ${item.label}
            </a>`;
  }).join('');

  const sidebarHTML = `
    <div class="sidebar-header">
      <img src="images/logo/La-Fierce.png" alt="La-Fierce Logo" />
      <h4>La-Fierce</h4>
      <button class="theme-toggle" id="themeBtn">☀️ Light Mode</button>
    </div>
    <nav class="sidebar-nav">${navHTML}</nav>
  `;

  // ── 2. Inject sidebar ─────────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = sidebarHTML;

  // Inject hamburger + overlay if not present
  if (!document.querySelector('.hamburger-btn')) {
    const btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.id = 'hamburgerBtn';
    btn.innerHTML = '<i class="bi bi-list"></i>';
    btn.setAttribute('aria-label', 'Open menu');
    document.body.prepend(btn);
  }
  if (!document.querySelector('.sidebar-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebarOverlay';
    document.body.appendChild(overlay);
  }

  // ── 3. Theme ──────────────────────────────────────────────
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('lf-theme', t);
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = t === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  window.toggleTheme = function () {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'light' ? 'dark' : 'light');
  };

  // Restore saved theme; default light
  applyTheme(localStorage.getItem('lf-theme') || 'light');

  // Wire up theme button (after injection)
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'themeBtn') toggleTheme();
  });

  // ── 4. Hamburger ──────────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('active');
    document.getElementById('hamburgerBtn').innerHTML = '<i class="bi bi-x"></i>';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.getElementById('hamburgerBtn').innerHTML = '<i class="bi bi-list"></i>';
  }

  document.getElementById('hamburgerBtn').addEventListener('click', function () {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

  // Close on nav link click (mobile)
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('.nav-link') && window.innerWidth <= 768) closeSidebar();
  });
})();
