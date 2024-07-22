let container = document.querySelector("#container");
let colorSelect = document.querySelector("#color-select");
let colorChoice = "rgb(255,255,255)";
let eraseBtn = document.querySelector("#erase");
let slider = document.querySelector("#grideSlider");
let sliderText = document.querySelector("#slider-text");
const DEFAULT_GRIDSIZE = 10;
const DEFAULT_COLORSIZE = 48;
  



// n = width and height. so n^2 is size
function createGrid(n) {
    let divArr = []
    // computes the width of the container to fit each div in a grid
    let size = Number((getComputedStyle(container).width.slice(0, -2))) / n;
    for (let i = 0; i < n ** 2; i++) {
        let div = document.createElement("div");

        // Need both so you can also click and change color
        div.addEventListener("mouseover", changeColor);
        div.addEventListener("mousedown", changeColor);
        //CSS Styling
        div.style.background = randomColor();
        div.style.height = `${size}px`;
        div.style.width = `${size}px`;
        divArr.push(div);
        container.appendChild(div);
    }
    return divArr;
}

function changeColor(e) {
    if(e.buttons){
        e.target.style.background = colorChoice;
    }
}


function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function addRandomColor(divArr) {
    divArr.forEach(div => {
        div.style.background = randomColor();
    });
}

function createColorChoice(num1 = DEFAULT_COLORSIZE) {
    let colorArr = []
    for (let i = 0; i < num1-1; i++) {
        let colorBtn = document.createElement("button");
        let color = randomColor();
        colorBtn.style.background = color;
        colorBtn.style.width = `${100}px`;
        colorBtn.style.height = `${50}px`;
        colorBtn.textContent = color;

        colorBtn.addEventListener("click", (e) => {
            colorChoice = color;
        });

        colorArr.push(colorBtn);
        colorSelect.appendChild(colorBtn);
    }

    // Adds a white button so you can always erase
    let whiteBtn = document.createElement("button");
    let white = "rgb(255, 255, 255)"
    whiteBtn.style.background = white;
    whiteBtn.style.width = `${100}px`;
    whiteBtn.style.height = `${50}px`;
    whiteBtn.textContent = "ERASE";

    whiteBtn.addEventListener("click", (e) => {
        colorChoice = white;
    });

    colorArr.push(whiteBtn);
    colorSelect.appendChild(whiteBtn);
    return colorArr;

}

function eraseGrid() {
    divArr.forEach(div => {
        div.style.background = "rgb(255,255,255)";
    });

}

function changeGridSize(event) {
    //clears the inner grid elements
    container.innerHTML = "";
    divArr = createGrid(Math.round(event.target.value));
}

// used to update the text on input 
function changeText(event) {
    sliderText.textContent = `Current size: ${slider.value} x ${slider.value}`;
}

eraseBtn.addEventListener("click", eraseGrid);
slider.addEventListener("change", changeGridSize);
slider.addEventListener("input", changeText);

let divArr = createGrid(DEFAULT_GRIDSIZE);
let colorArr = createColorChoice(DEFAULT_COLORSIZE);
sliderText.textContent = `Current size: ${slider.value} x ${slider.value}`;

// addRandomColor(divArr);