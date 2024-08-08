const img = document.querySelector("img");
const key = document.querySelector("#key");
let API_KEY;
const search = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  API_KEY = key.value;
  console.log(API_KEY);
  searchCB(search.value);
});

function searchCB(term) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${term}}`,
    {
      mode: "cors",
    }
  )
    .then((response) => {
      img.src = "loading.gif";
      return response.json();
    })
    .then((response) => {
      img.src = response.data.images.original.url;
    });

  console.log(term);
}
