const tiles = document.querySelectorAll('.grid-item');
const startButton = document.getElementById('start-button');
let sequence = [];
let playerSequence = [];
let level = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.disabled = true;
    sequence = [];
    playerSequence = [];
    level = 0;
    nextLevel();
}

function nextLevel() {
    level++;
    playerSequence = [];
    sequence.push(Math.floor(Math.random() * 9));
    showSequence();
}

function showSequence() {
    let delay = 500;
    sequence.forEach((tile, index) => {
        setTimeout(() => {
            activateTile(tile);
            setTimeout(() => deactivateTile(tile), 300);
        }, delay * (index + 1));
    });
    setTimeout(() => enablePlayerInput(), delay * sequence.length + 500);
}

function activateTile(tile) {
    tiles[tile].classList.add('active');
}

function deactivateTile(tile) {
    tiles[tile].classList.remove('active');
}

function enablePlayerInput() {
    tiles.forEach(tile => tile.addEventListener('click', handleTileClick));
}

function disablePlayerInput() {
    tiles.forEach(tile => tile.removeEventListener('click', handleTileClick));
}

function handleTileClick(event) {
    const clickedTile = Array.from(tiles).indexOf(event.target);
    playerSequence.push(clickedTile);

    // 클릭 시 타일 활성화
    activateTile(clickedTile);
    setTimeout(() => deactivateTile(clickedTile), 300);

    if (sequence[playerSequence.length - 1] !== clickedTile) {
        gameOver();
        return;
    }

    if (playerSequence.length === sequence.length) {
        disablePlayerInput();
        setTimeout(nextLevel, 1000);
    }
}

function gameOver() {
    alert('틀렸어요! 다시 한 번 해볼까요 ? ' + level);
    startButton.disabled = false;
}
