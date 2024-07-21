document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');
    let segments = [];

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

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33B2', '#33FFF2'];
    let angle = 0;
    let isSpinning = false;

    function drawWheel() {
        if (segments.length === 0) return; 

        const numSegments = segments.length;
        const arcSize = (2 * Math.PI) / numSegments;

        segments.forEach((segment, index) => {
            const startAngle = index * arcSize;
            ctx.beginPath();
            ctx.arc(250, 250, 250, startAngle, startAngle + arcSize);
            ctx.lineTo(250, 250);
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(startAngle + arcSize / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 20px Arial";
            ctx.fillText(segment, 200, 10);
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
            ctx.translate(250, 250);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-250, -250);
            drawWheel();
            ctx.restore();
            requestAnimationFrame(animate);
        }

        animate();
    }

    spinButton.addEventListener('click', startSpin);
});
