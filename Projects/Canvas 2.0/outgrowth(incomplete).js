/* @type {HtmlCanvasElements} */

let canvas = document.querySelector('#canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let ctx = canvas.getContext('2d')

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

class Outgrowth {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.maxSize = Math.random() * 5 + 2
        this.velocityX = (Math.random() - 0.5) * 2
        this.velocityY = (Math.random() - 0.5) * 2
        this.angleX = Math.random() * 6.2
        this.angleY = Math.random() * 6.2
        this.growthVelocity = Math.random() * 0.2 + 0.06
        this.angleXVelocity = Math.random() * 0.1 + 0.06
        this.angleYVelocity = Math.random() * 0.1 + 0.06
        this.lightness = 10;
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = `silver`
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        ctx.fill()
        ctx.stroke()
    }

    update() {
        this.radius += this.growthVelocity
        this.x += this.velocityX + Math.sin(this.angleX)
        this.y += this.velocityY + Math.sin(this.angleY)
        this.angleX += this.angleXVelocity
        this.angleY += this.angleYVelocity

        if (this.lightness < 70) this.lightness++
            if (this.radius < this.maxSize) {
                this.draw()
            }


    }
}
let roots = []
let go = false
addEventListener('mousemove', (e) => {
    if (go === true) {
        for (let i = 0; i < 3; i++) {
            let radius = Math.random() * 1 + 2
            let outgrowth = new Outgrowth(e.x, e.y, radius)
            roots.push(outgrowth);
        }
    }

})

ctx.globalCompositeOperation = 'destination-over'

addEventListener('mousedown', () => {
    go = true;
})

addEventListener('mouseup', () => {
    go = false
})


function animate() {
    requestAnimationFrame(animate)
    roots.forEach(root => {

        root.update();
    })
}

animate()