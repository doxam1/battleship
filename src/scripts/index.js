import "../styles/style.css";
// import { Ship } from "./Ship";
// import Gameboard from "./gameboard";
import buildBoard from "./buildBoardDOM";
import Player from "./player";
import Game from "./game";


buildBoard(10, "boardOne");
buildBoard(10, "boardTwo");



const humanVsHumanNewGameBtn = document.querySelector('.humanVsHumanNewGameBtn');

humanVsHumanNewGameBtn.addEventListener('click' , ()=>{

  // every new game start fresh with the class names on square and the event listeners lingering on the dom.
  const squareInBoard = document.querySelectorAll(`.square`);
  squareInBoard.forEach((square) => {
    square.classList.remove('clickedSquare');
    square.replaceWith(square.cloneNode(true));
  })

  document.querySelector('.centerBoard').innerHTML = 'Human turn >';


  let playerOne = new Player('real', 'Human');
  let machinePlayer = new Player('machine', 'Machina');
  let game = new Game(playerOne, machinePlayer);
  game.startGame();
  game.playGame();
  newGameDialog.close();
})


const newGameBtn = document.querySelector(".newGame");
const newGameDialog = document.querySelector(".newGameDialog");

newGameBtn.addEventListener("click", () => {
  newGameDialog.showModal();

  const exitDialogBtn = document.querySelector(".exitDialog");

  exitDialogBtn.onclick = () => {
    newGameDialog.close();
  };
});

