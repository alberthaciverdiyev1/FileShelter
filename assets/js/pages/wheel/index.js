document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    const pointer = document.getElementById('pointer');
    let segments = [];

    const resizeCanvas = () => {
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 20;
        const size = Math.min(maxWidth, maxHeight);
        canvas.width = size;
        canvas.height = size;
        drawWheel(); 
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getTopics = async () => {
        try {
            const response = await fetch('/topics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            segments = data.map(x => x.topic);

            drawWheel();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    getTopics();

    let colors = [];
    let angle = 0;
    let isSpinning = false;

    function drawWheel() {
        if (segments.length === 0) return;
        colors = segments.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')); // Renkler

        const numSegments = segments.length;
        const arcSize = (2 * Math.PI) / numSegments;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = centerX;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        segments.forEach((segment, index) => {
            const startAngle = index * arcSize;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + arcSize);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + arcSize / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = `${Math.max(10, radius / 10)}px Arial`; 
            ctx.fillText(segment.slice(0, 15), radius - 10, 10);
            ctx.restore();
        });
    }

    function startSpin() {
        if (isSpinning) return;
        isSpinning = true;
        spinButton.disabled = true;

        const spinDuration = 2000;
        const spinEndTime = Date.now() + spinDuration;

        let speed = Math.random() * 20 + 20;
        let deceleration = 0.98;

        function animate() {
            const elapsedTime = spinEndTime - Date.now();
            if (elapsedTime <= 0) {
                isSpinning = false;
                spinButton.disabled = false;
                angle %= 360;
                const numSegments = segments.length;
                const arcSize = 360 / numSegments;
                const selectedIndex = Math.floor(((360 - (angle % 360)) % 360) / arcSize);

                Swal.fire({
                    title: segments[selectedIndex],
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            angle += speed;
            speed *= deceleration;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animate);
        }

        animate();
    }

    spinButton.addEventListener('click', startSpin);
});
