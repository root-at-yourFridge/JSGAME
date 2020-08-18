// TODO: Add images for player, box and target

console.log("Game started");
let startX;
let startY;
let endX;
let endY;

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


    markTarget()
    checkForWin();
}

function moveBox(posY, posX) {
    if (boxRow - 1 < 0 || boxRow + 1 > 9 || boxColumn - 1 < 0 || boxColumn + 1 > 9) {
        gameLost();
        return;
    }
    if (posY == boxRow - 1) {
        //down
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxRow += 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posY == boxRow + 1) {
        //up
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxRow -= 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posX == boxColumn + 1) {
        //left
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxColumn -= 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    } else if (posX == boxColumn - 1) {
        //right
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'white';
        boxColumn += 1;
        document.querySelector(`#r${boxRow} > td.c${boxColumn}`).style.backgroundColor = 'saddlebrown';
    }
}

document.addEventListener('keydown', function (evt) {
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


// Shamelessly stolen from http://www.javascriptkit.com/javatutors/touchevents2.shtml
// I tried building this myself, longer than I care to admit :D
function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 500, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 500, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, true)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, true)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'a' : 'd' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'w' : 's' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, true)
}

swipedetect(document.querySelector('#game'), function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
    switch (swipedir) {
        case "w":
            movePlayer(playerRow - 1, playerColumn);
            break;
        case "s":
            movePlayer(playerRow + 1, playerColumn);
            break;
        case "a":
            movePlayer(playerRow, playerColumn - 1);
            break;
        case "d":
            movePlayer(playerRow, playerColumn + 1);
            break;
    }
})