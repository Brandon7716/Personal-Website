import profilePic from "./images/main-pic.png";

export function createHome(container) {
  container.innerHTML = "";
  const homeDiv = document.createElement("div");
  homeDiv.classList.add("home-container");
  container.appendChild(homeDiv);

  const para = document.createElement("p");
  para.textContent =
    "The finest pizza in our land, crafted with love and expertise since 1908. Made fresh to order, everytime!";
  homeDiv.appendChild(para);

  const image = new Image();
  image.src = profilePic;
  homeDiv.appendChild(image);

  const para2 = document.createElement("p");
  para2.textContent = "Order online or visit us!";
  homeDiv.appendChild(para2);
}
