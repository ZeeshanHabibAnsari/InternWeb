/**
 * Global interactions + Homepage-specific functionality.
 */

function initPage() {
  initNavigation();
  initHeaderScroll();

  if (document.body.classList.contains('page-home')) {
    initWorldsCarousel();
    initWorldsFilters();
    initRealEstateCarousel();
    initFamilyTabs();
  }

  if (document.body.classList.contains('page-communities')) {
    initWorldsFilters();
  }

  if (document.querySelector('.reveal')) {
    initScrollReveal();
  }

  if (document.getElementById('contact-form')) {
    initContactForm();
  }

  if (document.body.classList.contains('page-gallery')) {
    initGalleryLoop();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}

/* ─── Navigation ─── */

function initNavigation() {
  const toggle = document.getElementById('menu-toggle');
  const close = document.getElementById('nav-close');
  const overlay = document.getElementById('nav-overlay');

  if (!toggle || !overlay) return;

  const openMenu = () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header || !document.body.classList.contains('page-home')) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const onScroll = () => {
    const heroBottom = hero.offsetHeight - 100;
    header.classList.toggle('is-light', window.scrollY > heroBottom);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─── Worlds Carousel & Filters ─── */

function initWorldsFilters() {
  const filters = document.querySelectorAll('.worlds-filter');
  const cards = document.querySelectorAll('.world-card');

  if (!filters.length || !cards.length) return;

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const region = filter.dataset.region;

      filters.forEach((f) => f.classList.remove('is-active'));
      filter.classList.add('is-active');

      cards.forEach((card) => {
        const cardRegion = card.dataset.region;
        const show = region === 'all' || cardRegion === region;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

function initWorldsCarousel() {
  setupCarousel('.worlds-carousel', '.worlds-carousel-prev', '.worlds-carousel-next');
}

function initRealEstateCarousel() {
  setupCarousel('.listings-carousel', '.listings-carousel-prev', '.listings-carousel-next');
}

function setupCarousel(trackSelector, prevSelector, nextSelector) {
  const track = document.querySelector(trackSelector);
  const prev = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);

  if (!track || !prev || !next) return;

  const getScrollAmount = () => {
    const card = track.querySelector('.carousel-card, .world-card, .listing-card');
    if (!card) return 320;
    const gap = parseInt(getComputedStyle(track).gap, 10) || 24;
    return card.offsetWidth + gap;
  };

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}

/* ─── Discovery Family Tabs ─── */

function initFamilyTabs() {
  const tabs = document.querySelectorAll('.family-tab');
  const panels = document.querySelectorAll('.family-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach((panel) => {
        const isActive = panel.dataset.panel === target;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

/* ─── Scroll Reveal ─── */

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ─── Contact Form ─── */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      form.reset();
    }, 2500);
  });
}

/* ─── Gallery Infinite Loop ─── */

function initGalleryLoop() {
  const track = document.getElementById('gallery-loop-track');
  const viewport = document.getElementById('gallery-viewport');
  if (!track || !viewport) return;

  const clone = track.innerHTML;
  track.insertAdjacentHTML('beforeend', clone);
  track.classList.add('is-animating');

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY + e.deltaX;
    const current = getTranslateX(track);
    track.style.animation = 'none';
    track.style.transform = `translateX(${current - delta * 0.5}px)`;
    wrapGalleryTrack(track);
  }, { passive: false });

  viewport.addEventListener('mouseenter', () => track.classList.add('is-paused'));
  viewport.addEventListener('mouseleave', () => {
    track.classList.remove('is-paused');
    track.style.transform = '';
    track.style.animation = '';
    track.classList.add('is-animating');
  });
}

function getTranslateX(el) {
  const style = window.getComputedStyle(el);
  const matrix = style.transform;
  if (matrix === 'none') return 0;
  const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
  return parseFloat(values[4]) || 0;
}

function wrapGalleryTrack(track) {
  const half = track.scrollWidth / 2;
  let x = getTranslateX(track);
  if (x <= -half) x += half;
  if (x > 0) x -= half;
  track.style.transform = `translateX(${x}px)`;
}
