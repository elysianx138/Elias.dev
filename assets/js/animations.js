/**
 * Elias Song — scroll reveals, smooth anchor scrolling, sticky header state.
 */
(function () {
  'use strict';

  /* ─────────── 1. Scroll-triggered reveals ─────────── */
  function initScrollReveals() {
    var selectors = '.card, .social-card, .section__title, .hero, .page-title, .post-header, .post-toc, .post-nav';
    var elements = Array.prototype.slice.call(document.querySelectorAll(selectors));
    if (!elements.length) return;

    elements.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
      elements.forEach(function (el) { observer.observe(el); });
    } else {
      elements.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  /* ─────────── 2. Sticky header shadow on scroll ─────────── */
  function initHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function onScroll() {
      header.style.borderColor = window.scrollY > 8 ? 'var(--line-strong)' : 'var(--line)';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── 3. Re-run reveals when dev.to feed renders ─────────── */
  function watchFeed() {
    var feed = document.getElementById('devto-feed');
    if (!feed || !('MutationObserver' in window)) return;
    var mo = new MutationObserver(function () { initScrollReveals(); });
    mo.observe(feed, { childList: true, subtree: true });
  }

  /* ─────────── Boot ─────────── */
  function onReady() {
    initScrollReveals();
    initHeaderState();
    watchFeed();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();