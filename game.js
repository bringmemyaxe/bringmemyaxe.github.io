let gameInterval;
let score = 0;

function startGame() {
  const game = document.getElementById('game');
  game.innerHTML = '';
  score = 0;

  gameInterval = setInterval(() => {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * (game.clientWidth - 20) + 'px';
    star.style.top = '0px';
    game.appendChild(star);

    let fallingInterval = setInterval(() => {
      let starTop = parseInt(star.style.top);
      if (starTop < game.clientHeight - 20) {
        star.style.top = starTop + 2 + 'px';
      } else {
        game.removeChild(star);
        clearInterval(fallingInterval);
      }
    }, 20);

    star.addEventListener('click', () => {
      score++;
      game.removeChild(star);
      clearInterval(fallingInterval);
      alert(`Score: ${score}`);
    });
  }, 1000);

  setTimeout(() => {
    clearInterval(gameInterval);
    alert(`Game Over! Final Score: ${score}`);
  }, 30000); // 30 seconds game duration
}
