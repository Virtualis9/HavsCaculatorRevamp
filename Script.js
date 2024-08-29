let history = []; 
const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');

function updateHistory (total) {
    history.push(Number(total))
    let result = 0
    for(let i = 0; i < history.length; i++){
        result +=history[i]
    }
    document.getElementById("total").value = result;

    scoreAnimation(result)
}

function scoreAnimation (result) {
    
   
    const number = document.getElementById('havsScore3')
    
    let counter = 0
   
    setInterval(() =>{
        if (counter === result){
            clearInterval;
        } else {
            counter += 1
            number.textContent = `${counter}`
        }
        
    }, 30)

    
   
}

function calculate (inputElementByID1, inputElementByID2){
    let vibration = document.getElementById(inputElementByID1).value
    let mins = document.getElementById(inputElementByID2).value
    const points = (vibration * vibration) * 2
    const time = mins/60
    const total = Math.round(points * time)
  
    updateHistory(total)
    

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

