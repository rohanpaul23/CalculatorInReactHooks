import React, { useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [firstOperand, setFirstOperand] = useState();
  const [secondOperand, setSecondOperand] = useState();
  const [operation, setOperation] = useState();

  const handleOperation = op => {
    setOperation(op);
  };

  const clear = () => {
    setFirstOperand();
    setSecondOperand();
    setOperation();
  };

  const handleNumber = input => {
    if (firstOperand === undefined && operation === undefined) {
      if (input === ".") {
        setFirstOperand(".0");
      } else {
        let currNumber = input.toString();
        setFirstOperand(currNumber);
      }
    } else if (operation === undefined) {
      if (firstOperand.toString().includes(".") && input === ".") {
        return;
      }
      let currNumber = firstOperand.toString() + input.toString();
      setFirstOperand(currNumber);
    } else if (operation !== undefined && secondOperand === undefined) {
      if (input === ".") {
        setSecondOperand(".0");
      } else {
        let currNumber = input.toString();
        setSecondOperand(currNumber);
      }
    } else if (operation !== undefined && secondOperand !== undefined) {
      if (secondOperand.toString().includes(".") && input === ".") {
        return;
      }
      let currNumber = secondOperand.toString() + input.toString();
      setSecondOperand(currNumber);
    }
  };

  const clearOneInteger = () => {
    if (secondOperand !== undefined) {
      let finalValue = removeLastChar(secondOperand);
      setSecondOperand(finalValue);
    } else {
      let finalValue = removeLastChar(firstOperand);
      setFirstOperand(finalValue);
    }
  };

  const removeLastChar = num => {
    let slicedNumber = num.toString().slice(0, -1);
    let parsedNumber = parseInt(slicedNumber);
    return isNaN(parsedNumber) ? undefined : parsedNumber;
  };

  const evaluate = () => {
    let firstValue = parseFloat(firstOperand);
    let secondValue = parseFloat(secondOperand);
    if (!isNaN(firstValue) && !isNaN(secondValue)) {
      if (operation === "add") {
        setFirstOperand(firstValue + secondValue);
      } else if (operation === "subtract") {
        setFirstOperand(firstValue - secondValue);
      } else if (operation === "multiply") {
        setFirstOperand(firstValue * secondValue);
      } else {
        setFirstOperand(firstValue / secondValue);
      }
    }
    setSecondOperand();
  };

  const getDisplayValue = value => {
    console.log(value);
    if (value !== undefined) {
      let stringNo = value.toString();
      let integerDigits = parseFloat(stringNo.toString().split(".")[0]);
      let decimalDigits = stringNo.toString().split(".")[1];

      let integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    } else {
      return "";
    }
  };

  return (
    <div className="calculator">
      <div className="calc-grid border-gradient">
        <div className="header ">CALCULATOR</div>
        <div class="output ">
          <div data-previous-operand class="current-operand">
            {getDisplayValue(
              secondOperand !== undefined ? secondOperand : firstOperand
            )}
          </div>
        </div>
        <button data-all-clear class="span-two-columns" onClick={clear}>
          AC
        </button>
        <button data-delete onClick={() => clearOneInteger()}>
          C
        </button>
        <button data-operation onClick={() => handleOperation("add")}>
          +
        </button>
        <button data-number onClick={() => handleNumber(1)}>
          1
        </button>
        <button data-number onClick={() => handleNumber(2)}>
          2
        </button>
        <button data-number onClick={() => handleNumber(3)}>
          3
        </button>
        <button data-operation onClick={() => handleOperation("subtract")}>
          -
        </button>
        <button data-number onClick={() => handleNumber(4)}>
          4
        </button>
        <button data-number onClick={() => handleNumber(5)}>
          5
        </button>
        <button data-number onClick={() => handleNumber(6)}>
          6
        </button>
        <button data-operation onClick={() => handleOperation("multiply")}>
          *
        </button>
        <button data-number onClick={() => handleNumber(7)}>
          7
        </button>
        <button data-number onClick={() => handleNumber(8)}>
          8
        </button>
        <button data-number onClick={() => handleNumber(9)}>
          9
        </button>
        <button data-operation onClick={() => handleOperation("divide")}>
          /
        </button>
        <button data-number onClick={() => handleNumber(".")}>
          .
        </button>
        <button data-number onClick={() => handleNumber(0)}>
          0
        </button>
        <button data-equals class="span-two-columns" onClick={() => evaluate()}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
