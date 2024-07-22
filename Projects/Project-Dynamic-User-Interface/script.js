let drop_down = document.querySelector("#drop-down");
let menu_items = document.querySelectorAll(".drop-btn");
let slide_items = document.querySelectorAll(".slide");
let left_btn = document.querySelector("#left");
let right_btn = document.querySelector("#right");
let currIndex = 0;
let size = slide_items.length;
let active_btn = document.querySelector("#active-btn");

slide_items[currIndex].style.display = "inline-block";
createBtns(slide_items);
let slide_btns = active_btn.childNodes;

function createBtns(arr) {
  for (let index = 0; index < arr.length; index++) {
    let btn = document.createElement("button");
    btn.setAttribute("data-id", index);
    btn.textContent = index + 1;
    active_btn.appendChild(btn);
    btn.addEventListener("click", function (e) {
      //Update Image being displayed
      hide(slide_items[currIndex]);
      show(slide_items[btn.getAttribute("data-id")]);

      //Turn active slide button back to white
      slide_btns[currIndex].style.background = "white";
      //Update new slide button
      e.target.style.background = "yellow";
      currIndex = btn.getAttribute("data-id");
    });
  }
}

function show(e) {
  e.style.display = "inline-block";
  console.log(e);
  console.log("test");
}

function hide(e) {
  e.style.display = "none";
}

drop_down.addEventListener("click", function () {
  for (const item of menu_items) {
    console.log(item);
    if (item.style.display === "inline-block") {
      item.style.display = "none";
    } else {
      item.style.display = "inline-block";
    }
  }
});

left_btn.addEventListener("click", function () {
  hide(slide_items[currIndex]);
  slide_btns[currIndex].style.background = "white";
  if (currIndex == 0) {
    currIndex = size - 1;
  } else {
    currIndex--;
  }
  show(slide_items[currIndex]);
  slide_btns[currIndex].style.background = "yellow";
});

right_btn.addEventListener("click", function () {
  hide(slide_items[currIndex]);
  slide_btns[currIndex].style.background = "white";
  if (currIndex == size - 1) {
    currIndex = 0;
  } else {
    currIndex++;
  }
  show(slide_items[currIndex]);
  slide_btns[currIndex].style.background = "yellow";
});
