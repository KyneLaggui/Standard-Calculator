    const calcuScreen = document.querySelector(".calcu-screen");
    const valuesCalcu = [];
    const binaryButton = document.querySelector(".binary")
    const numberButton = document.querySelectorAll(".number")
    let memoryRecallState = false;
    let memoryClearState = false;
    let alreadyBinary = false;
    let calcuHasValue = false;
    let hasPerformedCalculation = false;

    function valueNum(value) {
        
        if (!memoryRecallState && !memoryClearState && !alreadyBinary) {
            if (value === "." && calcuScreen.value.includes(".")) {
                return;
            }
            if (calcuScreen.value.length < 12) {
                calcuScreen.value += value;
                calcuHasValue = true;
            }
        } else {
            calcuScreen.value = value;
            memoryRecallState = false;
            memoryClearState = false;
            alreadyBinary = false;
        }
        binaryButton.addEventListener("click", () => calcuScreen.value.toString(2))
        changeResetText()
    
    }

    function changeResetText() {
        if (calcuHasValue) {
            document.querySelector(".resetText").textContent = "CE";
        } else {
            document.querySelector(".resetText").textContent = "AC";
        }
    }

    function resetCalcu() {
        calcuScreen.value = '';
        valuesCalcu.length = 0;
        alreadyBinary = false;
        calcuHasValue = false;
        hasPerformedCalculation = false;
        changeResetText();
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
        if (hasPerformedCalculation) {
            return;
        }
        const arrayValue = calcuScreen.value;
        if (valuesCalcu.some(value => typeof value === 'string')) {
            if (arrayValue !== '') {
                valuesCalcu.push(parseFloat(arrayValue));
            }
    
            if (valuesCalcu.length > 1 && typeof valuesCalcu[valuesCalcu.length - 1] === 'string') {
                valuesCalcu.pop();
            }
    
            for (let i = 1; i < valuesCalcu.length; i += 2) {
                if (valuesCalcu[i] === '-' && valuesCalcu[i + 1] < 0) {
                    valuesCalcu[i] = '+';
                    valuesCalcu[i + 1] = -valuesCalcu[i + 1];
                }
            }
    
            try {
                const result = eval(valuesCalcu.join(''));
    
                if (isFinite(result)) {
                    if (result.toString().length > 12) {
                        calcuScreen.value = result.toExponential(4);
                    } else {
                        calcuScreen.value = result;
                    }
                } else {
                    calcuScreen.value = 0;
                }
    
                valuesCalcu.length = 0;
                hasPerformedCalculation = false;
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
        if (!isNaN(value) && !alreadyBinary) {
            memoryCalcu.push(value);
            memoryTotal = memoryCalcu.reduce((valueArray, newValue) => valueArray + newValue);
            calcuScreen.value= " ";
            console.log(memoryCalcu);
            console.log(memoryTotal)
        }
    }

    function memoryMinus() {
        const value = parseFloat(calcuScreen.value);
        if (!isNaN(memoryTotal) && !alreadyBinary) {
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

