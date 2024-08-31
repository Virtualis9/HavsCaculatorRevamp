let history = []; 
const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');

document.addEventListener('DOMContentLoaded', () => {

    let advice = document.getElementById('havsAdvice')
    const number = document.getElementById('havsScore3');
    const circle = document.getElementById('animatedCircle');
    let score = document.getElementById('havsScore2')
    let counter = 0;
    const maxCounter = 400; 
    const maxStrokeDashOffset = 450; 
    let strokeDashOffset = maxStrokeDashOffset;
    let isCountingUp = true; 

    
    const intervalId = setInterval(() => {
        if (isCountingUp) {
            strokeDashOffset -= maxStrokeDashOffset / maxCounter;  
            counter += 1;
            if (counter <= 100){
                number.style.color = '#23fc00'
                score.style.color = '#23fc00'
                score.style.lineHeight = '60px'
                score.textContent = `Good! `
                advice.style.color = '#23fc00'
                advice.textContent = 'try and stay below 100 points'
            }

            if (counter > 100 && counter <= 250){
                number.style.color = '#deff12'
                score.style.color = '#deff12'
                score.style.lineHeight = '60px'
                score.textContent = `You exceed 100 points!`
                advice.style.color = '#deff12'
                advice.textContent = 'you need to reassess your exposure to HAVS by law.'
            }

            if (counter > 250){
                number.style.color = '#fe0000'
                score.style.color = '#fe0000'
                score.style.lineHeight = '60px'
                score.textContent = `you’re approaching 400 points!`
                advice.style.color = '#fe0000'
                advice.textContent = 'you need to find alternative options'
            }

            if (counter === maxCounter) {
                isCountingUp = false; 

            }
        } else {

            if (counter <= 100){
                number.style.color = '#23fc00'
                score.style.color = '#23fc00'
                score.style.lineHeight = '60px'
                score.textContent = `Good! `
                advice.style.color = '#23fc00'
                advice.textContent = 'try and stay below 100 points'
            }
                
            

            if (counter > 100 && counter <= 250){
                number.style.color = '#deff12'
                score.style.color = '#deff12'
                score.style.lineHeight = '60px'
                score.textContent = `You exceed 100 points! `
                advice.style.color = '#deff12'
                advice.textContent = 'you need to reassess your exposure to HAVS by law.'

            }

            if (counter > 250){
                number.style.color = '#fe0000'
                score.textContent = `you’re approaching 400 points!`
                advice.style.color = '#fe0000'
                advice.textContent = 'you need to find alternative options'
            }

            if (counter === maxCounter) {
                isCountingUp = false; 
            }
            counter -= 1;           
            strokeDashOffset += maxStrokeDashOffset / maxCounter;   
            if (counter === 0) {
                clearInterval(intervalId); 
            }
        }

        
        number.textContent = `${counter}`; 
        circle.style.strokeDashoffset = strokeDashOffset; 

    }, 5); 

});

function updateHistory (total) {
    history.push(Number(total))
    let result = 0
    for(let i = 0; i < history.length; i++){
        result +=history[i]
    }
    document.getElementById("total").value = result;
    let score1 = document.getElementById('havsScore3')
   
    scoreAnimation(result)

    if (result <= 100){
        score1.style.color = '#23fc00';
        

    } else if (result > 100 && result < 250){
        score1.style.color = '#deff12';
        score2.style.color = '#deff12';
        score2.style.lineHeight = '60px'
        score2.textContent = `You Need To Reassess your expose to HAVS `

    }


}

function scoreAnimation(result) {
    const number = document.getElementById('havsScore3');
    const circle = document.getElementById('animatedCircle');
    const maxStrokeDashOffset = 450; 
    let counter = 0;

    if (result) {
       
        circle.style.strokeDashoffset = maxStrokeDashOffset; 
        number.textContent = `${counter}`;

        const intervalId = setInterval(() => {
            if (counter === result) {
                clearInterval(intervalId); 
            } else {
                counter += 1; 
                const strokeDashOffset = maxStrokeDashOffset - result;
                number.textContent = `${counter}`;
                circle.style.strokeDashoffset = strokeDashOffset;
            }

            if (maxStrokeDashOffset >= 450 || maxStrokeDashOffset  < 0){
                return maxStrokeDashOffset = 450
            }

        }, 5); 

    } else {

        number.textContent = counter
        circle.style.strokeDashoffset = maxStrokeDashOffset;
    }
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

