'use strict'

const weatherForm = document.getElementById("weatherForm")

function catchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=683ab985d7494deabd4ff0c0fd9208cf&units=metric`)
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.main.feels_like >= 10) {
        console.log(`It's nice to live in ${city}`)
      }
      else if (res.main.feels_like < 10) {
        console.log(`freezin my ass in ${city}`);
      }
    })
    .catch((err) => {console.log("sorry but this city doesn't exist and we don't have weather stations yet on Jupiter")})
}

weatherForm.addEventListener("submit", (event) => {
  let userCity = document.getElementById("city");
  catchWeather(userCity.value)
  userCity.value = ""
  event.preventDefault();
})