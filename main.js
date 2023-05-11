'use strict';

const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]


window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px' //up, down
    cursor.style.left = e.pageX + 'px' //left, right
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})