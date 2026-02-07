/* ============================================
   NOBLE HANDKRAFT — Main Initialization
   ============================================ */

// Page Loader
window.addEventListener('load', function () {
    var loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(function () {
            loader.classList.add('page-loader--hidden');
            document.body.classList.add('loaded');
        }, 600);
    }
});

// Initialize all modules
document.addEventListener('DOMContentLoaded', function () {
    // Navigation
    if (typeof initNavigation === 'function') {
        initNavigation();
    }

    // Scroll Animations
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }

    // Parallax
    if (typeof initParallax === 'function') {
        initParallax();
    }

    // Contact Form
    if (typeof initContactForm === 'function') {
        initContactForm();
    }

    // Dynamic copyright year
    var yearEl = document.querySelector('.footer__year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
