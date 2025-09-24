let todayName = document.getElementById("today-date-day-name")
let todayNumber = document.getElementById("today-date-day-number")
let todayMonth = document.getElementById("today-date-month")
let todayLocation = document.getElementById("today-location")
let todayTemp = document.getElementById("today-temp")
let todayConditionImg = document.getElementById("today-condition-img")
let todayConditionText = document.getElementById("today-condition-text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind-direction")

// Next Date
let nextDay = document.getElementsByClassName("next-day-name")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextConditionImg = document.getElementsByClassName("next-condition-img")
let nextConditionText = document.getElementsByClassName("next-condition-text")

// Search
let searchInput = document.querySelector(".search-input")


async function getWeatherData(cityName) {
  let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
  let weatherData = await weatherResponse.json()
  return weatherData
}

function displayTodayData(data) {
  let todayDate = new Date()
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {weekday:"long"})
  todayNumber.innerHTML = todayDate.getDate()
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {month:"long"})
  todayLocation.innerHTML = data.location.name
  todayTemp.innerHTML = data.current.temp_c
  todayConditionText.innerHTML = data.current.condition.text
  humidity.innerHTML = data.current.humidity + "%"
  wind.innerHTML = data.current.wind_kph + "km/h"
  windDirection.innerHTML = data.current.wind_dir
  todayConditionImg.src = "https:" + data.current.condition.icon
}

function displayNextData(data) {
  let forecastData = data.forecast.forecastday
  for (let i = 0 ; i < 2 ; i++)
     {
    let nextDate = new Date(forecastData[i+1].date)
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" })
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c
    nextConditionImg[i].setAttribute("src", "https:" + forecastData[i + 1].day.condition.icon)
    nextConditionText[i].innerHTML = forecastData[i + 1].day.condition.text
  }
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city)
  displayTodayData(weatherData)
  displayNextData(weatherData)
}

startApp()  


searchInput.addEventListener("input",function(){
  // console.log(searchInput.value)
  startApp(searchInput.value)
})