(function () {
    function debounce(fn, wait = 120) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    function resizeCanvasToViewport() {
        if (!canvas || !ctx) return;
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const height = (width <= 480) ? 80 : (width <= 768 ? 100 : (width <= 992 ? 130 : 150));
        canvas.width = Math.max(600, Math.floor(width));
        canvas.height = Math.max(80, Math.floor(height));
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    }

    function drawWave() {
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#a37dfb';
        ctx.beginPath();

        const baseY = Math.floor(canvas.height * 0.62);
        ctx.moveTo(0, baseY);

        const waveHeight = Math.max(12, Math.floor(canvas.height * 0.12));
        const waveLength = Math.max(90, Math.floor(canvas.width / 10));

        for (let x = 0; x <= canvas.width + waveLength; x += waveLength) {
            ctx.quadraticCurveTo(
                x + waveLength / 4,
                baseY - waveHeight,
                x + waveLength / 2,
                baseY
            );
            ctx.quadraticCurveTo(
                x + (3 * waveLength) / 4,
                baseY + waveHeight,
                x + waveLength,
                baseY
            );
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
    }

    const handleResize = debounce(function () {
        resizeCanvasToViewport();
        drawWave();

        const navRight = document.querySelector('.nav-right');
        const hamburger = document.querySelector('.hamburger');
        const icon = hamburger ? hamburger.querySelector('i') : null;

        if (window.innerWidth > 768 && navRight && navRight.classList.contains('active')) {
            navRight.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
        }
    }, 120);

    window.addEventListener('load', function () {
        resizeCanvasToViewport();
        drawWave();
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');

    if (hamburger && navRight) {

        hamburger.setAttribute('aria-expanded', 'false');

        const icon = hamburger.querySelector('i');

        hamburger.addEventListener('click', function (e) {
            e.stopPropagation();
            const nowOpen = !navRight.classList.contains('active');
            navRight.classList.toggle('active', nowOpen);
            hamburger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');

            if (icon) {
                if (nowOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        document.addEventListener('click', function (ev) {
            if (!navRight.contains(ev.target) && !hamburger.contains(ev.target) && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
            }
        });

        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && navRight.classList.contains('active')) {
                navRight.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
            }
        });
    } else {
        if (canvas && ctx) {
            resizeCanvasToViewport();
            drawWave();
        }
    }

    // gsap animation
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".info-card", {
        scrollTrigger: {
            trigger: "#info-section",
            start: "start 70%",
            end: "+=100 40%",
            scrub: true,
            markers: true,
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2
    });

})();