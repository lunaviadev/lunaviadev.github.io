/**
 * @file Interactive features for the lunavia.dev portfolio site.
 * @author Josie (lunavia)
 */

/**
 * Builds an auto-playing image carousel with dot indicators.
 * @param {string} trackId - ID of the element holding the slides.
 * @param {string} dotSelector - CSS selector for the dot indicators.
 * @returns {{goTo: function(number): void}} An object for moving to a specific slide.
 */
function createCarousel(trackId, dotSelector) {
  const track = document.getElementById(trackId);
  const slides = track.querySelectorAll('.slide');
  const dots = document.querySelectorAll(dotSelector);
  let cur = 0;

  /**
   * Moves the carousel to a slide. Numbers past either end wrap around.
   * @param {number} n - Index of the slide to show.
   */
  function goTo(n) {
    cur = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * (100 / slides.length)}%)`;
    dots.forEach((d, i) => d.classList.toggle('on', i === cur));
  }

  return { goTo };
}

/**
 * Fades elements in as they scroll into view by adding the "in" class.
 * Each element is only animated once.
 * @param {string} [selector='.reveal'] - CSS selector for the elements to animate.
 * @param {number} [threshold=0.1] - Fraction of the element that must be visible (0 to 1).
 * @returns {IntersectionObserver} The observer, so it can be disconnected later.
 */
function initScrollReveal(selector = '.reveal', threshold = 0.1) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i % 3) * 0.07 + 's';
        e.target.classList.add('in');
        observer.unobserve(e.target);
      }
    });
  }, { threshold, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll(selector).forEach(el => observer.observe(el));
  return observer;
}

/**
 * Highlights the nav link for whichever section is currently on screen.
 * @param {string} [linkSelector='.nav-link'] - CSS selector for the nav links.
 * @returns {IntersectionObserver} The observer that watches the sections.
 */
function initActiveNav(linkSelector = '.nav-link') {
  const links = document.querySelectorAll(linkSelector);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const t = document.querySelector(`${linkSelector}[href="#${e.target.id}"]`);
        if (t) t.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
  return observer;
}

/**
 * Copies a username to the clipboard and briefly shows "Copied!".
 * @param {string} text - The text to copy, e.g. a Discord username.
 * @param {string} labelId - ID of the element that shows the confirmation.
 * @param {number} [resetMs=2000] - How long "Copied!" stays visible, in milliseconds.
 */
function copyToClipboard(text, labelId, resetMs = 2000) {
  navigator.clipboard.writeText(text).catch(() => {});
  const el = document.getElementById(labelId);
  const original = el.textContent;
  el.textContent = 'Copied!';
  setTimeout(() => { el.textContent = original; }, resetMs);
}