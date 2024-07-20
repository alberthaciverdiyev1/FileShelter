const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

const segments = [
    'Seçim 1', 'Seçim 2', 'Seçim 3',
    'Seçim 4', 'Seçim 5', 'Seçim 6'
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

function rotateWheel() {
    if (!isSpinning) return;
    angle += 5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();
    drawPointer();
    requestAnimationFrame(rotateWheel);
}

function startSpin() {
    if (isSpinning) return;
    isSpinning = true;
    spinButton.disabled = true;

    // Spin duration between 3 and 10 seconds
    const spinDuration = Math.random() * 7000 + 3000;
    const spinEndTime = Date.now() + spinDuration;

    let speed = 20; // starting speed
    function animate() {
        const elapsedTime = spinEndTime - Date.now();
        if (elapsedTime <= 0) {
            isSpinning = false;
            spinButton.disabled = false;
            const finalAngle = angle % 360;
            const selectedIndex = Math.floor((360 - finalAngle) / 360 * numSegments) % numSegments;
            resultDiv.textContent = `Kazandınız: ${segments[selectedIndex]}`;
            return;
        }
        angle += speed;
        speed *= 0.98; // decrease speed each frame

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-250, -250);
        drawWheel();
        ctx.restore();
        drawPointer();
        requestAnimationFrame(animate);
    }
    
    animate();
}

function drawPointer() {
    ctx.save();
    ctx.translate(250, 250);
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(270, 40);
    ctx.lineTo(230, 40);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

spinButton.addEventListener('click', startSpin);

drawWheel();
drawPointer();
