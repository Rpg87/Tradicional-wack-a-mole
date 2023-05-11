'use strict';

const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreEl = document.querySelector('.score span');
let score = 0;
let running = false;

const sound = new Audio("assets/smash.mp3");
let timer = null;

function run() {
    if (!running) {
        return;
    }

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const img = document.createElement('img');
    img.classList.add('mole');
    img.src = 'assets/mole.png';

    img.addEventListener('click', () => {
        score += 10;
        sound.play();
        scoreEl.textContent = score
        img.src = 'assets/mole-whacked.png';
        clearTimeout(timer);
        setTimeout(() => {
            hole.removeChild(img);
            if (running) {
                run();
            }
        }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        if (running) {
            run();
        }
    }, 1500);
}

function resetBoard() {
    score = 0;
    scoreEl.textContent = '00';
    holes.forEach(hole => {
        while (hole.firstChild) {
            hole.removeChild(hole.firstChild);
        }
    });
}

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'; //up, down
    cursor.style.left = e.pageX + 'px'; //left, right
});
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

startBtn.addEventListener('click', () => {
    if (!running) {
        running = true;
        resetBoard();
        run();
    }
});

stopBtn.addEventListener('click', () => {
    if (running) {
        running = false;
        clearTimeout(timer);
        resetBoard();
    }
});
