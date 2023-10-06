// function init() - always have a function that initialize your code, then remember to call it

// add a string variable to append on numbers on the screen
let buffer = '0';
// every time someone clicks the screen you want to rerender     
const screen = document.querySelector(".screen")
// backscreen that keeps track of running total
let runningTotal = 0;
// we need to track previous operator, to keep track that the last thing you tried to do was +
let previousOperator = null;

function buttonClick (value) {
    // create a condition statement to check whether the value entered is a number or symbol
    if (isNaN(parseInt(value))){
        handleSymbols(value)
    } else {
        handleNumbers(value)
    }
    rerender();
}

function handleNumbers(number){
    if (buffer === '0') {
        buffer = number;         
    } else {
        buffer += number;
    }
}

function handleMath(value) {
    if (buffer === '0') {
        // do nothing
        return;        
    }
    // what happens if i hit 5 + 5 + 5, i have to do the addition of the first 2 numbers
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;
    // what happens when you hit a math operator like +, the buffer is assigned 0
    buffer = '0';
    console.log(runningTotal)
}

// this function handles math operations
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer
    }
}

// what is a stub - a stub is declaring a function that you are not going to use directly and then leave in an output that whenever you come back on it you will be able to trace it.

function handleSymbols(symbol){
    // use switch case to switch between different calculator operations
    switch (symbol) {
        case 'C':
            buffer = '0';
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0'
            } else {
                // this will cut off the last number in the string
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        
        case '=':
            if (previousOperator === null) {
                // need 2 numbers to do math
                return;
            } 
            flushOperation(parseInt(buffer))

            previousOperator = null;
            // tip: how to make a number into a string
            buffer = "" + runningTotal;
            runningTotal = 0
            break;
        
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol)
        default:
            break;
    }

}

function init() {
    document.querySelector(".calc-buttons")
    .addEventListener('click', function(event) {
        // function below will be created to handle the math
        buttonClick(event.target.innerText);
    });
}

// this function will update the screen/results area overtime 
// this will be called after every button click to change the screen text.
function rerender() {
    screen.innerText = buffer;
}

init();

// debugging is a whole set of skill as well as code. that's always a good thing to get used to as well. use console.log() to debug your output