/* ============================================================
   NOBLE HANDKRAFT — Site behaviour
   Mobile navigation, festive countdown, current year.
   ============================================================ */

(function () {
    'use strict';

    /* ---- Mobile navigation -------------------------------- */
    var burger = document.getElementById('burger');
    var mobile = document.getElementById('mobile');

    if (burger && mobile) {
        burger.addEventListener('click', function () {
            var open = mobile.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
                mobile.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                burger.focus();
            }
        });
    }

    /* ---- Festive countdown --------------------------------
       Diwali 2026 falls on Sunday 8 November. Update DIWALI
       each year, or remove the utility bar out of season.     */
    var DIWALI = '2026-11-08T00:00:00+05:30';
    var out = document.getElementById('festiveCount');

    if (out) {
        var target = new Date(DIWALI);

        var tick = function () {
            var days = Math.ceil((target - new Date()) / 86400000);
            if (days > 1) { out.textContent = '· ' + days + ' days to go'; }
            else if (days === 1) { out.textContent = '· tomorrow'; }
            else if (days === 0) { out.textContent = '· today'; }
            else { out.textContent = ''; }
        };

        tick();
        setInterval(tick, 60000);
    }

    /* ---- Current year in footer --------------------------- */
    var year = document.getElementById('year');
    if (year) { year.textContent = new Date().getFullYear(); }
})();
