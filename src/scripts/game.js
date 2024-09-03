export default class Game {
  constructor(player1, player2) {
    this.players = [player1, player2];
    this.currentTurnIndex = 0;
  }

  getCurrnetPlayer() {
    return this.players[this.currentTurnIndex];
  }

  swichTurns() {
    this.currentTurnIndex = 1 - this.currentTurnIndex;
  }

  startGame() {
    this.players.forEach((player) => {
      player.gameBoard.placeShip();
      player.playerTypeBoardBuilding();
    });
  }

  gameOver() {
    return (
      this.players[0].gameBoard.isAllShipsSunk() ||
      this.players[1].gameBoard.isAllShipsSunk()
    );
  }

  playGame() {
    if (this.gameOver()) return;
    const currentPlayer = this.getCurrnetPlayer();
    const opponent = this.players[1 - this.currentTurnIndex];
    // console.log(currentPlayer)

    let boardClass;
    currentPlayer == this.players[1]
      ? (boardClass = ".boardOne")
      : (boardClass = ".boardTwo");

    const squareInBoard = document.querySelectorAll(`${boardClass}.square`);

    const handleClick = (e) => {
      const validMove = opponent.gameBoard.receiveAttack(
        e.target.classList[2],
        e.target
      );

      if (validMove) {
        // const hit = currentPlayer.attack(opponent, cordinate, eventTarget);
        if (opponent.gameBoard.isAllShipsSunk()) {
          console.log(`${currentPlayer.name} wins!`);
          return;
        }

        this.swichTurns();

        squareInBoard.forEach((square) =>
          square.removeEventListener("click", handleClick)
        );

        this.playGame();
      }
    };
    squareInBoard.forEach((square) => {
      square.addEventListener("click", handleClick, { once: true });
    });
  }
}
