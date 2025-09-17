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
    }, 120);

    window.addEventListener('load', function () {
        resizeCanvasToViewport();
        drawWave();
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    if (canvas && ctx) {
        resizeCanvasToViewport();
        drawWave();
    }
})();
