/**
 * Bell Advisory Group — Main JS
 * Vanilla JS — zero dependencies
 */

(function () {
  'use strict';

  // ── Nav Scroll State ──
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.pageYOffset > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Nav Toggle ──
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      var spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        document.body.style.overflow = 'hidden';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
      }
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        var spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll Reveal ──
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── Score Dimension Bars Animation ──
  var scoreBars = document.querySelectorAll('.dimension-fill');
  if (scoreBars.length && 'IntersectionObserver' in window) {
    var targetWidths = [35, 25, 40, 20, 30]; // Placeholder low scores to illustrate the gap
    var scoreObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            scoreBars.forEach(function (bar, i) {
              setTimeout(function () {
                bar.style.width = (targetWidths[i] || 30) + '%';
              }, i * 150);
            });
            scoreObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    var scoreSection = document.querySelector('.score-dimensions');
    if (scoreSection) scoreObserver.observe(scoreSection);
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Active Nav Link ──
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && (href.replace('/', '') === currentPage || (currentPage === '' && href === '/'))) {
      a.style.color = 'var(--white, #fff)';
    }
  });

  // ── Form Enhancement ──
  var form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Submitting…';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });
  }
})();
