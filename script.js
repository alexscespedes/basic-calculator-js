// Select DOM Elements
const calculationDisplay = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");
const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

// Calculator state variables
let currentNumber = "0";
let previousNumber = "";
let operator = "";
let shouldResetDisplay = false;

function updateDisplay() {
  resultDisplay.textContent = currentNumber;

  if (previousNumber && operator) {
    calculationDisplay.textContent = `${previousNumber} ${operator}`;
  } else {
    calculationDisplay.textContent = "";
  }
}

/* NEED TO FIX
// calculationDisplay.addEventListener("click", (e) => {
//   for (let index = 0; index < numberButtons.length; index++) {
//     currentNumber = e.dataset.number.toFixed();
//   }
// });
*/
