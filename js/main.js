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

    // Hero Particles
    initHeroParticles();

    // Privacy Policy Modal
    initPrivacyModal();

    // Terms of Service Modal
    initTermsModal();

    // Dynamic copyright year
    var yearEl = document.querySelector('.footer__year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

function initTermsModal() {
    var modal    = document.getElementById('termsModal');
    var link     = document.getElementById('termsOfServiceLink');
    var closeBtn = document.getElementById('termsModalClose');
    var backdrop = document.getElementById('termsModalBackdrop');

    if (!modal || !link) return;

    function openModal() {
        modal.classList.add('policy-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('policy-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        link.focus();
    }

    link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('policy-modal--open')) {
            closeModal();
        }
    });
}

function initPrivacyModal() {
    var modal    = document.getElementById('privacyModal');
    var link     = document.getElementById('privacyPolicyLink');
    var closeBtn = document.getElementById('privacyModalClose');
    var backdrop = document.getElementById('privacyModalBackdrop');

    if (!modal || !link) return;

    function openModal() {
        modal.classList.add('policy-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('policy-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        link.focus();
    }

    link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('policy-modal--open')) {
            closeModal();
        }
    });
}
