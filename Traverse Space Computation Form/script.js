let initialX = 460.901;
let initialY = 782.820;
let traverseData = [];

function bearingToDegrees(bearing) {
    const parts = bearing.split('-').map(part => parseFloat(part));
    return parts[0] + (parts[1] / 60) + (parts[2] / 3600);
}

function addTraverseData() {
    const station = document.getElementById('station').value.trim();
    const bearing = document.getElementById('bearing').value.trim();
    const distance = parseFloat(document.getElementById('distance').value.trim());

    if (!station || !bearing || isNaN(distance)) {
        alert("Please enter valid data for all fields!");
        return;
    }

    const bearingDegrees = bearingToDegrees(bearing);
    const bearingInRadians = bearingDegrees * (Math.PI / 180);

    const deltaN = distance * Math.cos(bearingInRadians);
    const deltaE = distance * Math.sin(bearingInRadians);

    const newX = initialX + deltaE;
    const newY = initialY + deltaN;

    const traverseRow = {
        station: station,
        bearing: bearing,
        distance: distance,
        deltaN: deltaN.toFixed(3),
        deltaE: deltaE.toFixed(3),
        northings: newY.toFixed(3),
        eastings: newX.toFixed(3),
    };
    traverseData.push(traverseRow);

    initialX = newX;
    initialY = newY;

    updateTraverseTable();
}

function updateTraverseTable() {
    const tableBody = document.querySelector('#traverseTable tbody');
    tableBody.innerHTML = '';

    traverseData.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.station}</td>
            <td>${data.bearing}</td>
            <td>${data.distance}</td>
            <td>${data.deltaN}</td>
            <td>${data.deltaE}</td>
            <td>${data.northings}</td>
            <td>${data.eastings}</td>
            <td><button class="delete-button" onclick="deleteRow(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteRow(index) {
    traverseData.splice(index, 1);
    updateTraverseTable();
}

function clearAllData() {
    traverseData = [];
    initialX = 460.901;
    initialY = 782.820;
    updateTraverseTable();
}
