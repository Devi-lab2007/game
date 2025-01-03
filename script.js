const gameCanvas = document.getElementById('gameCanvas');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
let score = 0;
let player;
let obstacles = [];
let gameInterval;

function startGame() {
    score = 0;
    obstacles = [];
    player = createPlayer();
    scoreDisplay.innerText = `Score: ${score}`;
    startBtn.style.display = 'none';

    gameInterval = setInterval(updateGame, 100);
    spawnObstacle();
}

function createPlayer() {
    const newPlayer = document.createElement('div');
    newPlayer.className = 'player';
    gameCanvas.appendChild(newPlayer);
    return newPlayer;
}

function spawnObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.width = Math.random() * 100 + 'px';
    obstacle.style.height = '20px';
    obstacle.style.background = 'red'; // Obstacle color
    obstacle.style.position = 'absolute';
    obstacle.style.left = Math.random() * (gameCanvas.clientWidth - 100) + 'px';
    obstacle.style.top = '0px';
    gameCanvas.appendChild(obstacle);
    obstacles.push(obstacle);
}

function updateGame() {
    moveObstacles();
    checkCollision();
    score++;
    scoreDisplay.innerText = `Score: ${score}`;

    if (score % 100 === 0) {
        spawnObstacle();
    }
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        const currentTop = parseInt(obstacle.style.top);
        obstacle.style.top = (currentTop + 5) + 'px';

        if (currentTop > gameCanvas.clientHeight) {
            obstacle.remove();
            obstacles.splice(index, 1);
        }
    });
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        if (!(playerRect.right < obstacleRect.left || 
              playerRect.left > obstacleRect.right || 
              playerRect.bottom < obstacleRect.top || 
              playerRect.top > obstacleRect.bottom)) {
            endGame();
        }
    });
}

function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is: ${score}`);
    startBtn.style.display = 'block';
    gameCanvas.innerHTML = '';
}

document.getElementById('startBtn').addEventListener('click', startGame);
