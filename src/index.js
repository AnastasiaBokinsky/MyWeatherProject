function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  return hours;
}

function showForecast(response) {
  let hourForecast = response.data.hourly;

  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let hourForecastElement = document.querySelector(`#hourForecast`);
  let forecastHTML = `<div class="row">`;
  let hourForecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42" />
      <span class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max">${Math.round(
          forecastDay.temp.max
        )}°<span class="weather-forecast-temperatures-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
        </span>
      </span>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  hourForecast.forEach(function (forecastHour, index) {
    if (index < 7 && index > 0) {
      hourForecastHTML =
        hourForecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatHour(forecastHour.dt)}:00</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastHour.weather[0].icon
      }@2x.png" alt="" width="42" />
      <span class="weather-forecast-temperatures">
        <span class="weather-forecast-temperatures-max">${Math.round(
          forecastHour.temp
        )}°</span>
        </span>
      </span>
    </div>`;
    }
  });

  hourForecastHTML = hourForecastHTML + `</div>`;
  hourForecastElement.innerHTML = hourForecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showTemperature(response) {
  let templeratureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("h1");
  let descriptionelement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let celsiusTemperature = response.data.main.temp;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  templeratureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionelement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "3a65b7a336c78bcfe61bdbf873b77706";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "82687c37c8541bddb02cdebf6e86a648";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let button = document.querySelector("#my-position");
button.addEventListener("click", getCurrentPosition);
