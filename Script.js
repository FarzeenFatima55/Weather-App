const API_KEY = "0ddf2ee44b53dafd83134772040d8aad";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Fetching HTML elements
const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchbtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("weatherDisplay"); 
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

// Weather display elements
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity"); 
const windspeed = document.getElementById("windspeed"); 

// Event listeners
searchbtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Handle search function
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  // Clear previous results and show loading
  hideAllsections();
  showLoading();
  fetchWeatherData(city);
}

// Fetch weather data function
async function fetchWeatherData(city) {
  try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      // Handle errors
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling again.");
      } else if (response.status === 401) {
        throw new Error("Invalid API Key.");
      } else {
        throw new Error("Failed to fetch weather data.");
      }
    }

    // Parse JSON data
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    hideLoading();
    showError(error.message);
  }
}

// Display weather function
function displayWeatherData(data) {
  hideLoading();

  // Extract data from the API response
  const cityNameText = `${data.name}, ${data.sys.country}`;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const feelsLikeTemp = Math.round(data.main.feels_like);
  const humidityValue = data.main.humidity;
  const windSpeedValue = Math.round(data.wind.speed);

  //  DOM elements
  cityName.textContent = cityNameText;
  temperature.textContent = temp;
  weatherDescription.textContent = description;
  feelslike.textContent = feelsLikeTemp;
  humidity.textContent = humidityValue;
  windspeed.textContent = windSpeedValue;

  showWeatherDisplay();
}

// Show loading
function showLoading() {
  loading.classList.remove('hidden');
}

// Hide loading
function hideLoading() {
  loading.classList.add('hidden');
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  error.classList.remove('hidden');
}

// Hide error
function hideError() {
  error.classList.add("hidden");
}

// Show weather display
function showWeatherDisplay() {
  weatherDisplay.classList.remove("hidden");
}

// Hide weather display
function hideWeatherDisplay() {
  weatherDisplay.classList.add("hidden");
}

// Hide all sections
function hideAllsections() {
  hideLoading();
  hideError();
  hideWeatherDisplay();
}

// Clear input field
function clearInput() {
  cityInput.value = "";
}

// Test with sample data
function testWithSampleData() {
  const sampleData = {
    name: "London",
    sys: { country: "GB" },
    main: {
      temp: 15.5,
      feels_like: 13.2,
      humidity: 78
    },
    weather: [{ description: "partly cloudy" }],
    wind: { speed: 3.5 }
  };

  displayWeatherData(sampleData);
}
