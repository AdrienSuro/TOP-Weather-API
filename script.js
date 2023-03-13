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
const description = document.getElementById("description")


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
  else if (info.weather[0].id >= 300 && info.weather[0].id < 400) {
    console.log("Drizzle")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/09d@2x.png")
    body.classList.add("drizzle")
  }
  else if (info.weather[0].id >= 500 && info.weather[0].id < 600) {
    console.log("rain")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/10d@2x.png")
    body.classList.add("rain")
  }
  else if (info.weather[0].id >= 600 && info.weather[0].id < 700) {
    console.log("snow")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/13d@2x.png")
    body.classList.add("snow")
  }
  else if (info.weather[0].id >= 700 && info.weather[0].id < 800) {
    console.log("fog")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/50d@2x.png")
    body.classList.add("fog")
  }
  else if (info.weather[0].id === 800) {
    console.log("clear sky")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/01n@2x.png")
    body.classList.add("clearskynight")
  }
  else if (info.weather[0].id === 801 || info.weather[0].id === 802) {
    console.log("few clouds")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/02d@2x.png")
    body.classList.add("fewclouds")
  }
  else if (info.weather[0].id === 803 || info.weather[0].id === 804) {
    console.log("heavy clouds")
    skyimg.setAttribute("src", "https://openweathermap.org/img/wn/04d@2x.png")
    body.classList.add("heavyclouds")
  }

  () => {
    let capitalizedDescription = info.weather[0].description ;
    capitalizedDescription = capitalizedDescription.charAt(0).toUpperCase() + capitalizedDescription.slice(1);
    return capitalizedDescription
  }

  function capitalizedString() {
    let capitalizedDescription = info.weather[0].description ;
    capitalizedDescription = capitalizedDescription.charAt(0).toUpperCase() + capitalizedDescription.slice(1);
    return capitalizedDescription
  }
  
  locationtext.innerHTML = info.name ; 
  description.innerHTML = capitalizedString();
  tempdiv.innerHTML = Math.round(info.main.temp) + " °C" ;
  clouds.innerHTML = info.clouds.all + " %" ;
  humidity.innerHTML = info.main.humidity + " %" ;
  pressure.innerHTML = info.main.pressure + " hPa" ; 
  wind.innerHTML = Math.round(info.wind.speed) + " km/h" ;
}