/* ============================================
   NOBLE HANDKRAFT — Gold Dust Particles
   ============================================ */

function initHeroParticles() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    // Create canvas and inject into body — never inside the flex hero
    var canvas = document.createElement('canvas');
    canvas.style.cssText = [
        'position:fixed',
        'top:0', 'left:0',
        'width:100%', 'height:100%',
        'z-index:9',
        'pointer-events:none',
        'opacity:0',
        'transition:opacity 0.8s ease'
    ].join(';');
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animId = null;
    var visible = false;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function Particle(init) { this.reset(init); }

    Particle.prototype.reset = function (init) {
        this.x    = Math.random() * canvas.width;
        this.y    = init ? Math.random() * canvas.height : canvas.height + 8;
        this.r    = Math.random() * 1.6 + 0.3;
        this.vx   = (Math.random() - 0.5) * 0.28;
        this.vy   = -(Math.random() * 0.38 + 0.12);
        this.op   = Math.random() * 0.5 + 0.08;
        this.fade = Math.random() * 0.0025 + 0.0008;
        this.wave = Math.random() * 0.0008 + 0.0004;
        this.wamp = Math.random() * 0.25 + 0.08;
        this.dir  = Math.random() > 0.5 ? 1 : -1;
        this.seed = Math.random() * 1000;
    };

    Particle.prototype.update = function () {
        var t = Date.now();
        this.x += this.vx + Math.sin(t * this.wave * this.dir + this.seed) * this.wamp;
        this.y += this.vy;
        this.op -= this.fade;
        if (this.y < -8 || this.op <= 0) this.reset(false);
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212,175,55,' + this.op + ')';
        ctx.fill();
    };

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        animId = requestAnimationFrame(loop);
    }

    function show() {
        if (visible) return;
        visible = true;
        canvas.style.opacity = '1';
        loop();
    }

    function hide() {
        if (!visible) return;
        visible = false;
        canvas.style.opacity = '0';
        cancelAnimationFrame(animId);
        animId = null;
    }

    resize();
    for (var i = 0; i < 110; i++) {
        particles.push(new Particle(true));
    }

    // Show only when hero is in view
    var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) show();
        else hide();
    }, { threshold: 0.05 });
    obs.observe(hero);

    window.addEventListener('resize', resize, { passive: true });
}
