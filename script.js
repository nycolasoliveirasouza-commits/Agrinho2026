// Estado do Jogo
let gameState = {
    coins: 0,
    cps: 0, // Moedas por segundo
    ecoBonus: 100, // Porcentagem de sustentabilidade
    upgrades: {
        irrigation: { count: 0, cost: 15, power: 1 },
        solar: { count: 0, cost: 100, power: 5 },
        bio: { count: 0, cost: 500, power: 25 },
        drone: { count: 0, cost: 3000, power: 100 }
    }
};

// Elementos do DOM
const coinsDisplay = document.getElementById('coins');
const cpsDisplay = document.getElementById('cps');
const ecoDisplay = document.getElementById('eco-points');

const harvestBtn = document.getElementById('harvest-btn');

const btnIrrigation = document.getElementById('buy-irrigation');
const costIrrigation = document.getElementById('cost-irrigation');

const btnSolar = document.getElementById('buy-solar');
const costSolar = document.getElementById('cost-solar');

const btnBio = document.getElementById('buy-bio');
const costBio = document.getElementById('cost-bio');

const btnDrone = document.getElementById('buy-drone');
const costDrone = document.getElementById('cost-drone');

// Função para atualizar a interface
function updateDisplay() {
    coinsDisplay.innerText = Math.floor(gameState.coins);
    cpsDisplay.innerText = gameState.cps;
    ecoDisplay.innerText = gameState.ecoBonus;

    // Gerenciar se os botões podem ser clicados ou não
    btnIrrigation.disabled = gameState.coins < gameState.upgrades.irrigation.cost;
    costIrrigation.innerText = gameState.upgrades.irrigation.cost;

    btnSolar.disabled = gameState.coins < gameState.upgrades.solar.cost;
    costSolar.innerText = gameState.upgrades.solar.cost;

    btnBio.disabled = gameState.coins < gameState.upgrades.bio.cost;
    costBio.innerText = gameState.upgrades.bio.cost;

    btnDrone.disabled = gameState.coins < gameState.upgrades.drone.cost;
    costDrone.innerText = gameState.upgrades.drone.cost;
}

// Clique manual para colher
harvestBtn.addEventListener('click', () => {
    gameState.coins += 1;
    updateDisplay();
});

// Função genérica para comprar melhorias
function buyUpgrade(type) {
    let upgrade = gameState.upgrades[type];
    if (gameState.coins >= upgrade.cost) {
        gameState.coins -= upgrade.cost;
        upgrade.count++;
        gameState.cps += upgrade.power;
        
        // Aumenta o custo em 15% para a próxima compra
        upgrade.cost = Math.floor(upgrade.cost * 1.15);
        
        // Bônus mecânico de sustentabilidade visual
        gameState.ecoBonus = Math.min(100 + (upgrade.count * 2), 200); 

        updateDisplay();
    }
}

// Eventos de clique dos botões da loja
btnIrrigation.addEventListener('click', () => buyUpgrade('irrigation'));
btnSolar.addEventListener('click', () => buyUpgrade('solar'));
btnBio.addEventListener('click', () => buyUpgrade('bio'));
btnDrone.addEventListener('click', () => buyUpgrade('drone'));

// Loop do jogo (Roda a cada 1 segundo)
setInterval(() => {
    gameState.coins += (gameState.cps * (gameState.ecoBonus / 100));
    updateDisplay();
}, 1000);

// Inicialização
updateDisplay();