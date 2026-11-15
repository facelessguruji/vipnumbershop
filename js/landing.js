(() => {
  const search = document.querySelector('#number-search');
  const tiles = [...document.querySelectorAll('.number-tile')];
  const filterButtons = [...document.querySelectorAll('.filter-chip')];
  const emptyState = document.querySelector('#empty-state');
  const shownCount = document.querySelector('#shown-count');
  const resultCount = document.querySelector('#result-count');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  let activeFilter = 'all';

  const updateNumbers = () => {
    const query = (search?.value || '').replace(/\D/g, '');
    let visible = 0;
    tiles.forEach((tile) => {
      const matchesCategory = activeFilter === 'all' || tile.dataset.category === activeFilter;
      const matchesQuery = !query || tile.dataset.number.includes(query);
      const show = matchesCategory && matchesQuery;
      tile.hidden = !show;
      if (show) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
    if (shownCount) shownCount.textContent = String(visible);
    if (resultCount) resultCount.textContent = String(visible);
  };

  search?.addEventListener('input', updateNumbers);
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateNumbers();
    });
  });

  document.querySelectorAll('.favorite').forEach((button) => {
    button.addEventListener('click', () => {
      const saved = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(saved));
      button.textContent = saved ? '♥' : '♡';
    });
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav?.classList.toggle('is-open', !isOpen);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      search?.focus();
    }
    if (event.key === 'Escape' && document.activeElement === search) search.blur();
  });
})();
