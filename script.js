// function backspace() {
//     var cvalScreen = document.calcu.screen.value;

//     if (cvalScreen.length > 0) {
//         var newValue = cvalScreen.slice(0, -1);

//         document.calcu.screen.value = newValue;
//     }
// }
const calcuScreen = document.querySelector(".calcu-screen");

function valueNum(value) {
    calcuScreen.value += value;
    
}

function resetCalcu() {
    calcuScreen.value = '';
}

function backspace() {
    calcuScreen.value = calcuScreen.value.slice(0, -1);
    
}

function performOperation(operator) {
    var calcuScreen = document.getElementById("calcu-screen");
    var screenValue = calcuScreen.value;
    
    if (screenValue !== '') {
        var lastChar = screenValue.charAt(screenValue.length - 1);
        if (lastChar !== '+' && lastChar !== '-' && lastChar !== '*' && lastChar !== '/') {
            calcuScreen.value += operator;
        }
    }
}

    
function calculateResult() {
    var calcuScreen = document.getElementById("calcu-screen");
    var screenValue = calcuScreen.value;
    
    try {
        var result = eval(screenValue);
        calcuScreen.value = result;
    } catch (error) {
        calcuScreen.value = 'Error';
    }
}
