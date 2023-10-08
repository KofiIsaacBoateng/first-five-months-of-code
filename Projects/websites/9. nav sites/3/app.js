// selecting images ul 
let imgUl = document.querySelector('.carousal_ul');
//selecting images li
let images = Array.from(imgUl.children);
//selecting side buttons
let prev = document.querySelector('.prevButton')
let next = document.querySelector('.nextButton')
let indicators = document.querySelector('.indicators')
let indicator = Array.from(indicators.children);
let imagesWidth = 632;


images.forEach((image, index) => {
    image.style.left = imagesWidth * index + 'px';
})
console.log(images[1].style.left)

function moveTo(current, target) {

}

function updateDot(currentDot, targetDot) {
    currentDot.classList.remove('active')
    targetDot.classList.add('active')
}

next.addEventListener('click', (e) => {
    const currentImage = imgUl.querySelector('.current')
    const nextImage = currentImage.nextElementSibling;
    let targetIndex = images.findIndex(tag => tag === nextImage)
    let distanceToSlide = nextImage.style.left
    imgUl.style.transform = 'translateX(-' + distanceToSlide + ')';
    currentImage.classList.remove('current')
    nextImage.classList.add('current')
    let currentDot = indicators.querySelector('.active')
    let nextDot = currentDot.nextElementSibling;
    currentDot.classList.remove('active')
    nextDot.classList.add('active')
    console.log(targetIndex)

    if (targetIndex === 0) {
        prev.classList.add('end')
        next.classList.remove('end')
    } else if (targetIndex === 2) {
        next.classList.add('end')
        prev.classList.remove('end')
    } else {
        prev.classList.remove('end')
        next.classList.remove('end')
    }
})

prev.addEventListener('click', (e) => {
    const currentImage = imgUl.querySelector('.current')
    const prevImage = currentImage.previousElementSibling;
    let targetIndex = images.findIndex(tag => tag === prevImage)
    let distanceToSlide = prevImage.style.left
    imgUl.style.transform = 'translateX(-' + distanceToSlide + ')';
    currentImage.classList.remove('current')
    prevImage.classList.add('current')
    let currentDot = indicators.querySelector('.active')
    let prevDot = currentDot.previousElementSibling;
    currentDot.classList.remove('active')
    prevDot.classList.add('active')
    console.log(targetIndex)

    if (targetIndex === 0) {
        prev.classList.add('end')
        next.classList.remove('end')
    } else if (targetIndex === 2) {
        next.classList.add('end')
        prev.classList.remove('end')
    } else {
        prev.classList.remove('end')
        next.classList.remove('end')
    }
})

indicators.addEventListener('click', (e) => {
    let targetIndicator = e.target.closest('.indicator')

    if (!targetIndicator) return;

    let current = imgUl.querySelector('.current')
    let targetIndex = indicator.findIndex(tag => tag === targetIndicator)
    let target = images[targetIndex]
    let currentDot = indicators.querySelector('.active')
    let distanceToSlide = target.style.left
    imgUl.style.transform = 'translateX(-' + distanceToSlide + ')';
    current.classList.remove('current')
    target.classList.add('current')

    currentDot.classList.remove('active');
    targetIndicator.classList.add('active')

    if (targetIndex === 0) {
        prev.classList.add('end')
        next.classList.remove('end')
    } else if (targetIndex === 2) {
        next.classList.add('end')
        prev.classList.remove('end')
    } else {
        prev.classList.remove('end')
        next.classList.remove('end')
    }
})