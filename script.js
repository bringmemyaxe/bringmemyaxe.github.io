const poems = {
  en: `<p>Dreams come true, but beware what you seek,<br>
      For they may haunt you, make you weak.<br>
      Afraid to act, afraid to stay still,<br>
      A paradox, a never-ending uphill.</p>
      <p>A crowd of problems, a system to fight,<br>
      Against me, they stand, with all their might.<br>
      Death, the greatest enemy, I strive to delay,<br>
      But life's cruel joke, it'll come anyway.</p>
      <p>In this chaotic storm, I seek a guiding hand,<br>
      A lighthouse to lead me to a safer land.<br>
      Questions unspoken, answers unknown,<br>
      A journey through darkness, I walk alone.</p>
      <p>Yet, in this vast sea of uncertainty,<br>
      I long to find a moment of clarity.<br>
      A beacon of hope, a ray of light,<br>
      To guide me through this eternal night.</p>`,
  uz: `<p>Orzular ro'yobga chiqadi, lekin nimani izlayotganingizdan ehtiyot bo'ling,<br>
      Chunki ular sizni ta'qib qilishi, sizni zaiflashtirishi mumkin.<br>
      Harakat qilishdan qo'rqish, joyida qolishdan qo'rqish,<br>
      Bir paradoks, hech qachon tugamaydigan bir nishab.</p>
      <p>Muammolar to'dasi, kurashadigan bir tizim,<br>
      Ular menga qarshi turishadi, butun kuchlari bilan.<br>
      O'lim, eng katta dushman, men uni kechiktirishga intilaman,<br>
      Lekin hayotning shafqatsiz hazili, u baribir keladi.</p>
      <p>Bu tartibsiz bo'ron ichida, men yo'l ko'rsatuvchi qo'l izlayman,<br>
      Meni xavfsizroq bir yerga olib boradigan mayoq.<br>
      Aytilmagan savollar, noma'lum javoblar,<br>
      Zulmat ichida sayohat, men yolg'iz yuraman.</p>
      <p>Lekin, bu noaniqlik dengizida,<br>
      Men aniqlik lahzasini topishni orzu qilaman.<br>
      Umid mayoqi, nurli bir nur,<br>
      Meni bu abadiy tun ichidan olib o'tadigan.</p>`,
  ru: `<p>Мечты сбываются, но остерегайся того, что ищешь,<br>
      Они могут преследовать тебя, ослаблять.<br>
      Боишься действовать, боишься оставаться на месте,<br>
      Парадокс, бесконечный подъем.</p>
      <p>Толпа проблем, система для борьбы,<br>
      Против меня они стоят, со всей своей мощью.<br>
      Смерть, величайший враг, я стремлюсь отсрочить,<br>
      Но жестокая шутка жизни, она все равно придет.</p>
      <p>В этом хаотичном шторме я ищу направляющую руку,<br>
      Маяк, чтобы привести меня в безопасное место.<br>
      Неозвученные вопросы, неизвестные ответы,<br>
      Путешествие во тьме, я иду один.</p>
      <p>Но в этом огромном море неопределенности,<br>
      Я стремлюсь найти момент ясности.<br>
      Свет надежды, луч света,<br>
      Чтобы вести меня через эту вечную ночь.</p>`
};

function changeLanguage(language) {
  const poem = document.getElementById('poem');
  poem.innerHTML = poems[language];
}

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
