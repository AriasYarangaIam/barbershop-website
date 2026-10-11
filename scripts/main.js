document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggle || !drawer) return;

  const closeTriggers = drawer.querySelectorAll('[data-drawer-close]');
  const focusableSelector = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function getFocusable() {
    return Array.from(drawer.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
  }

  function setOpen(open) {
    drawer.hidden = !open;
    drawer.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) {
      document.body.style.overflow = 'hidden';
      const first = getFocusable()[0];
      if (first) first.focus();
    } else {
      document.body.style.overflow = '';
      toggle.focus();
    }
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(drawer.hidden));
  closeTriggers.forEach(el => el.addEventListener('click', () => setOpen(false)));
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
    trapFocus(e);
  });
});
