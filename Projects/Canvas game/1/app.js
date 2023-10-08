let playAgain = document.querySelector('.playAgain')
let startButton = document.querySelector('.startButton')
let fscore = document.querySelector('#fscore')
let endGame = document.querySelector('.endGame')
let startGame = document.querySelector('.startGame')
let scoreEl = document.getElementById('score');
let score = 0;

let canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

//  C  R  E  A  T  I  O  N      Z  O  N  E

//  CREATING PLAYER

class Player {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'aqua'
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw();
    }
}


//CREATING BULLETS  

class Bullets {
    constructor(x, y, radius, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'aqua'
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x * 6
        this.y = this.y + this.velocity.y * 6
    }
}

//CREATING EXPLOSIVES

class Explosives {
    constructor(x, y, radius, velocity, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.opacity = 1
        this.color = color
        this.friction = 0.99
    }

    draw() {
        ctx.save();
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update() {
        this.draw();
        this.velocity.x *= this.friction
        this.velocity.y *= this.friction
        this.x = this.x + this.velocity.x * 8
        this.y = this.y + this.velocity.y * 8
        this.opacity -= 0.02;

    }
}



//CREATING ENEMIES
class Enemies {
    constructor(x, y, radius, velocity, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x * 0.8
        this.y = this.y + this.velocity.y * 0.8
    }
}


//  D  R  A  W  I  N  G      Z   O   N  E


//DRAWING PLAYER
let player = new Player(canvas.width / 2, canvas.height / 2, 30);
player.draw();


// DRAWING BULLETS 
let bullets = []
addEventListener('click', () => {
    const angle = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2)
    const bullet = new Bullets(canvas.width / 2, canvas.height / 2, 5, {
        x: Math.cos(angle),
        y: Math.sin(angle)
    })
    bullets.push(bullet);
})


//DRAWING ENEMIES
let enemies = []

function enemyKing() {
    setInterval(() => {
        for (let i = 0; i < 1; i++) {
            let x;
            let y;
            let color = `hsl(${Math.random() * 360}, 50%, 50%)`
            let radius = Math.random() * (40 - 5) + 5
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
                y = Math.random() * Math.random() * canvas.height
            } else {
                x = Math.random() * canvas.width;
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
            }
            const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
            let velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            enemies.push(new Enemies(x, y, radius, velocity, color))
        }
    }, 1000)
}


let explosives = [];






// A  N  I  M   A  T  I  O  N       Z  O  N  E

function animate() {
    let requestAnimation = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
        //Player section
    player.update()

    //Bullets section
    bullets.forEach((bullet, bIndex) => {
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            bullets.splice(bIndex, 1)
        } else {
            bullet.update();
        }

    })

    // UPDATING  EXPLOSIVES
    explosives.forEach((explosive, i) => {
        if (explosive.opacity > 0) {
            explosive.update();
        } else {
            explosives.splice(i, 1)
        }

    })


    //Enemies section
    enemies.forEach((enemy, index) => {
        enemy.update();
        bullets.forEach((bullet, bIndex) => {
            let bdist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)
            if (bdist - enemy.radius - bullet.radius < 1) {
                //SCORE UPDATE
                score += 100;
                scoreEl.innerText = score;
                scoreEl.style.color = enemy.color;
                //Creating explosives instance imediately on shrink

                for (let i = 0; i < enemy.radius; i++) {
                    explosives.push(new Explosives(enemy.x, enemy.y, 3, {
                        x: Math.random() - 0.5,
                        y: Math.random() - 0.5
                    }, enemy.color))
                }


                bullets.splice(bIndex, 1);


                if (enemy.radius - 10 > 10) {
                    enemy.radius = enemy.radius - 10

                } else {
                    enemies.splice(index, 1);
                }

            }
        })
        let pdist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        if (pdist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(requestAnimation);
            endGame.style.display = 'flex';
            fscore.innerText = scoreEl.innerText;
        }
    })

}

startButton.addEventListener('click', () => {
    enemyKing()
    animate()
    startGame.style.display = 'none';
})


function reStart() {
    explosives = [];
    enemies = []
    bullets = []
    player = new Player(canvas.width / 2, canvas.height / 2, 30);
    player.draw();
    animate()
    scoreEl.innerText = '0'
    score = 0;
    endGame.style.display = 'none';

}
playAgain.addEventListener('click', reStart)