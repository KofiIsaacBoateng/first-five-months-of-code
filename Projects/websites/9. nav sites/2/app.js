let menu = document.querySelector('.menuToggle')
let nav = document.querySelector('.nav-elements')

menu.addEventListener('click', () => {
    let data = nav.getAttribute('data-element');
    if (data == 'false') {
        nav.setAttribute('data-element', true)
        menu.setAttribute('aria-expanded', true);
    } else {
        nav.setAttribute('data-element', false)
        menu.setAttribute('aria-expanded', false);
    }

})