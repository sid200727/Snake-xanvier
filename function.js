const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let speed = 90;

let snake = [{ x: 160, y: 160 }];
let food = spawnFood();

let dx = box;
let dy = 0;

document.addEventListener("keydown", changeDirection);
document.getElementById("restart-btn").addEventListener("click", () => location.reload());

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
  };
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
  else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  else if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
  else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}

function drawGrid() {
  ctx.strokeStyle = "#222";
  for (let i = 0; i <= canvas.width; i += box) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i <= canvas.height; i += box) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "lightgreen" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };

  // Wall wrap
  if (head.x >= canvas.width) head.x = 0;
  if (head.x < 0) head.x = canvas.width - box;
  if (head.y >= canvas.height) head.y = 0;
  if (head.y < 0) head.y = canvas.height - box;

  // Game Over (collision with self)
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      clearInterval(game);
      alert("Game Over! Final Score: " + score);
      return;
    }
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = "Score: " + score;
    food = spawnFood();
    clearInterval(game);
    speed *= 0.95;
    game = setInterval(draw, speed);
  } else {
    snake.pop();
  }
}

let game = setInterval(draw, speed);

