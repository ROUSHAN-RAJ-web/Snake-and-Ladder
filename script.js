const boardSize = 10; // 10x10 board
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 78: 98 };
let playerPosition = 1;

// Generate board dynamically
const board = document.getElementById("board");
for (let i = boardSize * boardSize; i > 0; i--) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${i}`;
    cell.innerText = i;
    board.appendChild(cell);
}

// Add snakes and ladders indicators
for (let snakeStart in snakes) {
    const snakeCell = document.getElementById(`cell-${snakeStart}`);
    const snake = document.createElement("div");
    snake.classList.add("snake");
    snakeCell.appendChild(snake);
}

for (let ladderStart in ladders) {
    const ladderCell = document.getElementById(`cell-${ladderStart}`);
    const ladder = document.createElement("div");
    ladder.classList.add("ladder");
    ladderCell.appendChild(ladder);
}

// Add player token
const playerToken = document.createElement("div");
playerToken.classList.add("player");
document.getElementById("cell-1").appendChild(playerToken);

// Dice images
const diceImages = [
    "dice1.png",
    "dice2.png",
    "dice3.png",
    "dice4.png",
    "dice5.png",
    "dice6.png"
];

// Roll Dice
document.getElementById("rollDice").addEventListener("click", () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("diceResult").innerText = diceRoll;

    // Animate dice roll
    const diceImage = document.getElementById("diceImage");
    diceImage.src = diceImages[diceRoll - 1];

    movePlayer(diceRoll);
});

// Move player
function movePlayer(diceRoll) {
    let newPosition = playerPosition + diceRoll;

    // Check for overflow
    if (newPosition > 100) {
        alert("Roll again! Can't move beyond 100.");
        return;
    }

    // Move player
    document.getElementById(`cell-${playerPosition}`).removeChild(playerToken);
    playerPosition = newPosition;

    // Check for snakes or ladders
    if (snakes[playerPosition]) {
        setTimeout(() => {
            alert(`Oh no! A snake bit you! Sliding down from ${playerPosition} to ${snakes[playerPosition]}.`);
            playerPosition = snakes[playerPosition];
        }, 500);
    } else if (ladders[playerPosition]) {
        setTimeout(() => {
            alert(`Yay! You climbed a ladder from ${playerPosition} to ${ladders[playerPosition]}!`);
            playerPosition = ladders[playerPosition];
        }, 500);
    }

    // Update position
    setTimeout(() => {
        document.getElementById(`cell-${playerPosition}`).appendChild(playerToken);
        document.getElementById("playerPosition").innerText = playerPosition;

        // Check for win
        if (playerPosition === 100) {
            alert("Congratulations! You won the game!");
            resetGame();
        }
    }, 1000);
}

// Reset game
function resetGame() {
    document.getElementById(`cell-${playerPosition}`).removeChild(playerToken);
    playerPosition = 1;
    document.getElementById(`cell-${playerPosition}`).appendChild(playerToken);
    document.getElementById("playerPosition").innerText = playerPosition;
    document.getElementById("diceResult").innerText = "0";
}
