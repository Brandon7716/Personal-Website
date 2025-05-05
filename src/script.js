console.log("Hello!");

let lastUpdateText = document.querySelector("#last-update");
async function fetchLastUpdate() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Brandon7716/Personal-Website/branches/master"
    );
    const data = await response.json();
    const date = data.commit.commit.author.date;
    lastUpdateText.textContent = new Date(date).toLocaleString();
  } catch (error) {
    lastUpdateText.textContent = `Error: ${error.message}`;
    console.error("Error fetching last update:", error);
  }
}

fetchLastUpdate();
