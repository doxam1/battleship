import { describe, expect, test } from "@jest/globals";

import Ship from "../Ship";

describe("Ship class", () => {
  test("ship can have 2 directions, horizontal or vertical randomly", () => {
    const direction = new Set();

    for (let i = 0 ; i < 500 ; i++) {
      const newShip = new Ship(3).direction;
      direction.add(newShip);
    }

    expect(direction.has('vertical')).toBe(true);
    expect(direction.has('horizontal')).toBe(true);
  });

  test("hit() adds a hit the the ship hits", () => {
    const newShip = new Ship(1);
    newShip.hit();
    expect(newShip.hits).toBe(1);
  });

  test("isSunk() sinks the ship when hits equal length of ship", () => {
    const newShip = new Ship(1);
    newShip.hit();
    newShip.isSunk();
    expect(newShip.sunk).toBeTruthy();
  });

  test("isSunk() does not sink the ship if hits are less than length", () => {
    const newShip = new Ship(3);
    newShip.hit();
    newShip.isSunk();
    expect(newShip.sunk).toBeFalsy;
  });
});
