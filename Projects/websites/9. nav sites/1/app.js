let menu = document.querySelector('.menu-btn')
let men = document.querySelector('.menu')

menu.addEventListener('click', () => {
    menu.classList.toggle('open')
    men.classList.toggle('open')
})


$(document).ready(function() {
    $('.sub-nav').click(function() {
        $(this).next('.sub-menu').slideToggle();
    })

    $('.more').click(function() {
        $(this).next('.more-menu').slideToggle();
    })
})