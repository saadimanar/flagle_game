import React from 'react'

function Hints(){

    function updateTable(guess, distance) {
        const tableBody = document.getElementById('guessesTable').getElementsByTagName('tbody')[0];
        const newRow = tableBody.insertRow();
        const guessCell = newRow.insertCell(0);
        const distanceCell = newRow.insertCell(1);
        guessCell.innerHTML = guess;
        distanceCell.innerHTML = distance.toFixed(2) + ' km';
    } 
    
    return(
        <div class="table-container">
        <table id="guessesTable">
            <thead>
                <tr>
                    <th>Guess</th>
                    <th>Distance (km)</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    );
}

export default Hints;