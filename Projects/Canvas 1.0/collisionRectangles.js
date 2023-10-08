let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
canvas.width = 350;
canvas.height = 280;
//resize event 
window.addEventListener('resize', () => {
    canvas.width = 350
    canvas.height = 280
})

let color = [
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

function pythagoras(x1, y1, x2, y2) {
    const xDiff = x2 - x1;
    const yDiff = y2 - y1;
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
}


//Rectangle constructor function

function Rect(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocity = {
        x: Math.random() - 0.1,
        y: Math.random() - 0.1
    }
    this.color = color[Math.floor(Math.random() * color.length)]

    this.draw = () => {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fill()

    }

    this.update = () => {
        this.draw()

        if (this.x > canvas.width - this.width || this.x < 0) {
            this.velocity.x = -this.velocity.x
        }

        if (this.y > canvas.height - this.height || this.y < 0) {
            this.velocity.y = -this.velocity.y
        }

        for (let i = 0; i < rectanglets.length; i++) {
            if (this === rectanglets[i]) continue
            if (this.x + this.width >= rectanglets[i].x && this.x >= rectanglets[i].x + this.width) {
                console.log('collided')

            }

            if (this.y + this.height >= rectanglets[i].y && this.y >= rectanglets[i].y + this.height) {
                console.log('collided')

            }
        }



        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

// initation function
let rectanglets = []

function init() {

    for (let i = 0; i < 10; i++) {
        let x = Math.random() * ((canvas.width - 20) - 20) + 20
        let y = Math.random() * ((canvas.height - 20) - 20) + 20
        let width = 30
        let height = 30
        rectanglets.push(new Rect(x, y, width, height))
    }
}

//animation zone {
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    rectanglets.forEach(rectangle => {
        rectangle.update()
    })
}

init()
animate()