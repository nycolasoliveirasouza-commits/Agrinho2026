// Estado do Jogo
let followers = 0;
let ecoPoints = 10;
let co2Saved = 0;

// Multiplicadores e Upgrades
let clickPower = 1;
let autoFollowersPerSecond = 0;
let co2Multiplier = 1;

let costSolar = 15;
let costBot = 50;
let costCampaign = 150;

// Elementos HTML
const txtFollowers = document.getElementById('followers');
const txtEcoPoints = document.getElementById('eco-points');
const txtCo2Saved = document.getElementById('co2-saved');
const feedArea = document.getElementById('feed-area');

// Botões de upgrade
const btnSolar = document.getElementById('btn-upgrade-solar');
const btnBot = document.getElementById('btn-upgrade-bot');
const btnCampaign = document.getElementById('btn-upgrade-campaign');

// Elementos do Modal de Eventos
const eventOverlay = document.getElementById('event-overlay');
const choice1 = document.getElementById('choice-1');
const choice2 = document.getElementById('choice-2');

// Mecânica 1: Publicar posts (Gera Eco-points e Seguidores)
function publishPost(type) {
    let title = "";
    let content = "";
    let followersGained = Math.floor(Math.random() * 15) + 5;
    let co2Gained = 0;

    switch(type) {
        case 'tree':
            title = "🌳 Desafio de Reflorestamento Urbano!";
            content = "Acabamos de plantar 50 novas mudas nativas no parque central. Menos asfalto, mais oxigênio!";
            co2Gained = 12 * co2Multiplier;
            break;
        case 'solar':
            title = "☀️ Energia Limpa em Casa";
            content = "Instalar painéis solares reduz em até 95% a conta de luz e corta o uso de usinas termoelétricas poluentes.";
            co2Gained = 25 * co2Multiplier;
            break;
        case 'recycle':
            title = "♻️ Guia Definitivo da Coleta Seletiva";
            content = "Lavar as embalagens plásticas antes de descartar ajuda as cooperativas e aumenta a reciclagem real!";
            co2Gained = 8 * co2Multiplier;
            break;
    }

    // Atualiza pontuação
    ecoPoints += clickPower;
    followers += followersGained;
    co2Saved += co2Gained;
    updateUI();

    // Insere o post no início do feed
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    postCard.innerHTML = `
        <h4>${title}</h4>
        <p>${content}</p>
        <div class="post-meta">💚 Engajamento: +${followersGained} novos seguidores | 🌍 CO₂ evitado: ${co2Gained}kg</div>
    `;
    
    feedArea.insertBefore(postCard, feedArea.firstChild);

    // Chance de 15% de gerar uma fake news / greenwashing após postar
    if(Math.random() < 0.15) {
        setTimeout(triggerGreenwashingEvent, 1000);
    }
}

// Mecânica 2: Lógica de Compra de Upgrades
btnSolar.addEventListener('click', () => {
    if (ecoPoints >= costSolar) {
        ecoPoints -= costSolar;
        clickPower += 1;
        costSolar = Math.floor(costSolar * 1.5);
        btnSolar.innerText = `Comprar (Preço: ${costSolar}🌱)`;
        updateUI();
        addSystemLog("☀️ Sistema Solar atualizado! Seus cliques agora dão mais Eco-Points.");
    } else {
        alert("Eco-Points insuficientes! Publique mais posts ecológicos.");
    }
});

btnBot.addEventListener('click', () => {
    if (ecoPoints >= costBot) {
        ecoPoints -= costBot;
        autoFollowersPerSecond += 2;
        costBot = Math.floor(costBot * 1.6);
        btnBot.innerText = `Contratar (Preço: ${costBot}🌱)`;
        updateUI();
        addSystemLog("🤖 Eco-Bot Moderador ativo! Limpando spam e trazendo novos seguidores.");
    } else {
        alert("Eco-Points insuficientes!");
    }
});

btnCampaign.addEventListener('click', () => {
    if (ecoPoints >= costCampaign) {
        ecoPoints -= costCampaign;
        co2Multiplier += 1;
        costCampaign = Math.floor(costCampaign * 1.8);
        btnCampaign.innerText = `Lançar (Preço: ${costCampaign}🌱)`;
        updateUI();
        addSystemLog("📢 Campanha Global lançada! Consciência ecológica multiplicada.");
    } else {
        alert("Eco-Points insuficientes!");
    }
});

// Mecânica 3: Loop Automático (Moderação de Bots gerando seguidores por segundo)
setInterval(() => {
    if (autoFollowersPerSecond > 0) {
        followers += autoFollowersPerSecond;
        updateUI();
    }
}, 1000);

// Auxiliares: Atualizar Dados na Tela
function updateUI() {
    txtFollowers.innerText = followers;
    txtEcoPoints.innerText = ecoPoints;
    txtCo2Saved.innerText = co2Saved;
}

function addSystemLog(message) {
    const logCard = document.createElement('div');
    logCard.classList.add('post-card');
    logCard.style.borderLeft = "5px solid #2e7d32";
    logCard.innerHTML = `<h4>⚙️ Atualização do Sistema</h4><p>${message}</p>`;
    feedArea.insertBefore(logCard, feedArea.firstChild);
}

// Mecânica 4: Evento Randômico de Tomada de Decisão (Crise Ecológica)
function triggerGreenwashingEvent() {
    eventOverlay.classList.add('active');

    choice1.onclick = () => {
        // Opção Severa
        if(ecoPoints >= 10) { ecoPoints -= 10; } else { ecoPoints = 0; }
        followers += 150;
        addSystemLog("🛡️ Você baniu a marca fraudulenta! A comunidade amou sua postura ética e você ganhou +150 seguidores.");
        eventOverlay.classList.remove('active');
        updateUI();
    };

    choice2.onclick = () => {
        // Opção Capitalista
        ecoPoints += 30;
        if(followers >= 50) { followers -= 50; } else { followers = 0; }
        addSystemLog("💰 Você aplicou uma multa alternativa de créditos. Você ganhou +30 Eco-Points, mas alguns usuários saíram em protesto (-50 seguidores).");
        eventOverlay.classList.remove('active');
        updateUI();
    };
}