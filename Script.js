const API_KEY = "we will bring this later"
const API_URL = "https://api.openweathermap.org/data/2.5/weather"

// fetching html elements
const cityInput = document.getElementById("cityInput")
const searchbtn = document.getElementById("searchbtn")
const weatherDisplay = document.getElementById("weatherDisplay")
const loading = document.getElementById("weatherDisplay")
const error= document.getElementById("error")
const errorMessage= document.getElementById("errorMessage")

//weather display elements
const CityName = document.getElementById("cityName")
const temperature= document.getElementById("temperature")
const weatherDescription= document.getElementById("weatherDescription")
const feelslike = document.getElementById("feelsLike")
const humidity = document.getElementById("WindSpeed")

searchbtn.addEventListener("click" ,handleSearch) 
//declaring the handlesearch function

function handleSearch(){
    const city=cityInput.ariaValueMax
}