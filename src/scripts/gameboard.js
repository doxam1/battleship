import Ship from "./Ship";

export default class Gameboard {
  constructor(playerName) {
    this.board = Gameboard.newGameBoard();
    this.playerName = playerName;
  }

  static newGameBoard() {
    let gameBoard = [];
    for (let i = 0; i < 10; i++) {
      let rowInGameBoard = [];
      while (rowInGameBoard.length < 10) {
        rowInGameBoard.push(0);
      }
      gameBoard.push(rowInGameBoard);
    }
    return gameBoard;
  }

  placeShip(shipLength, direction = "horizontal") {
    const newShip = new Ship(shipLength, direction);

    const xRowRandomNum = Math.floor(Math.random() * (10 - 0));
    const yRowRandomNum = Math.floor(Math.random() * (10 - 0));

    if (newShip.direction == "horizontal")
      () => {
        // for loop for all x cordinate of the ship?
      };
    // if (this.board[xRowRandomNum][yRowRandomNum] != 1)
  }
}

// i need to build an adjacency matrice to represent the board, from the khan academy lesson.Gameboard
// it will look something like this:

// [ [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
//   [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
//   [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
//   [0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
//   [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
//   [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//   [1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
//   [0, 1, 0, 0, 1, 0, 0, 1, 0, 0] ]

// -the starting board will be all 0.
// -if there's a ship (need to learn how to put the ship) it will be 1.
// -if there's a hit it will be 2 for example.
