let pointsHistory = []; 

const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');
const exportButton = document.getElementById('excelButton');
const table = document.getElementById('toolList');
const slider1 = document.getElementById('keyFeatureList');
const slider2 = document.getElementById('whyUsList');
let isDown = false;
let startX;
let scrollLeft;


function showSideBar(){
    const sidebar = document.getElementById('sideBar')
    sidebar.style.display = 'flex'
}

function closeSideBar(){
    const sidebar = document.getElementById('sideBar')
    sidebar.style.display = 'none'
}

slider2.addEventListener('mousedown', (e) =>{
    isDown = true
    slider2.classList.add('active');
    startY = e.pageY - slider2.offsetLeft;
    scrollLeft = slider2.scrollLeft
});

slider2.addEventListener('mouseLeave', () =>{
    isDown = false;
    slider2.classList.remove('active');
});

slider1.addEventListener('mousedown', (e) =>{
    isDown = true
    slider1.classList.add('active');
    startX = e.pageX - slider1.offsetLeft;
    scrollLeft = slider1.scrollLeft
});

slider1.addEventListener('mouseLeave', () =>{
    isDown = false;
    slider1.classList.remove('active');
});

slider1.addEventListener('mouseup', () =>{
    isDown = false
    slider1.classList.remove('active');
})

slider1.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider1.offsetLeft;
    const walk = (x - startX) 
    slider1.scrollLeft = scrollLeft - walk;
})

slider2.addEventListener('mousemove', () =>{
    if(!isDown) return;
    e.preventDefault
    let stayY;
    const y = e.pageY - slider2.offsetTop;
    const walk = (y - startY)
    slider2.scrollUp = scrollUp - walk;    
})
  

function updateHistory (total) {
    pointsHistory.push(Number(total))
    let result = 0
    for(let i = 0; i < pointsHistory.length; i++){
        result +=pointsHistory[i]
    }
    document.getElementById("total").value = result;
    
    // tableTotal(result)
}

function updateToolHistory(total) {
    let toolHistory = [{}];
    let pointsHistory = [];
    
    // Get input values
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const toolName = document.getElementById('ToolName').value;
    const vibration = document.getElementById('Vibration').value;
    const time = document.getElementById('Time').value;
    const result = document.getElementById('total').value;
    
    // Add points to history
    pointsHistory.push(result);

    // Calculate total points (keeping highest score)
    const totalPoints = pointsHistory.reduce((acc, points) => {
        return acc > points ? acc : points;
    });

    // Get the tbody element
    const tbodyEl = document.querySelector('tbody');

    // Create a new row and insert at the top
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${name}</td>
        <td>${toolName}</td>
        <td>${vibration}</td>
        <td>${time}</td>
        <td>${total}</td>
        <td>${totalPoints}</td>
    `;
    tbodyEl.insertBefore(newRow, tbodyEl.firstChild); // Insert at the top of the table

    // Store tool history in the array
    toolHistory.push({
        date: date,
        name: name,
        toolName: toolName,
        vibration: vibration,
        TriggerTime: time,
        points: total
    });

}

function tableTotal(total) {
    const totalPointsElement = document.getElementById('totalPointsArea');
    totalPointsElement.innerHTML = `<h3>Total Points: ${total}</h3>`;
    return total;
}

document.addEventListener('DOMContentLoaded', function () {
    const downloadButton = document.getElementById('downloadButton');
    const table = document.querySelector('table');  // Make sure you're selecting the table element

    downloadButton.addEventListener('click', () => {
        if (table.tagName === 'TABLE') {
            /* Create worksheet from HTML DOM TABLE */
            const wb = XLSX.utils.table_to_book(table, {sheet: 'sheet-1'});
      
            /* Export to file (start a download) */
            XLSX.writeFile(wb, 'MyTable.xlsx');
        } else {
            console.error('Selected element is not a table');
        }
    });
});


function calculate (inputElementByID1, inputElementByID2){
    let vibration = document.getElementById(inputElementByID1).value
    let mins = document.getElementById(inputElementByID2).value
    const points = (vibration * vibration) * 2
    const time = mins/60
    const total = Math.round(points * time)
    updateHistory(total)
    updateToolHistory(total)
}

function clearButton () {
    console.log(pointsHistory)
    pointsHistory.length = 0
    console.log(pointsHistory)
    document.getElementById('total').value = ''
    document.getElementById('Time').value = ''
    document.getElementById('Vibration').value = ''
    document.getElementById('ToolName').value = ''
    document.getElementById('name').value = ''
    document.getElementById('date').value = ''

}

// Action Limit Value (ALV) 
function ALV (ALVInput, ALVOutput) {
    
    const vibration = document.getElementById('ALVInput').value
    const points = (vibration * vibration) * 2
 
    const limit = 100 / points;
  
    const time = Math.floor(limit * 60)
 
    document.getElementById(ALVOutput).value = `You can use this tool for ${time} minuites`
    
    return;

}

