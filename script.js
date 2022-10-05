const backdrop = document.querySelector('.backdrop');
const text = document.querySelector('#text');
const table = document.querySelector('.table');
const counterStep = document.querySelector('.counterStep');
const counterWrong = document.querySelector('.counterWrong');
const counterTime = document.querySelector('.counterTime');
const trs = table.querySelectorAll('tr');
const btnUp = document.querySelector('.up');
const btnDown = document.querySelector('.down');
const btnLeft = document.querySelector('.left');
const btnRight = document.querySelector('.right');
const informationBoard = document.querySelector('.information-board');

let timerID;
const MAZE = [
    [{ type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "player", player: true, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }],
    [{ type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }],
    [{ type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }],
    [{ type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }],
    [{ type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "wall", player: false, finish: false }, { type: "empty", player: false, finish: false }, { type: "finish", player: false, finish: true }]
]
draw();


function draw() {
    trs.forEach((tr, y) => {
        const tds = tr.querySelectorAll('td');
        tds.forEach((td, x) => {
            td.dataset.coordinateX = x;
            td.dataset.coordinateY = y;
            td.className = '';
            td.classList.add(MAZE[y][x].type);
        })
    })
    //console.log(MAZE)
}

let state = false;
let i = 0;
let j = 0;

const x = 'data-coordinate-x';
const y = 'data-coordinate-y';

const direct = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
}

document.addEventListener('keydown', event => {
    console.log(event);
    if (!event.code.includes("Arrow")) {
        return;
    }
    document.querySelector(`#${event.code}`).classList.add('active');
    console.log(event.code);
    getValueAdjacentСell(event.code);
    countClicks();

})

document.addEventListener('keyup', event => {
    document.querySelector(`#${event.code}`).classList.remove('active');
})

backdrop.addEventListener('click', modal);

btnUp.addEventListener('click', (upwardMovement));
btnDown.addEventListener('click', (downwardMovement));
btnLeft.addEventListener('click', (leftMovement));
btnRight.addEventListener('click', (rightMovement));

function countClicks() {
    i++;
    counterStep.textContent = 'Cделано шагов: ' + i;
}
/**
 * функция добавляющая 0, если число меньше 10
 * @param {number} number 
 * @returns {string}
 */
function addZero(number) {
    return number < 10 ? '0' + number : number.toString();
}

function startTimer() {
    let sec = 0;
    let min = 0;
    let hours = 0;
    timerID = setInterval(() => {
        sec = +sec + 1;
        if (sec === 60) {
            sec = 0;
            min = +min + 1;
        }
        if (min === 60) {
            sec = 0;
            min = 0;
            hours = +hours + 1
        }
        counterTime.innerHTML = '';
        counterTime.textContent = `Время выполнения: ${addZero(hours)}:${addZero(min)}:${addZero(sec)}`;
    }, 1000)
}

function stopTimer() {
    clearInterval(timerID);
}

function getValueAdjacentСell(key) {
    if (!state) {
        startTimer();
        state = true;
    }
    let isBreak = false;
    for (let y = 0; y < MAZE.length; y++) {
        if (isBreak) {
            break;
        }
        for (let x = 0; x < MAZE[y].length; x++) {
            if (MAZE[y][x].type === "player") {
                //debugger;
                handlerKey(y, x, key);
                isBreak = true;
                break;
            }
        }
    }
}

function handlerError(td) {
    td.type = "error";
    draw();
    setTimeout(() => {
        td.type = "player"
        draw();
    }, 500)
}

function end() {
    let audio = new Audio();
    audio.src = 'torjestvennyiy-zvuk-fanfar.mp3';
    audio.autoplay = true;
}

function mistake() {
    let audio = new Audio();
    audio.src = 'mistake-zvuk.mp3';
    audio.autoplay = true;
}

function handlerKey(y, x, direction) {
    const current = MAZE[y][x];
    let next;
    try {
        next = MAZE[direction === direct.up
            ? y - 1 : direction === direct.down
                ? y + 1 : y][direction === direct.left
                ? x - 1 : direction === direct.right
                    ? x + 1 : x]
    } catch {
        next = null;
    }
    if (!next || next.type === 'wall') {
        handlerError(MAZE[y][x]);
        mistake();
        j++;
        counterWrong.textContent = 'Сделано ударов: ' + j;
        return;
    }
    current.type = "empty";
    draw();
    console.log(next.type)
    if (next.type === "finish") {
        end();
        stopTimer();
        modal();
        text.innerHTML = document.querySelector('.information-board').innerHTML
    }
    next.type = "player";
    draw();
}
function upwardMovement() {
    getValueAdjacentСell(direct.up);
    countClicks();

}
function downwardMovement() {
    getValueAdjacentСell(direct.down);
    countClicks();
}
function leftMovement() {
    getValueAdjacentСell(direct.left);
    countClicks();
}
function rightMovement() {
    getValueAdjacentСell(direct.right);
    countClicks();
}
function modal() {
    backdrop.classList.toggle('hidden');
}