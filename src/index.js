"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let doIStop = false;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
const radius = 20;
let velocity = 5;
let direction = [1, 2];
function resizeCanvas() {
    if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    xPos = canvas.width / 2;
    yPos = canvas.height / 2;
}
function handleKeyPress(event) {
    switch (event.key) {
        case 'q':
            doIStop = true;
        case 'ArrowUp':
            direction[1] = -1;
        case 'ArrowDown':
            direction[1] = 1;
        case 'ArrowLeft':
            direction[0] = -1;
        case 'ArrowRight':
            direction[0] = 1;
        default:
            break;
    }
}
function boundsCheck(xPos, yPos, radius) {
    if (xPos - radius <= 0 || xPos + radius > canvas.width) {
        direction[0] *= -1;
    }
    if (yPos - radius <= 0 || yPos + radius > canvas.height) {
        direction[1] *= -1;
    }
}
function animate() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        //ctx.fillRect(0, 0, canvas.width/2, canvas.height/2)
        ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    xPos += direction[0] * velocity;
    yPos += direction[1] * velocity;
    boundsCheck(xPos, yPos, radius);
    if (!doIStop) {
        requestAnimationFrame(animate);
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('keypress', handleKeyPress);
animate();
