document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartButton = document.getElementById('restart-button');
    const symbols = 'AABBCCDDEEFFGGHH'.split('');
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    function initGame() {
        cards = symbols
            .map(symbol => ({
                symbol,
                id: Math.random().toString(36).substr(2, 9)
            }))
            .sort(() => Math.random() - 0.5);

        board.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        createBoard();
        showAllCardsTemporarily();
    }

    function createBoard() {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.symbol = card.symbol;
            cardElement.textContent = card.symbol; // 모든 카드의 내용을 처음에 표시
            cardElement.addEventListener('click', flipCard);
            board.appendChild(cardElement);
        });
    }

    function showAllCardsTemporarily() {
        const cardElements = document.querySelectorAll('.card');
        setTimeout(() => {
            cardElements.forEach(cardElement => {
                cardElement.classList.remove('flipped');
                cardElement.textContent = ''; // 카드의 내용을 제거
            });
        }, 5000); // 10초 동안 모든 카드를 보여줌
    }

    function flipCard() {
        const cardElement = this;
        const id = cardElement.dataset.id;
        const symbol = cardElement.dataset.symbol;

        if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && !matchedCards.includes(id)) {
            cardElement.classList.add('flipped');
            cardElement.textContent = symbol;
            flippedCards.push({ id, symbol, element: cardElement });

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;

        if (firstCard.symbol === secondCard.symbol) {
            matchedCards.push(firstCard.id, secondCard.id);
            flippedCards = [];
        } else {
            setTimeout(() => {
                firstCard.element.classList.remove('flipped');
                secondCard.element.classList.remove('flipped');
                firstCard.element.textContent = '';
                secondCard.element.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
    
        if (firstCard.symbol === secondCard.symbol) {
            matchedCards.push(firstCard.id, secondCard.id);
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                setTimeout(() => {
                    alert("축하합니다! 모든 카드를 맞추셨습니다!");
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.element.classList.remove('flipped');
                secondCard.element.classList.remove('flipped');
                firstCard.element.textContent = '';
                secondCard.element.textContent = '';
                flippedCards = [];
            }, 1000);
        }
    }
    

    restartButton.addEventListener('click', initGame);

    initGame();
});
