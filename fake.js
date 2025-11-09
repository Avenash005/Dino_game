const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

let isJumping = false;
let isGameOver = false;
let score = 0;
let gameInterval;

function jump() {
if (isJumping || isGameOver) return;
isJumping = true;
let position = 0;
const upInterval = setInterval(() => {
if (position >= 100) {
clearInterval(upInterval);
const downInterval = setInterval(() => {
if (position <= 0) {
clearInterval(downInterval);
isJumping = false;
} else {
position -= 5;
dino.style.bottom = position + 'px';
}
}, 20);
} else {
position += 5;
dino.style.bottom = position + 'px';
}
}, 20);
}

document.addEventListener('keydown', (event) => {
if (event.code === 'Space' || event.key === 'ArrowUp') jump();
});

function startGame() {
score = 0;
isGameOver = false;
gameOverDisplay.style.display = 'none';
obstacle.style.animation = 'moveObstacle 2s linear infinite';
scoreDisplay.textContent = 'Score: ' + score;

gameInterval = setInterval(() => {
score++;
scoreDisplay.textContent = 'Score: ' + score;

const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

if (obstacleRight > 500 && obstacleRight < 550 && dinoBottom < 30) {
  gameOver();
}

}, 50);
}

function gameOver() {
isGameOver = true;
clearInterval(gameInterval);
obstacle.style.animation = 'none';
gameOverDisplay.style.display = 'block';
}

restartBtn.addEventListener('click', () => {
obstacle.style.right = '-50px';
startGame();
});

startGame();
