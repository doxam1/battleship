import Gameboard from "../gameboard";
import buildBoard from "../buildBoardDOM";

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new Gameboard();
  }

  playerTypeBoardBuilding() {
    let boardClass;
    this.type == "real"
      ? (boardClass = ".boardOne")
      : (boardClass = ".boardTwo");
    let shipsDraw = [];
    for (let x = 0; x < this.gameBoard.board.length; x++) {
      for (let y = 0; y < this.gameBoard.board[x].length; y++) {
        if (this.gameBoard.board[x][y] !== null) shipsDraw.push(`${x}:${y}`);
      }
    }

    const squareInBoard = document.querySelectorAll(`${boardClass}.square`); // change this to the type of player maybe?

    squareInBoard.forEach((square) => {
      square.style.backgroundColor = "";
      for (let c = 0; c <= shipsDraw.length; c++) {
        if (square.classList.contains(shipsDraw[c])) {
          square.style.backgroundColor = "blue";
        }
      }

      // that's fn for playing with click on board square - new module.
      square.onclick = (e) => {
        this.gameBoard.receiveAttack(e.target.classList[2], e.target);
      };
    });
  }
}

// machine ships needs to be hidden.

// add points? name? way of placing ships? if comp - attack close squre after hit?
