import "/src/styles.css";

export class Player {
  constructor() {
    this.myBoard = new GameBoard();
  }
}

export class GameBoard {
  constructor() {
    this.board = [];
    this.build();
    this.ships = []; // Stores all ships for this player
  }
  build() {
    for (let i = 0; i <= 9; i++) {
      let tempArr = [];
      for (let j = 0; j <= 9; j++) {
        tempArr.push({ ref: null, status: 0 });
      }
      this.board.push(tempArr);
      tempArr = [];
    }
  }
  place(arr) {
    const ship = new Ship(arr.length);
    arr.forEach(part => {
      this.board[part.n][part.l] = { ref: ship, status: 1 };;
    });
    this.ships.push(ship);
  }
  receiveAttack(xCoordinate, yCoordinate) {
    if (this.board[xCoordinate][yCoordinate].status === 1) {
      const currentShip = this.board[xCoordinate][yCoordinate].ref;
      currentShip.appendHit();
      this.board[xCoordinate][yCoordinate].status = 3;
      if (this.board[xCoordinate][yCoordinate].ref.isSunk()) {
        for (let i = 0; i <= this.ships.length; i++) {
          if (this.ships[i] === this.board[xCoordinate][yCoordinate].ref)
            this.ships.splice(i, 1);
        }
      }
      return true;
      // hit a ship
    } else {
      this.board[xCoordinate][yCoordinate].status = 2;
      return false;
    }
  }
}

export class Ship {
  constructor(length) {
    this.length = length;
    this.hit = 0;
    this.sunk = false;
  }
  appendHit() {
    this.hit++;
  }
  isSunk() {
    if (this.hit >= this.length) this.sunk = true;
    return this.sunk;
  }
}

/*
water = 0
ship = 1

miss = 2
hit = 3
*/
