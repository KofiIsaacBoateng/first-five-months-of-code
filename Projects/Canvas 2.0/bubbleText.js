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
        this.distance;
        this.speedVariation = (Math.random() * 8) + 1
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.strokeStyle = 'rgb(240, 115, 13)'

        if (this.distance < 150 - 20) {
            this.radius = 8
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc(this.x - 5, this.y, this.radius / 4, 0, Math.PI * 2, false)
            ctx.arc(this.x - 3, this.y, this.radius / 3, 0, Math.PI * 2, false)

        } else if (this.distance < 150) {
            this.radius = 9
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc(this.x - 5, this.y, this.radius / 4, 0, Math.PI * 2, false)
            ctx.arc(this.x - 3, this.y, this.radius / 3, 0, Math.PI * 2, false)
        } else {
            this.radius = 5
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.arc(this.x - 3, this.y, this.radius / 3, 0, Math.PI * 2, false)


        }
        ctx.closePath()
        ctx.fill()
    }

    update() {
        this.draw()
        let distancex = this.x - mouse.x
        let distancey = this.y - mouse.y
        let distance = Math.hypot(distancex, distancey)
        this.distance = distance
        let forceDistanceX = distancex / distance
        let forceDistanceY = distancey / distance
        let maxDistance = 150
        let force = (maxDistance - distance) / maxDistance
        if (distance < maxDistance) {
            let velocityX = forceDistanceX * force * this.speedVariation
            let velocityY = forceDistanceY * force * this.speedVariation
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
    })
}

animate()