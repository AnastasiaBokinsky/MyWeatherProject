let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let h6 = document.querySelector("h6");
h6.innerHTML = `${currentDay} ${hour}:${minutes}`;

let dayOfWeek = document.querySelectorAll(`.days`);
Array.from(dayOfWeek).forEach(function (el) {
  [].push.apply(days, days);
  if (el.innerText === "Thu") {
    el.innerText = days[now.getDay() + 1];
  }
  if (el.innerText === "Fri") {
    el.innerText = days[now.getDay() + 2];
  }

  if (el.innerText === "Sat") {
    el.innerText = days[now.getDay() + 3];
  }
  if (el.innerText === "Sun") {
    el.innerText = days[now.getDay() + 4];
  }
  if (el.innerText === "Mon") {
    el.innerText = days[now.getDay() + 5];
  }
});

let hourOfDay = document.querySelectorAll(`.day-hour`);
Array.from(hourOfDay).forEach(function (el) {
  let hours = [
    0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  [].push.apply(hours, hours);
  if (el.innerText === "4pm") {
    el.innerText = `${hours[now.getHours() + 1]}:00`;
  }
  if (el.innerText === "5pm") {
    el.innerText = `${hours[now.getHours() + 2]}:00`;
  }
  if (el.innerText === "6pm") {
    el.innerText = `${hours[now.getHours() + 3]}:00`;
  }
  if (el.innerText === "7pm") {
    el.innerText = `${hours[now.getHours() + 4]}:00`;
  }
  if (el.innerText === "8pm") {
    el.innerText = `${hours[now.getHours() + 5]}:00`;
  }
  if (el.innerText === "9pm") {
    el.innerText = `${hours[now.getHours() + 6]}:00`;
  }
  if (el.innerText === "10pm") {
    el.innerText = `${hours[now.getHours() + 7]}:00`;
  }
  if (el.innerText === "11pm") {
    el.innerText = `${hours[now.getHours() + 8]}:00`;
  }
  if (el.innerText === "12pm") {
    el.innerText = `${hours[now.getHours() + 9]}:00`;
  }
});

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  currentTemp.innerHTML = `${temperature}`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "82687c37c8541bddb02cdebf6e86a648";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function citySearch(event) {
  event.preventDefault();
  let cityName = document.querySelector(`#city-search`);
  let h1 = document.querySelector("h1");

  function displayCityWeather(response) {
    let weatherDiv = document.querySelector("#temperature");
    let temp = Math.round(response.data.main.temp);
    weatherDiv.innerHTML = `${temp}`;
    h1.innerHTML = `${city}`;
  }
  let city = `${cityName.value}`;
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayCityWeather);
}
let cityForm = document.querySelector("#searching-form");
cityForm.addEventListener("submit", citySearch);
