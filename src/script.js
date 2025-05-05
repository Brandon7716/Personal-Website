console.log("Hello!");
let lastUpdateText = document.querySelector("#last-update");
fetch(
  "https://api.github.com/repos/Brandon7716/Personal-Website/branches/master"
)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    let date = res.commit.commit.author.date;
    lastUpdateText.textContent = new Date(date).toLocaleString();
    console.log(date);
  });
