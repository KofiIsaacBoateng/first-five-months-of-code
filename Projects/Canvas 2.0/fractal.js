let canvas = document.querySelector('#canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

ctx.lineWidth = Math.random() * 11 + 10
ctx.shadowColor = 'rgba(0, 0, 0,0.9)'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 5
ctx.shadowBlur = 5
ctx.lineCap = 'round'
const max = 4
let width = canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2
let angle = 0.5
let mainBranch = 3
let scale = 0.5
let sides = 5
let color = `hsl(${Math.random() * 360}, 50%, 50%)`

function drawBranch(level) {
    if (level > max) return
    ctx.beginPath()
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.stroke()

    for (let i = 1; i < mainBranch + 1; i++) {
        ctx.save()
        ctx.translate(width / i, 0)
        ctx.rotate(angle)
        ctx.scale(scale, scale)
        drawBranch(level + 1)
        ctx.restore()

        ctx.save()
        ctx.translate(width / i, 0)
        ctx.rotate(-angle)
        ctx.scale(scale, scale)
        drawBranch(level + 1)
        ctx.restore()
    }

}


function drawFractal() {
    ctx.save()
    ctx.translate(center.x, center.y)
    for (let i = 0; i < sides; i++) {
        ctx.rotate(Math.PI * 2 / sides, 0)
        drawBranch(0)
    }
    ctx.restore()
}

drawFractal()
let button = document.querySelector('button')
button.style.background = color

function randomGerator() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.lineWidth = Math.random() * 11 + 10

    angle = Math.random() * (Math.PI - 1.1) + 0.1
    sides = Math.floor(Math.random() * 6 + 2)
    scale = Math.random() * 0.2 + 0.4
    mainBranch = Math.random() * 2 + 1
    color = `hsl(${Math.random() * 360}, 50%, 50%)`
    drawFractal()
    button.style.background = color

}


button.addEventListener('click', randomGerator)


let angle_controller = document.getElementById('angle')
let angle_label = document.querySelector('[for="angle"]')

angle_controller.addEventListener('change', (e) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    angle = e.target.value;
    drawFractal();
})