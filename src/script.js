console.log("Hello!");

let lastUpdateText = document.querySelector("#last-update");
async function fetchLastUpdate() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Brandon7716/Personal-Website/branches/master"
    );
    const data = await response.json();
    const date = data.commit.commit.author.date;

    // Format the date as "Month Day, Year"
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long", // Full month name
      day: "numeric", // Day of the month
      year: "numeric", // Full year
    });

    lastUpdateText.textContent = formattedDate;
    console.log(formattedDate);
  } catch (error) {
    lastUpdateText.textContent = `Error: ${error.message}`;
    console.error("Error fetching last update:", error);
  }
}

// Call it
fetchLastUpdate();
