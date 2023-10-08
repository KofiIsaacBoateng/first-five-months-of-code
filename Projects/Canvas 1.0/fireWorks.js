 let canvas = document.getElementById('canvas')
 let ctx = canvas.getContext('2d')
 canvas.width = innerWidth
 canvas.height = innerHeight

 addEventListener('resize', () => {
     canvas.width = innerWidth
     canvas.height = innerHeight
 })


 let mouse = {
     x: undefined,
     y: undefined
 }
 const gravity = 0.01
 const friction = 0.9998765433

 addEventListener('mousemove', (e) => {
     mouse.x = e.x
     mouse.y = e.y
 })

 class Particles {
     constructor(x, y, radius, velocity) {
         this.x = x
         this.y = y
         this.radius = radius
         this.colr = `hsl(${Math.random() * 361}, ${Math.random() * 101}%, ${Math.random() * 101}%)`
         this.velocity = velocity
         this.opacity = 1
     }

     draw() {
         ctx.save()
         ctx.globalAlpha = this.opacity
         ctx.beginPath()
         ctx.fillStyle = this.colr
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
         ctx.fill()
         ctx.restore()
         ctx.closePath()
     }

     update() {
         this.draw()

         this.velocity.x *= friction
         this.velocity.y *= friction
         this.velocity.y += gravity
         this.x += this.velocity.x
         this.y += this.velocity.y
         this.opacity -= 0.005

     }

 }
 let particles = []



 function animate() {
     requestAnimationFrame(animate)
     ctx.fillStyle = 'rgba(0, 0, 0, 0.09)'
     ctx.fillRect(0, 0, canvas.width, canvas.height)
     particles.forEach((particle, i) => {
         if (particle.opacity > 0) {
             particle.update()
         } else {
             particles.splice(i, 1)
         }
     })
 }



 animate()


 addEventListener('click', (e) => {
     let x = mouse.x
     let y = mouse.y
     let radius = 5;
     let power = 40;
     let particleCount = 500
     let angleIncrement = (Math.PI * 2) / particleCount;
     for (let i = 0; i < particleCount; i++) {
         particles.push(new Particles(x, y, radius, {
             x: Math.cos(angleIncrement * i) * Math.random() * power,
             y: Math.sin(angleIncrement * i) * Math.random() * power
         }))
     }

 })