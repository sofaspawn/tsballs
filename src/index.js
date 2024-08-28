"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let doIStop = false;
let xPos = canvas.width / 2;
let yPos = canvas.height / 2;
const radius = 100;
let velocity = 5;
let direction = [0, 0];
function resizeCanvas() {
    if (canvas && ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    xPos = canvas.width / 2;
    yPos = canvas.height / 2;
}
function handleKeyPress(event) {
    console.log(event.key);
    switch (event.key) {
        case 'q':
            doIStop = true;
            break;
        case 'w':
            direction[1] = -1;
            break;
        case 's':
            direction[1] = 1;
            break;
        case 'a':
            direction[0] = -1;
            break;
        case 'd':
            direction[0] = 1;
            break;
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
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        //ctx.fillRect(0, 0, canvas.width/2, canvas.height/2)
        ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    console.log(direction);
    xPos += direction[0] * velocity;
    yPos += direction[1] * velocity;
    /*
    if (xPos<=0 || xPos>=canvas.width){
        xPos = canvas.width/2
    }
    if (yPos<=0 || yPos>=canvas.height){
        yPos = canvas.height/2
    }
    */
    boundsCheck(xPos, yPos, radius);
    if (!doIStop) {
        requestAnimationFrame(animate);
    }
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('keypress', handleKeyPress);
animate();
