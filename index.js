
let arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
let arr1 = arr.flat();
let start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
let arrbtn;
let box = document.createElement("div");
box.className = 'pazzle';
document.body.append(box);

function createBtn() {
    let btn = document.createElement("button");
    btn.classList.add('btn')
    btn.className = 'btn';
    return btn
};

function drowBtn() {
    for (let i = 0; i < arr1.length; i++) {
        box.appendChild(createBtn());
    }
    return box
}

const btnText = () => {
    const btns = drowBtn().querySelectorAll(".btn")
    btns.forEach((btn, index) => {
        btn.textContent = index + 1;
    })
    arrbtn = Array.from(btns)
};
btnText()

/** 1. Position */


function setPos() {
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            let value = arr[y][x];
            let nodelist = Array.from(document.querySelectorAll(".btn"))
            let node = nodelist[value - 1]
            setNode(node, x, y)
        }
    }
}
setPos()
function setNode(node, x, y) {
    const shift = 100;
    node.style.transform = `translate3D(${x * shift}%,${y * shift}%,0)`;
}
/** 2. Shuffle */
let shuffledArr = shuflle(arr.flat())
arr = getMatrix(shuffledArr)
setPos(arr)

function shuflle(arr) {
    let a = arr.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    return a
}
function getMatrix() {
    let matrix = [[], [], [], []];
    let x = 0;
    let y = 0

    for (let i = 0; i < shuffledArr.length; i++) {
        if (x >= 4) {
            y++;
            x = 0;
        }

        matrix[y][x] = shuffledArr[i]
        x++
    }
    return matrix
}
/** 3. Change tail */
box.addEventListener("click", (event) => {
    let blankNode = 16;
    let buttonNode = event.target.closest('button');
    if (!buttonNode) {
        return
    }
    let buttonCoords = tailCoords(+buttonNode.textContent, arr)
    let blankCoords = tailCoords(blankNode, arr)
    let isValid = CheckValid(buttonCoords, blankCoords)
    if (isValid) {
        swap(blankCoords, buttonCoords, arr)
        setPos()
    }
})

function tailCoords(number, arr) {
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            if (arr[y][x] === number) {
                return { y, x }
            }
        }
    }
    return null
}
function swap(coords1, coords2, arr) {
    let coords1Number = arr[coords1.y][coords1.x]
    arr[coords1.y][coords1.x] = arr[coords2.y][coords2.x]
    arr[coords2.y][coords2.x] = coords1Number
}
function CheckValid(a, b) {
    let diffX = Math.abs(a.x - b.x);
    let diffy = Math.abs(a.y - b.y);
    return (diffX === 1 || diffy === 1) && (a.x === b.x || a.y === b.y)
}