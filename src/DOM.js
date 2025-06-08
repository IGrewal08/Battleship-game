import { Player, GameBoard, Ship } from "./script.js";

const play = (function () {
  let myPlayer = new Player();
  myPlayer.myBoard.place([{x: 1, y: 0}]);
  myPlayer.myBoard.place([{x: 4, y: 5}, {x: 4, y: 6}]);

  let myComputer = new Player();
  myComputer.myBoard.place([{x: 0, y: 0}]);
  myComputer.myBoard.place([{x: 9, y: 9}]);

  //console.table(myPlayer.myBoard.board);

  const elements = {
    player_board: document.querySelector(".board_play"),
    computer_board: document.querySelector(".board_view"),
  };

  function buildBoards() {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        let tile1 = document.createElement("div");
        tile1.setAttribute("id", `${i},${j}`);
        elements.player_board.appendChild(tile1);

        let tile2 = document.createElement("div");
        tile2.setAttribute("id", `${i},${j}`);
        elements.computer_board.appendChild(tile2);

        tile1.addEventListener("click", (e) => {
          console.log(e.target.getAttribute("id"));
          return e.target.getAttribute("id");
        });

        tile2.addEventListener(
          "click",
          (e) => {
            const coordinates = e.target.getAttribute("id");

            const nCoordinate = coordinates.slice(0, 1);
            const lCoordinate = coordinates.slice(2);

            if (myComputer.myBoard.receiveAttack(nCoordinate, lCoordinate)) {
              e.target.style.backgroundColor = "rgb(70, 70, 70)";
            } else {
              e.target.textContent = "X";
            }

            if (myComputer.myBoard.ships.length === 0) {
              console.log("YOU WON!");
            } else {
              runComputer();
            }
          },
          { once: true }
        );
      }
    }
  }

  function clearBoards() {
    while (elements.player_board.firstChild) {
      elements.player_board.removeChild(elements.player_board.firstChild);
    }
    while (elements.computer_board.firstChild) {
      elements.computer_board.removeChild(elements.computer_board.firstChild);
    }
  }

  function runComputer() {
    if (myPlayer.myBoard.ships.length === 0) {
      console.log("YOU LOST!");
    } else {
      let tempX;
      let tempY;
      let myStatus;

      do {
        tempX = Math.floor(Math.random() * 10);
        tempY = Math.floor(Math.random() * 10);
        console.log(tempX + " " + tempY);
        myStatus = myPlayer.myBoard.board[tempX][tempY].status;
      } while (myStatus !== 0 && myStatus !== 1);

      /* INF loop at 1 remaining tile */

      const selectedElement = document.getElementById(`${tempX},${tempY}`);

      if (myPlayer.myBoard.receiveAttack(tempX, tempY)) {
        selectedElement.style.backgroundColor = "rgb(136, 0, 0)";
      } else {
        selectedElement.textContent = "X";
      }
    }

    printBoard();
  }

  function printBoard() {
    for (let i = 0; i <= 9; i++) {
      let row = "";
      for (let j = 0; j <= 9; j++) {
        row += myPlayer.myBoard.board[i][j].status;
        if (myPlayer.myBoard.board[i][j].status === 1) {
            const part = document.getElementById(`${i},${j}`);
            part.style.backgroundColor = "rgb(70, 70, 70)";
        }
        row += " ";
      }
      console.log(row);
      row = "";
    }
  }

  return { elements, buildBoards, clearBoards, printBoard };
})();



play.buildBoards();
play.printBoard();

/* 
    Carrier -> 5
    Battleship -> 4
    Destroyer -> 3
    Submarine -> 3
    Patrol Boat -> 2
*/
//play.clearBoards();

/* 
    predefined positions first
*/
