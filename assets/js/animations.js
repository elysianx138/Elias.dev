/**
 * Elias Song — Animations
 * Smooth page transitions, scroll-triggered reveals, sticky header state.
 */

(function () {
  'use strict';

  /* ─────────── 1. View Transitions / fallback fade ─────────── */
  function initViewTransitions() {
    if (document.startViewTransition) return; // native handled via CSS

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      if (link.hasAttribute('target')) return;
      var href = link.getAttribute('href') || '';
      if (href.startsWith('#')) return;
      if (!link.href.startsWith(location.origin)) return;
      if (link.hasAttribute('download')) return;

      e.preventDefault();
      var overlay = document.querySelector('.page-transition-overlay') || createOverlay();
      overlay.style.opacity = '1';
      setTimeout(function () { window.location.href = link.href; }, 300);
    });
  }

  function createOverlay() {
    var div = document.createElement('div');
    div.className = 'page-transition-overlay';
    div.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;' +
      'background:#06070a;z-index:10000;' +
      'opacity:0;transition:opacity 0.3s ease;' +
      'pointer-events:none;';
    document.body.appendChild(div);
    return div;
  }

  /* ─────────── 2. Scroll-triggered reveals ─────────── */
  function initScrollReveals() {
    var revealElements = document.querySelectorAll(
      '.post-item, .hero, .section-title, .page-title, .post-header, .page-header, .post-toc, .post-nav, .social-card'
    );

    if (revealElements.length === 0) return;

    revealElements.forEach(function (el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      revealElements.forEach(function (el) { observer.observe(el); });
    } else {
      revealElements.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  /* ─────────── 3. Sticky header shadow on scroll ─────────── */
  function initHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── 4. Boot ─────────── */
  function onReady() {
    initScrollReveals();
    initViewTransitions();
    initHeaderState();

    // Re-run reveals after dev.to feed renders new nodes
    var feed = document.getElementById('devto-feed');
    if (feed) {
      var mo = new MutationObserver(function () { initScrollReveals(); });
      mo.observe(feed, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  window.addEventListener('popstate', function () {
    setTimeout(initScrollReveals, 100);
  });
})();