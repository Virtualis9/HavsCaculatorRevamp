let history = []; 
const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');

document.addEventListener('DOMContentLoaded', () => {
    let advice = document.getElementById('havsAdvice');
    const number = document.getElementById('havsScore3');
    const circle = document.getElementById('animatedCircle');
    let score = document.getElementById('havsScore2');
    let counter = 0;
    const maxCounter = 400;
    const minStrokeDashOffset = 230;
    const maxStrokeDashOffset = 450; // Set minimum stroke dash offset
    let strokeDashOffset = maxStrokeDashOffset;
    let isCountingUp = true;

    const intervalId = setInterval(() => {
        console.log(`Counter: ${counter}`); // Debugging statement
        console.log(`Stroke Dash Offset: ${strokeDashOffset}`); // Debugging statement
        
        if (isCountingUp) {
            // Increment the counter and adjust stroke dash offset
            counter += 1;
            strokeDashOffset = maxStrokeDashOffset - ((counter / maxCounter) * (maxStrokeDashOffset - minStrokeDashOffset));

            // Update styles based on counter value
            if (counter <= 100) {
                number.style.color = '#23fc00';
                score.style.color = '#23fc00';
                score.style.lineHeight = '60px';
                score.textContent = `Good! `;
                advice.style.color = '#23fc00';
                advice.textContent = 'Try and stay below 100 points';
            } else if (counter > 100 && counter <= 250) {
                number.style.color = '#deff12';
                score.style.color = '#deff12';
                score.style.lineHeight = '60px';
                score.textContent = `You exceed 100 points!`;
                advice.style.color = '#deff12';
                advice.textContent = 'You need to reassess your exposure to HAVS by law.';
            } else if (counter > 250) {
                number.style.color = '#fe0000';
                score.style.color = '#fe0000';
                score.style.lineHeight = '60px';
                score.textContent = `You’re approaching 400 points!`;
                advice.style.color = '#fe0000';
                advice.textContent = 'You need to find alternative options.';
            }

            // When the counter reaches 400, switch to counting down
            if (counter >= maxCounter) {
                isCountingUp = false;
               

            }
        } else {
            // Decrement the counter and adjust stroke dash offset
            counter -= 1;
            const minStrokeDashOffset = 450;
            const maxStrokeDashOffset = 230; 
            strokeDashOffset = minStrokeDashOffset + ((counter / maxCounter) * (maxStrokeDashOffset - minStrokeDashOffset));

            // Update styles based on counter value
            if (counter <= 100) {
                number.style.color = '#23fc00';
                score.style.color = '#23fc00';
                score.style.lineHeight = '60px';
                score.textContent = `Good! `;
                advice.style.color = '#23fc00';
                advice.textContent = 'Try and stay below 100 points';
            } else if (counter > 100 && counter <= 250) {
                number.style.color = '#deff12';
                score.style.color = '#deff12';
                score.style.lineHeight = '60px';
                score.textContent = `You exceed 100 points!`;
                advice.style.color = '#deff12';
                advice.textContent = 'You need to reassess your exposure to HAVS by law.';
            } else if (counter > 250) {
                number.style.color = '#fe0000';
                score.style.color = '#fe0000';
                score.style.lineHeight = '60px';
                score.textContent = `You’re approaching 400 points!`;
                advice.style.color = '#fe0000';
                advice.textContent = 'You need to find alternative options.';
            }

            // When the counter reaches 0, stop the interval
            if (counter <= 0) {
                clearInterval(intervalId);
            }
        }

        // Update the displayed number and circle stroke dash offset
        number.textContent = `${counter}`;
        circle.style.strokeDashoffset = strokeDashOffset;

    }, 5); // Update every 50 milliseconds
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

}

function scoreAnimation(result) {
    const number = document.getElementById('havsScore3');
    const circle = document.getElementById('animatedCircle');
    let counter = 0;
    const minStrokeDashOffset = 230;
    const maxStrokeDashOffset = 450; 
    const maxCounter = 400;
    let strokeDashOffset = maxStrokeDashOffset 
    circle.style.strokeDashoffset = strokeDashOffset; 
   

    if (result) {
        strokeDashOffset = maxStrokeDashOffset - ((counter / maxCounter) * (maxStrokeDashOffset - minStrokeDashOffset));
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

