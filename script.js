 const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');

        let ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            dx: 2,
            dy: -2,
            radius: 10
        };

        const paddleHeight = 10;
        const paddleWidth = 100;
        const paddleSpeed = 10;
        let leftPaddleX = canvas.width / 2 - paddleWidth / 2;

        let playerScore = 0;

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.fillRect(leftPaddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        }

        function drawWalls() {
            ctx.fillRect(0, 0, canvas.width, 2); 
            ctx.fillRect(0, canvas.height - 2, canvas.width, 2);
            ctx.fillRect(0, 0, 2, canvas.height);
            ctx.fillRect(canvas.width - 2, 0, 2, canvas.height); 
        }

        function update() {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvas.height) {
                ball.dy = -ball.dy;
            }

            if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width) {
                ball.dx = -ball.dx;
            }

            if (ball.x - ball.radius <= leftPaddleX + paddleWidth && ball.x + ball.radius >= leftPaddleX &&
                ball.y + ball.radius >= canvas.height - paddleHeight) {
                ball.dy = -ball.dy;
                playerScore++;
            }

            if (ball.y + ball.radius >= canvas.height) {
                endGame();
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            drawWalls();
            drawScore();
        }

        function drawScore() {
            ctx.font = "24px Arial";
            ctx.fillText(`Player Score: ${playerScore}`, 10, 30);
        }

        function endGame() {
            alert(`Game Over! Your score: ${playerScore}`);
            document.location.reload();
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && leftPaddleX > 0) {
                leftPaddleX -= paddleSpeed;
            } else if (event.key === 'ArrowRight' && leftPaddleX < canvas.width - paddleWidth) {
                leftPaddleX += paddleSpeed;
            }
        });

        gameLoop();