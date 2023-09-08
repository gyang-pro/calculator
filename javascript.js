const display = document.querySelector('#display');
const numberKeys = document.querySelectorAll('button.number');
const decimalKey = document.querySelector('.decimal');
const operatorKeys = document.querySelectorAll('button.operator');
const equalsKey = document.getElementById('=');
const clearKey = document.getElementById('clear');
let clickedEquals = false;
let decimalCount = 0;
const SNARKY_MESSAGE = 'Woww, be smarter';

numberKeys.forEach(btn => {
    btn.addEventListener('click', () => {
        if(display.textContent.length < 18) {
            checkContent();
            display.textContent += btn.id;
        }
    });
});

decimalKey.addEventListener('click', () => {
    checkContent();

    decimalCount += 1;
    if(decimalCount === 1) {
        display.textContent += decimalKey.id;
    }
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
        
        decimalCount = 0;

        if(display.textContent !== '') {
            let displayArray = display.textContent.trimEnd().split(' ');
            if(displayArray.length < 3) {
                if(displayArray[0] !== '.') {
                    display.textContent = displayArray[0] + ' ' + btn.id + ' ';
                } else {
                    clearContent();
                }
            } else if (displayArray.length === 3) {
                if(displayArray[2] === '.') {
                    clearContent();
                } else {
                    display.textContent = operate(displayArray[0], displayArray[1], displayArray[2]);
                    if(display.textContent !== SNARKY_MESSAGE) {
                    display.textContent += (' ' + btn.id + ' ');
                    } else {
                        //allows displayed to be cleared after getting a SNARKY_MESSAGE
                        clickedEquals = true;
                    }
                }
            }
        }
    });
});


equalsKey.addEventListener('click', () => {
    if(display.textContent !== '') {
        clickedEquals = true;
        let displayArray = display.textContent.split(' ');
        if(displayArray[2] === '.') {
            clearContent();
        } else {
            display.textContent = '';
            display.textContent = operate(displayArray[0], displayArray[1], displayArray[2]);
        }
    }
});


clearKey.addEventListener('click', () => {
    clearContent();
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
            result = parseFloat((+num1 + +num2).toFixed(3));
            break;
        case '-':
            result = parseFloat((num1 - num2).toFixed(3));
            break;
        case '*':
            result = parseFloat((num1 * num2).toFixed(3));
            break;
        case '/':
            result = parseFloat((num1 / num2).toFixed(3));
            break;
        default:
    }
    return result;
}

function checkContent() {
    if(clickedEquals === true) {
        display.textContent = '';
        clickedEquals = false;
        decimalCount = 0;
    }
}

function clearContent() {
    display.textContent = '';
    clickedEquals = 0;
    decimalCount = 0;
}