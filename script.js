const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverDisplay = document.getElementById("game-over");
const restartBtn = document.getElementById("restart-btn");

let isJumping = false;
let isGameOver = false;
let score = 0;
let position = 0;
let gameLoop;

function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  let velocity = 15;

  const jumpInterval = setInterval(() => {
    if (velocity <= 0 && position <= 0) {
      clearInterval(jumpInterval);
      isJumping = false;
      position = 0;
      dino.style.bottom = position + "px";
    } else {
      velocity -= 0.5;
      position += velocity;
      if (position < 0) position = 0;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.key === "ArrowUp") jump();
});

function startGame() {
  isGameOver = false;
  score = 0;
  position = 0;
  scoreDisplay.textContent = "Score: " + score;
  gameOverDisplay.style.display = "none";

  obstacle.style.animation = "moveObstacle 2s linear infinite";

  if (gameLoop) clearInterval(gameLoop);

  gameLoop = setInterval(() => {
    score++;
    scoreDisplay.textContent = "Score: " + score;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      dinoRect.right > obstacleRect.left &&
      dinoRect.left < obstacleRect.right &&
      dinoRect.bottom > obstacleRect.top
    ) {
      gameOver();
    }
  }, 50);
}

function gameOver() {
  isGameOver = true;
  clearInterval(gameLoop);
  obstacle.style.animation = "none";
  gameOverDisplay.style.display = "block";
}

restartBtn.addEventListener("click", () => {
  obstacle.style.animation = "none";
  void obstacle.offsetWidth; // reset animation
  startGame();
});

window.onload = startGame;
