let cursor = 0;
let tokens = [];
//#region Calculator Buttons
const btnClear = document.querySelector("#clear");
const btnDelete = document.querySelector("#delete");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnSeven = document.querySelector("#seven");
const btnEight = document.querySelector("#eight");
const btnNine = document.querySelector("#nine");
const btnDivide = document.querySelector("#divide");
const btnFour = document.querySelector("#four");
const btnFive = document.querySelector("#five");
const btnSix = document.querySelector("#six");
const btnMultiply = document.querySelector("#multiply");
const btnOne = document.querySelector("#one");
const btnTwo = document.querySelector("#two");
const btnThree = document.querySelector("#three");
const btnSubtract = document.querySelector("#subtract");
const btnDecimal = document.querySelector("#decimal");
const btnZero = document.querySelector("#zero");
const btnEquals = document.querySelector("#equals");
const btnAdd = document.querySelector("#add");
const display = document.querySelector("#calculator-display");
//#endregion
//TODO: ADD equivalent Keyboard inputs
//#region row 1 button event listeners
btnClear.addEventListener("click", () => { display.textContent = "" });
btnDelete.addEventListener("click", () => display.textContent = display.textContent.slice(0, -1));
btnLeft.addEventListener("click", () => display.textContent += "(");
btnRight.addEventListener("click", () => display.textContent += ")");
//#endregion

//#region row 2 button event listeners
btnSeven.addEventListener("click", () => display.textContent += "7");
btnEight.addEventListener("click", () => display.textContent += "8");
btnNine.addEventListener("click", () => display.textContent += "9");
btnDivide.addEventListener("click", () => display.textContent += "/");
//#endregion

//#region row 3 button event listeners
btnFour.addEventListener("click", () => display.textContent += "4");
btnFive.addEventListener("click", () => display.textContent += "5");
btnSix.addEventListener("click", () => display.textContent += "6");
btnMultiply.addEventListener("click", () => display.textContent += "*");
//#endregion

//#region row 4 button event listeners
btnOne.addEventListener("click", () => display.textContent += "1");
btnTwo.addEventListener("click", () => display.textContent += "2");
btnThree.addEventListener("click", () => display.textContent += "3");
btnSubtract.addEventListener("click", () => display.textContent += "-");
//#endregion

//#region row 5 button event listeners
btnDecimal.addEventListener("click", () => display.textContent += ".");
btnZero.addEventListener("click", () => display.textContent += "0");
btnEquals.addEventListener("click", () => {
    tokens = tokenize(display.textContent);
    let tree = parse(tokens)
    let results = calculate(tree);
    display.textContent = results;
    cursor = 0;
    results;
    console.log(tree);
    tokens = [];
});
btnAdd.addEventListener("click", () => display.textContent += "+");
//#endregion


//HELP with lexer/parser: https://www.youtube.com/watch?v=qNBoJ3cHyUI

//#region lexer
//LEXER which will take in a string and return an array of tokens
const TokenTypes = {
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULTIPLY: "MULTIPLY",
    DIVIDE: "DIVIDE",
    LEFT: "LEFT_PAR",
    RIGHT: "RIGHT_PAR",
    UNITARYMINUS: "UNITARY_MINUS",
    NUMBER: "NUMBER",
    EOF: "EOF"
}

//checks if the character is a number
function isNumber(char = "") {
    return (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57);
}
// make tokenizer to turn -5 into numbers and remove unitaryminus button and type
function tokenize(input) {
    console.log(`input: ${input}`);
    while (cursor < input.length) {
        let currentChar = input.charAt(cursor);
        switch (currentChar) {
            case " ":
                break;
            case "\n":
                break;
            case "\t":
                break;
            case "EOF":
                break;
            case "+":
                tokens.push({ type: TokenTypes.PLUS, value: "+" })
                break;
            case "-":
                let noLeftNum = (cursor == 0 || (cursor - 1 >= 0 && !isNumber(input.charAt(cursor - 1))));
                let rightNum = (cursor + 1 < input.length && isNumber(input.charAt(cursor + 1)));
                console.log(noLeftNum);
                if (noLeftNum && rightNum) {
                    console.log("DO WE ENTER");
                    let strNumber = "-";
                    cursor++;
                    currentChar = input.charAt(cursor)
                    while ((isNumber(currentChar) && cursor < input.length) || (currentChar === "." && cursor < input.length - 1)) {
                        strNumber += currentChar;
                        cursor++;
                        currentChar = input.charAt(cursor);
                    }
                    console.log(strNumber);
                    tokens.push({ type: TokenTypes.NUMBER, value: parseFloat(strNumber) });
                    //since we already advanced the cusor in our while loop for checking the number
                    continue;

                } else {
                    tokens.push({ type: TokenTypes.MINUS, value: "-" })
                }

                break;
            case "*":
                tokens.push({ type: TokenTypes.MULTIPLY, value: "*" })
                break;
            case "/":
                tokens.push({ type: TokenTypes.DIVIDE, value: "/" })
                break;
            case "(":
                tokens.push({ type: TokenTypes.LEFT, value: "(" })
                break;
            case ")":
                tokens.push({ type: TokenTypes.RIGHT, value: ")" })
                break;
            default:
                //if the character is a number, we need to parse the entire number
                if (isNumber(currentChar)) {
                    let strNumber = "";
                    while ((isNumber(currentChar) && cursor < input.length) || (currentChar === "." && cursor < input.length - 1)) {
                        strNumber += currentChar;
                        cursor++;
                        currentChar = input.charAt(cursor);
                    }
                    tokens.push({ type: TokenTypes.NUMBER, value: parseFloat(strNumber) });
                    //since we already advanced the cusor in our while loop for checking the number
                    continue;
                } else {
                    throw new Error(`Invalid character: ${input.charAt(cursor)}, recieved at position ${cursor}`);
                }
                break;

        }
        cursor++;
    }
    tokens.push({ type: TokenTypes.EOF, value: "EOF" });
    cursor = 0;
    return tokens;
}
//USING REGEX
// function lex(input) {
//     let numRegex = "[0-9]+";
//     let symbolRegex = "[\(\)\.\+\*\/\-⁻]"
//     //regex pattern detects groups of numbers and individual symbols
//     let tokenRegExp = new RegExp(numRegex + "|" + symbolRegex, "g");

