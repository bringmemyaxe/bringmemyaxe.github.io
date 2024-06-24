let gameInterval;
let blockInterval;
let score = 0;
let player;
let game;
let playerSpeed = 5;
let blockSpeed = 2;
let blockFrequency = 1000; // milliseconds
let gameDuration = 30000; // 30 seconds
let isGameOver = false;

function startGame() {
  game = document.getElementById('game');
  game.innerHTML = '';
  score = 0;
  isGameOver = false;

  player = document.createElement('div');
  player.classList.add('player');
  game.appendChild(player);
  player.style.left = (game.clientWidth / 2 - 20) + 'px';
  player.style.bottom = '10px';

  document.addEventListener('keydown', movePlayer);
  setupTouchControls();

  blockInterval = setInterval(createBlock, blockFrequency);

  gameInterval = setTimeout(() => {
    endGame();
  }, gameDuration);
}

function movePlayer(event) {
  let playerLeft = parseInt(player.style.left);
  if (event.key === 'ArrowLeft' && playerLeft > 0) {
    player.style.left = playerLeft - playerSpeed + 'px';
  }
  if (event.key === 'ArrowRight' && playerLeft < game.clientWidth - 40) {
    player.style.left = playerLeft + playerSpeed + 'px';
  }
}

function setupTouchControls() {
  let touchArea = document.createElement('div');
  touchArea.classList.add('touch-area');
  game.appendChild(touchArea);

  touchArea.addEventListener('touchstart', handleTouch);
  touchArea.addEventListener('touchmove', handleTouch);
}

function handleTouch(event) {
  event.preventDefault();
  let touch = event.touches[0];
  let touchX = touch.clientX - game.offsetLeft;
  let playerWidth = player.offsetWidth;
  
  if (touchX < game.clientWidth - playerWidth / 2 && touchX > playerWidth / 2) {
    player.style.left = (touchX - playerWidth / 2) + 'px';
  }
}

function createBlock() {
  const block = document.createElement('div');
  block.classList.add('block');
  block.style.left = Math.random() * (game.clientWidth - 20) + 'px';
  block.style.top = '0px';
  game.appendChild(block);

  let fallingInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(fallingInterval);
      return;
    }

    let blockTop = parseInt(block.style.top);
    if (blockTop < game.clientHeight - 20) {
      block.style.top = blockTop + blockSpeed + 'px';
      checkCollision(block, fallingInterval);
    } else {
      game.removeChild(block);
      clearInterval(fallingInterval);
      score++;
    }
  }, 20);
}

function checkCollision(block, fallingInterval) {
  let blockRect = block.getBoundingClientRect();
  let playerRect = player.getBoundingClientRect();

  if (
    blockRect.left < playerRect.right &&
    blockRect.right > playerRect.left &&
    blockRect.bottom > playerRect.top &&
    blockRect.top < playerRect.bottom
  ) {
    clearInterval(fallingInterval);
    endGame();
  }
}

function endGame() {
  clearInterval(blockInterval);
  clearTimeout(gameInterval);
  isGameOver = true;
  alert(`Game Over! Final Score: ${score}`);
}
