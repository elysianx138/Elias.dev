/**
 * Elias Song — sticky header state.
 */
(function () {
  'use strict';

  function initHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      header.style.borderColor = window.scrollY > 8 ? 'var(--line-strong)' : 'var(--line)';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderState);
  } else {
    initHeaderState();
  }
})();