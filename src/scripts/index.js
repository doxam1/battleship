import "../styles/style.css";
// import { Ship } from "./Ship";
// import Gameboard from "./gameboard";
import buildBoard from "./buildBoardDOM";
import Player from "./test/player";


buildBoard(10, "boardOne");
buildBoard(10, "boardTwo");

const humanVsHumanNewGameBtn = document.querySelector('.humanVsHumanNewGameBtn');

humanVsHumanNewGameBtn.addEventListener('click' , ()=>{
  const playerOne = new Player('real');
  console.log(playerOne)
  playerOne.gameBoard.placeShip();
  const machinePlayer = new Player('machine');
  machinePlayer.gameBoard.placeShip();
  playerOne.playerTypeBoardBuilding();
  machinePlayer.playerTypeBoardBuilding();
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

