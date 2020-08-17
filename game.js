console.log("Game started");

startGame();

function startGame() {
    playerRow = Math.floor(Math.random() * 9);
    playerColumn = Math.floor(Math.random() * 9);

    boxRow = Math.floor(Math.random() * 7 + 2);
    boxColumn = Math.floor(Math.random() * 7 + 2);

    targetRow = Math.floor(Math.random() * 9);
    targetColumn = Math.floor(Math.random() * 9);

    document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'orange';
    document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    document.querySelector(`#r${targetRow} > td.c${targetColumn}`).style.backgroundColor = 'lawngreen';
}

function movePlayer(newPlayerRow, newPlayerColumn) {
    if (newPlayerRow < 0 || newPlayerRow > 9 || newPlayerColumn < 0 || newPlayerColumn > 9) return;
    if (newPlayerRow == boxRow && newPlayerColumn == boxColumn) moveBox(playerRow, playerColumn);
    document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'white';
    playerRow = newPlayerRow;
    playerColumn = newPlayerColumn;
    document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'orange';
}

function moveBox(posY, posX) {
    if (posY == boxRow - 1) {
        //down
        if (boxRow - 1 < 0) { gameLost(); return; }
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxRow += 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posY == boxRow + 1) {
        //up
        if (boxRow + 1 > 9) { gameLost(); return; }
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxRow -= 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posX == boxColumn + 1) {
        //left
        if (boxColumn + 1 > 9) { gameLost(); return; }
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxColumn -= 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posX == boxColumn - 1) {
        //right
        if (boxColumn - 1 < 0) { gameLost(); return; }
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxColumn += 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    }

    // document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'white';
    // playerRow = newPlayerRow;
    // playerColumn = newPlayerColumn;
    // document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'orange';
}

document.addEventListener('keydown', function (evt) {
    console.log(evt.key);
    switch (event.key) {
        case "ArrowUp" || "w":
            movePlayer(playerRow - 1, playerColumn);
            break;
        case "ArrowDown" || "s":
            movePlayer(playerRow + 1, playerColumn);
            break;
        case "ArrowLeft" || "a":
            movePlayer(playerRow, playerColumn - 1);
            break;
        case "ArrowRight" || "d":
            movePlayer(playerRow, playerColumn + 1);
            break;
    }

    markTarget()
    checkForWin();
});

function markTarget() {
    if (playerRow != targetRow || playerColumn != targetColumn) document.querySelector(`#r${targetRow} > td.c${targetColumn}`).style.backgroundColor = 'lawngreen';
}

function gameLost() {
    document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'white';
    document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
    document.querySelector(`#r${targetRow} > td.c${targetColumn}`).style.backgroundColor = 'white';
    if (window.confirm("You Lost! Want to try again?")) {
        startGame();
    } else {
        document.removeEventListener('keydown');
    }
}

function checkForWin() {
    if (boxRow == targetRow && boxColumn == targetColumn) {
        document.querySelector(`#r${playerRow} > td.c${playerColumn}`).style.backgroundColor = 'white';
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        document.querySelector(`#r${targetRow} > td.c${targetColumn}`).style.backgroundColor = 'white';
        if (window.confirm("You Won! Start again?")) {
            startGame();
        } else {
            document.removeEventListener('keydown');
        }
    }
}