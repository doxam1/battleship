/* eslint-disable no-undef */
import Ship from './Shipgit'

describe("new ship", () => {
  const newShip = new Ship(1);
  newShip.hit();

  test("hits added on hit", () => {
    expect(newShip.hits).toBe(1);
  });

  newShip.isSunk();

  test('isSunk sunking the ship', ()=>{
    expect(newShip.sunk).toBeTruthy();
  })


});
