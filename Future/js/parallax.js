/* ============================================
   NOBLE HANDKRAFT — Hero Parallax
   ============================================ */

function initParallax() {
    var heroBackground = document.getElementById('heroBackground');
    var hero = document.getElementById('hero');

    if (!heroBackground || !hero) return;

    // Disable on mobile or reduced motion
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) return;

    var ticking = false;

    function updateParallax() {
        var scrollY = window.scrollY;
        var heroHeight = hero.offsetHeight;

        // Only apply parallax while hero is in viewport
        if (scrollY < heroHeight) {
            var offset = scrollY * 0.3;
            heroBackground.style.transform = 'translateY(' + offset + 'px)';
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}
