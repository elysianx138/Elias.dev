/**
 * Elias Song — native scroll-drive motion (no dependencies)
 * True scroll-linked silk: content reveals as you scroll (scroll-driven,
 * repeatable), gentle parallax on hero, fill progress bar, 3D card tilt.
 * Degrades gracefully to plain static layout when JS is off or motion reduced.
 */
(function () {
  'use strict';

  function reduce() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isMobile() { return window.innerWidth < 768; }

  /* ─────────── Scroll progress bar ─────────── */
  function initProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── Reveal items as they enter viewport (scroll-usable) ─────────── */
  function initReveals() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal-item'));
    if (!items.length) return;

    var reduceMotion = reduce();

    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { obs.observe(el); });
  }

  /* ─────────── Hero parallax: fade + shift on scroll ─────────── */
  function initHeroParallax() {
    var hero = document.querySelector('.hero');
    var inner = document.querySelector('.hero .hero__inner');
    var scrollCue = document.querySelector('.hero__scroll');
    if (!hero || reduce()) return;

    function onScroll() {
      var s = window.scrollY;
      var maxFade = hero.offsetHeight * 0.8;
      var p = Math.min(s / maxFade, 1);
      if (inner) {
        inner.style.transform = 'translateY(' + (p * -60) + 'px)';
        inner.style.opacity = String(1 - p * 1.1);
      }
      if (scrollCue) scrollCue.style.opacity = String(1 - p * 2);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── 3D tilt on cards (desktop) ─────────── */
  function initTilt() {
    if (isMobile() || !window.matchMedia('(hover:hover)').matches) return;
    document.querySelectorAll('.card, .social-card').forEach(function (card) {
      var raf = 0;
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.style.transform =
            'perspective(700px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg) translateY(-2px)';
        });
      });
      card.addEventListener('pointerleave', function () {
        card.style.transition = 'transform .45s ease';
        card.style.transform = 'perspective(700px) rotateY(0) rotateX(0)';
        setTimeout(function () { card.style.transition = ''; }, 450);
      });
    });
  }

  /* ─────────── Boot ─────────── */
  function onReady() {
    initProgress();
    initReveals();
    initHeroParallax();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // Re-init if dev.to feed injects new cards
  if (document.getElementById('devto-feed')) {
    var feed = document.getElementById('devto-feed');
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function () { initReveals(); });
      mo.observe(feed, { childList: true, subtree: true });
    }
  }
})();