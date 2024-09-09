const form = document.querySelector("form");
const search_field = document.querySelector("#search");
const API_KEY_FIELD = document.querySelector("#API_KEY");
const weather_data_div = document.querySelector("#weather-data");
const weather_location_div = document.querySelector("#weather-location");
const weather_loading_div = document.querySelector("#weather-loading");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search_field.value;
  const API_KEY = API_KEY_FIELD.value;
  // Clear header and data
  clearDisplay();
  weather_loading_div.style.display = "inline";
  getWeatherData(location, API_KEY).then(updateDisplay);
});

function clearDisplay() {
  weather_data_div.innerHTML = "";
  weather_location_div.innerHTML = "";
}
async function getWeatherData(location, API_KEY) {
  try {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
    const response = await fetch(URL, { mode: "cors" });
    weather_loading_div.style.display = "none";
    if (response.status != 200) {
      const par = document.createElement("P");
      par.textContent = `Server status:${response.status}`;
      weather_data_div.appendChild(par);
      throw new Error(`status: ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

function createHeaderTitle(location_text) {
  const location_h1 = document.createElement("h1");
  location_h1.textContent = location_text;
  weather_location_div.appendChild(location_h1);
}

function createDisplayHeader() {
  // Create DOM elements for Header
  const header_div = document.createElement("div");
  const date_par = document.createElement("p");
  const day_par = document.createElement("p");
  const icon_par = document.createElement("p");
  const chane_of_rain_par = document.createElement("p");
  const humidity_par = document.createElement("p");
  const temp_par = document.createElement("p");

  // Add info to DOM elements for header
  header_div.id = "weather-data-header";
  date_par.textContent = "DATE";
  day_par.textContent = "DAY";
  icon_par.textContent = "ICON";
  chane_of_rain_par.textContent = "CHANCE OF RAIN";
  humidity_par.textContent = "HUMIDITY";
  temp_par.textContent = "TEMPERATURE";

  // Add header elements to header div
  header_div.appendChild(date_par);
  header_div.appendChild(day_par);
  header_div.appendChild(icon_par);
  header_div.appendChild(chane_of_rain_par);
  header_div.appendChild(humidity_par);
  header_div.appendChild(temp_par);

  // append header div to weather data div
  weather_data_div.appendChild(header_div);
}

function updateDisplay(weather_data) {
  if (weather_data != undefined) {
    createHeaderTitle(weather_data.resolvedAddress);
    createDisplayHeader();
    for (const daily_data of weather_data.days) {
      createDayDisplay(daily_data);
    }
  } else {
    throw new Error("Weather Data undefined");
  }
}

function createDayDisplay(weather_day) {
  // Create DOM elements
  const day_div = document.createElement("div");

  const date_par = document.createElement("p");
  const day_par = document.createElement("p");
  const icon = document.createElement("img");
  const chance_of_rain_par = document.createElement("p");
  const humidity_par = document.createElement("p");
  const temperature_par = document.createElement("p");

  // Update DOM elements with info
  day_div.className = "daily";
  date_par.textContent = weather_day.datetime;
  day_par.textContent = getDayofWeek(weather_day.datetime);
  icon.src = `images/${weather_day.icon}.svg`;
  chance_of_rain_par.textContent = `${weather_day.precipprob}%`;
  humidity_par.textContent = `${weather_day.humidity}%`;
  temperature_par.textContent = `${weather_day.temp}°F`;

  // Add DOM elements to div
  day_div.appendChild(date_par);
  day_div.appendChild(day_par);
  day_div.appendChild(icon);
  day_div.appendChild(chance_of_rain_par);
  day_div.appendChild(humidity_par);
  day_div.appendChild(temperature_par);

  weather_data_div.appendChild(day_div);
}

function getDayofWeek(date_str) {
  let parts = date_str.split("-");
  let year = parseInt(parts[0], 10);
  let month = parseInt(parts[1], 10);
  let day = parseInt(parts[2], 10);

  // Create a new Date object (Note: month is 0-indexed in JavaScript)
  let date = new Date(year, month - 1, day);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

// function getWeatherData(location, API_KEY) {
//   const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`;
//   fetch(URL, { mode: "cors" })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
