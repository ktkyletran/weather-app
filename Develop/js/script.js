var citySearchEl = document.querySelector(".city-search");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");
var forecastEl = document.querySelector("#forecast");
var iconEl = document.querySelector("#icon");
var key = "03a43800a0b030ada65e542c5792a23b"

var weather = {
    temperature: {
        value: "",
    },
    windspeed: "",
    description: "",
    city: "",
    humidity: "",
    uv: "",
    description: "",
    iconId: "",
    uv: ""
};

var coords = {
    latitude: "",
    longitude: ""
}

var dailyForecast = {};


function search() {
    var city = citySearchEl.value.trim();

    if (city) {
        getWeather(city);

        citySearchEl.textContent = "";

    } else {
        alert("Please enter a valid city")
    }
};


function getWeather(city) {
    var KELVIN = 273;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    fetch(apiUrl)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.city = data.name;
        weather.temperature.value = (Math.floor((data.main.temp - KELVIN) * 9/5 + 32));
        weather.humidity = data.main.humidity;
        weather.windspeed = data.wind.speed;
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        coords.latitude = data.coord.lat;
        coords.longitude = data.coord.lon;
    })
    .then(function(){
        displayWeather();
        getUv();
    })
};

function getUv() {
    var uvApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely,alerts&appid=${key}`

    fetch(uvApi)
    .then(function(response){
        let uvData = response.json();
        console.log(uvData);
        return uvData;
    })
    .then(function(uvData){
        weather.uv = uvData.current.uvi;
        dailyForecast = uvData.daily[0-5];
    })
    .then(function(){
        displayUv();
    })
}

function displayWeather() {
    var cityName = document.createElement("h1");
    var temperature = document.createElement("h5");
    var humidity = document.createElement("h5");
    var windspeed = document.createElement("h5");
    var description = document.createElement("h5");
    var icon = document.createElement("img")

    cityName.textContent = `${weather.city}`;
    description.textContent = `Sky: ${weather.description}`;
    temperature.textContent =  `Temperature: ${weather.temperature.value}°F`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    windspeed.textContent = `Windspeed: ${weather.windspeed} MPH`;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.iconId}@2x.png`);

    descriptionEl.append(description);
    cityEl.append(cityName);
    tempEl.append(temperature);
    humidEl.append(humidity);
    windEl.append(windspeed);
    iconEl.append(icon);
};

function displayUv() {
    var uvIndex = document.createElement("h5");

    uvIndex.textContent = `UV: ${weather.uv}`;

    uvEl.append(uvIndex);
}

// function displayForecast() {
//     for (var i = 0; i < 6; i++) {
//         var createDiv = document.createElement("div");
//         var forecastTemp = document.createElement("p");
        
//         createDiv.textContent = forecastTemp;
//         forecastTemp.textContent = `${weather.city}`;

//         createDiv.append(forecast)
//         forecastEl.append(createDiv);
//     }

// }

citySearchEl.addEventListener("keypress", function (e){
    if (e.key === "Enter") {
        search();
    }
});