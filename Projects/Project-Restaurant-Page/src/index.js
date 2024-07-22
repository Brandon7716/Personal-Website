import { createHome } from "./home.js";
import { createMenu } from "./menu.js";
import { createContact } from "./contact.js";
// Must use this for dist to output style.css
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const main = document.querySelector("#main");
const btnHome = document.querySelector("#btn-home");
const btnMenu = document.querySelector("#btn-menu");
const btnContact = document.querySelector("#btn-contact");

btnHome.addEventListener("click", () => createHome(main));
btnMenu.addEventListener("click", () => createMenu(main));
btnContact.addEventListener("click", () => createContact(main));

createHome(main);
