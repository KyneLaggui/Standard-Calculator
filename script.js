const calcuScreen = document.querySelector(".calcu-screen");
const valuesCalcu = [];

function valueNum(value) {
    if (calcuScreen.value.length < 12) {
        calcuScreen.value += value;
    }
}

function resetCalcu() {
    calcuScreen.value = '';
    valuesCalcu.length = 0;
}

function backspace() {
    calcuScreen.value = calcuScreen.value.slice(0, -1);
    
}

function performOperation(operator) {
    const currentValue = calcuScreen.value;

    if (currentValue !== '') {
        valuesCalcu.push(parseFloat(currentValue));
        valuesCalcu.push(operator);
        calcuScreen.value = '';
    }
}

function calculateResult() {
    const currentValue = calcuScreen.value;
    if (currentValue !== '') {
        valuesCalcu.push(parseFloat(currentValue));
    }

    try {
        const result = eval(valuesCalcu.join(''));
        calcuScreen.value = result;
        valuesCalcu.length = 0;
    } catch (error) {
        calcuScreen.value = 'Error';
    }
}