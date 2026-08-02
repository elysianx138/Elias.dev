/**
 * Elias Song — native continuous scroll-driven motion (no dependencies)
 * Items follow your scroll: each translates + fades in real time as it enters
 * the viewport, and again as you scroll away. Great base for a long page.
 */
(function () {
  'use strict';

  var items = [];
  var ticking = false;

  function reduce() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function collect() {
    items = Array.prototype.slice.call(document.querySelectorAll('.reveal-item'));
  }

  /* Compute 0..1 progress for an element based on current scroll */
  function progress(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.95;      // element fully below this line → 0
    var end = vh * 0.6;         // element crossing this line → 1
    var p = (start - r.top) / (start - end);
    return Math.max(0, Math.min(1, p));
  }

  function apply() {
    ticking = false;
    var i, p, el;
    var reduceMotion = reduce();
    for (i = 0; i < items.length; i++) {
      el = items[i];
      p = reduceMotion ? 1 : progress(el);
      el.style.opacity = String(p);
      el.style.transform = 'translateY(' + ((1 - p) * 34) + 'px)';
    }
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }

  function init() {
    collect();
    requestTick();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
  }

  /* ─────────── Scroll progress bar (top) ─────────── */
  function initProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;
    function onScroll() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── Hero rotating typewriter ─────────── */
  function initTypewriter() {
    var el = document.getElementById('typewriter');
    if (!el) return;
    var phrases = [
      '> technology exists to serve people, not the other way around',
      '> coffee + code are the perfect pairing',
      '> CS student · backend · AI · open source'
    ];
    if (reduce()) {
      el.textContent = phrases[0];
      return;
    }

    var pi = 0, ci = 0, deleting = false;
    function tick() {
      var phrase = phrases[pi];
      if (!deleting) {
        ci++;
        el.textContent = phrase.slice(0, ci);
        if (ci >= phrase.length) {
          deleting = true;
          setTimeout(tick, 1800);   // pause at full phrase
          return;
        }
        setTimeout(tick, 55);
      } else {
        ci--;
        el.textContent = phrase.slice(0, ci);
        if (ci <= 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 450);   // pause before next phrase
          return;
        }
        setTimeout(tick, 26);
      }
    }
    el.textContent = '';
    setTimeout(tick, 600);
  }

  /* ─────────── Hero parallax: shift + fade as you scroll past ─────────── */
  function initHero() {
    var hero = document.querySelector('.hero');
    var inner = document.querySelector('.hero .hero__inner');
    var cue = document.querySelector('.hero__scroll');
    if (!hero || reduce()) return;
    function onScroll() {
      var s = window.scrollY;
      var p = Math.min(s / (hero.offsetHeight * 0.7), 1);
      if (inner) {
        inner.style.transform = 'translateY(' + (p * -50) + 'px)';
        inner.style.opacity = String(1 - p * 1.1);
      }
      if (cue) cue.style.opacity = String(Math.max(0, 1 - p * 2));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────── 3D tilt on cards ─────────── */
  function initTilt() {
    if (window.innerWidth < 768 || !window.matchMedia('(hover:hover)').matches) return;
    document.querySelectorAll('.card, .social-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(700px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg) translateY(-2px)';
      });
      card.addEventListener('pointerleave', function () {
        card.style.transition = 'transform .45s ease';
        card.style.transform = '';
        setTimeout(function () { card.style.transition = ''; }, 450);
      });
    });
  }

  /* ─────────── Boot ─────────── */
  function onReady() {
    init();
    initProgress();
    initTypewriter();
    initHero();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // Re-collect when dev.to feed injects cards
  var feed = document.getElementById('devto-feed');
  if (feed && 'MutationObserver' in window) {
    var mo = new MutationObserver(function () { setTimeout(init, 80); });
    mo.observe(feed, { childList: true, subtree: true });
  }
})();