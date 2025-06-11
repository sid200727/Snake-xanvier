const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const box = 32;
let score = 0;
let speed = 150; // initial speed
let game;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

// Draw everything
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 19 * box, 19 * box);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // Game Over
  if (
    snakeX < 0 ||
    snakeX >= 19 * box ||
    snakeY < 0 ||
    snakeY >= 19 * box ||
    collision(snakeX, snakeY, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById("score").textContent = score;

    // Move food
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };

    // Increase speed
    if (speed > 50) {
      speed -= 2;
      clearInterval(game);
      game = setInterval(draw, speed);
    }
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

// Handle input
document.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// Collision detection
function collision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (x === array[i].x && y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Restart game function
function restartGame() {
  clearInterval(game);
  score = 0;
  speed = 150;
  direction = "RIGHT";
  snake = [{ x: 9 * box, y: 10 * box }];
  food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
  };
  document.getElementById("score").textContent = score;
  game = setInterval(draw, speed);
}
// Add restart button functionality
document.getElementById("restart").addEventListener("click", restartGame);
// Add score display    
document.getElementById("score").textContent = score;

// Start on load
window.onload = () => {
  game = setInterval(draw, speed);
};
