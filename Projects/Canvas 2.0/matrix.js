let canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let ctx = canvas.getContext('2d')




// Creating Symbols

class Symbols {
    constructor(x, y, fontSize) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♔♕♖♗♘♙CHESS♚♛♜♝♞♟☀☁❆WEATHER❅❄♪MUSIC♫'
        this.x = x
        this.y = y
        this.fontSize = fontSize
        this.text = ''
    }

    draw() {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        ctx.fillStyle = '#0aff0a'
        ctx.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize)
    }

    update() {
        this.draw()
        if (this.y * this.fontSize > canvas.height && Math.random() > 0.95) {
            this.y = 0
        } else {
            this.y += 1
        }

    }
}


class Effect {
    constructor(canvasHeight, canvasWidth) {
        this.canvasHeight = canvasHeight
        this.canvasWidth = canvasWidth
        this.fontSize = 25
        this.symbols = []
        this.columns = this.canvasWidth / this.fontSize
        this.initiateMatrix()
    }
    initiateMatrix() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols.push(new Symbols(i, 0, this.fontSize))
        }
    }

    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.initiateMatrix()
    }
}
let effect = new Effect(canvas.width, canvas.height)
let lastTime = 0
let fps = 30
let nextFrame = 1000 / fps
let timer = 0

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.textAlign = 'center'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#0aff0a'
        ctx.font = `${effect.fontSize}px monospace`
        effect.symbols.forEach(symbol => {
            symbol.update();
        })
        timer = 0
    } else {
        timer += deltaTime
    }
    requestAnimationFrame(animate)



}

animate(0)

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    effect.resize(canvas.width, canvas.height)
})