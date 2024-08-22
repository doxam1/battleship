export default class Ship {
    constructor(length, direction) {
        this.length = length;
        this.direction = direction;
        this.hits = 0;
        this.sunk = false;        
    }

    hit() {
       return this.hits ++;
    }

    isSunk() {
        this.hits == this.length ? this.sunk = true : false;
    }
}

