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
      player.gameBoard.hasShipCordinates();
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
      const msgBoard = document.querySelector(".centerBoard");
      if (opponent.type == "machine") {
        msgBoard.textContent = `< ${opponent.name} Turn`;
      } else {
        msgBoard.textContent = `${opponent.name} Turn >`;
      }

      e.target.classList.add("clickedSquare");
      const validMove = opponent.gameBoard.receiveAttack(
        e.target.classList[2],
        e.target
      );

      if (validMove) {
        // const hit = currentPlayer.attack(opponent, cordinate, eventTarget);
        if (opponent.gameBoard.isAllShipsSunk()) {
          msgBoard.textContent = `${currentPlayer.name} wins!`;
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

    const boardOneSquares = document.querySelectorAll(".boardOne.square");

    const machineClickRandom = () => {
      //  // לשנות פה, לדחוף לרשימה את הלחיצה האחרונה ולבדוק אם יש ספינה, אם כן ללחוץ ליד
      // const lastClickedByMachine = Array.from(boardOneSquares).filter((x) => x.classList.contains('clickedSquare'))
      // console.log(lastClickedByMachine)

      // אם זה אפשר לראות איפה יש ספינות, אם הייתה לחיצה על ספינה - הלחיצה הבאה תהיה בריבוע ליד.
      // console.log(this.players[1].gameBoard.hasShipCordinatesArr);


      let notClickedByMachine = Array.from(boardOneSquares).filter(
        (x) => !x.classList.contains("clickedSquare")
      );
      let NextMachineClick =
        notClickedByMachine[
          Math.floor(Math.random() * notClickedByMachine.length)
        ];

      NextMachineClick.click();
    };

    if (currentPlayer.type == "machine")
      setTimeout(() => {
        machineClickRandom();
      }, 750);
  }
}
