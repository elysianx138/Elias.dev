/**
 * Elias Song — header state + feed integration for GSAP.
 */
(function () {
  'use strict';

  /* ─────────── Sticky header state on scroll ─────────── */
  function initHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      header.style.borderColor = window.scrollY > 8 ? 'var(--line-strong)' : 'var(--line)';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── Refresh ScrollTrigger once dev.to feed renders ─────────── */
  function watchFeed() {
    var feed = document.getElementById('devto-feed');
    if (!feed || !('MutationObserver' in window)) return;
    var mo = new MutationObserver(function () {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
    mo.observe(feed, { childList: true, subtree: true });
  }

  function onReady() {
    initHeaderState();
    watchFeed();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();