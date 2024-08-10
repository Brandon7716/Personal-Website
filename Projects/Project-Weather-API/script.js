const img = document.querySelector("img");
const key = document.querySelector("#key");
let API_KEY;
const search = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  API_KEY = key.value;
  console.log(API_KEY);
  img.src = "loading.gif";
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
      if (response.status == 401) {
        throw new Error("BAD API KEY");
      } else {
        return response.json();
      }
    })
    .then((response) => {
      console.log(response);
      if (response.data.length == 0) {
        img.src = "nothing_found.png";
      } else {
        img.src = response.data.images.original.url;
      }
    })
    .catch((response) => {
      img.src = "bad_key.png";
      console.log(response);
    });

  console.log(term);
}
