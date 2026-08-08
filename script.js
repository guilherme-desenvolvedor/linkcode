const canvas = document.getElementById("nodes");

if (canvas) {
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width, height, points;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function makePoints() {
        const count = Math.min(36, Math.floor((width * height) / 42000));
        points = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15
        }));
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        for (const p of points) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const a = points[i], b = points[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const max = 140;
                if (dist < max) {
                    ctx.strokeStyle = `rgba(230, 52, 31, ${0.06 * (1 - dist / max)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (const p of points) {
            ctx.fillStyle = "rgba(242, 240, 236, 0.18)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
            ctx.fill();
        }

        if (!prefersReducedMotion) {
            requestAnimationFrame(step);
        }
    }

    resize();
    makePoints();
    step();

    window.addEventListener("resize", () => {
        resize();
        makePoints();
        if (prefersReducedMotion) step();
    });
}
