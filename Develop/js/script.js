var citySearchEl = document.querySelector(".city-search");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");
var forecastEl = document.getElementById("#forecast");


var weather = {
    temperature: {
        value: 55,
    },
    windspeed: 5,
    description: "Sunny",
    city: "Houston",
    humidity: 41,
    uv: "",
    description: ""

};

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
    var key = "03a43800a0b030ada65e542c5792a23b"
    var KELVIN = 273;
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    fetch(apiUrl)
    .then(function(response){
        let data = response.json();
        console.log(data)
        return data;
    })
    .then(function(data){
        weather.city = data.name;
        weather.temperature.value = (Math.floor((data.main.temp - KELVIN) * 9/5 + 32));
        weather.humidity = data.main.humidity;
        weather.windspeed = data.wind.speed;
        weather.description = data.weather[0].description;
    })
    .then(function(){
        displayWeather();
    })
};

function displayWeather() {
    var cityName = document.createElement("h1");
    var temperature = document.createElement("h5");
    var humidity = document.createElement("h5");
    var windspeed = document.createElement("h5");
    var uvIndex = document.createElement("h5");
    var description = document.createElement("h5");

    cityName.textContent = `${weather.city}`;
    description.textContent = `Sky: ${weather.description}`;
    temperature.textContent =  `Temperature: ${weather.temperature.value}°F`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    windspeed.textContent = `Windspeed: ${weather.windspeed} MPH`;
    uvIndex.textContent = `UV: ${weather.uv}`;

    descriptionEl.append(description);
    cityEl.append(cityName);
    tempEl.append(temperature);
    humidEl.append(humidity);
    windEl.append(windspeed);
    uvEl.append(uvIndex);
};

citySearchEl.addEventListener("keypress", function (e){
    if (e.key === "Enter") {
        search();
    }
});