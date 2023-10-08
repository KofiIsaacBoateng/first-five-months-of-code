let canvas = document.getElementById('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let ctx = canvas.getContext('2d')

window.addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}
const particles = []
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    for (let i = 0; i < 3; i++) {
        let color = `hsl(${hue}, 100%, 50%)`
        let particle = new Particles(mouse.x, mouse.y, Math.random() * (3 - 2) + 1, color)
        particles.push(particle)
    }

})

// PARTICLES CLASS  
class Particles {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = Math.random() * (15 - 6) + 5
        this.color = color
        this.dx = (Math.random() - 0.5) * 5
        this.dy = (Math.random() - 0.5) * 5
        this.opacity = 1
    }

    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()
        this.x += this.dx
        this.y += this.dy
        this.opacity -= 0.02;
    }
}


function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    particles.forEach((particle, index) => {
        if (particle.opacity > 0) {
            particle.update()
        } else {
            particles.splice(index, 1);
        }
        for (let i = 0; i < particles.length; i++) {
            let hypot = Math.hypot(particle.x - particles[i].x, particle.y - particles[i].y)
            if (hypot < 50) {
                ctx.beginPath()
                ctx.lineWidth = 1;
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[i].x, particles[i].y);
                ctx.strokeStyle = particle.color
                ctx.stroke()
            }
        }

    })
    hue = hue + 2
}

animate()