const calcuScreen = document.querySelector(".calcu-screen");
const valuesCalcu = [];
const binaryButton = document.querySelector(".binary")
const numberButton = document.querySelectorAll(".number")
let memoryRecallState = false;
let memoryClearState = false;
let alreadyBinary = false;

function valueNum(value) {
    if (!memoryRecallState && !memoryClearState) {
        if (value === "." && calcuScreen.value.includes(".")) {
            return;
        }
        if (calcuScreen.value.length < 12) {
            calcuScreen.value += value;
        }
    } else {
        calcuScreen.value = value;
        memoryRecallState = false;
        memoryClearState = false;
    }
    binaryButton.addEventListener("click", () => calcuScreen.value.toString(2))
   
}

function resetCalcu() {
    calcuScreen.value = '';
    valuesCalcu.length = 0;
    alreadyBinary = false;
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
        console.log(valuesCalcu)
    }
}

function resultCalcu() {
    const arrayValue = calcuScreen.value;
    if (valuesCalcu.some(value => typeof value === 'string')) {
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
    } else {

        calcuScreen.value = arrayValue;
    }

    
}

function binaryNumber() {
    if (alreadyBinary) {
        return; 
    }
    const currentValue = parseFloat(calcuScreen.value);

    if (!isNaN(currentValue)) {
        if (currentValue >= 0) {
            const positiveBinary = currentValue.toString(2);
            if (positiveBinary.length <= 12) {
                calcuScreen.value = positiveBinary;
                alreadyBinary = true;
            } else {
                calcuScreen.value = "ERROR";
            }

        } else {
            const absoluteBinaryValue = Math.abs(currentValue).toString(2);
            const inverseBinaryValue = absoluteBinaryValue.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
            const binaryToDecimal = parseInt(inverseBinaryValue, 2);
            const twosComplement = (binaryToDecimal + 1).toString(2);
            const addZeroBeginning = twosComplement.padStart(absoluteBinaryValue.length, '0');
            
            if (addZeroBeginning.length <= 12) {
                calcuScreen.value = addZeroBeginning;
                alreadyBinary = true;
            } else {
                calcuScreen.value = "ERROR";
            }
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
    memoryClearState = true;
    calcuScreen.value = 0
    memoryTotal = 0
    memoryCalcu = []
    console.log(memoryCalcu)
}


function memoryRecall() {
    memoryRecallState = true;
    calcuScreen.value = memoryTotal
    
}

function valueSign() {
    const currentValue = parseFloat(calcuScreen.value);

    if (!isNaN(currentValue)) {
        calcuScreen.value = (-currentValue).toString();
    }
}

