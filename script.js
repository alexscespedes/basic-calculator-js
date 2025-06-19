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

for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", (e) => {
    const selectedOperator = e.target.dataset.operator;

    if (previousNumber && operator && !shouldResetDisplay) {
      calculate();
    }
    previousNumber = currentNumber;
    operator = selectedOperator;
    shouldResetDisplay = true;

    updateDisplay();
  });
}

function calculate() {
  const prev = parseFloat(previousNumber);
  const current = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentNumber = result;
  previousNumber = "";
  operator = "";
  shouldResetDisplay = true;
}

equalsButton.addEventListener("click", () => {
  if (previousNumber && operator && currentNumber) {
    calculate();
    updateDisplay();
  }
});

backspaceButton.addEventListener("click", () => {
  if (currentNumber.length === 1 || currentNumber.length === 0) {
    currentNumber = "0";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    const numberButton = document.querySelector(`[data-number="${e.key}"]`);
    if (numberButton) {
      numberButton.click();
    }
  }

  if (e.key === ".") {
    const decimalButton = document.querySelector('[data-number="."]');
    if (decimalButton) {
      decimalButton.click();
    }
  }

  if (e.key === "+" || e.key === "-") {
    const operatorButton = document.querySelector(`[data-operator="${e.key}"]`);
    if (operatorButton) {
      operatorButton.click();
    }
  }

  if (e.key === "*") {
    const operatorButton = document.querySelector(`[data-operator="*"]`);
    if (operatorButton) {
      operatorButton.click();
    }
  }

  if (e.key === "/") {
    e.preventDefault();
    const operatorButton = document.querySelector(`[data-operator="/"]`);
    if (operatorButton) {
      operatorButton.click();
    }
  }

  if (e.key === "Enter") {
    equalsButton.click();
  }

  if (e.key === "c" || e.key === "C") {
    clearButton.click();
  }

  if (e.key === "Backspace") {
    backspaceButton.click();
  }
});
