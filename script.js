
    const gameBoard = document.querySelector('.game-board');
    const winMessage = document.getElementById('winMessage');
    const restartButton = document.getElementById('restartButton');
    let currentSize = 16; // Taille de jeu par défaut

    function startGame(size) {
      currentSize = size;
      // List of emojis
      const emojiList = ['🧻', '🍌', '👹', '💩', '💋', '🥸', '🙀', '🤬', '🍑', '🔫', '🧮', '🎥', '📎', '🍥', '🥕', '🏰', '🪠', '🌈', '❤️', '🍆', '👾', '🐷', '🦄', '🍄', '🥜', '🦕', '🦜', '🧀', '🦷', '🧟', '🍕', '🎎'];
      const emojis = emojiList.slice(0, size / 2); // Ajustement de la taille de l'emoji list
      const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

      // Set grid columns for a square grid
      gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(size)}, 1fr)`;
      gameBoard.innerHTML = '';

      // Create cards
      cards.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = emoji;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
      });

      // Hide win message and restart button initially
      winMessage.style.display = 'none';
      restartButton.style.display = 'none';
    }

    let firstCard = null;
    let lockBoard = false;

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
        winMessage.style.display = 'block';
        restartButton.style.display = 'block'; // Affiche le bouton recommencer
      }
    }

    function restartGame() {
      startGame(currentSize); // Relance le jeu avec la même taille
    }

    // Start with default size
    startGame(16);
 