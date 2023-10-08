let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth / 1
canvas.height = window.innerHeight / 1
canvas.style.background = '#fff'





let wavelength = 0.01,
    amplitude = 100,
    frequency = 0.01


const hueValues = {
    h: 10,
    s: 100,
    l: 100
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgb(50,0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + Math.sin(i * wavelength + frequency) * amplitude * Math.sin(frequency))
        ctx.strokeStyle = `hsl(${Math.abs(hueValues.h * Math.sin(frequency))}, ${Math.abs(hueValues.s * Math.sin(frequency))}%, ${Math.abs(hueValues.l * Math.sin(frequency))}%)`
        ctx.stroke()
    }

    frequency += 0.01




}

animate()