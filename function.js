const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 100);
}

function update() {
  // Move snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Game over conditions
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Score: " + score);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    updateScore();
    return;
  }

  snake.unshift(head);

  // Apple eaten?
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    updateScore();
    placeApple();
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
for (let i = 0; i < snake.length; i++) {
  ctx.fillStyle = (i === 0) ? "limegreen" : "green";
  ctx.fillRect(snake[i].x, snake[i].y, box, box);
}

// Draw food
ctx.fillStyle = "red";
ctx.fillRect(food.x, food.y, box, box);

function placeApple() {
  apple.x = Math.floor(Math.random() * tileCount);
  apple.y = Math.floor(Math.random() * tileCount);
}

function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -1 }; break;
    case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (direction.x === 0) direction = { x: -1, y: 0 }; break;
    case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
  }
});

gameLoop();
// Initialize apple position
placeApple();   
//Game loop
setInterval(draw, 150)
