const table = document.querySelector('.table');
const trs = table.querySelectorAll('tr');
const row = document.querySelector('.row');
const column = document.querySelector('.column');
const informationBoard = document.querySelector('.information-board');
const btnUp = document.querySelector('.up');
const btnDown = document.querySelector('.down');
const btnLeft = document.querySelector('.left');
const btnRight = document.querySelector('.right');
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
    console.log(MAZE)
}

let countClick = 0;
const x = 'data-coordinate-x';
const y = 'data-coordinate-y';

const direct = {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight"
}

table.addEventListener('click', (event));
btnUp.addEventListener('click', (upwardMovement));
btnDown.addEventListener('click', (downwardMovement));
btnLeft.addEventListener('click', (leftMovement));
btnRight.addEventListener('click', (rightMovement));

function getValueAdjacentСell(key) {
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
        return;
    }
    current.type = "empty";
    next.type = "player";
    draw();
}
function upwardMovement() {
    console.log('+x, +y + 1 => ', getValueAdjacentСell(direct.up));
}
function downwardMovement() {
    console.log('+x, +y - 1 => ', getValueAdjacentСell(direct.down));
}
function leftMovement() {
    console.log('+x - 1, +y => ', getValueAdjacentСell(direct.left));
}
function rightMovement() {
    console.log('+x + 1, +y => ', getValueAdjacentСell(direct.right));
}
