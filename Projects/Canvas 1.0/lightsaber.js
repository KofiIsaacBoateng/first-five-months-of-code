let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

let mouse = {
    x: undefined,
    y: undefined
}
let angle;
addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    let x = mouse.x - canvas.width / 2
    let y = mouse.y - canvas.height / 2
    angle = Math.atan2(y, x)
})



function Particles(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius

    this.draw = () => {
        ctx.beginPath()
        ctx.fillStyle = 'blue'
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath();
    }

    this.update = () => {
        this.draw()
    }
}

let particles = []

function initiate() {
    for (let i = 0; i < 200; i++) {
        let x = canvas.width / 2 + i
        let y = canvas.height / 2 + i
        let radius = 5
        let circle = new Particles(x, y, radius)
        particles.push(circle);
    }
}



function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    particles.forEach(particle => {
        particle.update()
    })
}

initiate();
animate();