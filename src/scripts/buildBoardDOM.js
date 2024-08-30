export default function buildBoard(squareXsqaure, boardClass) {
  const board = document.querySelector(`.${boardClass}`);

  board.innerHTML = "";

  for (let i = 0; i < squareXsqaure * squareXsqaure; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = (400 / squareXsqaure) + 'px';
    square.style.height = (400 / squareXsqaure) + 'px';
    board.appendChild(square);
  }
}
