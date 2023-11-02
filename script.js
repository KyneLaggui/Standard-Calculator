const calcuScreen = document.querySelector(".calcu-screen");
const valuesCalcu = [];
const binaryButton = document.querySelector(".binary")

function valueNum(value) {
    if (calcuScreen.value.length < 12) {
        calcuScreen.value += value;
    }
    binaryButton.addEventListener("click", calcuScreen.value.toString(2))
   
}


function resetCalcu() {
    calcuScreen.value = '';
    valuesCalcu.length = 0;
}

function backspace() {
    calcuScreen.value = calcuScreen.value.slice(0, -1);
    
}

function calcuOperation(operator) {
    const currentValue = calcuScreen.value;

    if (currentValue !== '') {
        valuesCalcu.push(parseFloat(currentValue));
        valuesCalcu.push(operator);
        calcuScreen.value = '';
    }
}

function calculateResult() {
    const arrayValue = calcuScreen.value;
    if (arrayValue !== '') {
        valuesCalcu.push(parseFloat(arrayValue));
    }

    try {
        const result = eval(valuesCalcu.join(''));
        calcuScreen.value = result;
        valuesCalcu.length = 0;
    } catch (error) {
        calcuScreen.value = 'Error';
    }
}

function binaryNumber() {
    const currentValue = parseFloat(calcuScreen.value);
    if (!isNaN(currentValue)) {
            calcuScreen.value = currentValue.toString(2);
    }
}