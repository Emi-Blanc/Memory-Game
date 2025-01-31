let emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🐯', '🦁', '🐷', '🐮', '🐔', '🐧', '🐙', '🦄'];
        let currentSize = 16;
        let firstCard, secondCard;
        let lockBoard = false;
        let matches = 0;
        let timer;
        let timeElapsed = 0;
        
        function startGame(size) {
            currentSize = size;
            let board = document.getElementById("game-board");
            board.innerHTML = "";
            document.getElementById("message").style.display = "none";
            document.getElementById("restart").style.display = "none";
            matches = 0;
            firstCard = secondCard = null;
            lockBoard = false;
            clearInterval(timer);
            timeElapsed = 0;
            document.getElementById("timer").innerText = timeElapsed;
            timer = setInterval(() => {
                timeElapsed++;
                document.getElementById("timer").innerText = timeElapsed;
            }, 1000);
            
            let pairs = emojis.slice(0, size / 2);
            let gameEmojis = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
            
            board.style.gridTemplateColumns = `repeat(${Math.sqrt(size)}, 1fr)`;
            
            gameEmojis.forEach(emoji => {
                let card = document.createElement("div");
                card.classList.add("card");
                card.dataset.emoji = emoji;
                card.onclick = flipCard;
                board.appendChild(card);
            });
        }
        
        function flipCard() {
            if (lockBoard || this.classList.contains("flipped")) return;
            this.innerText = this.dataset.emoji;
            this.classList.add("flipped");
            
            if (!firstCard) {
                firstCard = this;
                return;
            }
            secondCard = this;
            lockBoard = true;
            
            if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
                firstCard.classList.add("hidden");
                secondCard.classList.add("hidden");
                matches++;
                if (matches === currentSize / 2) endGame();
                resetBoard();
            } else {
                setTimeout(() => {
                    firstCard.innerText = "";
                    secondCard.innerText = "";
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    resetBoard();
                }, 1000);
            }
        }
        
        function resetBoard() {
            firstCard = secondCard = null;
            lockBoard = false;
        }
        
        function endGame() {
            clearInterval(timer);
            document.getElementById("message").innerHTML = "🎉🌟 Bravo, tu es le GOAT ! 🌟🎉";
            document.getElementById("message").style.display = "block";
            document.getElementById("restart").style.display = "inline-block";
        }