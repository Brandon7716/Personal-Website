// displayController
const displayController = (() => {
  const tiles = document.querySelectorAll(".tile");
  const getTile = (index) => {
    if (index < tiles.length && index >= 0) {
      return tiles[index];
    } else {
      throw new Error("Index out of bounds. Tile not found.");
    }
  };

  const setTile = (index, player) => {
    if (index < tiles.length && index >= 0) {
      tiles[index].textContent = player;
    } else {
      throw new Error("Index out of bounds. Tile not found.");
    }
  };

  const isTaken = (index) => {
    if (index < tiles.length && index >= 0) {
      // If taken, return text context, else false
      if (tiles[index].textContent !== null) {
        return tiles[index].textContent;
      } else {
        return false;
      }
    } else {
      throw new Error("Index out of bounds. Tile not found.");
    }
  };
  const getAllTiles = () => {
    return tiles;
  };

  const setWin = (index1, index2, index3) => {
    displayController.getTile(index1).classList.add("win");
    displayController.getTile(index2).classList.add("win");
    displayController.getTile(index3).classList.add("win");
  };
  return { getTile, setTile, isTaken, getAllTiles, setWin };
})();

// Gameboard logic
const gameBoard = (() => {
  const player1 = "X";
  const player2 = "O";
  let isPlayer1Turn = true;
  let isWin = false;
  let isTie = false;
  //On construction will always be player1
  let currPlayer = player1;
  const playerStatus = document.querySelector(".player-status");
  playerStatus.textContent = `Player ${currPlayer}'s turn!`;
  const tiles = displayController.getAllTiles();
  const restartBtn = document.querySelector("#restart-btn");

  restartBtn.addEventListener("click", () => {
    isWin = false;
    isTie = false;
    isPlayer1Turn = true;
    currPlayer = player1;
    playerStatus.textContent = `Player ${currPlayer}'s turn!`;
    tiles.forEach((tile) => {
      tile.textContent = "";
      tile.classList.remove("win");
    });
  });

  const checkforWin = (index) => {
    let indexOne;
    let indexTwo;
    //check 2 above
    if (index >= 6) {
      indexOne = index - 3;
      indexTwo = index - 6;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }
    // check 2 right
    if (index == 0 || index == 3 || index == 6) {
      indexOne = index + 1;
      indexTwo = index + 2;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }
    // check 2 below
    if (index + 6 < tiles.length) {
      indexOne = index + 3;
      indexTwo = index + 6;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }
    // check 2 left
    if (index == 2 || index == 5 || index == 8) {
      indexOne = index - 1;
      indexTwo = index - 2;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }

    // check between top  bot
    if (index == 3 || index == 4 || index == 5) {
      indexOne = index - 3;
      indexTwo = index + 3;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }
    //check between left  right
    if (index == 1 || index == 4 || index == 7) {
      indexOne = index - 1;
      indexTwo = index + 1;
      if (
        displayController.isTaken(indexOne) == currPlayer &&
        displayController.isTaken(indexTwo) == currPlayer
      ) {
        isWin = true;
        displayController.setWin(index, indexOne, indexTwo);
      }
    }

    //check diagonals
    if (index % 2 == 0) {
      //0: check 2 lower right
      if (index == 0) {
        indexOne = index + 4;
        indexTwo = index + 8;
        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }
      }

      //2: check 2 lower left
      if (index == 2) {
        indexOne = index + 2;
        indexTwo = index + 4;
        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }
      }

      //4: check between main diagonals
      if (index == 4) {
        indexOne = index - 4;
        indexTwo = index + 4;
        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }

        indexOne = index + 2;
        indexTwo = index - 2;

        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }
      }

      //6: check 2 upper right
      if (index == 6) {
        indexOne = index - 2;
        indexTwo = index - 4;
        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }
      }
      //8: check 2 upper left
      if (index == 8) {
        indexOne = index - 4;
        indexTwo = index - 8;
        if (
          displayController.isTaken(indexOne) == currPlayer &&
          displayController.isTaken(indexTwo) == currPlayer
        ) {
          isWin = true;
          displayController.setWin(index, indexOne, indexTwo);
        }
      }
    }
    return isWin;
  };

  const checkforTie = () => {
    let counter = 0;
    for (let i = 0; i < tiles.length; i++) {
      if (displayController.isTaken(i)) {
        counter++;
      }
    }
    counter == 9 ? (isTie = true) : (isTie = false);
    return isTie;
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      let currIndex = parseInt(e.target.getAttribute("data-tile"));
      let currText = displayController.getTile(currIndex).textContent;

      //If no win and clicking on blank tile
      if (currText === "" && !isWin) {
        displayController.setTile(currIndex, currPlayer);
        checkforWin(currIndex);
        if (isWin) {
          playerStatus.textContent = `Player ${currPlayer} has won the game!`;
        } else {
          isPlayer1Turn = !isPlayer1Turn;
          if (isPlayer1Turn) {
            playerStatus.textContent = `Player ${player1}'s turn!`;
            currPlayer = player1;
          } else {
            playerStatus.textContent = `Player ${player2}'s turn!`;
            currPlayer = player2;
          }
        }
      }
      checkforTie();

      if (isTie && !isWin) {
        playerStatus.textContent = `You tied the game, press restart to play again!`;
      }
    });
  });
})();
