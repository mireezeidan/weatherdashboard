// global variable
// places youre going to attach data to
let searchBtn = document.querySelector("#searchBtn");
let searchDiv = document.querySelector("#searchDiv");
let recentSearchDiv = document.querySelector("#recentSearches");
let cityDiv = document.querySelector("#cityDiv");
let searchText = document.querySelector("#searchText");
let forecastCard = document.querySelector("#forecastCard");
let currentTemp = document.querySelector("#currentTemp");
let currentHumi = document.querySelector("#currentHumi");
let currentWind = document.querySelector("#currentWind");
let cities = JSON.parse(localStorage.getItem("cities")) || [];

// functions
function init() {
  // grab last search results from local storage and put on left side of page
  cities.forEach((city) => {
    let cityBtn = document.createElement("button");
    cityBtn.innerHTML += `${city}`;
    recentSearchDiv.append(cityBtn);
  });
}

function citySearch() {
  // set assign variable to value of textbox on html page
  let city = document.querySelector("#searchInput").value;
  document.querySelector("#searchInput").value = "";
  console.log(city);

  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  cityDiv.classList.remove("hidden");
  forecastCard.classList.remove("hidden");

  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      currentTemp.innerHTML = `Temp: ${data.list[0].main.temp}`;
      currentHumi.innerHTML = `Humidity ${data.list[0].main.humidity}`;
      currentWind.innerHTML = `Wind Speed: ${data.list[0].wind.speed}`;

      // 5 day forecast
      data.list.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        if (midnight === "00:00:00") {
          let dayCard = document.createElement("div");
          dayCard.innerHTML += `<h3>${day.dt_txt}</h3>`;
          // dayCard.innerHTML += `<img>${day.weather.icon}</img>`;
          dayCard.innerHTML += `<p>Temp: ${day.main.temp}</p>`;
          dayCard.innerHTML += `<p>Humidity: ${day.main.humidity}</p>`;

          forecastCard.append(dayCard);
        }
      });
    });
}

// function prevCity() {
//   let city = cityBtn.innerHTML;
//   let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=517f19dc586407c39701b016a6edf914&units=imperial`;

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data2) {
//       console.log(data2);

//       currentTemp.innerHTML = `Temp: ${data2.list[0].main.temp}`;
//       currentHumi.innerHTML = `Humidity ${data2.list[0].main.humidity}`;
//       currentWind.innerHTML = `Wind Speed: ${data2.list[0].wind.speed}`;
//     });
// }

// function calls
// event listeners
init();

// search button event listener
searchBtn.addEventListener("click", citySearch);
// click on past search buttons, does same as clicking on search button
// cityBtn.addEventListener("click", prevCity);
