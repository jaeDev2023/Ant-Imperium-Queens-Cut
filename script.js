const ant = document.querySelector('.ant');

// Move the ant to a new position (e.g., 100px to the right, 50px down)
function moveAnt(x, y) {
    ant.style.transform = `translate(${x}px, ${y}px)`;
}

const map = document.getElementById('map');

// Grid dimensions
const rows = 20;
const cols = 20;

// Zone definitions
const foodZone = { startRow: 0, endRow: 3, startCol: 0, endCol: 5 };
const waterZone = { startRow: 0, endRow: 3, startCol: 6, endCol: 10 };
const wasteZone = { startRow: 16, endRow: 19, startCol: 0, endCol: 4 };

// Helper function to check if a cell is in a specific zone
function isInZone(row, col, zone) {
    return row >= zone.startRow && row <= zone.endRow && col >= zone.startCol && col <= zone.endCol;
}

// Populate the grid
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        // Assign zones
        if (isInZone(row, col, foodZone)) {
            cell.classList.add('food-zone');
        } else if (isInZone(row, col, waterZone)) {
            cell.classList.add('water-zone');
        } else if (isInZone(row, col, wasteZone)) {
            cell.classList.add('waste-zone');
        } else {
            cell.classList.add('landscape');
        }

        // Add the cell to the map
        map.appendChild(cell);
    }
}

// Slider functions
// Get the slider and value elements
const tempSlider = document.getElementById('tempSlider');
const tempValue = document.getElementById('tempValue');
const lightSlider = document.getElementById('lightSlider');
const lightValue = document.getElementById('lightValue')

// Update the value display when the slider is moved
tempSlider.addEventListener('input', () => {
    tempValue.textContent = tempSlider.value;
});

lightSlider.addEventListener('input', () => {
    lightValue.textContent = lightSlider.value;
});

// Health Bar
const healthBar = document.getElementById('healthBar');
const healthFill = document.getElementById('healthFill');
let health = 50;

// Buttons and sliders for resources
const foodSlider = document.getElementById('foodSlider');
const foodValue = document.getElementById('foodValue');
const addFood = document.getElementById('addFood');

const waterSlider = document.getElementById('waterSlider');
const waterValue = document.getElementById('waterValue');
const addWater = document.getElementById('addWater');

const wasteSlider = document.getElementById('wasteSlider');
const wasteValue = document.getElementById('wasteValue');
const removeWaste = document.getElementById('removeWaste');

function updateSlider(slider, value, increment) {
    slider.value = Math.min(Math.max(0, parseInt(slider.value) + increment), 100);
    value.textContent = slider.value;
}

// Buttons for Resources
addFood.addEventListener('click', () => {
    updateSlider(foodSlider, foodValue, 10);
    health = Math.min(100, health + 5)
    healthFill.style.width = `${health}%`;
});

addWater.addEventListener('click', () => {
    updateSlider(waterSlider, waterValue, 10);
    health = Math.min(100, health + 5);
    healthFill.style.width = `${health}%`;
})

removeWaste.addEventListener('click', () => {
    updateSlider(wasteSlider, wasteValue, -10);
    health = Math.min(100, health + 5);
    healthFill.style.width = `${health}%`;
})

// Ant functions
document.addEventListener('DOMContentLoaded', () => {
    function addAnt() {
        const map = document.getElementById('map');
        const ant = document.createElement('div');
        ant.classList.add('ant');
        map.appendChild(ant);

        // Initial position
        let x = 0;
        let y = 0;
        moveAnt(ant, x, y);
    }

    // Animate ant
    function moveAnt(ant, startX, startY) {
        let x = startX;
        let y = startY;

        const map = document.getElementById('map');
        const cellSize = map.clientWidth / 20; // Assuming 20x20 grid
        const moveInterval = setInterval(() => {
            x += cellSize / 2;
            y += cellSize / 2;

            // Boundary checks
            if (x >= map.clientWidth - cellSize || y >= map.clientHeight - cellSize) {
                clearInterval(moveInterval); // Stops ant at the boundary
            } else {
                ant.style.transform = `translate(${x}px, ${y}px)`;
            }
        }, 200); // Move every 200ms
    }

    // Add the ant on page load
    addAnt();
});
