const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8B5CF6';
    ctx.beginPath();
    ctx.moveTo(0, 100);

    const waveHeight = 20;
    const waveLength = 200; // less for more waves
    for (let x = 0; x <= canvas.width; x += waveLength) {
        ctx.quadraticCurveTo(
            x + waveLength / 4,
            100 - waveHeight,
            x + waveLength / 2,
            100
        );
        ctx.quadraticCurveTo(
            x + (3 * waveLength) / 4,
            100 + waveHeight,
            x + waveLength,
            100
        );
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

drawWave();
