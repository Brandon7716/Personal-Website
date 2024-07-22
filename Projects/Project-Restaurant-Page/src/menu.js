import burger from "./images/burger.jpg";
import cheeseCake from "./images/cheese-cake.jpg";
import fishSalad from "./images/fish-salad.jpg";
import frenchToast from "./images/french-toast.jpg";
import pancake from "./images/pancake.jpg";
import pizza from "./images/pizza.jpg";
import fish from "./images/fish.jpg";
import skewer from "./images/skewer.jpg";
export function createMenu(container) {
  container.innerHTML = "";
  let menuDiv = document.createElement("div");

  menuDiv.classList.add("menu-container");

  menuDiv.appendChild(createGridElement(pizza, "Pizza"));
  menuDiv.appendChild(createGridElement(burger, "Tasty Burger"));
  menuDiv.appendChild(createGridElement(cheeseCake, "Cheese Cake"));
  menuDiv.appendChild(createGridElement(fishSalad, "Fish Salad"));
  menuDiv.appendChild(createGridElement(frenchToast, "French Toast"));
  menuDiv.appendChild(createGridElement(pancake, "Pancakes"));
  menuDiv.appendChild(createGridElement(fish, "Fish"));
  menuDiv.appendChild(createGridElement(skewer, "Skewer plater"));

  container.appendChild(menuDiv);
}

function createGridElement(foodImg, description) {
  const gridDiv = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = description;
  const image = new Image();
  image.src = foodImg;

  gridDiv.appendChild(image);
  gridDiv.appendChild(p);
  return gridDiv;
}
