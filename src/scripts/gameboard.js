import Ship from "./Ship";

export default class Gameboard {
  constructor() {
    this.board = Gameboard.newGameBoard();
    this.ships = [
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(1),
      new Ship(2),
      new Ship(2),
      new Ship(2),
      new Ship(3),
      new Ship(3),
      new Ship(4),
    ];
    this.clickedNoShip = [];
    this.sunkShips = [];
    this.clicked = [];
  }

  static newGameBoard() {
    let gameBoard = [];
    for (let i = 0; i < 10; i++) {
      let rowInGameBoard = [];
      while (rowInGameBoard.length < 10) {
        rowInGameBoard.push(null);
      }
      gameBoard.push(rowInGameBoard);
    }
    return gameBoard;
  }

  isAllShipsSunk() {
    return this.sunkShips.length == this.ships.length;
  }

  placeShip() {
    const directions = ["horizontal", "vertical"];

    for (let i = 0; i < this.ships.length; i++) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 10000;

      while (!placed && attempts < maxAttempts) {
        const xRowRandomNum = Math.floor(Math.random() * 10);
        const yCoulmnRandomNum = Math.floor(Math.random() * 10);
        const direction =
          directions[Math.floor(Math.random() * directions.length)];

        this.ships[i].direction = direction;
        let canPlace = true;

        // Check if the ship can be placed without touching another ship
        if (direction === "vertical") {
          if (xRowRandomNum + this.ships[i].length - 1 >= 10) {
            canPlace = false; // Ship would go out of bounds
          } else {
            for (let z = -1; z <= this.ships[i].length; z++) {
              for (let k = -1; k <= 1; k++) {
                if (
                  xRowRandomNum + z >= 0 &&
                  xRowRandomNum + z < 10 &&
                  yCoulmnRandomNum + k >= 0 &&
                  yCoulmnRandomNum + k < 10 &&
                  this.board[xRowRandomNum + z]?.[yCoulmnRandomNum + k] !== null
                ) {
                  canPlace = false; // A neighboring square is occupied
                  break;
                }
              }
              if (!canPlace) break;
            }
          }
          if (canPlace) {
            for (let z = 0; z < this.ships[i].length; z++) {
              this.board[xRowRandomNum + z][yCoulmnRandomNum] = 1;
              this.ships[i].cordinates.push(
                `${xRowRandomNum + z}:${yCoulmnRandomNum}`
              );
            }
            placed = true;
          }
        } else if (direction === "horizontal") {
          if (yCoulmnRandomNum + this.ships[i].length - 1 >= 10) {
            canPlace = false; // Ship would go out of bounds
          } else {
            for (let z = -1; z <= this.ships[i].length; z++) {
              for (let k = -1; k <= 1; k++) {
                if (
                  xRowRandomNum + k >= 0 &&
                  xRowRandomNum + k < 10 &&
                  yCoulmnRandomNum + z >= 0 &&
                  yCoulmnRandomNum + z < 10 &&
                  this.board[xRowRandomNum + k]?.[yCoulmnRandomNum + z] !== null
                ) {
                  canPlace = false; // A neighboring square is occupied
                  break;
                }
              }
              if (!canPlace) break;
            }
          }
          if (canPlace) {
            for (let z = 0; z < this.ships[i].length; z++) {
              this.board[xRowRandomNum][yCoulmnRandomNum + z] = 1;
              this.ships[i].cordinates.push(
                `${xRowRandomNum}:${yCoulmnRandomNum + z}`
              );
            }
            placed = true;
          }
        }

        attempts++;
        if (attempts >= maxAttempts) {
          i--; // Backtrack to the previous ship and try a different configuration
        }
      }

      if (attempts >= maxAttempts) {
        console.error("Failed to place the ship after maximum attempts");
        this.resetBoard(); // Optionally reset the board and start over
        i = -1; // Restart the process
      }
    }
  }
  receiveAttack(cordinate, event) {
    if (this.clicked.includes(cordinate)) {
      console.log("already clicked");
      return false;
    }

    this.clicked.push(cordinate);

    if (this.isAllShipsSunk()) return;
    if (this.clickedNoShip.includes(cordinate)) return;

    let hit = false;
    this.ships.forEach((ship) => {
      if (ship.clicked.includes(cordinate)) return;
      if (ship.cordinates.includes(cordinate)) {
        ship.hit();
        ship.clicked.push(cordinate);
        this.board[cordinate.slice(0, 1)][cordinate.slice(2)] = 2;
        event.style.backgroundColor = "gray";
        hit = true;

        if (ship.isSunk()) {
          for (let i = 0; i < ship.cordinates.length; i++) {
            for (let n = 0; n < event.parentNode.children.length; n++) {
              if (
                event.parentNode.children[n].classList.contains(
                  ship.cordinates[i]
                )
              ) {
                event.parentNode.children[n].style.backgroundColor = "orange"; // ornage means all ship sunk
              }
            }
          }
          this.sunkShips.push(ship);
        }
      } else if (!hit && !this.clickedNoShip.includes(cordinate)) {
        this.clickedNoShip.push(cordinate);
        event.style.backgroundColor = "red"; // no ship in square means red.
      }
    });
    return true;
  }
}

