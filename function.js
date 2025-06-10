const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");
const box = 32;

let direction = "RIGHT"; // start moving right
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};
let game;

window.onload = () => {
  game = setInterval(draw, 150); // Start game automatically
};


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

let game; // Declare this near top
let started = false; // Track game state

document.addEventListener("keydown", event => {
  if (!started) {
    started = true;
    game = setInterval(draw, 150); // Start game only once
  }

  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

  }
});

gameLoop();
// Initialize apple position
placeApple();   
//Game loop
setInterval(draw, 150)
