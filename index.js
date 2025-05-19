//Created by Yididiya G

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


let tileSize = 20;
let tileCount = canvas.width / tileSize; //400/20  --> 20

let snake = [
    {x:10, y:10}
]
let direction = {
    x:0, y:0
}
let food = getRandomFoodPosition();
function gameLoop(){
    update();
    draw();
}
let score = 0;

function update(){
    let head = {...snake[0]};
    head.x += direction.x;
    head.y += direction.y;

    // Collision detection
    if(head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount
    ){
        resetGame();
        return;
    }
    for(let i =1; i<snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            resetGame();
            return;
        }
    }
    

    snake.unshift(head);

    // Self collision


    if(head.x === food.x && head.y === food.y){
        food = getRandomFoodPosition();
        snake.unshift(head);
        score += 1;
    }
    else{
        snake.pop();
    }

    

    
}
function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    for(segment of snake){
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    }
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x*tileSize, food.y*tileSize, tileSize, tileSize);

    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("Score: " + score, 10, 30);
}
setInterval(gameLoop, 150);
function getRandomFoodPosition(){
    return {
    x:Math.floor(Math.random()*tileSize),
    y:Math.floor(Math.random()*tileSize),

}
}
window.addEventListener("keydown", (e)=>{

    switch(e.key){
        case "ArrowUp":
            if(direction.y === 0){
                direction ={x:0, y:-1}
            }
            break
        case "ArrowDown":
            if(direction.y === 0){
                direction ={x:0, y:1}
            }
            break
        case "ArrowLeft":
            if(direction.x === 0){
                direction ={x:-1, y:0}
            }
            break
        case "ArrowRight":
            if(direction.x === 0){
                direction ={x:1, y:0}
            }
            break
        
    }
})
function resetGame(){
alert("Game Over!")
snake = [
    {x:10, y:10}
];
direction = {
    x:0, y:0
};
food = getRandomFoodPosition();
score = 0;
}
