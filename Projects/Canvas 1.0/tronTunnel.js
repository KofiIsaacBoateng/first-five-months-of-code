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

addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})



function Particles(x, y, radius, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`
    this.time = 1000

    this.draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath();
    }

    this.update = () => {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.time--

    }
}

let particles = []

function init() {
    for (let i = 0; i < 20; i++) {
        let radius = 5
        let points = Math.PI * 2 / 20
        let x = canvas.width / 2
        let y = canvas.height / 2
        let velocity = {
            x: Math.cos(i * points),
            y: Math.sin(i * points)
        }
        particles.push(new Particles(x, y, radius, velocity));

    }

}

function particleRecreation() {
    setTimeout(particleRecreation, 1000)
    for (let i = 0; i < 50; i++) {
        let radius = 3
        let points = Math.PI * 2 / 20
        let x = mouse.x
        let y = mouse.y
        let velocity = {
            x: Math.cos(i * points),
            y: Math.sin(i * points)
        }
        particles.push(new Particles(x, y, radius, velocity));

    }
}



function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    particles.forEach((particle, i) => {
        if (particle.time < 0) {
            particles.splice(i, 1);
        } else {
            particle.update();
        }

    })
}
init();
particleRecreation();
animate();