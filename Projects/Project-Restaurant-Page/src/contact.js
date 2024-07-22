export function createContact(container) {
  container.innerHTML = "";
  const contactDiv = document.createElement("div");
  contactDiv.classList.add("contact-container");
  container.appendChild(contactDiv);

  const phone = document.createElement("i");
  phone.className = "fa-solid fa-phone";
  phone.style.color = "#ffa500";
  contactDiv.appendChild(phone);

  const p = document.createElement("p");
  p.textContent = "Phone: 123 456 789";
  contactDiv.appendChild(p);

  const house = document.createElement("i");
  house.className = "fa-solid fa-house";
  house.style.color = "#ffa500";
  contactDiv.appendChild(house);

  const p2 = document.createElement("p");
  p2.textContent = "Address: Hollywood Boulevard 42, Los Angeles, USA";
  contactDiv.appendChild(p2);
}
