(() => {
  const catalogSearch = document.querySelector('#catalog-search');
  const catalogCategory = document.querySelector('#catalog-category');
  const catalogCards = [...document.querySelectorAll('[data-number-card]')];
  const catalogEmpty = document.querySelector('#catalog-empty');
  const catalogCount = document.querySelector('#catalog-count');

  const updateCatalog = () => {
    if (!catalogCards.length) return;
    const query = (catalogSearch?.value || '').replace(/\D/g, '');
    const category = catalogCategory?.value || 'all';
    let count = 0;
    catalogCards.forEach((card) => {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesPattern = !query || (card.dataset.number || '').includes(query);
      card.hidden = !(matchesCategory && matchesPattern);
      if (!card.hidden) count += 1;
    });
    if (catalogEmpty) catalogEmpty.hidden = count > 0;
    if (catalogCount) catalogCount.textContent = `Showing ${count} sample number${count === 1 ? '' : 's'}`;
  };

  if (catalogCards.length) {
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get('category');
    const initialPattern = params.get('pattern');
    if (initialCategory && catalogCategory?.querySelector(`option[value="${CSS.escape(initialCategory)}"]`)) {
      catalogCategory.value = initialCategory;
    }
    if (initialPattern && catalogSearch) catalogSearch.value = initialPattern;
    catalogSearch?.addEventListener('input', updateCatalog);
    catalogCategory?.addEventListener('change', updateCatalog);
    document.querySelector('#catalog-clear')?.addEventListener('click', () => {
      if (catalogSearch) catalogSearch.value = '';
      if (catalogCategory) catalogCategory.value = 'all';
      history.replaceState(null, '', window.location.pathname);
      updateCatalog();
      catalogSearch?.focus();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        catalogSearch?.focus();
      }
    });
    updateCatalog();
  }

  document.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let notice = form.querySelector('.demo-notice');
      if (!notice) {
        notice = document.createElement('p');
        notice.className = 'demo-notice';
        notice.setAttribute('role', 'status');
        notice.setAttribute('aria-live', 'polite');
        form.append(notice);
      }
      const passwords = form.querySelectorAll('input[type="password"]');
      const passwordPair = passwords.length > 2 ? [passwords[1], passwords[2]] : [passwords[0], passwords[1]];
      if (passwords.length > 1 && passwordPair[0].value !== passwordPair[1].value) {
        notice.textContent = 'The passwords do not match. Check both fields and try again.';
        notice.classList.add('demo-notice-error');
        passwordPair[1].focus();
        return;
      }
      notice.classList.remove('demo-notice-error');
      notice.textContent = 'This is a static preview. It does not create an account, save profile changes, send a booking request, or process a payment.';
    });
  });

  document.querySelectorAll('.admin-section input[placeholder*="Search"], .admin-section input[placeholder*="Filter"]').forEach((input) => {
    const table = input.closest('.dashboard')?.querySelector('table');
    if (!table) return;
    const filterRows = () => {
      const query = input.value.trim().toLocaleLowerCase();
      table.querySelectorAll('tbody tr').forEach((row) => {
        row.hidden = !row.textContent.toLocaleLowerCase().includes(query);
      });
    };
    input.addEventListener('input', filterRows);
    input.closest('div')?.querySelector('button')?.addEventListener('click', (event) => {
      event.preventDefault();
      filterRows();
      input.focus();
    });
  });
})();
