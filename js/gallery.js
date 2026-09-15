/* ============================================================
   NOBLE HANDKRAFT — Noble Collection gallery
   Category filtering and an accessible image viewer.

   Grid tiles load thumbnails; the viewer swaps in the
   full-size image held on each tile's data-full attribute.
   ============================================================ */

(function () {
    'use strict';

    var gallery = document.getElementById('gallery');
    if (!gallery) { return; }

    var tiles = Array.prototype.slice.call(gallery.querySelectorAll('.tile'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('#filters .chip'));
    var shown = tiles.slice();

    /* ---- Filtering ---------------------------------------- */
    function filter(cat) {
        shown = [];
        tiles.forEach(function (tile) {
            var on = cat === 'all' || tile.getAttribute('data-cat') === cat;
            tile.hidden = !on;
            if (on) { shown.push(tile); }
        });
        chips.forEach(function (chip) {
            var active = chip.getAttribute('data-cat') === cat;
            chip.classList.toggle('is-on', active);
            chip.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            filter(chip.getAttribute('data-cat'));
        });
    });

    /* ---- Viewer ------------------------------------------- */
    var box = document.getElementById('lightbox');
    if (!box) { return; }

    var img = document.getElementById('lbImg');
    var cap = document.getElementById('lbCap');
    var count = document.getElementById('lbCount');
    var closeBtn = document.getElementById('lbClose');
    var at = 0;
    var lastFocus = null;

    function paint() {
        var tile = shown[at];
        if (!tile) { return; }
        var thumb = tile.querySelector('img');
        img.src = tile.getAttribute('data-full') || thumb.getAttribute('src');
        img.alt = thumb.getAttribute('alt');
        cap.innerHTML = tile.querySelector('figcaption').innerHTML;
        count.textContent = (at + 1) + ' / ' + shown.length;
    }

    function open(i) {
        at = i;
        lastFocus = document.activeElement;
        paint();
        box.classList.add('is-open');
        box.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        box.classList.remove('is-open');
        box.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus) { lastFocus.focus(); }
    }

    function step(d) {
        if (!shown.length) { return; }
        at = (at + d + shown.length) % shown.length;
        paint();
    }

    tiles.forEach(function (tile) {
        tile.querySelector('.tile__frame').addEventListener('click', function () {
            var i = shown.indexOf(tile);
            if (i > -1) { open(i); }
        });
    });

    closeBtn.addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { step(1); });

    box.addEventListener('click', function (e) {
        if (e.target === box) { close(); }
    });

    document.addEventListener('keydown', function (e) {
        if (!box.classList.contains('is-open')) { return; }
        if (e.key === 'Escape') { close(); }
        else if (e.key === 'ArrowLeft') { step(-1); }
        else if (e.key === 'ArrowRight') { step(1); }
    });
})();
