let ipdirection = {x:0, y:0};
let speed = 5;
let snakearr=[{x:13,y:15}];
let lastpainttime=0;
food = {x:6,y:7};
const eatingSound = new Audio('assets/eating.wav');

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;    
    gameEngine();
}
// gameEngine();

function isCollide(snakearr) {
    // if snake collides with itself
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            return true;
        }
    }
    // if snake collides with wall
    if (snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) {
        return true;
    }
    return false;
}
function gameEngine() { 
    board.innerHTML = "";
    // if snake collides with itself or wall, game over
    if (isCollide(snakearr)) {
        alert("Game Over. Press any key to play again.");
        snakearr = [{x:13,y:15}];
        ipdirection={x:0,y:0};
    }
    // check if snake has eaten the food
    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        // add a new segment to the snake

        eatingSound.currentTime = 0.02; // Skip the first 1 second of the audio
        eatingSound.play();
        snakearr.unshift({x: snakearr[0].x + ipdirection.x, y: snakearr[0].y + ipdirection.y});
        // generate new food
        food = {x: Math.floor(Math.random() * 16) + 1, y: Math.floor(Math.random() * 16) + 1};
    }
    // move the snake
    let head = {x:snakearr[0].x + ipdirection.x, y:snakearr[0].y + ipdirection.y};
    snakearr.unshift(head);
    snakearr.pop();
    // render the snake
    
    snakearr.forEach((e,index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // render the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}
// main function to start the game  
window.requestAnimationFrame(main);
// listen to keyboard events
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        ipdirection.x = 0;
        ipdirection.y = -1;
    } else if (e.key === 'ArrowDown') {
        ipdirection.x = 0;
        ipdirection.y = 1;
    } else if (e.key === 'ArrowLeft') {
        ipdirection.x = -1;
        ipdirection.y = 0;
    } else if (e.key === 'ArrowRight') {
        ipdirection.x = 1;
        ipdirection.y = 0;
    }
});
// function to start the game   
function startGame() {
    // reset the game state
    snakearr = [{x:13,y:15}];
    ipdirection={x:0,y:0};
    lastpainttime=0;
    main(0);
}
