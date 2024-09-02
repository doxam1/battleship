export default class Ship {
    constructor(length) {
        this.length = length;
        this.direction = '' //['horizontal', 'vertical'][Math.floor(Math.random() * 2)];
        this.hits = 0;
        this.sunk = false;
        this.cordinates = [];
        this.clicked = [];     
    }

    hit() {
       return this.hits ++;
    }

    isSunk() {
        return this.hits == this.length ? this.sunk = true : false;
    }
}

