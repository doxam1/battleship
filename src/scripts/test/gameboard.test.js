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
    expect(newGameBoardForTest[0][0]).toBe(0);
  });

  
});
