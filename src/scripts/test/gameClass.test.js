import Game from '../game'; 
import Player from '../player'; 

import { describe, expect, test } from "@jest/globals";


describe('Game Class', () => {
  let player1, player2, game;

  beforeEach(() => {
    player1 = new Player('Player 1'); // Create mock player instances
    player2 = new Player('Player 2');
    game = new Game(player1, player2);
  });

  test('should initialize correctly', () => {
    expect(game.players).toEqual([player1, player2]);
    expect(game.currentTurnIndex).toBe(0);
  });

  test('should return the current player', () => {
    expect(game.getCurrnetPlayer()).toBe(player1);
    game.swichTurns();
    expect(game.getCurrnetPlayer()).toBe(player2);
  });

  test('should switch turns correctly', () => {
    game.swichTurns();
    expect(game.currentTurnIndex).toBe(1);
    game.swichTurns();
    expect(game.currentTurnIndex).toBe(0);
  });

  test('should detect game over when all ships are sunk', () => {
    jest.spyOn(player1.gameBoard, 'isAllShipsSunk').mockReturnValue(false);
    jest.spyOn(player2.gameBoard, 'isAllShipsSunk').mockReturnValue(true);
    
    expect(game.gameOver()).toBe(true);
  });

  // Add more tests as needed, including for playGame and startGame
});