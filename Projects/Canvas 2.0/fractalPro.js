let canvas = document.querySelector('#canvas')
canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

let ctx = canvas.getContext('2d')
ctx.lineCap = 'round'
ctx.lineWidth = 20
let maxValue = 4
let scale = 0.5
let branches = 3
let width = canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2
let angle = 0.5
let numOfSides = 5
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10

function draw(level) {
    if (level > maxValue) return;
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.strokeStyle = 'hsl(150, 100%, 50%)'
    ctx.stroke()
    for (let i = 1; i < branches + 1; i++) {
        ctx.save()
        ctx.translate(width / i, 0)
        ctx.rotate(-angle)
        ctx.scale(scale, scale)
        draw(level + 1)
        ctx.restore()

        ctx.save()
        ctx.translate(width / i, 0)
        ctx.rotate(angle)
        ctx.scale(scale, scale)
        draw(level + 1)
        ctx.restore()

    }

}

function draw2Fractals() {
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    for (let i = 0; i < numOfSides; i++) {
        ctx.rotate(Math.PI * 2 / numOfSides, 0)
        draw(0)
    }
    ctx.restore()
}

draw2Fractals()

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)

    draw2Fractals();
}

animate()