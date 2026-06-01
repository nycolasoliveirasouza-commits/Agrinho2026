// Seleção de elementos do HTML
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');

// Variáveis de controle do estado do jogo
let score = 0;
let timeLeft = 30;
let gameInterval;
let starTimer;

// Ouvintes de clique para iniciar/reiniciar
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', startGame);

function startGame() {
    // Resetar variáveis
    score = 0;
    timeLeft = 30;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;

    // Esconder telas de menu
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    // Limpar estrelas antigas que possam ter ficado na tela
    document.querySelectorAll('.star').forEach(star => star.remove());

    // Iniciar cronômetro do jogo (executa a cada 1 segundo)
    gameInterval = setInterval(updateTime, 1000);

    // Começar a gerar estrelas
    spawnStar();
}

function updateTime() {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function spawnStar() {
    // Se o tempo acabou, não gera novas estrelas
    if (timeLeft <= 0) return;

    // Criar o elemento da estrela
    const star = document.createElement('div');
    star.classList.add('star');
    star.innerText = '⭐';

    // Calcular posições aleatórias dentro da área do jogo (descontando o tamanho da estrela)
    const areaWidth = gameArea.clientWidth - 40;
    const areaHeight = gameArea.clientHeight - 40;
    
    const randomX = Math.floor(Math.random() * areaWidth);
    const randomY = Math.floor(Math.random() * areaHeight);

    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;

    // Evento de clique na estrela
    star.addEventListener('mousedown', () => {
        score++;
        scoreDisplay.innerText = score;
        star.remove(); // Remove a estrela clicada imediatamente
        clearTimeout(starTimer); // Cancela o sumiço automático agendado
        spawnStar(); // Spawna a próxima estrela imediatamente
    });

    // Adicionar a estrela na tela
    gameArea.appendChild(star);

    // Fazer a estrela sumir sozinha e aparecer em outro lugar se o jogador demorar (800ms)
    starTimer = setTimeout(() => {
        star.remove();
        spawnStar();
    }, 800); 
}

function endGame() {
    // Parar todos os contadores
    clearInterval(gameInterval);
    clearTimeout(starTimer);

    // Mostrar tela de fim de jogo e pontuação final
    finalScoreDisplay.innerText = score;
    gameOverScreen.style.display = 'flex';
}