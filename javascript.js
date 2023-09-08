const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('button.number');
const zeroKey = document.querySelector('.zeroKey');
const operatorKeys = document.querySelectorAll('button.operator');
const equalsKey = document.getElementById('=');
const clearKey = document.getElementById('clear');
let clickedEquals = false;
const SNARKY_MESSAGE = 'Wowww, be smarter';

numberKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        displayNumber(btn);
    });
});

zeroKey.addEventListener('click', () => {
    displayNumber(zeroKey);
});


operatorKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        //allows result (from clicking equals) to be used in subsequent operations
        if(clickedEquals === true) {
            clickedEquals = false;
        }
        if(display.textContent === 'ERROR' || display.textContent === SNARKY_MESSAGE) {
            display.textContent = '';
        }

        if(display.textContent !== '') {
            let displayArray = display.textContent.trimEnd().split(' ');
            if(displayArray.length < 3) {
                display.textContent = displayArray[0] + ' ' + btn.id + ' ';
            } else if (displayArray.length === 3) {
                display.textContent = operate(displayArray[0], displayArray[1], displayArray[2]);
                if(display.textContent !== SNARKY_MESSAGE) {
                   display.textContent += (' ' + btn.id + ' ');
                } else {
                    //allows displayed to be cleared after getting a SNARKY_MESSAGE
                    clickedEquals = true;
                }
            }
        }
    });
});


equalsKey.addEventListener('click', () => {
    if(display.textContent !== '') {
        clickedEquals = true;
        let displayArray = display.textContent.split(' ');
        display.textContent = '';
        display.textContent = operate(displayArray[0], displayArray[1], displayArray[2]);
    }
});


clearKey.addEventListener('click', () => {
    display.textContent = '';
});

function operate(num1, operator, num2) {
    if(!operator) {
        return num1;
    } else if(!num2) {
        return 'ERROR';
        
    } else if(operator === '/' && num2 == 0) {
        return SNARKY_MESSAGE;
    }

    let result;
    switch(operator) {
        case '+':
            result = +num1 + +num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = parseFloat((num1 / num2).toFixed(2));
            break;
        default:
    }
    return result;
}

function displayNumber(btn) {
    if(display.textContent.length < 16) {
        if(clickedEquals === true) {
            display.textContent = '';
            clickedEquals = false;
        }
        display.textContent += btn.id;
    }
}