/**
 * Elias Song — GSAP smooth motion
 * Long-form narrative scroll effects: hero stagger entrance, scroll-linked
 * reveals, section-number line drawing, scroll progress bar, card tilt.
 */
(function () {
  'use strict';

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  // Only run if GSAP loaded and motion is allowed
  function motionAllowed() {
    return window.matchMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function boot() {
    if (!motionAllowed()) { document.body.classList.add('no-motion'); return; }
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── Hero staggered entrance ── */
    var heroEls = document.querySelectorAll('.hero [data-anim]');
    if (heroEls.length && window.innerWidth > 640) {
      gsap.from(heroEls, {
        y: 40, opacity: 0, duration: 1,
        ease: 'expo.out', stagger: 0.12, delay: 0.15,
        clearProps: 'transform'
      });
    }

    /* ── Scroll progress bar ── */
    var bar = document.querySelector('.scroll-progress');
    if (bar) {
      gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 0, end: 'max' } });
    }

    /* ── Section heads: line draw + fade ── */
    document.querySelectorAll('.section__head').forEach(function (head) {
      var rule = head.querySelector('.section__rule');
      var title = head.querySelector('.section__title');
      var num = head.querySelector('.section__num');
      var tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true } });
      tl.from(title, { y: 26, opacity: 0, duration: 0.7, ease: 'power3.out' });
      if (num) tl.from(num, { x: -12, opacity: 0, duration: 0.5, ease: 'power2.out' }, '<');
      if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '-=0.5');
    });

    /* ── Card grids: scroll-linked scrub reveal ── */
    document.querySelectorAll('.card-grid').forEach(function (grid) {
      var cards = grid.querySelectorAll('.card');
      if (!cards.length) return;
      gsap.from(cards, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
      });
    });

    /* ── Social cards ── */
    document.querySelectorAll('.social-grid').forEach(function (grid) {
      gsap.from(grid.children, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: grid, start: 'top 88%', once: true }
      });
    });

    /* ── Hero parallax (inner floats at different speed) ── */
    document.querySelectorAll('.hero[data-parallax] .hero__inner').forEach(function (inner) {
      gsap.to(inner, {
        yPercent: -16, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      });
    });

    /* ── About block ── */
    document.querySelectorAll('.about').forEach(function (block) {
      gsap.from(block.children, {
        y: 34, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: block, start: 'top 88%', once: true }
      });
    });

    /* ── Card 3D tilt ── */
    if (window.matchMedia('(hover: hover)').matches && window.innerWidth > 768) {
      document.querySelectorAll('.card, .social-card').forEach(function (card) {
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 600, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('pointerleave', function () {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }

    ScrollTrigger.refresh();
  }

  function whenReady() {
    if (window.gsap && window.ScrollTrigger) { boot(); return; }
    setTimeout(whenReady, 120); // wait for deferred CDN
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', whenReady);
  } else {
    whenReady();
  }
})();