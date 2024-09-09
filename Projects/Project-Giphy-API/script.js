const img = document.querySelector("img");
const key = document.querySelector("#key");
let API_KEY;
const search = document.querySelector("#search");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  API_KEY = key.value;
  console.log(API_KEY);
  console.log(search.value);

  img.src = "loading.gif";
  searchCB(search.value);
});

async function searchCB(term) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${term}}`,
      {
        mode: "cors",
      }
    );

    if (response.status == 401) {
      throw new Error("BAD API KEY");
    } else {
      const gifData = await response.json();
      console.log(gifData);
      if (gifData.data.length == 0) {
        img.src = "nothing_found.png";
      } else {
        img.src = gifData.data.images.original.url;
      }
    }
  } catch (error) {
    img.src = "bad_key.png";
    console.log(error);
  }
}
