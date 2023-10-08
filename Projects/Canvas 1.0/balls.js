let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
const mouse = {
    x: undefined,
    y: undefined
}

const color = [
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

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 40;
    this.color = color[Math.floor(Math.random() * color.length)]

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill();
    }

    this.update = () => {
        if (this.x + 30 > window.innerWidth || this.x - 30 < 0) {
            this.dx = -this.dx;
        }

        if (this.y + 30 > window.innerHeight || this.y - 30 < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 70 && mouse.x - this.x > -70 && mouse.y - this.y > -70 && mouse.y - this.y < 70) {
            if (this.radius < this.maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

    }
}
let circleArray = [];
for (let i = 0; i < 800; i++) {
    let radius = Math.random() * (20 - 10 + 1) + 10;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() * 2 - 0.5;
    let dy = Math.random() * 2 - 0.5;
    const circle = new Circle(x, y, dx, dy, radius)
    circleArray.push(circle);
}



function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw()
        circleArray[i].update()
    }


}

animate();