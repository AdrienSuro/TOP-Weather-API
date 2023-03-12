'use strict'

const weatherForm = document.getElementById("weatherForm")
const answerP = document.getElementById("answerP")
const locationtext = document.getElementById("locationtext")
const tempdiv = document.getElementById("tempdiv")
const clouds = document.querySelector(".clouds")
const humidity = document.querySelector(".humidity")
const pressure = document.querySelector(".pressure")
const wind = document.querySelector(".wind")
const body = document.querySelector("body")
const skyimg = document.querySelector("#skyimg")


function catchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=683ab985d7494deabd4ff0c0fd9208cf&units=metric`)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      displayWeatherInfo(res);
    })
    .catch((err) => {answerP.innerHTML = "sorry but this city doesn't exist and we don't have weather stations yet on Jupiter"})
}

weatherForm.addEventListener("submit", (event) => {
  let userCity = document.getElementById("city");
  catchWeather(userCity.value)
  userCity.value = ""
  event.preventDefault();
})

function displayWeatherInfo(info) {
  console.log(info)
  if (info.weather[0].id >= 200 && info.weather[0].id < 300) {
    console.log("thunderstorm")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/11d@2x.png")
    body.classList.add("thunderstorm")
  }
  else if (info.weather[0].id === 800) {
    console.log("clear sky")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/01n@2x.png")
    body.classList.add("clearskynight")
  }
  locationtext.innerHTML = info.name ; 
  tempdiv.innerHTML = Math.round(info.main.temp) + " °C" ;
  clouds.innerHTML = info.clouds.all + " %" ;
  humidity.innerHTML = info.main.humidity + " %" ;
  pressure.innerHTML = info.main.pressure + " hPa" ; 
  wind.innerHTML = Math.round(info.wind.speed) + " km/h" ;
}