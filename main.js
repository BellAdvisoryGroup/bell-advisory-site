/**
 * Bell Advisory Group — Main JS
 * Vanilla ES5 — zero dependencies, sub-0.5s load on 4G
 */

(function () {
  'use strict';

  // ── Nav Scroll State ──
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.pageYOffset > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Nav Toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);

      // Animate hamburger to X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ── Scroll Reveal (Intersection Observer) ──
  // Evidence: Micro-interactions increase engagement (NNG usability research)
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav').offsetHeight || 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Active Nav Link Highlighting ──
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    window.addEventListener(
      'scroll',
      debounce(function () {
        var scrollPos = window.pageYOffset + 120;
        sections.forEach(function (section) {
          var top = section.offsetTop;
          var height = section.offsetHeight;
          var id = section.getAttribute('id');

          if (scrollPos >= top && scrollPos < top + height) {
            navAnchors.forEach(function (a) {
              a.style.color = '';
            });
            var active = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (active && !active.classList.contains('nav-cta')) {
              active.style.color = 'var(--white)';
            }
          }
        });
      }, 16)
    );
  }

  // ── Debounce Utility ──
  function debounce(fn, wait) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, wait);
    };
  }

  // ── Form Submission Enhancement ──
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });
  }
})();