//     //returns an array of each individual number and symbol
//     let match = input.match(tokenRegExp)

//     if (match == null) {
//         return "BAD INPUT";
//     }

//     let tokens = [];

//     match.forEach((x) => {
//         if (parseInt(x)) {
//             tokens.push({ type: "number", val: x });
//         } else if (x == "*") {
//             tokens.push({ type: "multiply", val: x });
//         } else if (x == "/") {
//             tokens.push({ type: "divide", val: x });
//         } else if (x == "+") {
//             tokens.push({ type: "add", val: x });
//         } else if (x == "-") {
//             tokens.push({ type: "subtract", val: x });
//         } else if (x == "(") {
//             tokens.push({ type: "left", val: x });
//         } else if (x == ")") {
//             tokens.push({ type: "right", val: x });
//         } else if (x == ".") {
//             tokens.push({ type: "decimal", val: x });
//         } else if (x == "⁻") {
//             tokens.push({ type: "unaryMinus", val: x });
//         }else {
//             //Not reachable
//             return "BAD INPUT";
//         }
//     });
//     return tokens;
// }
//#endregion



//#region Parser
//This function represents the starting point of the parser. It parses the entire expression and returns the result.

//NEED TO IMPLEMENT UNITARTY MINUS AND UNDERSTAND PARSER
//NEED TO IMPLEMENT LEFT AND RIGHT
// USED CODE: https://aerbay.medium.com/simple-parsing-calculator-6dbce84946ab
//HIGHEST TO LOWEST  (-), (), *, /, +, -
function parse(tokens) {

    function checkPos() {
        return tokens[cursor];
    }

    function jumpNext() {
        if (tokens[cursor].type !== TokenTypes.EOF) {
            cursor++;
        }
    }

    function parseNumber() {
        let k = checkPos();
        jumpNext();
        return { type: k.type, value: k.value };
    }

    //TODO: IMPLEMENT parethesis parsing and understand tree
    function parsePar() {

    }
    function parseMulDiv() {
        let expr = parseNumber();
        let k = checkPos();
        while (k.type === TokenTypes.MULTIPLY || k.type === TokenTypes.DIVIDE) {
            jumpNext();
            let rhs = parseNumber();
            expr = { type: k.type, left: expr, right: rhs };
            k = checkPos();
        }
        return expr;
    }

    function parseAddSub() {
        let expr = parseMulDiv();
        let k = checkPos();
        while (k.type === TokenTypes.MINUS || k.type === TokenTypes.PLUS) {
            jumpNext();
            let rhs = parseMulDiv();
            expr = { type: k.type, left: expr, right: rhs };
            k = checkPos();
        }
        return expr;
    }

    let output = parseAddSub();
    return output;
}
//#endregion

//#region calculate ATS
function calculate(obj) {
    console.log(obj);
    switch (obj.type) {
        case TokenTypes.NUMBER:
            return parseFloat(obj.value);
        case TokenTypes.PLUS:
            return calculate(obj.left) + calculate(obj.right);
        case TokenTypes.MINUS:
            return calculate(obj.left) - calculate(obj.right);
        case TokenTypes.MULTIPLY:
            return calculate(obj.left) * calculate(obj.right);
        case TokenTypes.DIVIDE:
            return calculate(obj.left) / calculate(obj.right);
        default:
            console.log("BAD INPUT");
    }
}
//#endregion

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.AST = [];
    }

    parse() {
        for (var i = 0; i < this.tokens.length; i++) {
            if (this.tokens[i].type == TokenTypes.NUMBER) {
                continue; // skips numbers
            }
            if (this.tokens[i].type == TokenTypes.PLUS || this.tokens[i].type == TokenTypes.MINUS || 
                this.tokens[i].type == TokenTypes.MULTIPLY ||  this.tokens[i].type == TokenTypes.DIVIDE) {
                this.AST.push(new OPP(this.tokens[i], this.tokens[i - 1], this.tokens[i + 1]));
            }
        }
    }
}

class OPP {
    constructor(token, left, right) {
        this.type = token.type;
        this.value = token.value;
        this.left = left;
        this.right = right;
    }

    evaluate() {
        // perform operation and return literal node
    }
}

class Literal {
    constructor(token) {
        this.type = "LITERAL";
        this.val = token.val;
    }
}