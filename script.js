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

// Update the value display when the slider is moved
tempSlider.addEventListener('input', function () {
    tempValue.textContent = tempSlider.value; // Display the current value
});




// Example: Moving the ant
// moveAnt(100, 100); // Moves the ant to (100px, 50px)
