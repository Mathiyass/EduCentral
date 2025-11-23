class SnakeGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.speed = 100;
        this.running = false;
        this.score = 0;

        this.snake = [];
        this.food = { x: 0, y: 0 };
        this.direction = 'right';
        this.nextDirection = 'right';

        this.bindControls();
    }

    init() {
        // Resize canvas to fit container
        const container = this.canvas.parentElement;
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.score = 0;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.spawnFood();
        this.running = true;
        this.loop();

        document.getElementById('game-score').innerText = this.score.toString().padStart(4, '0');
    }

    spawnFood() {
        this.food = {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
        };
        // Ensure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.spawnFood();
                return;
            }
        }
    }

    bindControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.running) return;

            switch(e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') this.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') this.nextDirection = 'down';
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') this.nextDirection = 'left';
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') this.nextDirection = 'right';
                    break;
            }
        });
    }

    update() {
        this.direction = this.nextDirection;

        const head = { ...this.snake[0] };

        switch(this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Wall Collision
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;
        }

        // Self Collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        // Eat Food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('game-score').innerText = this.score.toString().padStart(4, '0');
            this.spawnFood();
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // Clear background
        this.ctx.fillStyle = '#050505';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Grid (faint)
        this.ctx.strokeStyle = 'rgba(0, 255, 222, 0.05)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Draw Snake
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00FFDE';
        this.ctx.fillStyle = '#00FFDE';

        this.snake.forEach((segment, index) => {
            // Head is slightly different color
            if (index === 0) {
                this.ctx.fillStyle = '#FFFFFF';
            } else {
                this.ctx.fillStyle = '#00FFDE';
            }
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });

        // Draw Food
        this.ctx.shadowColor = '#FF0055';
        this.ctx.fillStyle = '#FF0055';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );

        this.ctx.shadowBlur = 0;
    }

    loop() {
        if (!this.running) return;

        this.update();
        this.draw();

        setTimeout(() => requestAnimationFrame(() => this.loop()), this.speed);
    }

    gameOver() {
        this.running = false;
        alert(`GAME OVER\nSCORE: ${this.score}`);
        app.games.exit();
    }

    stop() {
        this.running = false;
    }
}

// Register with App
if (window.app) {
    // If app is already loaded
    // We need to add a game manager logic to app.js first to support this cleanly
    // For now, I'll patch app.js logic in the verification step if needed,
    // or rely on global access since I didn't modularize with ES6 imports/exports heavily yet.
}

// Attach to global scope for the app to find
window.SnakeGame = SnakeGame;

// Update app.js to handle game loading
// I will need to inject this logic into app.js
