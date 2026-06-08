let plantCount = 0;
let score = 0;

const field = document.getElementById('field');
const plantBtn = document.getElementById('plant-btn');
const plantCountDisplay = document.getElementById('plant-count');
const scoreDisplay = document.getElementById('score');

plantBtn.addEventListener('click', () => {
    plantCount++;
    updatePlantCount();

    const plant = document.createElement('div');
    plant.classList.add('plant');
    plant.textContent = '🌱';
    field.appendChild(plant);

    // Crescimento da planta
    setTimeout(() => {
        plant.classList.add('ready');
        plant.textContent = '🌿';
    }, 3000); // Cresce em 3 segundos

    // Colher planta
    plant.addEventListener('click', () => {
        if (plant.classList.contains('ready')) {
            score += 10;
            scoreDisplay.textContent = score;
            field.removeChild(plant);
            plantCount--;
            updatePlantCount();
        } else {
            alert('A planta ainda não está pronta!');
        }
    });

    // Praga aparece
    setTimeout(() => {
        if (field.contains(plant)) {
            plant.textContent = '🐛';
            plant.style.backgroundColor = '#a93226';
            plant.removeEventListener('click', null);
            plantCount--;
            updatePlantCount();
        }
    }, 8000); // Praga em 8 segundos
});

function updatePlantCount() {
    plantCountDisplay.textContent = plantCount;
}