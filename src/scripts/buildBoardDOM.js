export default function buildBoard(squareXsqaure, boardClass) {
  const board = document.querySelector(`.${boardClass}`);

  board.innerHTML = "";

  for (let i = 0; i < squareXsqaure * squareXsqaure; i++) {
    const square = document.createElement('div');


    // numbering the cells. - added this so line 0 will have two digits. 
    let cellNum;
    if (i < 10) {
      cellNum = '0' + `${i}`
    } else {
      cellNum = i;
    }

    square.classList.add('square', `${boardClass}`, `${cellNum.toString().split('').join(':')}`);
    square.style.width = (400 / squareXsqaure) + 'px';
    square.style.height = (400 / squareXsqaure) + 'px';
    square.style.backgroundColor = 'lightgray'
    board.appendChild(square);
  }
}

// i will take the array from Gameboard class and connect it to the class of the cell and that's how i will populate the board.
