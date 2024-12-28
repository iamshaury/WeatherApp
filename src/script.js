const apiKey = "ee347307f4aeee65d8d452e1c6ddeb10";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.getElementById("SearchBox");
const searchBtn = document.getElementById("SearchBtn");
const weathericon = document.getElementById("icon");

async function checkWeather(city) {
  if (!city.trim()) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log(data);

    // Update DOM with weather data
    document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("country").innerHTML = data.sys.country;
    document.getElementById("Humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("feels").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.getElementById("Pressure").innerHTML = data.main.pressure + " hPa";
    document.getElementById("Speed").innerHTML = data.wind.speed + " m/s";

    // Update weather icon based on condition
    if (data.weather[0].main === "Clouds") {
      weathericon.src = "./../assets/partly-cloudy.png";
    } else if (data.weather[0].main === "Clear") {
      weathericon.src = "./../assets/sunny.png";
    } else if (data.weather[0].main === "Rain") {
      weathericon.src = "./../assets/rainy-day.png";
    } else if (data.weather[0].main === "Mist") {
      weathericon.src = "./../assets/foggy-day.png";
    } else if (data.weather[0].main === "Drizzle") {
      weathericon.src = "./../assets/snowflake.png";
    } else {
      weathericon.src = "./../assets/default-weather.png"; // Fallback icon
    }
  } catch (error) {
    console.error(error);
    alert("Unable to fetch weather data. Please check the city name.");
  }
}

// Event listeners for search button and "Enter" key
searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchInput.value);
  }
});
