const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let doIStop = false;

let xPos = canvas.width/2
let yPos = canvas.height/2

const radius = 20
let velocity = 5;

let direction = [1,0]

function resizeCanvas(): void{
    if (canvas && ctx){
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
}

function handleKeyPress(event: KeyboardEvent): void{
    switch (event.key){
        case 'q':
            doIStop=true
    }
}

function boundsCheck(xPos: number, yPos: number, radius:number): void{
    if (xPos-radius<=0 || xPos+radius>canvas.width){
        direction[0] *= -1;
    }
    if (yPos-radius<=0 || yPos+radius>canvas.height){
        direction[1] *= -1;
    }
}

function animate(): void{
    window.addEventListener('keypress', handleKeyPress)

    resizeCanvas();

    if (ctx){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        ctx.fillStyle = 'blue';
        ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    boundsCheck(xPos, yPos, radius);

    xPos += direction[0] * velocity
    yPos += direction[1] * velocity

    if (!doIStop){
        requestAnimationFrame(animate);
    }
}

animate()