///////////////////////////////////////////////////////

// placeShip() {
//   for (let i = 0; i < this.ships.length; i++) {
//     let placed = false;

//     while (!placed) {
//       //will give me a random integer number between 0-9.
//       const xRowRandomNum = Math.floor(Math.random() * (10 - 0));
//       const yCoulmnRandomNum = Math.floor(Math.random() * (10 - 0));

//       let canPlace = true;

//       if (this.ships[i].direction == "horizontal") {
//         if (this.ships[i].length + xRowRandomNum > 9) {
//           canPlace = false;
//         } else {
//           for (let z = -1; z <= this.ships[i].length; z++) {
//             for (let k = -1; k <= 1; k++) {
//               if (
//                 xRowRandomNum + z >= 0 &&
//                 xRowRandomNum + z < 10 &&
//                 yCoulmnRandomNum + k >= 0 &&
//                 yCoulmnRandomNum + k < 10 &&
//                 this.board[xRowRandomNum + z]?.[yCoulmnRandomNum + k] !== null
//               ) {
//                 canPlace = false; // A neighboring square is occupied
//                 break;
//               }
//             }
//             if (!canPlace) break;
//           }
//         }
//         if (canPlace) {
//           for (let z = 0; z < this.ships[i].length; z++) {
//             this.board[xRowRandomNum + z][yCoulmnRandomNum] = 1;
//           }
//           placed = true;
//         } else if (this.ships[i].direction == "vertical") {
//           if (yCoulmnRandomNum + this.ships[i].length - 1 >= 10) {
//             canPlace = false; // Ship would go out of bounds
//           } else {
//             for (let z = -1; z <= this.ships[i].length; z++) {
//               for (let k = -1; k <= 1; k++) {
//                 if (
//                   xRowRandomNum + k >= 0 &&
//                   xRowRandomNum + k < 10 &&
//                   yCoulmnRandomNum + z >= 0 &&
//                   yCoulmnRandomNum + z < 10 &&
//                   this.board[xRowRandomNum + k]?.[yCoulmnRandomNum + z] !==
//                     null
//                 ) {
//                   canPlace = false; // A neighboring square is occupied
//                   break;
//                 }
//               }
//               if (!canPlace) break;
//             }
//           }
//           if (canPlace) {
//             for (let z = 0; z < this.ships[i].length; z++) {
//               this.board[xRowRandomNum][yCoulmnRandomNum + z] = 1;
//             }
//             placed = true;
//           }
//         }
//       }
//     }
//   }

//   // restartShip: for (let i = 0; i < this.ships.length; i++) {
//   //   // will give me a random integer number between 0-9.
//   //   const xRowRandomNum = Math.floor(Math.random() * (10 - 0));
//   //   const yCoulmnRandomNum = Math.floor(Math.random() * (10 - 0));
//   //   for (let j = 0; j < this.ships[i].length; j++) {
//   //     if (this.ships[i].direction == "horizontal") {
//   //       for (let z = 0; z < this.ships[i].length; z++) {
//   //         if (xRowRandomNum + z > 9 || this.board[xRowRandomNum + z]?.[yCoulmnRandomNum] !== null) {
//   //           // this will check the all the x cells are empty.
//   //           i--;
//   //           continue restartShip;
//   //         }
//   //       }
//   //       this.board[xRowRandomNum + j][yCoulmnRandomNum] = 1;
//   //     } if (this.ships[i].direction == "vertical") {
//   //       for (let z = 0; z < this.ships[i].length; z++) {
//   //         if (this.board[xRowRandomNum]?.[yCoulmnRandomNum + z] != null || yCoulmnRandomNum + z > 9) {
//   //           // this will check the all the y cells are empty.
//   //           i--;
//   //           continue restartShip;
//   //         }
//   //       }
//   //       this.board[xRowRandomNum][yCoulmnRandomNum + j] = 1;
//   //     }
//   //   }
//   // }
// }

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
