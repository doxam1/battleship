import "../styles/style.css";
// import { Ship } from "./Ship";
// import Gameboard from "./gameboard";
import buildBoard from "./buildBoardDOM";
import Player from "./test/player";
import Game from "./game";


buildBoard(10, "boardOne");
buildBoard(10, "boardTwo");

const humanVsHumanNewGameBtn = document.querySelector('.humanVsHumanNewGameBtn');

humanVsHumanNewGameBtn.addEventListener('click' , ()=>{
  const playerOne = new Player('real', 'daniel');
  const machinePlayer = new Player('machine', 'Machina');
  const game = new Game(playerOne, machinePlayer);
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

