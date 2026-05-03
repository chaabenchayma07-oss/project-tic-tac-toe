const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;

// Create board
function createBoard() {
  boardDiv.innerHTML = '<div id="line"></div>';

  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.innerText = cell;
    div.addEventListener("click", () => makeMove(index));
    boardDiv.appendChild(div);
  });
}

// Handle move
function makeMove(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  createBoard();
  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
}

// Check winner
function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let combo of wins) {
    const [a,b,c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.innerText = `Player ${board[a]} wins! 🎉`;
      gameActive = false;
      drawLine(combo);
      return;
    }
  }

  if (!board.includes("")) {
    statusText.innerText = "Draw!";
    gameActive = false;
  }
}

// Draw winning line
function drawLine(combo) {
  const line = document.getElementById("line");

  const map = {
    "0,1,2": { top: 50, left: 0, width: 300, rotate: 0 },
    "3,4,5": { top: 150, left: 0, width: 300, rotate: 0 },
    "6,7,8": { top: 250, left: 0, width: 300, rotate: 0 },

    "0,3,6": { top: 0, left: 50, width: 300, rotate: 90 },
    "1,4,7": { top: 0, left: 150, width: 300, rotate: 90 },
    "2,5,8": { top: 0, left: 250, width: 300, rotate: 90 },

    "0,4,8": { top: 0, left: 0, width: 424, rotate: 45 },
    "2,4,6": { top: 0, left: 300, width: 424, rotate: 135 }
  };

  const key = combo.join(",");
  const pos = map[key];

  line.style.width = pos.width + "px";
  line.style.top = pos.top + "px";
  line.style.left = pos.left + "px";
  line.style.transform = `rotate(${pos.rotate}deg)`;
}

// Restart
restartBtn.addEventListener("click", () => {
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's turn";
  createBoard();
});

// Start
createBoard();