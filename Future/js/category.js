/* ============================================
   NOBLE HANDKRAFT — Category Page Init
   ============================================ */

window.addEventListener('load', function () {
    var loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(function () {
            loader.classList.add('page-loader--hidden');
            document.body.classList.add('loaded');
        }, 500);
    }

    // Trigger hero zoom-in after load
    var hero = document.querySelector('.cat-hero');
    if (hero) hero.classList.add('cat-hero--loaded');
});

document.addEventListener('DOMContentLoaded', function () {
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();

    var yearEl = document.querySelector('.footer__year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Privacy Policy Modal
    var privModal    = document.getElementById('privacyModal');
    var privLink     = document.getElementById('privacyPolicyLink');
    var privClose    = document.getElementById('privacyModalClose');
    var privBackdrop = document.getElementById('privacyModalBackdrop');
    if (privModal && privLink) {
        privLink.addEventListener('click', function (e) {
            e.preventDefault();
            privModal.classList.add('policy-modal--open');
            privModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            privClose.focus();
        });
        function closePriv() {
            privModal.classList.remove('policy-modal--open');
            privModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        privClose.addEventListener('click', closePriv);
        privBackdrop.addEventListener('click', closePriv);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && privModal.classList.contains('policy-modal--open')) closePriv();
        });
    }

    // Terms of Service Modal
    var termsModal    = document.getElementById('termsModal');
    var termsLink     = document.getElementById('termsOfServiceLink');
    var termsClose    = document.getElementById('termsModalClose');
    var termsBackdrop = document.getElementById('termsModalBackdrop');
    if (termsModal && termsLink) {
        termsLink.addEventListener('click', function (e) {
            e.preventDefault();
            termsModal.classList.add('policy-modal--open');
            termsModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            termsClose.focus();
        });
        function closeTerms() {
            termsModal.classList.remove('policy-modal--open');
            termsModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
        termsClose.addEventListener('click', closeTerms);
        termsBackdrop.addEventListener('click', closeTerms);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && termsModal.classList.contains('policy-modal--open')) closeTerms();
        });
    }
});
