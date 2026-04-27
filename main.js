// main.js

// Edit this file to add any necessary functions or code to complete the assignment.

// Hint: The "hints/" directory contains more JavaScript hints, including function suggestions.

function setupNumberButton(numberButton) {

    numberButton.addEventListener('click', function () {
    
        alert('Button was clicked! ' + numberButton.textContent);
        console.log(numberButton);

    });

}
function setupNumberButton(numberButton) {
    numberButton.addEventListener('click', function () {
        const clickedValue = parseInt(numberButton.getAttribute('data-value'));
        const td = numberButton.parentElement;
        const tr = td.parentElement;
        const colIndex = td.cellIndex;
        const rowIndex = tr.rowIndex;

        const matches = findAdjacentMatches(rowIndex, colIndex, clickedValue);

        const totalCount = matches.length + 1;

        if (totalCount >= 3) {
			
            const sumValue = clickedValue * totalCount;

            matches.forEach(matchTd => {
                matchTd.innerHTML = '&nbsp;'; 
                matchTd.className = 'Tile Tile--empty';
            });

            numberButton.setAttribute('data-value', sumValue);
            numberButton.textContent = sumValue;
            
            console.log(`Matched ${totalCount} blocks. New value: ${sumValue}`);
        } else {
            console.log("No match: Cluster smaller than 3.");
        }
    });
}

function findAdjacentMatches(row, col, value) {
    const table = document.querySelector('#app table');
    const matches = [];

    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];

    directions.forEach(([dr, dc]) => {
        const neighborRow = table.rows[row + dr];
        if (neighborRow) {
            const neighborTd = neighborRow.cells[col + dc];
            if (neighborTd) {
                const neighborButton = neighborTd.querySelector('.Tile--number');
                if (neighborButton) {
                    const neighborValue = parseInt(neighborButton.getAttribute('data-value'));

                    if (neighborValue === value) {
                        matches.push(neighborTd);
                    }
                }
            }
        }
    });

    return matches;
}

console.log('Main.js loaded!');
