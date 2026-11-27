(() => {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = (value) => value === 'light' || value === 'dark';
  let stored;
  let storageAvailable = true;
  let button;

  try {
    stored = localStorage.getItem('theme');
    localStorage.setItem('theme-storage-check', '1');
    localStorage.removeItem('theme-storage-check');
  } catch {
    storageAvailable = false;
  }

  // Local file pages do not reliably share storage. Carry the choice in their links.
  const address = new URL(window.location.href);
  const requested = address.searchParams.get('theme');
  let selected = valid(requested) ? requested : valid(stored) ? stored : null;
  const carryTheme = window.location.protocol === 'file:' || !storageAvailable;

  function updateLinks(theme) {
    if (!carryTheme) return;
    document.querySelectorAll('a[href]').forEach((link) => {
      const target = new URL(link.href, window.location.href);
      if (target.protocol !== window.location.protocol || target.host !== window.location.host) return;
      if (!target.pathname.endsWith('.html')) return;
      if (window.location.protocol === 'file:' && target.pathname.slice(0, target.pathname.lastIndexOf('/')) !== address.pathname.slice(0, address.pathname.lastIndexOf('/'))) return;
      target.searchParams.set('theme', theme);
      link.href = target.href;
    });
  }

  function applyTheme() {
    const theme = selected || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    button?.setAttribute('aria-checked', String(theme === 'dark'));
    button?.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    updateLinks(theme);
    if (carryTheme || address.searchParams.has('theme')) {
      const current = new URL(window.location.href);
      current.searchParams.set('theme', theme);
      try { history.replaceState(null, '', current.href); } catch { /* Some file viewers restrict history. */ }
    }
  }

  function saveTheme() {
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* Links retain the choice when storage is unavailable. */ }
  }

  applyTheme();
  if (selected) saveTheme();

  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    if (!button) return;
    applyTheme();
    button.hidden = false;
    button.addEventListener('click', () => {
      selected = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      saveTheme();
    });
  }, { once: true });

  system.addEventListener('change', () => { if (!selected) applyTheme(); });
  window.addEventListener('storage', (event) => {
    if (event.key !== 'theme' && event.key !== null) return;
    selected = valid(event.newValue) ? event.newValue : null;
    applyTheme();
  });
  window.addEventListener('pageshow', () => {
    if (!carryTheme) {
      try {
        const latest = localStorage.getItem('theme');
        selected = valid(latest) ? latest : null;
      } catch { /* Keep the current selection. */ }
    }
    applyTheme();
  });
})();
