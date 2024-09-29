let pointsHistory = []; 
let toolHistory = [{}]
const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');
const exportButton = document.getElementById('excelButton');
const table = document.getElementById('toolList');
const slider1 = document.getElementById('keyFeatureList');
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
    console.log(walk)

})
   
function updateHistory (total) {
    pointsHistory.push(Number(total))
    let result = 0
    for(let i = 0; i < pointsHistory.length; i++){
        result +=pointsHistory[i]
    }
    document.getElementById("total").value = result;
    scoreAnimation(result)
    // updateToolHistory(result)
    tableTotal(result)
}


function updateToolHistory (total){

    const name = document.getElementById('toolName').value;
    const vibration = document.getElementById('Vibration').value;
    const time = document.getElementById('Time').value;
    const points = total;
    // const result = document.getElementById('total').value
    const tbodyEl = document.querySelector('tbody')
    tbodyEl.innerHTML += 
        `<tr>
            <td>
                ${name}
            </td>
            <td>
                ${vibration}
            </td>
            <td>
                ${time}
            </td>
            <td>
                ${points}
            </td>
        </tr>`;
    toolHistory.push({
        name: name,
        vibration: vibration,
        TriggerTime: time,
        points: points

    })
}

function tableTotal(total){
    const result = total
    const tfooterEl = document.querySelector('tfoot')
    tfooterEl.innerHTML =
        `<tr>
            <td>
                ${result}
            </td>
        </tr>`


    return 
} 

// exportButton.addEventListener('click', () => {
//     /* Create worksheet from HTML DOM TABLE */
//     const wb = XLSX.utils.table_to_book(table, {sheet: 'sheet-1'});
  
//     /* Export to file (start a download) */
//     XLSX.writeFile(wb, 'MyTable.xlsx');
//   });


function calculate (inputElementByID1, inputElementByID2){
    let vibration = document.getElementById(inputElementByID1).value
    let mins = document.getElementById(inputElementByID2).value
    const points = (vibration * vibration) * 2
    const time = mins/60
    const total = Math.round(points * time)
    updateHistory(total)
    updateToolHistory(total)
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

