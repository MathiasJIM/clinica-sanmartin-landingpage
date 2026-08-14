/* =========================================================================
   COMPORTAMIENTO DEL SITIO
   - Inyecta los datos de js/config.js en el HTML (atributos data-cfg-*)
   - Navbar (sticky, menú móvil, enlace activo)
   - Animaciones de entrada al hacer scroll
   ========================================================================= */

(function () {
  'use strict';

  var cfg = window.siteConfig || {};

  /* -----------------------------------------------------------------------
     1. Valores derivados (enlaces listos para usar)
     --------------------------------------------------------------------- */
  var data = Object.assign({}, cfg);

  function telUrl(number) {
    return number ? 'tel:' + String(number).replace(/\s+/g, '') : '';
  }

  data.telUrl = telUrl(cfg.phoneIntl);
  data.telUrlAlt = telUrl(cfg.phoneAltIntl);
  data.mailUrl = cfg.email ? 'mailto:' + cfg.email : '';
  data.whatsappUrl = cfg.whatsapp
    ? 'https://wa.me/' +
      String(cfg.whatsapp).replace(/\D/g, '') +
      (cfg.whatsappMessage ? '?text=' + encodeURIComponent(cfg.whatsappMessage) : '')
    : '';

  /* -----------------------------------------------------------------------
     2. Inyección de datos en el HTML
     --------------------------------------------------------------------- */
  function fill() {
    // Texto
    document.querySelectorAll('[data-cfg-text]').forEach(function (el) {
      var value = data[el.getAttribute('data-cfg-text')];
      if (value) el.textContent = value;
    });

    // Enlaces
    document.querySelectorAll('[data-cfg-href]').forEach(function (el) {
      var value = data[el.getAttribute('data-cfg-href')];
      if (value) el.setAttribute('href', value);
    });

    // Fuentes (iframes, imágenes)
    document.querySelectorAll('[data-cfg-src]').forEach(function (el) {
      var value = data[el.getAttribute('data-cfg-src')];
      if (value) el.setAttribute('src', value);
    });

    // Elementos opcionales: se eliminan si el dato está vacío
    document.querySelectorAll('[data-cfg-optional]').forEach(function (el) {
      if (!data[el.getAttribute('data-cfg-optional')]) {
        var item = el.closest('li') || el;
        item.remove();
      }
    });

    // Año dinámico del copyright
    document.querySelectorAll('[data-cfg-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* -----------------------------------------------------------------------
     3. Horario
     --------------------------------------------------------------------- */
  function renderSchedule() {
    var list = document.getElementById('schedule');
    if (!list || !Array.isArray(cfg.schedule)) return;

    list.innerHTML = cfg.schedule
      .map(function (row) {
        return (
          '<li><span>' + row.days + '</span><span>' + row.hours + '</span></li>'
        );
      })
      .join('');
  }

  /* -----------------------------------------------------------------------
     4. Navbar
     --------------------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('site-header');
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-panel');

    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!toggle || !panel) return;

    var closeMenu = function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      panel.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Cerrar menú');
        panel.classList.add('is-open');
        document.body.classList.add('nav-open');
      }
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeMenu();
    });
  }

  /* -----------------------------------------------------------------------
     5. Enlace activo según la sección visible
     --------------------------------------------------------------------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav__link[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) {
        map[section.id] = link;
        sections.push(section);
      }
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.classList.remove('is-active');
          });
          var active = map[entry.target.id];
          if (active) active.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* -----------------------------------------------------------------------
     6. Animación de entrada
     --------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    var reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     Arranque
     --------------------------------------------------------------------- */
  function init() {
    fill();
    renderSchedule();
    initHeader();
    initScrollSpy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
