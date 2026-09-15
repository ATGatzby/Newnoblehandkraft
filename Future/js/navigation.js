/* ============================================
   NOBLE HANDKRAFT — Navigation
   ============================================ */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar || !navToggle || !navMenu) return;

    // --- Sticky Navbar on Scroll ---
    let ticking = false;

    function updateNavbar() {
        if (window.scrollY > 80) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateNavbar();

    // --- Mobile Menu Toggle ---
    function openMenu() {
        navMenu.classList.add('navbar__menu--open');
        navToggle.classList.add('navbar__toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
    }

    function closeMenu() {
        navMenu.classList.remove('navbar__menu--open');
        navToggle.classList.remove('navbar__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
    }

    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.contains('navbar__menu--open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on link click
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('navbar__menu--open')) {
            closeMenu();
            navToggle.focus();
        }
    });

    // --- Focus Trap in Mobile Menu ---
    navMenu.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;

        var focusable = navMenu.querySelectorAll('a[href], button');
        if (focusable.length === 0) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // --- Smooth Scroll with Navbar Offset ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Active Link Highlighting ---
    var linkObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    var activeLinkObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.remove('navbar__link--active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('navbar__link--active');
                    }
                });
            }
        });
    }, linkObserverOptions);

    sections.forEach(function (section) {
        activeLinkObserver.observe(section);
    });
}
