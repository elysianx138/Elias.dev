/**
 * Elias's Blog — Animations
 * Smooth page transitions & scroll-triggered reveals
 */

(function () {
  'use strict';

  /* ─────────── 1. View Transitions for internal links ─────────── */
  function initViewTransitions() {
    // Support View Transitions API natively if available
    if (!document.startViewTransition) {
      // Fallback: manual fade for browsers without VT API
      document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;
        if (link.hasAttribute('target')) return;
        if (link.getAttribute('href').startsWith('#')) return;

        var url = link.href;
        var origin = location.origin;
        if (!url.startsWith(origin)) return;

        // Skip downloads, same-page anchors
        if (link.hasAttribute('download')) return;
        if (link.getAttribute('href').startsWith('#')) return;

        e.preventDefault();

        // Fade out overlay
        var overlay = document.querySelector('.page-transition-overlay') || createOverlay();
        overlay.style.opacity = '1';

        setTimeout(function () {
          window.location.href = url;
        }, 350);
      });
    }
  }

  function createOverlay() {
    var div = document.createElement('div');
    div.className = 'page-transition-overlay';
    div.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;' +
      'background:#F7F4F0;z-index:10000;' +
      'opacity:0;transition:opacity 0.3s ease;' +
      'pointer-events:none;';
    document.body.appendChild(div);
    return div;
  }

  /* ─────────── 2. Scroll-triggered reveal animations ─────────── */
  function initScrollReveals() {
    var revealElements = document.querySelectorAll(
      '.post-item, .home-heading, .page-title, .post-header, .page-header, .post-toc, .post-nav'
    );

    if (revealElements.length === 0) return;

    // Add .reveal class
    for (var i = 0; i < revealElements.length; i++) {
      revealElements[i].classList.add('reveal');
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          for (var j = 0; j < entries.length; j++) {
            if (entries[j].isIntersecting) {
              entries[j].target.classList.add('revealed');
              observer.unobserve(entries[j].target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      for (var k = 0; k < revealElements.length; k++) {
        observer.observe(revealElements[k]);
      }
    } else {
      // Fallback: reveal all immediately
      for (var m = 0; m < revealElements.length; m++) {
        revealElements[m].classList.add('revealed');
      }
    }
  }

  /* ─────────── 3. Reveal on new page load after transition ─────────── */
  // Re-init after View Transition completes
  function onReady() {
    initScrollReveals();
    initViewTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // Also run on PJAX/history navigations
  window.addEventListener('popstate', function () {
    setTimeout(initScrollReveals, 100);
  });

})();
