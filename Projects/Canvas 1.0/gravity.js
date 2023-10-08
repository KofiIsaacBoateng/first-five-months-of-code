let canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let mouse = {
    x: undefined,
    y: undefined
}

let colorArray = [
    '#FF6363',
    '#FAF5E4',
    '#F8B400',
    '#125B50',
    '#8FBDD3',
    '#2E4C6D',
    '#DADDFC',
    '#396EB0',
    '#2E4C6D',
]

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

addEventListener('click', init)

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.maxRadius = 40;
    this.gravity = 0.5;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill();
    }

    this.update = () => {
        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy * 0.9;
        } else {
            this.dy += this.gravity;
        }

        if (this.x + this.radius > canvas.height || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        this.y += this.dy;
        this.x += this.dx;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 2;
        }
    }
}




function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
        circleArray[i].update();
    }
}
let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 50; i++) {
        let radius = Math.random() * 15 + 10;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight / 1.5 - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = 2;

        var circleLets = new Circle(x, y, dx, dy, radius);
        circleArray.push(circleLets)
    }
}
init()
animate();