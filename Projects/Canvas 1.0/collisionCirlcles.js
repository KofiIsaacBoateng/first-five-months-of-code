//Rotation function
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }

    return rotatedVelocities;
}


//Resolving Collision detection formular

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y

    const xDist = otherParticle.x - particle.x
    const yDist = otherParticle.y - particle.y

    // Prevent accidental overlap of particle
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        //Grab angle between the two colliding particles
        const angle = -Math.atan2(yDist, xDist)

        //Store particle masses in variables for better readability
        const m1 = particle.mass
        const m2 = otherParticle.mass

        //velocity before equation
        const u1 = rotate(particle.velocity, angle)
        const u2 = rotate(otherParticle.velocity, angle)

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y }
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y }

        //Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle)
        const vFinal2 = rotate(v2, -angle)

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x
        particle.velocity.y = vFinal1.y

        otherParticle.velocity.x = vFinal2.x
        otherParticle.velocity.y = vFinal2.y
    }


}

const mouse = {
    x: undefined,
    y: undefined
}

let canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

//Pythagoras
function pythagoras(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;

    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
}

//colors array
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
    // Cicle constructor function
function Circles(x, y, radius) {
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    }
    this.radius = radius
    this.opacity = 0;
    this.color = color[Math.floor(Math.random() * color.length)]

    this.draw = () => {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
        ctx.closePath()
    }

    this.update = () => {
        this.draw()

        //collision resolution
        for (let j = 0; j < particles.length; j++) {
            if (this === particles[j]) continue;
            if (pythagoras(this.x, this.y, particles[j].x, particles[j].y) < this.radius * 2) {
                resolveCollision(this, particles[j])
            }
        }
        //velocity dynamics
        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.velocity.x = -this.velocity.x
        }

        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.velocity.y = -this.velocity.y
        }

        this.x += this.velocity.x
        this.y += this.velocity.y

        // Mouse contacts update
        if (pythagoras(mouse.x, mouse.y, this.x, this.y) < 20 && this.opacity < 1) {
            this.opacity += 1;
        } else {
            this.opacity -= 0.05;
            this.opacity = Math.max(0, this.opacity)
        }

    }
}
let particles = []
    // Instance creator
function initiate() {

    for (let i = 0; i < 1000; i++) {
        let radius = 3
        let x = Math.random() * ((canvas.width - radius) - radius + 1) + radius
        let y = Math.random() * ((canvas.height - radius) - radius + 1) + radius
            // Making sure particles don't overlap
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (pythagoras(x, y, particles[j].x, particles[j].y) < radius * 2) {
                    x = Math.random() * ((canvas.width - radius) - radius + 1) + radius
                    y = Math.random() * ((canvas.height - radius) - radius + 1) + radius
                    j = -1;
                }


            }
        }
        // new instance
        const circle = new Circles(x, y, radius);
        particles.push(circle)
    }
}
// animation zone
function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
    }
}

initiate()
animate()