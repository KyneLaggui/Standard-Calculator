const calcuScreen = document.querySelector(".calcu-screen");
const valuesCalcu = [];
const binaryButton = document.querySelector(".binary")
const numberButton = document.querySelector(".number")

function valueNum(value) {
    if (calcuScreen.value.length < 12) {
        calcuScreen.value += value;
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
    if (!isNaN(value)) {
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
    calcuScreen.value = memoryTotal
    
    numberButton.addEventListener("click", () => calcuScreen.value = "")
}

