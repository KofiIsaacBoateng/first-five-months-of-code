let canvas = document.querySelector('#canvas')
canvas.height = innerHeight
canvas.width = innerWidth
let ctx = canvas.getContext('2d')

const mouse = {
    x: undefined,
    y: undefined
}


window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

ctx.fillStyle = 'white'
ctx.font = '20px verdana'
ctx.fillText('Kay', 0, 20)
ctx.fillText('Code', 0, 40)

let canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)

console.log(canvasData)


// Creating Particles 

class Particles {
    constructor(x, y) {
        this.x = x * 12
        this.y = y * 12
        this.radius = 3
        this.originX = x * 12
        this.originY = y * 12
        this.friction = 0.99
        this.speedVariation = Math.random() * 8 + 5
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
    }

    update() {
        this.draw()
        let distancex = this.x - mouse.x
        let distancey = this.y - mouse.y
        let distance = Math.hypot(distancex, distancey)
        let forceDistanceX = distancex / distance
        let forceDistanceY = distancey / distance
        let maxDistance = 100
        let force = (maxDistance - distance) / maxDistance
        if (distance < maxDistance) {
            ctx.strokeStyle = '#de2de2'
            let velocityX = forceDistanceX * force * 2
            let velocityY = forceDistanceY * force * 2
            this.x += velocityX
            this.y += velocityY


        } else {
            if (this.x !== this.originX) {
                distancex = this.originX - this.x
                this.x += distancex / 10
            }

            if (this.y !== this.originY) {
                distancey = this.originY - this.y
                this.y += distancey / 10
            }
        }
    }
}
let particles = []

function initiate() {
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            let opacity = canvasData.data[(y * 4 * canvasData.width) + (x * 4 + 3)]

            if (opacity > 128) {
                let particle = new Particles(x, y)
                particles.push(particle)
            }
        }
    }
}
ctx.clearRect(0, 0, canvas.width, canvas.height)
initiate()
console.log(particles)

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
        particle.update()

        for (let i = 0; i < particles.length; i++) {
            let distancex = Math.abs(particle.x - particles[i].x)
            let distancey = Math.abs(particle.y - particles[i].y)
            if (distancex < 15 && distancey < 15) {
                ctx.beginPath()
                if (Math.abs(mouse.x - particle.x) < 50 && Math.abs(mouse.y - particle.y) < 50) {
                    ctx.strokeStyle = 'rgb(239, 201, 12)'
                } else {
                    ctx.strokeStyle = '#fff'
                }
                ctx.lineWidth = 2
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[i].x, particles[i].y)
                ctx.stroke()
                ctx.closePath()
            }
        }
    })
}

animate()