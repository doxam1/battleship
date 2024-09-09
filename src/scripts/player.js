import Gameboard from "./gameboard";

export default class Player {
  constructor(type, name) {
    this.type = type;
    this.name = name;
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

    const squareInBoard = document.querySelectorAll(`${boardClass}.square`);

    squareInBoard.forEach((square) => {
      square.style.backgroundColor = "lightgray";
      for (let c = 0; c <= shipsDraw.length; c++) {
        if (square.classList.contains(shipsDraw[c])) {
          this.type == "real"
            ? (square.style.background = "white center/110% url('./image/noun-ship-4897095.svg')")
            : (square.style.backgroundColor = "lightgray");
        }
      }
    });
  }

  machineAttack () {

  }
}

// add points? name? way of placing ships? if comp - attack close squre after hit?
