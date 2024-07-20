const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
// const resultDiv = document.getElementById('result');

const segments = [
    'Option 1', 'Option 2', 'Option 3',
    'Option 4', 'Option 5', 'Option 6'
];

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33B2', '#33FFF2'];
const numSegments = segments.length;
const arcSize = (2 * Math.PI) / numSegments;
let angle = 0;
let isSpinning = false;

function drawWheel() {
    segments.forEach((segment, index) => {
        const angle = index * arcSize;
        ctx.beginPath();
        ctx.arc(250, 250, 250, angle, angle + arcSize);
        ctx.lineTo(250, 250);
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle + arcSize / 2);
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
            const finalAngle = angle % 360;
            const selectedIndex = Math.floor((360 - finalAngle) / 360 * numSegments) % numSegments;
            // resultDiv.textContent = `Selected option: ${segments[selectedIndex]}`;
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

drawWheel();
