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

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", (e) => {
    const number = e.target.dataset.number;

    if (shouldResetDisplay) {
      currentNumber = number;
      shouldResetDisplay = false;
    } else {
      if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
      } else {
        currentNumber += number;
      }
    }

    updateDisplay();
  });
}

clearButton.addEventListener("click", () => {
  currentNumber = "0";
  previousNumber = "";
  operator = "";
  shouldResetDisplay = false;

  updateDisplay();
});
