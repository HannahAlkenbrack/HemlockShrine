// js/v1.js
document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

  function activateTab(tab) {
    tabs.forEach(t => {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', 'false');
      panel.hidden = true;
    });
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', e => {
      const idx = tabs.indexOf(tab);
      let next = null;
      if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  next = (idx - 1 + tabs.length) % tabs.length;
      if (next !== null) {
        activateTab(tabs[next]);
        e.preventDefault();
      }
    });
  });

  const defaultTab = tabs.find(t => t.getAttribute('aria-selected') === 'true');
  if (defaultTab) activateTab(defaultTab);
});
