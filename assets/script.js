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
let cityName = document.querySelector("#cityName");
// functions
function init() {
  // grab last search results from local storage and put on left side of page
  cities.forEach((city) => {
    let cityBtn = document.createElement("button");
    cityBtn.innerHTML += `${city}`;
    let br = document.createElement("br");
    recentSearchDiv.append(cityBtn);
    recentSearchDiv.append(br);
    cityBtn.classList.add("cityBtn");
    cityBtn.classList.add("border-2");
    cityBtn.classList.add("bg-red-300");
    cityBtn.classList.add("border-red-500");
    cityBtn.classList.add("rounded");
    cityBtn.classList.add("p-1");
    cityBtn.classList.add("mt-2");
    cityBtn.addEventListener("click", prevCity);
  });
}

function citySearch(city) {
  // set assign variable to value of textbox on html page
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
      cityName.innerHTML = `${data.city.name}<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`;
      currentTemp.innerHTML = `Temp: ${data.list[0].main.temp}`;
      currentHumi.innerHTML = `Humidity ${data.list[0].main.humidity}`;
      currentWind.innerHTML = `Wind Speed: ${data.list[0].wind.speed}`;
      forecastCard.innerHTML = "";
      // 5 day forecast
      data.list.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        if (midnight === "00:00:00") {
          let dayCard = document.createElement("div");
          dayCard.classList.add("col-span-2");
          dayCard.innerHTML += `<h3>${day.dt_txt}</h3>`;
          // dayCard.innerHTML += `<img>${day.weather.icon}</img>`;
          dayCard.innerHTML += `<p>Temp: ${day.main.temp}</p>`;
          dayCard.innerHTML += `<p>Humidity: ${day.main.humidity}</p>`;

          forecastCard.append(dayCard);
        }
      });
    });
}

function prevCity() {
  let city = this.textContent;
  citySearch(city);
}

// function calls
// event listeners
init();

// search button event listener
searchBtn.addEventListener("click", function () {
  let city = document.querySelector("#searchInput").value;
  document.querySelector("#searchInput").value = "";
  citySearch(city);
});
// click on past search buttons, does same as clicking on search button
