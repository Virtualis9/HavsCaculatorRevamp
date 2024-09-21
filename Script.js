let pointsHistory = []; 
let toolHistory = [{}]
const form = document.querySelector('.form');
const emailError = document.getElementById('emailError');
const trap = document.getElementById('pot');
const exportButton = document.getElementById('excelButton');
const table = document.getElementById('toolList');



document.addEventListener('DOMContentLoaded', () => {

    // sets off on page load animation 
    let advice = document.getElementById('havsAdvice')
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

            
            if (counter <= 0) {
                clearInterval(intervalId);
            }
        }

        // Update the displayed number and circle stroke dash offset
        number.textContent = `${counter}`;
        circle.style.strokeDashoffset = strokeDashOffset;

    }, 5); 
});

function scoreAnimation(result) {

    // animation and score from calculator handles here
    let advice = document.getElementById('havsAdvice')
    const number = document.getElementById('havsScore3');
    const circle = document.getElementById('animatedCircle');
    let score = document.getElementById('havsScore2');
    let counter = 0;
    const minStrokeDashOffset = 230;
    const maxStrokeDashOffset = 450; 
    const maxCounter = 400;
    let strokeDashOffset = maxStrokeDashOffset 

    if (result) {

        number.textContent = `${counter}`;

        const intervalId = setInterval(() => {

            if (counter === result) {
                clearInterval(intervalId); 
                if (counter <= 100) {

                    number.style.color = '#23fc00';
                    circle.style.color = '#23fc00';
                    circle.style.lineHeight = '60px';
                    score.textContent = `Good! `;
                    advice.style.color = '#23fc00';
                    advice.textContent = 'Try and stay below 100 points';
                    
                } else if (counter > 100 && counter <= 250) {

                    number.style.color = '#deff12';
                    score.style.color = '#deff12';
                    score.style.lineHeight = '60px';
                    score.textContent = `You exceed 100 points!`;
                    advice.style.color = '#deff12';
                    advice.textContent = 'You need to reassess your exposure to HAVS to reduce your risk of .';

                } else if (counter > 250 ) {

                    number.style.color = '#fe0000';
                    score.style.color = '#fe0000';
                    score.style.lineHeight = '60px';
                    score.textContent = `You're approaching 400 points!`;
                    advice.style.color = '#fe0000';
                    advice.textContent = 'You need to find alternative options.';

                }

            } else {

                counter += 1; 
                strokeDashOffset = maxStrokeDashOffset - ((counter / maxCounter) * (maxStrokeDashOffset - minStrokeDashOffset)) ;
                number.textContent = `${counter}`;
                circle.style.strokeDashoffset = strokeDashOffset ;

            }

            if (counter >= 400 ){
                console.log('Counter reached or exceeded 400!'); 
                number.style.color = '#fe0000';
                score.style.color = '#fe0000';
                score.style.lineHeight = '60px';
                score.textContent = `You're on or above 400 points!`;
                advice.style.color = '#fe0000';
                advice.textContent = 'you can not use anymore vibration tools today';

            }

        
            if (counter === 400){
                clearInterval(intervalId); 
            }



        }, 5); 

    } else {

        number.textContent = counter
        circle.style.strokeDashoffset = maxStrokeDashOffset;
    }
}

function signUp () {
   window.location.href = 'signUp.html'
}



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

exportButton.addEventListener('click', () => {
    /* Create worksheet from HTML DOM TABLE */
    const wb = XLSX.utils.table_to_book(table, {sheet: 'sheet-1'});
  
    /* Export to file (start a download) */
    XLSX.writeFile(wb, 'MyTable.xlsx');
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

// Action Limit Value (ALV) 
function ALV (ALVInput, ALVOutput) {
    
    const vibration = document.getElementById('ALVInput').value
    const points = (vibration * vibration) * 2
 
    const limit = 100 / points;
  
    const time = Math.floor(limit * 60)
 
    document.getElementById(ALVOutput).value = `You can use this tool for ${time} minuites`
    
    return;

}

console.log(toolHistory)
