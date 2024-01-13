const messageElement = document.querySelector(".message");
const boxElements = document.querySelectorAll(".box");
const resetButton = document.querySelector(".reset");
let currentPlayer = "X";
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

resetButton.addEventListener("click", function () {
  resetGame();
});

boxElements.forEach((box) => {
  box.addEventListener("click", () => {
    if (!box.textContent.trim()) {
      box.textContent = currentPlayer;
      box.disabled = true;
      count++;

      if (checkWinner()) {
        showWinner(currentPlayer);
      } else if (count === 9) {
        gameDraw();
      } else {
        togglePlayer();
      }
    }
  });
});

function resetGame() {
  boxElements.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
    resetButton.innerText = "Reset";
    messageElement.style.borderColor = "#2b8a37";
    resetButton.style.backgroundColor = "#50996291";
  });

  currentPlayer = "X";
  count = 0;
  updateMessage();
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

function updateMessage() {
  messageElement.textContent = `Player ${currentPlayer}'s Turn`;
  messageElement.style.backgroundColor =
    currentPlayer === "X" ? "#4eb190" : "rgb(26, 153, 115)";
}

function gameDraw() {
  messageElement.innerText = "Game was a Draw.";
  resetButton.innerText = "New Game";
  disableBoxes();
}

function disableBoxes() {
  boxElements.forEach((box) => {
    box.disabled = true;
  });
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1Val = boxElements[pattern[0]].textContent;
    let pos2Val = boxElements[pattern[1]].textContent;
    let pos3Val = boxElements[pattern[2]].textContent;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        return true;
      }
    }
  }
  return false;
}

function showWinner(winner) {
  messageElement.style.backgroundColor = "#f6ca09";
  messageElement.style.borderColor = "#b54a54";
  resetButton.style.backgroundColor = "#4a9f46";
  messageElement.innerText = `Player ${winner} Wins!`;
  resetButton.innerText = "New Game";
  disableBoxes();
}
