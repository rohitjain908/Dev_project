const X_CLASS='x';
const CIRCLE_CLASS='circle';
let CircleTurn=false;

const WINNING_COMBINATIONS=[
  [0,1,2],//row
  [3,4,5],//row
  [6,7,8],//row
  [0,3,6],//column
  [1,4,7],//column
  [2,5,8],//column
  [0,4,8],//diagonal
  [2,4,6]//diagonal
]



const cellElements=document.querySelectorAll('[data-cell]');
const WinningMessageTextElement=document.querySelector('[data-winning-message-text]');
const board=document.getElementById("board");
const WinningMessageElement=document.getElementById("winningMessage");
const restartbutton=document.getElementById("restartbutton");
const cb=document.getElementById("cb");
const xb=document.getElementById("xb");
cellElements.forEach(cell=>{
  cell.addEventListener("click",handleclick,{once:true})
})

startgame();

cb.addEventListener("click",f1);
xb.addEventListener("click",f2);
 
function f1(){
  CircleTurn=true;
}
function f2(){
  CircleTurn=false;
}

restartbutton.addEventListener("click",startgame);


function startgame(){
  cellElements.forEach(cell=>{
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click",handleclick);
    cell.addEventListener("click",handleclick,{once:true})
  })
  setBoardhoverclass();
  WinningMessageElement.classList.remove('show');

}

function handleclick(e)
{
  //console.log("clicked");
  //place The Mark
  const cell=e.target;
  const currentClass=CircleTurn?CIRCLE_CLASS:X_CLASS;
  PlaceMark(cell,currentClass);


  //check for win
  if(CheckWin(currentClass)){
    //console.log("winner");
    endgame(false);

  }
  else if(is_draw()){
    endgame(true);
  }
  else{
    swapTurn();
    setBoardhoverclass();
  }


  //check for draw
  //switch turns
  
  
  

}

function PlaceMark(cell,currentClass){
  cell.classList.add(currentClass);
}

function swapTurn()
{
  CircleTurn=!CircleTurn;
}

function setBoardhoverclass(){
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(CircleTurn)
  {
    board.classList.add(CIRCLE_CLASS);

  }
  else
  {
    board.classList.add(X_CLASS);

  }
}

function CheckWin(currentClass){
  return WINNING_COMBINATIONS.some(combination=>{
    return combination.every(index=>{
      return cellElements[index].classList.contains(currentClass)
    })

  })
}

function endgame(draw)
{
  if(draw){
    WinningMessageTextElement.innerText='Draw!';
  }
  else{
    WinningMessageTextElement.innerText=CircleTurn?"O's Wins!":"X's Wins!";
  }
  WinningMessageElement.classList.add('show');
}

function is_draw(){
  return [...cellElements].every(cell=>{
    return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS);
  })
}