/**
 * Shared Header & Footer injection for all pages.
 */

const COMPASS_SVG = `<svg class="logo-compass" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1"/><path d="M16 6 L18 16 L16 26 L14 16 Z M6 16 L16 14 L26 16 L16 18 Z" fill="currentColor"/></svg>`;

function getHeaderHTML() {
  const isGallery = document.body.classList.contains('page-gallery');
  const subNav = isGallery ? '' : `
    <nav class="header-subnav" aria-label="Primary">
      <a href="communities.html">Our Worlds</a>
      <a href="real-estate.html">Real Estate</a>
      <a href="experiences.html">Experiences</a>
      <a href="contact.html">Contact</a>
    </nav>`;

  return `
    <header class="site-header" id="site-header">
      <div class="header-top">
        <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">
          <span class="menu-toggle-icon"><span></span><span></span></span>
          <span class="menu-toggle-label">Menu</span>
        </button>
        <a href="index.html" class="logo" aria-label="Discovery Land Company Home">
          ${COMPASS_SVG}
          <span class="logo-text">Discovery Land Company</span>
        </a>
        <button class="search-toggle" id="search-toggle" aria-label="Search">
          <span class="search-toggle-label">Search</span>
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
        </button>
      </div>
      ${subNav}

      <nav class="nav-overlay" id="nav-overlay" aria-hidden="true">
        <div class="nav-overlay-grid">
          <div class="nav-col nav-col-logo">
            <a href="index.html" class="nav-overlay-logo">
              ${COMPASS_SVG}
              <span>Discovery<br><small>LAND COMPANY</small></span>
            </a>
            <div class="nav-mission">
              <p class="nav-col-label">Our Mission</p>
              <p class="nav-mission-text">Create moments of joy and wonder, unforgettable memories, and cherished times together with those who matter most.</p>
            </div>
          </div>
          <div class="nav-col">
            <p class="nav-col-label">Find</p>
            <a href="real-estate.html" class="nav-feature-link">Real Estate <span>→</span></a>
            <a href="experiences.html" class="nav-feature-link">Experiences <span>→</span></a>
          </div>
          <div class="nav-col">
            <p class="nav-col-label">Discover</p>
            <ul class="nav-col-links">
              <li><a href="communities.html">Communities</a></li>
              <li><a href="real-estate.html">Real Estate</a></li>
              <li><a href="experiences.html">Experiences</a></li>
              <li><a href="gallery.html">Gallery</a></li>
            </ul>
          </div>
          <div class="nav-col">
            <p class="nav-col-label">Company</p>
            <ul class="nav-col-links">
              <li><a href="about.html">About</a></li>
              <li><a href="careers.html">Careers</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="privacy-policy.html">Foundation</a></li>
            </ul>
          </div>
        </div>
        <button class="nav-close" id="nav-close" aria-label="Close menu">Close</button>
      </nav>
    </header>
  `;
}

function getFooterHTML() {
  if (document.body.classList.contains('page-gallery')) return '';

  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo">Discovery</a>
            <p class="footer-tagline">Creating unforgettable moments in the world's most beautiful settings.</p>
          </div>
          <div class="footer-columns">
            <div class="footer-col">
              <h4 class="footer-col-title">Explore</h4>
              <ul class="footer-links">
                <li><a href="communities.html">Our Worlds</a></li>
                <li><a href="real-estate.html">Real Estate</a></li>
                <li><a href="experiences.html">Experiences</a></li>
                <li><a href="gallery.html">Gallery</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4 class="footer-col-title">Company</h4>
              <ul class="footer-links">
                <li><a href="about.html">About Us</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
              </ul>
            </div>
            <div class="footer-col footer-contact">
              <h4 class="footer-col-title">Get in touch</h4>
              <a href="tel:+14806245200" class="footer-phone">(480) 624-5200</a>
              <a href="mailto:mail@discoverylandco.com" class="footer-email">mail@discoverylandco.com</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">&copy; ${new Date().getFullYear()} Discovery Land Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

function injectSharedComponents() {
  const headerEl = document.getElementById('header');
  const footerEl = document.getElementById('footer');

  if (headerEl) headerEl.innerHTML = getHeaderHTML();
  if (footerEl) footerEl.innerHTML = getFooterHTML();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectSharedComponents);
} else {
  injectSharedComponents();
}
