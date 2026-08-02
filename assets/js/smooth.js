/**
 * Elias Song — GSAP scroll-driven motion
 * True scroll-linked silk: pinned full-viewport sections whose content animates
 * in/out as you scroll (scrub), then unpins into the next section. Hero
 * staggered entrance + parallax, card reveals, progress bar, 3D tilt.
 */
(function () {
  'use strict';

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  var reduceMotion = function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  function isMobile() { return window.innerWidth < 768; }

  function boot() {
    if (!gsap || !ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    /* Protect restore: if reduced motion, reveal everything, skip anims */
    if (reduceMotion()) { document.body.classList.add('no-motion'); return; }

    /* ── Scroll progress bar ── */
    var bar = document.querySelector('.scroll-progress');
    if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 0, end: 'max' } });

    /* ═══ PINNED SCROLL-DRIVEN SECTIONS ═══ */
    function pinPanel(section) {
      var inner = section.querySelector('.pin__inner');
      if (!inner) return;

      var children = Array.prototype.slice.call(inner.children);
      // Stagger children upward as you scroll through the pinned viewport
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1
        }
      });

      tl.from(inner, { opacity: 0, yPercent: 12, ease: 'none', duration: 0.5 });
      tl.from(children, {
        y: 60, opacity: 0, stagger: 0.12, ease: 'power1.out', duration: 0.6,
        delay: 0.3
      }, '-=0.1');
      // slide the whole panel up slightly while pinned for parallax feel
      tl.to(inner, { yPercent: -14, ease: 'none', duration: 0.4 }, '+=0.1');
    }

    var pinSections = document.querySelectorAll('.pin');
    if (!isMobile()) {
      pinSections.forEach(pinPanel);
    }

    /* ── Hero: staggered entrance on load (desktop) ── */
    if (!isMobile()) {
      var heroEls = document.querySelectorAll('.hero [data-anim]');
      if (heroEls.length) {
        gsap.from(heroEls, {
          y: 44, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 0.2,
          clearProps: 'transform,opacity'
        });
      }
    }

    /* ── Hero parallax on scroll ── */
    var heroInner = document.querySelector('.hero .hero__inner');
    if (heroInner) {
      gsap.to(heroInner, {
        opacity: 0, yPercent: -30, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: 0.5 }
      });
    }

    /* ── Normal sections: scroll-linked reveal (not pinned) ── */
    document.querySelectorAll('.section.normal').forEach(function (sec) {
      gsap.from(sec.querySelectorAll('.section__head'), {
        y: 34, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: 'top 80%', once: true }
      });
      gsap.from(sec.querySelectorAll('.card'), {
        y: 60, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sec, start: 'top 80%', once: true }
      });
    });

    /* ── Social cards in pinned contact (fallback if not pinned) ── */
    document.querySelectorAll('.social-grid').forEach(function (grid) {
      if (isMobile() || grid.closest('.pin')) return; // pinned ones animated by pinPanel
      gsap.from(grid.children, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06,
        scrollTrigger: { trigger: grid, start: 'top 88%', once: true }
      });
    });

    /* ── Card 3D tilt (desktop) ── */
    if (window.matchMedia('(hover:hover)').matches && !isMobile()) {
      document.querySelectorAll('.card, .social-card').forEach(function (card) {
        card.addEventListener('pointermove', function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, { rotateY: px * 7, rotateX: -py * 7, transformPerspective: 600, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('pointerleave', function () {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        });
      });
    }

    ScrollTrigger.refresh();
  }

  function whenReady() {
    if (window.gsap && window.ScrollTrigger) { boot(); return; }
    setTimeout(whenReady, 120);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', whenReady);
  } else {
    whenReady();
  }
})();