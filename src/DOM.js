import { Player, GameBoard, Ship } from "./script.js";

const play = (function () {
  let myPlayer = new Player();
  let myComputer = new Player();

  const elements = {
    player_board: document.querySelector(".board_play"),
    computer_board: document.querySelector(".board_view"),
    reset: document.querySelector(".reset")
  };

  function buildBoards() {
    elements.reset.classList.remove('hide');
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        let tile1 = document.createElement("div");
        tile1.setAttribute("id", `${i},${j}`);
        elements.player_board.appendChild(tile1);

        let tile2 = document.createElement("div");
        tile2.setAttribute("id", `${i},${j}`);
        elements.computer_board.appendChild(tile2);

        tile1.addEventListener("click", (e) => {
          return e.target.getAttribute("id");
        });

        tile2.addEventListener(
          "click",
          (e) => {
            elements.reset.classList.add('hide');
            const coordinates = e.target.getAttribute("id");

            const nCoordinate = coordinates.slice(0, 1);
            const lCoordinate = coordinates.slice(2);

            if (myComputer.myBoard.receiveAttack(nCoordinate, lCoordinate)) {
              e.target.style.backgroundColor = "rgb(136, 0, 0)";
            } else {
              e.target.textContent = "X";
            }

            if (myComputer.myBoard.ships.length === 0) {
              endGamePanel("YOU WON!");
            } else {
              runComputer();
            }
          },
          { once: true }
        );
      }
    }

    elements.reset.addEventListener('click', (e) => {
      replay();
    });

    /* replay button event listener here as well as show, put hide in tile2 (once player has clicked it the replay button is hidden */


    randomPlacement(myPlayer);
    randomPlacement(myComputer);
    printBoard();
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
      let tempN, tempL, myStatus;

      do {
        tempN = Math.floor(Math.random() * 10);
        tempL = Math.floor(Math.random() * 10);
        myStatus = myPlayer.myBoard.board[tempN][tempL].status;
      } while (myStatus !== 0 && myStatus !== 1);

      const selectedElement = document.getElementById(`${tempN},${tempL}`);

      if (myPlayer.myBoard.receiveAttack(tempN, tempL)) {
        selectedElement.style.backgroundColor = "rgb(136, 0, 0)";
      } else {
        selectedElement.textContent = "X";
      }

      if (myPlayer.myBoard.ships.length === 0) { endGamePanel("YOU LOST!"); }

    printBoard();
  }

  function randomPlacement(currPlayer) {
    let ships = [5, 4, 3, 3, 2];
    let tempN, tempL, orientation;
    let isValid = true;
    
    for (let i = 0; i <= ships.length - 1; i++) {
      do {
        tempN = Math.floor(Math.random() * 10);
        tempL = Math.floor(Math.random() * 10);

        if (currPlayer.myBoard.board[tempN][tempL].status === 0) {
        orientation = Math.floor(Math.random() * 2);

        let result = (place(tempN, tempL, currPlayer, ships[i], orientation));
        if (!result) {
          let tempArr = [{ n: tempN, l:tempL }];
          for (let j = 1; j <= ships[i] - 1; j++) {
            if (orientation === 0) {
              tempArr.push({ n: tempN, l: (tempL + j) });
            } else if (orientation === 1) {
              tempArr.push({ n: (tempN + j), l: tempL });
            }
          }
          currPlayer.myBoard.place(tempArr);
          isValid = false;
        }

        }

      } while (isValid);
      isValid = true;
    }

  }

  function place(tempN, tempL, currPlayer, shipSize, orientation) {
    for (let i = 1; i <= shipSize - 1; i++) {
        try {
          if (orientation === 0) {
            if (currPlayer.myBoard.board[tempN][(tempL + i)].status != 0)  { return true; }
          } else if (orientation === 1) {
            if (currPlayer.myBoard.board[(tempN + i)][tempL].status != 0) { return true; }
          }
        } catch (err) {
          console.error();
          return true;
        }
    }
    return false; // all parts of this ship fit
  }

  function endGamePanel(message) {
    const end_game = document.querySelector('.end_game');
    end_game.classList.remove('hide');
    const end_message = document.querySelector('.end_message'); 
    end_message.textContent = message;

    const replay_button = document.querySelector('.replay');

    replay_button.addEventListener('click', (e) => {
      replay();
      end_game.classList.add('hide');
    });

  }

  function replay() {
    myPlayer = new Player();
    myComputer = new Player();
    clearBoards();
    buildBoards();
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
      row = "";
    }
  }

  return { elements, buildBoards, clearBoards, printBoard };
})();

play.buildBoards();
