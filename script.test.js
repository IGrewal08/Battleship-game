const { Player, GameBoard, Ship } = require("./src/script.js");

// --- Ship Class Tests ---

describe('Ship Class', () => {
  let testShip;
  beforeEach(() => {
    testShip = new Ship(3);
  });

  test('Ship constructor initializes with correct length and default values', () => {
    expect(testShip.length).toBe(3);
    expect(testShip.hit).toBe(0);
    expect(testShip.sunk).toBe(false);
  });

  test('appendHit increments the hit counter', () => {
    testShip.appendHit();
    expect(testShip.hit).toBe(1);
    testShip.appendHit();
    expect(testShip.hit).toBe(2);
  });

  test('isSunk returns false when not hit enough', () => {
    testShip.appendHit(); // 1 hit
    testShip.appendHit(); // 2 hits
    expect(testShip.isSunk()).toBe(false);
  });

  test('isSunk returns true when hit equals length', () => {
    testShip.appendHit(); // 1 hit
    testShip.appendHit(); // 2 hits
    testShip.appendHit(); // 3 hits
    expect(testShip.isSunk()).toBe(true);
    expect(testShip.sunk).toBe(true);
  });

  test('isSunk returns true when hit exceeds length', () => {
    testShip.appendHit();
    testShip.appendHit();
    testShip.appendHit();
    testShip.appendHit(); // 4 hits
    expect(testShip.isSunk()).toBe(true);
  });
});

// --- GameBoard Class Tests ---

describe('GameBoard Class', () => {
  let testBoard;
  beforeEach(() => {
    testBoard = new GameBoard();
  });

  test('constructor initializes a 10x10 board', () => {
    expect(testBoard.board.length).toBe(10);
    expect(testBoard.board[0].length).toBe(10);
    expect(testBoard.ships.length).toBe(0);
    // Check initial state of a cell
    expect(testBoard.board[5][5]).toEqual({ ref: null, status: 0 });
  });

  test('place method correctly places a ship on the board and stores it', () => {
    const coords = [
      { n: 0, l: 0 },
      { n: 0, l: 1 },
      { n: 0, l: 2 },
    ];
    testBoard.place(coords);

    // Check board state
    expect(testBoard.board[0][1].status).toBe(1);
    expect(testBoard.board[0][1].ref).toBeInstanceOf(Ship);
    expect(testBoard.board[0][1].ref.length).toBe(3);

    // Check ships array
    expect(testBoard.ships.length).toBe(1);
  });

  test('receiveAttack correctly handles a miss', () => {
    // Attack an empty cell
    const result = testBoard.receiveAttack(5, 5);
    expect(result).toBe(false);
    // Check cell status is 2 (miss)
    expect(testBoard.board[5][5].status).toBe(2);
  });

  test('receiveAttack correctly handles a hit', () => {
    const coords = [{ n: 1, l: 1 }];
    testBoard.place(coords);
    const shipRef = testBoard.board[1][1].ref;

    // Attack the ship cell
    const result = testBoard.receiveAttack(1, 1);
    expect(result).toBe(true);
    // Check cell status is 3 (hit)
    expect(testBoard.board[1][1].status).toBe(3);
    // Check ship hit count
    expect(shipRef.hit).toBe(1);
  });

  test('receiveAttack correctly sinks a ship and removes it from the ships array', () => {
    const coords = [{ n: 9, l: 9 }];
    testBoard.place(coords);
    expect(testBoard.ships.length).toBe(1);

    // Attack the single-length ship
    const result = testBoard.receiveAttack(9, 9);
    expect(result).toBe(true);
    // Ship should be sunk
    expect(testBoard.board[9][9].ref.isSunk()).toBe(true);
    // Ship should be removed from GameBoard.ships
    expect(testBoard.ships.length).toBe(0);
  });
});

// --- Player Class Tests ---

describe('Player Class', () => {
  test('Player constructor initializes a GameBoard instance', () => {
    const testPlayer = new Player();
    expect(testPlayer.myBoard).toBeInstanceOf(GameBoard);
    // Ensure the board is properly built (check a cell)
    expect(testPlayer.myBoard.board[0][0].status).toBe(0);
  });
});
