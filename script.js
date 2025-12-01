const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 200, y: 200 }];
let dx = grid;
let dy = 0;
let food = randomFood();
let score = 0;

function gameLoop() {
    if (hitWall() || hitSelf()) {
        alert("Game Over! Skor: " + score);
        document.location.reload();
        return;
    }

    moveSnake();

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    draw();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
}

function hitWall() {
    return (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    );
}

function hitSelf() {
    return snake.slice(1).some(seg => seg.x === snake[0].x && seg.y === snake[0].y);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * grid,
        y: Math.floor(Math.random() * 20) * grid
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    snake.forEach(seg => ctx.fillRect(seg.x, seg.y, grid, grid));

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid, grid);
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
});

setInterval(gameLoop, 100);
