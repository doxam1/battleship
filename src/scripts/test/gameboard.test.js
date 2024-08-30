import { describe, expect, test } from "@jest/globals";

import Gameboard from "../gameboard";

test("a function for geting a number between 0 and 9", () => {
  const randomNumber = Math.floor(Math.random() * (10 - 0));
  expect(randomNumber).toBeGreaterThanOrEqual(0);
  expect(randomNumber).toBeLessThan(10);
});

describe("Gameboard class", () => {
  test("new game board function is building the board correctly", () => {
    const newGameBoardForTest = Gameboard.newGameBoard();
    expect(newGameBoardForTest).toHaveLength(10);
    expect(newGameBoardForTest[0]).toHaveLength(10);
    expect(newGameBoardForTest[0][0]).toBe(null);
  });

  test("Gameboard placeShip() function is placing all the ships on board", () => {
    const playerOneGameBoard = new Gameboard();
    playerOneGameBoard.placeShip();

    let placeShipCount = 0;
    for (let row = 0; row < 10; row++) {
      for (let cul = 0; cul < 10; cul++) {
        if (playerOneGameBoard.board[row][cul] !== null) {
          placeShipCount++;
        }
      }
    }
    const totalShipCount = playerOneGameBoard.ships.reduce(
      (acc, ship) => acc + ship.length,
      0
    );
    expect(placeShipCount).toBe(totalShipCount);
  });

  test("ships should not overlap", () => {
    const gameBoard = new Gameboard();
    gameBoard.placeShip();

    const board = gameBoard.board;
    const filledPositions = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] !== null) {
          filledPositions.push([row, col]);
        }
      }
    }
    //check for duplicate position:
    const uniquePositions = new Set(
      filledPositions.map((pos) => pos.toString())
    );
    expect(filledPositions.length).toBe(uniquePositions.size);
  });

  test("ships should be separated by at least one square", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip();

    const board = gameboard.board;
    const directions = [-1, 0, 1];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] !== null) {
          const ship = board[row][col]; // Assuming the board stores a reference to the ship or its ID
          const shipLength = ship.length;
          const shipDirection = ship.direction;

          for (let i = 0; i < shipLength; i++) {
            let checkRow = row;
            let checkCol = col;

            if (shipDirection === "horizontal") {
              checkRow = row + i;
            } else if (shipDirection === "vertical") {
              checkCol = col + i;
            }

            for (let dRow of directions) {
              for (let dCol of directions) {
                const newRow = checkRow + dRow;
                const newCol = checkCol + dCol;

                if (
                  newRow >= 0 &&
                  newRow < 10 &&
                  newCol >= 0 &&
                  newCol < 10 &&
                  !(dRow === 0 && dCol === 0) // Skip the current cell
                ) {
                  expect(board[newRow][newCol]).toBe(null);
                }
              }
            }
          }
        }
      }
    }
  });
  test("ships should stay within board bounds", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip();

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        expect(gameboard.board[row][col]).not.toBeUndefined();
      }
    }
  });
  test("placeShip should execute within reasonable time", () => {
    const gameboard = new Gameboard();
    const start = Date.now();

    gameboard.placeShip();

    const end = Date.now();
    const executionTime = end - start;

    expect(executionTime).toBeLessThan(1000); // Adjust the threshold as needed
  });
});
