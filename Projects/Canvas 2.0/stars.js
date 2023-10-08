let canvas = document.querySelector('#canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let ctx = canvas.getContext('2d')

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})
let hue = 0
ctx.strokeStyle = '#000'
ctx.lineWidth = 3
let sides = 5
let size = 40
let inset = 0.6
ctx.shadowColor = 'black'
ctx.shadowOffsetY = 10
ctx.shadowOffsetX = 10
ctx.shadowBlur = 10

function drawStroke(x, y, radius, inset, sides) {
    ctx.beginPath()
    ctx.fillStyle = `#b4a5a5`
    ctx.save()
    ctx.translate(x, y)
    ctx.moveTo(0, 0 - radius)

    for (let i = 0; i < sides * 2; i++) {
        ctx.rotate(Math.PI / sides)
        ctx.lineTo(0, 0 - radius * inset)
        ctx.rotate(Math.PI / sides)
        ctx.lineTo(0, 0 - radius)
    }
    ctx.restore()
    ctx.stroke()
    ctx.fill()
}

//GLOBAL FUCKING COMPOSITE OPERATION 
//destination-over: *Sets shadows infront and draws everything backwards
//lighter: gives your drawing high light contrast
//hue: is quite similar to destination over but has some gray touch
//difference: add some sort of African-print looking Blinking wierd Diamond background
//  ctx.globalCompositeOperation = 'difference'

drawStroke(100, 100, 50 * 1.45, 1, 1.5);
drawStroke(100, 100, 50, 0.3, 9);
let drawing = false
let angle = 0
window.addEventListener('mousemove', (e) => {
    if (drawing === true) {
        // hue += 3;
        ctx.save()
        ctx.translate(e.x, e.y)
        ctx.rotate(angle)
        drawStroke(0, 0, 50 * 1.45, 1, 1.5);
        ctx.rotate(-angle)
        drawStroke(0, 0, 50, 0.3, 9);
        angle += 0.1

        ctx.restore()
    }

})

window.addEventListener('mousedown', () => {
    drawing = true;
})

addEventListener('mouseup', () => {
    drawing = false
})