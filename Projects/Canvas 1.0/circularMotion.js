 let canvas = document.getElementById('canvas')
 let ctx = canvas.getContext('2d')
 canvas.width = window.innerWidth
 canvas.height = window.innerHeight

 const mouse = {
     x: undefined,
     y: undefined
 }

 const color = [
     '#00bdff',
     '#4d39ce',
     '#088eff',
 ]

 canvas.addEventListener('mousemove', (e) => {
     mouse.x = e.x;
     mouse.y = e.y;
 })

 window.addEventListener('resize', () => {
     canvas.width = window.innerWidth
     canvas.height = window.innerHeight
 })

 function Particle(x, y, radius) {
     this.x = x
     this.y = y
     this.radius = radius
     this.color = color[Math.floor(Math.random() * color.length)]
     this.radians = Math.random() * Math.PI * 2
     this.velocity = 0.03
     this.centerdistance = {
         z: Math.random() * (120 - 51) + 50,

     }
     this.prevPoint = {
         x: x,
         y: y
     }

     this.draw = () => {
         ctx.beginPath()
         ctx.fillStyle = this.color
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
         ctx.fill()
         ctx.closePath()

     }
     this.update = () => {

         this.radians += this.velocity
         this.x = mouse.x - 100 + Math.cos(this.radians) * this.centerdistance.z
         this.y = mouse.y - 100 + Math.sin(this.radians) * this.centerdistance.z
         this.draw()
     }
 }
 let particles = [];

 function initiation() {
     for (let i = 0; i < 50; i++) {
         let x = canvas.width / 2
         let y = canvas.height / 2
         let radius = Math.random() * 4 + 1
         let instance = new Particle(x, y, radius)
         particles.push(instance)
     }
 }


 function animate() {
     requestAnimationFrame(animate)
     ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
     ctx.fillRect(0, 0, canvas.width, canvas.height)

     particles.forEach((particle) => {
         particle.update()
     })
 }

 initiation()
 animate()