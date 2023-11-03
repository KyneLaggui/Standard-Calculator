const calcuScreen = document.querySelector(".calcu-screen");
const valuesCalcu = [];
const binaryButton = document.querySelector(".binary")
const numberButton = document.querySelectorAll(".number")
let memoryRecallState = false;

function valueNum(value) {
    if (!memoryRecallState) {
        if (calcuScreen.value.length < 12) {
            calcuScreen.value += value;
        }
    } else {
        calcuScreen.value = value;
        memoryRecallState = false;
    }
    binaryButton.addEventListener("click", () => calcuScreen.value.toString(2))
   
}

function resetCalcu() {
    calcuScreen.value = '';
    valuesCalcu.length = 0;
    memoryCalcu = []
    memoryTotal = ""
}

function backspace() {
    calcuScreen.value = calcuScreen.value.slice(0, -1);
    
}

function operationCalcu(operator) {
    const currentValue = calcuScreen.value;

    if (currentValue !== '') {
        valuesCalcu.push(parseFloat(currentValue));
        valuesCalcu.push(operator);
        calcuScreen.value = '';
    }
}

function resultCalcu() {
    const arrayValue = calcuScreen.value;
    if (arrayValue !== '') {
        valuesCalcu.push(parseFloat(arrayValue));
    }

    try {
        const result = eval(valuesCalcu.join(''));
        if (result.toString().length > 12) {
            calcuScreen.value = result.toExponential(4); 
        } else {
            calcuScreen.value = result;
        }
    } catch (error) {
        calcuScreen.value = 'Error';
    }
}

function binaryNumber() {
    const currentValue = parseFloat(calcuScreen.value);
    if (!isNaN(currentValue)) {
        const binaryValue = currentValue.toString(2);
        if (binaryValue.length <= 12) {
            calcuScreen.value = binaryValue;
        } else {
            calcuScreen.value = "Error";
        }
    }
}

memoryCalcu = []
let memoryTotal;
function memoryPlus() {
    const value = parseFloat(calcuScreen.value);
    if (!isNaN(value)) {
        memoryCalcu.push(value);
        memoryTotal = memoryCalcu.reduce((valueArray, newValue) => valueArray + newValue);
        calcuScreen.value= " ";
        console.log(memoryCalcu);
        console.log(memoryTotal)
    }
}

function memoryMinus() {
    const value = parseFloat(calcuScreen.value);
    if (!isNaN(memoryTotal)) {
        console.log("memoryMinus", memoryTotal)
        memoryTotal = memoryTotal - value;
        calcuScreen.value= " ";
        memoryCalcu = []
        memoryCalcu.push(memoryTotal)
        console.log(memoryCalcu);
        console.log(memoryTotal)
    }

}

function memoryClear() {
    calcuScreen.value = 0
    memoryTotal = 0
    memoryCalcu = []
    console.log(memoryCalcu)
}


function memoryRecall() {
    memoryRecallState = true;
    calcuScreen.value = memoryTotal
    
}


