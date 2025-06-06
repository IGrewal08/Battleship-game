import "/src/styles.css";

class Player {
  constructor() {
    this.myBoard = new GameBoard();
  }
}

class GameBoard {
  constructor() {
    this.board = [];
    this.build();
  }
  build() {
    for (let i = 0; i <= 9; i++) {
        let tempArr = [];
        for (let j = 0; j <= 9; j++) {
            tempArr.push([{ ref: null, status: 0}]);
        }
        this.board.push(tempArr);
        tempArr = [];
    }
  }
  place() {
    const ship = new Ship(2);
    const element = { ref: ship, status: 1};
    this.board[0][0] = element;
    this.board[0][1] = element;
  }
  receiveAttack(xCoordinate, yCoordinate) {
    if (this.board[xCoordinate][yCoordinate].status === 1) {
        const currentShip = this.board[xCoordinate][yCoordinate].ref;
        currentShip.appendHit();
      // hit a ship
    } else {
      this.board[xCoordinate][yCoordinate].status = 2;
    }
  }
}

class Ship {
  constructor(length) {
    this.length = length;
    this.hit = 0;
    this.sunk = false;
  }
  appendHit() {
    this.hit++;
  }
  isSunk() {
    return this.sunk;
  }
}

const myPlayer = new Player();
myPlayer.myBoard.place();
console.log(myPlayer.myBoard.board);
myPlayer.myBoard.receiveAttack(0, 0);
myPlayer.myBoard.receiveAttack(0, 1);
console.log(myPlayer.myBoard.board);


























/*
2 matrix's

player game board ->

computer game board ->

each element =>
{
    reference: ship object
    status: 0
}

water = 0
ship = 1

miss = 2
hit = 3
*/

/* 
    gameboard -> place ships using ship class
    receiveAttack -> check if attack hit a ship, if it did find which ship object did it hit
    receiveAttack -> keep track of missed attack (using 'X' on array)
    gameboard -> check if all ships have been sunk


    Player -> individual gameboard
    2 players -> real and computer (random coordinate picker for attack, and ship placement)
*/
