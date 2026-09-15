/* ============================================
   NOBLE HANDKRAFT — Scroll Animations
   ============================================ */

function initScrollAnimations() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left')
            .forEach(function (el) {
                el.classList.add('is-visible');
            });
        return;
    }

    var observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var delay = parseInt(el.dataset.delay || '0', 10);

                if (delay > 0) {
                    setTimeout(function () {
                        el.classList.add('is-visible');
                    }, delay);
                } else {
                    el.classList.add('is-visible');
                }

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-slide-left')
        .forEach(function (el) {
            observer.observe(el);
        });
}
