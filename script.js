const Shapes = [
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1],
    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0],
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
    [
        [0,1,1],
        [1,1,0],
        [0,0,0],
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0],
    ],
    [
       [1,1],
       [1,1],
    ]
]

const Colors = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8db346",
    "#efdf48",
    "#f9a52c",
    "#d64e12",
]

const Rows = 20;
const Col = 10;
let intervalId = null;
let isPaused = false;

let canvas = document.querySelector("#tetris");
let scoreboard = document.querySelector("h2");
document.getElementById("pauseBtn").addEventListener("click", pauseGame);
document.getElementById("resumeBtn").addEventListener("click", resumeGame);

let ctx = canvas.getContext("2d");
ctx.scale(30,30);

let pieceObj = null; 
let speed =700;
let score = 0;
let grid = generategrid();
console.log(grid);

function updateSpeed() {
    if(score >= 150) speed = 150;
    else if(score >= 100) speed = 200;
    else if(score >= 60) speed = 300;
    else if(score >= 20) speed = 500;
    else speed = 700;

    clearInterval(intervalId);
    StartGameLoop();
}
function StartGameLoop () {
    intervalId = setInterval(newGamestate, speed);
}
StartGameLoop();

function pauseGame() {
    if (!isPaused) {
        clearInterval(intervalId);
        isPaused = true;
        alert("Game Paused");
    }
}

function resumeGame() {
    if (isPaused) {
        StartGameLoop();
        isPaused = false;
        alert("Game Resumed");
    }
}

function newGamestate(){
    checkgrid();
    if(pieceObj==null){
        pieceObj = generateRandomPiece();
        renderPiece();
    }
    moveDown();
}

function checkgrid (){
    let count =0;
    for(let i=0 ; i<grid.length; i++){
        let allfilled = true;
        for(let j=0; j<grid[i].length; j++){
            if(grid[i][j] == 0){
                allfilled = false;
            }
        }
         if(allfilled){
        grid.splice(i,1);
        grid.unshift([0,0,0,0,0,0,0,0,0,0]);
        count++;
    }
    }
    if(count == 1){
        score+=10;
    }else if(count == 2){
        score+=30;
    }else if(count == 3){
        score+=50;
    }else if(count > 3){
        score+=100;
    }
    scoreboard.innerHTML = "Score: " + score;
    updateSpeed();
}

function generateRandomPiece (){
    let random = Math.floor(Math.random()*7);
    // console.log(random);
    let piece = Shapes[random];
    let colorIndex = random+1;
    let x =4;
    let y =0;
    return {piece,colorIndex,x,y};

}

function renderPiece() {
    let piece = pieceObj.piece;
    for(let i=0 ; i<piece.length; i++){
        for(let j=0 ; j<piece[i].length; j++){
            if(piece[i][j] == 1){
                ctx.fillStyle = Colors[pieceObj.colorIndex];
                ctx.fillRect(pieceObj.x+j,pieceObj.y+i,1,1)
            }
        }
    }
}

function moveDown (){
    if(!collision(pieceObj.x,pieceObj.y+1))
        pieceObj.y+=1;
    else {
        for(let i=0 ; i<pieceObj.piece.length; i++){
            for(let j=0 ; j<pieceObj.piece[i].length; j++){
                if(pieceObj.piece[i][j] == 1){
                    let p = pieceObj.x+j;
                    let q = pieceObj.y+i;
                    grid[q][p] = pieceObj.colorIndex;
                }
            }
        }
        if(pieceObj.y == 0){
            alert(`Game over and your score is :  ${score}`);
            grid = generategrid();
            score =0;
        }
        pieceObj = null;
    }
    rendergrid();
}

function moveLeft(){
    if(!collision(pieceObj.x-1,pieceObj.y))
       pieceObj.x-=1;
  rendergrid();
}

function moveRight(){
   if(!collision(pieceObj.x+1,pieceObj.y))
        pieceObj.x+=1;
   rendergrid();
}

function rotate() {
    let rotatedPiece = [];
    let piece = pieceObj.piece;
    for(let i=0;i<piece.length;i++){
        rotatedPiece.push([]);
        for(let j=0;j<piece[i].length;j++){
            rotatedPiece[i].push(0);
        }
    }
    for(let i=0;i<piece.length;i++){
        for(let j=0;j<piece[i].length;j++){
            rotatedPiece[i][j] = piece[j][i]
        }
    }

    for(let i=0;i<rotatedPiece.length;i++){
        rotatedPiece[i] = rotatedPiece[i].reverse();
    }
    if(!collision(pieceObj.x,pieceObj.y,rotatedPiece))
        pieceObj.piece = rotatedPiece
    rendergrid()
}

function generategrid(){
    let grid = [];
    for(let i=0 ; i<Rows;i++){
        grid.push([]);
        for(let j=0;j<Col;j++){
          grid[i].push(0);
        }
    }
    return grid;
}

function rendergrid() {
    for(let i=0 ; i<grid.length; i++){
        for(let j=0 ; j<grid[i].length; j++){
            ctx.fillStyle = Colors[grid[i][j]];
            ctx.fillRect(j,i,1,1);
        }
    }
    renderPiece();
}

function collision (x,y,rotatedPiece){
    let piece = rotatedPiece || pieceObj.piece;
    for(let i=0 ; i<piece.length;i++){
        for(let j=0 ; j<piece[i].length; j++){
            if(piece[i][j] == 1){
                let p = x+j;
                let q = y+i;
                if(p>=0 && p<Col && q>=0 && q<Rows){
                    if(grid[q][p] >0){
                        return true;
                    }
                }else {
                    return true;
                }
            }
        }
    }
    return false;
}

document.addEventListener("keydown",function(e){
 if (isPaused) return;
      let key = e.code;
      if(key=="ArrowDown"){
        moveDown();
      }else if (key == "ArrowLeft"){
        moveLeft();
      }else if (key == "ArrowRight"){
        moveRight();
      }else if (key == "ArrowUp"){
        rotate();
      }
})