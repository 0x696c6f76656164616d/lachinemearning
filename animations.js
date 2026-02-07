export function initAnimations() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function update() {
        const time = Date.now() * 0.001; // Seconds

        // Clear with near black base
        ctx.fillStyle = '#050005';
        ctx.fillRect(0, 0, width, height);

        // Draw Liquid Nebula
        drawNebula(time);

        // Draw Grid Floor (Retained)
        drawGrid();

        requestAnimationFrame(update);
    }

    function drawNebula(time) {
        ctx.save();
        // Create multiple moving "blobs" of color
        // Blob 1: Hot Pink
        drawBlob(
            width * 0.3 + Math.sin(time * 0.5) * 100,
            height * 0.3 + Math.cos(time * 0.3) * 100,
            350,
            'rgba(247, 37, 133, 0.25)' // #f72585
        );

        // Blob 2: Neon Purple
        drawBlob(
            width * 0.7 + Math.cos(time * 0.4) * 120,
            height * 0.4 + Math.sin(time * 0.6) * 120,
            450,
            'rgba(181, 23, 158, 0.2)' // #b5179e
        );

        // Blob 3: Soft Violet
        drawBlob(
            width * 0.5 + Math.sin(time * 0.2) * 200,
            height * 0.6 + Math.cos(time * 0.4) * 100,
            500,
            'rgba(114, 9, 183, 0.15)' // #7209b7
        );
        ctx.restore();
    }

    function drawBlob(x, y, radius, color) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(26, 27, 38, 0)'); // fade to bg
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawGrid() {
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = '#f72585'; // Neon Pink
        ctx.lineWidth = 1;

        const time = Date.now() * 0.05;
        const horizonY = height * 0.6; // Lower horizon for more "sky" space

        // Vertical lines with perspective
        const centerX = width / 2;
        const vLines = 20;

        for (let i = -vLines; i <= vLines; i++) {
            const x = centerX + (i * 120);

            ctx.beginPath();
            ctx.moveTo(centerX + i * 10, horizonY);
            ctx.lineTo(x * 6, height);
            ctx.stroke();
        }

        // Horizontal lines (moving floor)
        const moveOffset = (time % 100);

        // Draw grid below horizon
        // Using logarithmic spacing for depth perception
        for (let i = 0; i < 20; i++) {
            const depth = i * 20 + moveOffset;
            // Map linear depth to exponential y position
            // Detailed perspective math simplified for visual effect
            const y = horizonY + (depth * depth) * 0.002;

            if (y > height) continue;
            if (y < horizonY) continue;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Horizon Line Glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#ff00ff'; // Magenta Glow
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(width, horizonY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
    }

    window.addEventListener('resize', resize);
    resize();
    update();
}
