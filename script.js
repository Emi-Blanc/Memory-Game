const gameBoard = document.querySelector('.game-board');
const winMessage = document.getElementById('winMessage');
const restartButton = document.getElementById('restartButton');
const timerElement = document.getElementById('timer');
const scoreboard = document.getElementById('scoreboard');

let currentSize = 16; // Taille de jeu par défaut
let firstCard = null;
let lockBoard = false;
let timer; // Référence au chronomètre
let timeElapsed = 0; // Temps écoulé
let scores = []; // Tableau des scores des 10 meilleurs joueurs

function startGame(size) {
 

  currentSize = size;
  timeElapsed = 0; // Réinitialise le temps
  updateTimer(); // Met à jour l'affichage du timer
  


  // Arrête l'ancien timer et lance un nouveau
  clearInterval(timer);
  timer = setInterval(() => {
    timeElapsed++;
    updateTimer();
  }, 1000);

  // Réinitialisation du jeu
  const emojiList = ['🧻', '🍌', '👹', '💩', '💋', '🥸', '🙀', '🤬', '🍑', '🔫', '🧮', '🎥', '📎', '🍥', '🥕', '🏰', '🪠', '🌈', '❤️', '🍆', '👾', '🐷', '🦄', '🍄', '🥜', '🦕', '🦜', '🧀', '🦷', '🧟', '🍕', '🎎'];
  const emojis = emojiList.slice(0, size / 2);
  const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

  gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(size)}, 1fr)`;
  gameBoard.innerHTML = '';
  cards.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = emoji;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });

  winMessage.style.display = 'none';
  restartButton.style.display = 'none';
}

function updateTimer() {
  timerElement.textContent = `Temps : ${timeElapsed}s`;
}

function handleCardClick(e) {
  const card = e.target;
  if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.value;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  checkForMatch(card);
}

function checkForMatch(card) {
  if (card.dataset.value === firstCard.dataset.value) {
    card.classList.add('hidden');
    firstCard.classList.add('hidden');
    showSparkles(card, firstCard);
    checkWin();
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      card.classList.remove('flipped');
      card.textContent = '';
      firstCard.classList.remove('flipped');
      firstCard.textContent = '';
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, lockBoard] = [null, false];
}

function showSparkles(card1, card2) {
  card1.innerHTML += '✨';
  card2.innerHTML += '✨';
}

function checkWin() {
  const allCards = document.querySelectorAll('.card');
  const hiddenCards = document.querySelectorAll('.card.hidden');
 

  if (allCards.length === hiddenCards.length) {
    clearInterval(timer); // Arrête le chronomètre
    winMessage.style.display = 'block';
    restartButton.style.display = 'block';
    updateScoreboard();
  }
  
}

function updateScoreboard() {
  scores.push(timeElapsed);
  scores.sort((a, b) => a - b); // Trie les scores par ordre croissant
  if (scores.length > 10) scores.pop(); // Garde seulement les 10 meilleurs scores

  scoreboard.innerHTML = `
    <h3>Top 10 Scores</h3>
    <ol>
      ${scores.map(score => `<li>${score}s</li>`).join('')}
    </ol>
  `;
  scoreboard.style.display = 'block';
}

function restartGame() {
  startGame(currentSize);
}

// Lancer le jeu avec la taille par défaut
startGame(16);



