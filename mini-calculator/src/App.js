
import './App.css';
import { useState } from "react";

function App() {
  // Display value
  const [show, setShow] = useState("0");

  // Function to evaluate the expression
  const evaluateExpression = (expression) => {
    try {
      let sanitizedExpression = expression.replace(/\s+/g, "");

      // Handle negative numbers
      sanitizedExpression = sanitizedExpression.replace(
        /(\*|\/)(-)/g,
        "$1(-1)*"
      );

      // Controll multiple operators
      sanitizedExpression = sanitizedExpression.replace(
        /([+\-*\/])+/g,
        (match) => {
          let result = "";

          // Process each character in the match
          for (let i = 0; i < match.length; i++) {
            const char = match[i];

            if (result === "") {
              result = char;
            } else {
              if (result === "+" && char === "-") result = "-";
              else if (result === "-" && char === "+") result = "-";
              else if (result === "-" && char === "-") result = "+";
              else if (result === "+" && char === "+") result = "+";
              else if (result === "*" || result === "/") {
                if (char === "+" || char === "-") continue;
                result += char;
              } else {
                result = char;
              }
            }
          }

          if (result.includes("*-") || result.includes("/-")) {
            result = result.replace(/([*\/])-/g, "$1(-1)*");
          }

          return result;
        }
      );

      const result = new Function(`return ${sanitizedExpression}`)();
      return result.toString();
    } catch (error) {
      return "Error";
    }
  };

  // Calculate the result when = is pressed
  const calculate = () => {
    const fullExpression = show;
    const calculatedResult = evaluateExpression(fullExpression);
    setShow(calculatedResult);
  };

  // Handle number input
  const numberClick = (num) => {
    if (show === "0" || show === "Error") {
      setShow(num);
    } else if (show.includes(".") && num === ".") {
      return;
    } else {
      setShow(show + num);
    }
  };

  // Handle operator click
  const opClick = (op) => {
    if (show && !["+", "*", "/"].includes(show.slice(-1))) {
      setShow(show + op);
    } else if (op === "-" && ["+", "*", "/"].includes(show.slice(-1))) {
      setShow(show + op);
    } else if (
      show &&
      ["+", "-", "*", "/"].includes(show.slice(-1)) &&
      op !== "-"
    ) {
      setShow(show.slice(0, -1) + op);
    }
  };

  // Handle clear button
  const clear = () => {
    setShow("0");
  };

  // Handle decimal point input
  const handleDecimal = () => {
    const lastNumber = show.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes(".")) {
      setShow(show + ".");
    }
  };

  return (
    <div>
      <div className="calculator">
        <div id="display" className="display">
          {show}
        </div>
        <div className="buttons">
          <button className="operator" id="divide" onClick={() => opClick("/")}>
            /
          </button>
          <button
            className="operator"
            id="multiply"
            onClick={() => opClick("*")}
          >
            *
          </button>
          <button className="clear" id="clear" onClick={clear}>
            AC
          </button>
          <button
            className="operator"
            id="subtract"
            onClick={() => (show === "0" ? setShow("-") : opClick("-"))}
          >
            -
          </button>
          <button
            className="numbers"
            id="seven"
            onClick={() => numberClick("7")}
          >
            7
          </button>
          <button
            className="numbers"
            id="eight"
            onClick={() => numberClick("8")}
          >
            8
          </button>
          <button
            className="numbers"
            id="nine"
            onClick={() => numberClick("9")}
          >
            9
          </button>
          <button className="operator" id="add" onClick={() => opClick("+")}>
            +
          </button>
          <button
            className="numbers"
            id="four"
            onClick={() => numberClick("4")}
          >
            4
          </button>
          <button
            className="numbers"
            id="five"
            onClick={() => numberClick("5")}
          >
            5
          </button>
          <button className="numbers" id="six" onClick={() => numberClick("6")}>
            6
          </button>
          <button className="equals" id="equals" onClick={calculate}>
            =
          </button>
          <button className="numbers" id="one" onClick={() => numberClick("1")}>
            1
          </button>
          <button className="numbers" id="two" onClick={() => numberClick("2")}>
            2
          </button>
          <button
            className="numbers"
            id="three"
            onClick={() => numberClick("3")}
          >
            3
          </button>
          <button
            className="numbers"
            id="zero"
            onClick={() => numberClick("0")}
          >
            0
          </button>
          <button className="numbers" id="decimal" onClick={handleDecimal}>
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
