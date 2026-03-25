// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Sticky nav background on scroll
const nav = document.getElementById('navbar');
const hero = document.getElementById('hero');

const navObserver = new IntersectionObserver(
  ([entry]) => {
    nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
  },
  { threshold: 0.1 }
);
navObserver.observe(hero);

// Scroll-triggered fade-in animations
const fadeEls = document.querySelectorAll('.fade-in, .fade-in-group');
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach(el => fadeObserver.observe(el));

// Floating mobile CTA (show after scrolling past hero)
const floatingCta = document.getElementById('floating-cta');
if (floatingCta) {
  const floatingObserver = new IntersectionObserver(
    ([entry]) => {
      floatingCta.classList.toggle('show', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  floatingObserver.observe(hero);
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const triggers = document.querySelectorAll('.lightbox-trigger');
let currentImages = [];
let currentIndex = 0;

triggers.forEach(img => {
  img.addEventListener('click', () => {
    // Get all sibling images in the same grid
    const grid = img.closest('.grid');
    currentImages = Array.from(grid.querySelectorAll('.lightbox-trigger'));
    currentIndex = currentImages.indexOf(img);
    showLightbox(currentImages[currentIndex]);
  });
});

function showLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.showModal();
}

function navigate(dir) {
  currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].alt;
}

document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
document.getElementById('lightbox-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lightbox-next').addEventListener('click', () => navigate(1));

// Close on backdrop click (clicking outside the image)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.closest('.flex') === e.target) lightbox.close();
});

// Keyboard navigation
lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'Escape') lightbox.close();
});
