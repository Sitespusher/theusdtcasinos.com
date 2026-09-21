(() => {
  'use strict';

  const now = new Date();
  const iso = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  const monthYear = new Intl.DateTimeFormat('nl-NL', { month: 'long', year: 'numeric' }).format(now);
  const longDate = new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  const shortDate = new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(now);

  document.querySelectorAll('[data-date-mode]').forEach((node) => {
    const mode = node.dataset.dateMode;
    if (mode === 'month-year') node.textContent = monthYear;
    if (mode === 'year') node.textContent = String(now.getFullYear());
    if (mode === 'long') node.textContent = longDate;
    if (mode === 'iso-visible') node.textContent = shortDate;
    if (node.tagName === 'TIME') node.dateTime = iso;
  });

  const pageTitle = `USDT Casino Nederland — Tether opties ${monthYear}`;
  const pageDescription = `Vergelijk 7 USDT casino's voor Nederland op bonus, betaalmogelijkheden en licentievermelding. Bijgewerkt in ${monthYear}.`;
  document.title = pageTitle;

  const updateMeta = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.setAttribute('content', value);
  };
  updateMeta('meta[name="description"]', pageDescription);
  updateMeta('meta[name="last-modified"]', iso);
  updateMeta('meta[property="og:title"]', pageTitle);
  updateMeta('meta[property="og:description"]', `Een nuchtere vergelijking van 7 casino's met USDT, betaalopties en bonuscontext. Bijgewerkt ${longDate}.`);
  updateMeta('meta[property="article:modified_time"]', iso);

  const schemaNode = document.getElementById('site-schema');
  if (schemaNode) {
    try {
      const schema = JSON.parse(schemaNode.textContent);
      const page = schema['@graph'].find((item) => item['@type'] === 'WebPage');
      if (page) {
        page.name = `Online Casino met USDT in Nederland – Tether opties ${monthYear}`;
        page.dateModified = iso;
      }
      schemaNode.textContent = JSON.stringify(schema);
    } catch (error) {
      console.warn('Datum in gestructureerde gegevens kon niet worden bijgewerkt.', error);
    }
  }

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-nav');
  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    };
    menuButton.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const catfish = document.querySelector('.catfish');
  const catfishClose = document.querySelector('.catfish-close');
  if (catfish && catfishClose) {
    const revealCatfish = () => {
      catfish.classList.remove('catfish-pending');
      catfish.classList.add('is-visible');
      catfish.setAttribute('aria-hidden', 'false');
    };
    const revealTimer = window.setTimeout(revealCatfish, 5000);

    catfishClose.addEventListener('click', () => {
      window.clearTimeout(revealTimer);
      catfish.classList.remove('is-visible', 'catfish-pending');
      catfish.classList.add('is-closing');
      catfish.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => {
        catfish.hidden = true;
        catfish.classList.remove('is-closing');
      }, 560);
    });
  }

  document.documentElement.dataset.ready = 'true';
})();
