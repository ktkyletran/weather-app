var citySearchEl = document.querySelector(".city-search");
var cityEl = document.querySelector("#city");
var descriptionEl = document.querySelector("#description");
var tempEl = document.querySelector("#temp");
var humidEl = document.querySelector("#humid");
var windEl = document.querySelector("#wind");
var uvEl = document.querySelector("#uv");
var forecastEl = document.querySelector("#forecast");
var iconEl = document.querySelector("#icon");
var dateEl = document.querySelector("#date");

var key = "03a43800a0b030ada65e542c5792a23b"
var KELVIN = 273;

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
    uv: "",
    date: ""
};

var coords = {
    latitude: "",
    longitude: ""
};

var forecast = {
    day1: {
        temperature: "",
        humidity: "",
        iconId: ""
    },
    day2: {
        temperature: "",
        humidity: "",
        iconId: ""
    },
    day3: {
        temperature: "",
        humidity: "",
        iconId: ""
    },
    day4: {
        temperature: "",
        humidity: "",
        iconId: ""
    },
    day5: {
        temperature: "",
        humidity: "",
        iconId: ""
    }
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
        weather.iconId = data.weather[0].icon;
        weather.date = moment().format("(MMMM Do, YYYY)");
        coords.latitude = data.coord.lat;
        coords.longitude = data.coord.lon;
        city.id = data.id;
    })
    .then(function(){
        displayWeather();
        getOneCall();
    })
};

function getOneCall() {
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely,alerts&appid=${key}`

    fetch(api)
    .then(function(response){
        let oneCallData = response.json();
        console.log(oneCallData);
        return oneCallData;
    })
    .then(function(oneCallData){
        weather.uv = oneCallData.current.uvi;

        forecast.day1.temperature = (Math.floor((oneCallData.daily[0].temp.day - KELVIN) * 9/5 + 32));
        forecast.day2.temperature = (Math.floor((oneCallData.daily[1].temp.day - KELVIN) * 9/5 + 32));
        forecast.day3.temperature = (Math.floor((oneCallData.daily[2].temp.day - KELVIN) * 9/5 + 32));
        forecast.day4.temperature = (Math.floor((oneCallData.daily[3].temp.day - KELVIN) * 9/5 + 32));
        forecast.day5.temperature = (Math.floor((oneCallData.daily[4].temp.day - KELVIN) * 9/5 + 32));

        forecast.day1.humidity = oneCallData.daily[0].humidity;
        forecast.day2.humidity = oneCallData.daily[1].humidity;
        forecast.day3.humidity = oneCallData.daily[2].humidity;
        forecast.day4.humidity = oneCallData.daily[3].humidity;
        forecast.day5.humidity = oneCallData.daily[4].humidity;

        forecast.day1.iconId = oneCallData.daily[0].weather[0].icon;
        forecast.day2.iconId = oneCallData.daily[1].weather[0].icon;
        forecast.day3.iconId = oneCallData.daily[2].weather[0].icon;
        forecast.day4.iconId = oneCallData.daily[3].weather[0].icon;
        forecast.day5.iconId = oneCallData.daily[4].weather[0].icon; 
    })
    .then(function(){
        displayUv();
        displayForecast();
    })
}

function displayWeather() {
    var cityName = document.createElement("h1");
    var temperature = document.createElement("h5");
    var humidity = document.createElement("h5");
    var windspeed = document.createElement("h5");
    var description = document.createElement("h5");
    var icon = document.createElement("img");
    var date = document.createElement("h6");

    cityName.textContent = `${weather.city}`;
    description.textContent = `${weather.description}`;
    temperature.textContent =  `Temperature: ${weather.temperature.value}°F`;
    humidity.textContent = `Humidity: ${weather.humidity}%`;
    windspeed.textContent = `Windspeed: ${weather.windspeed} MPH`;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weather.iconId}@2x.png`);
    date.textContent = `${weather.date}`

    descriptionEl.append(description);
    cityEl.append(cityName);
    tempEl.append(temperature);
    humidEl.append(humidity);
    windEl.append(windspeed);
    iconEl.append(icon);
    dateEl.append(date);
};

function displayUv() {
    var uvIndex = document.createElement("h5");

    uvIndex.textContent = `UV: ${weather.uv}`;

    uvEl.append(uvIndex);
}

function displayForecast() {
    for (var i = 0; i < 5; i++) {
        var createDiv = document.createElement("div")

        createDiv.id = "day"+(i+1);
        createDiv.className = "forecast-box";

        forecastEl.append(createDiv);
    }

    var date1El = moment().add(1, "d").format("MMMM Do, YYYY");
    var date2El = moment().add(2, "d").format("MMMM Do, YYYY");
    var date3El = moment().add(3, "d").format("MMMM Do, YYYY");
    var date4El = moment().add(4, "d").format("MMMM Do, YYYY");
    var date5El = moment().add(5, "d").format("MMMM Do, YYYY");


    var day1El = document.querySelector("#day1");
    var day2El = document.querySelector("#day2");
    var day3El = document.querySelector("#day3");
    var day4El = document.querySelector("#day4");
    var day5El = document.querySelector("#day5");

    var temp1 = document.createElement("p");
    var humid1 = document.createElement("p");
    var date1 = document.createElement("p");
    var icon1 = document.createElement("img");
    
    var temp2 = document.createElement("p");
    var humid2 = document.createElement("p");
    var date2 = document.createElement("p");
    var icon2 = document.createElement("img");
    
    var temp3 = document.createElement("p");
    var humid3 = document.createElement("p");
    var date3 = document.createElement("p");
    var icon3 = document.createElement("img");

    var temp4 = document.createElement("p");
    var humid4 = document.createElement("p");
    var date4 = document.createElement("p");
    var icon4 = document.createElement("img");

    var temp5 = document.createElement("p");
    var humid5 = document.createElement("p");
    var date5 = document.createElement("p");
    var icon5 = document.createElement("img");

    temp1.textContent = `Temp: ${forecast.day1.temperature}`;
    humid1.textContent = `Humidity: ${forecast.day1.humidity}%`;
    date1.textContent = date1El;
    icon1.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.day1.iconId}.png`);

    temp2.textContent = `Temp: ${forecast.day2.temperature}`;
    humid2.textContent = `Humidity: ${forecast.day2.humidity}%`;
    date2.textContent = date2El;
    icon2.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.day2.iconId}.png`);

    temp3.textContent = `Temp: ${forecast.day3.temperature}`;
    humid3.textContent = `Humidity: ${forecast.day3.humidity}%`;
    date3.textContent = date3El;
    icon3.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.day3.iconId}.png`);

    temp4.textContent = `Temp: ${forecast.day4.temperature}`;
    humid4.textContent = `Humidity: ${forecast.day4.humidity}%`;
    date4.textContent = date4El;
    icon4.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.day4.iconId}.png`);

    temp5.textContent = `Temp: ${forecast.day5.temperature}`;
    humid5.textContent = `Humidity: ${forecast.day5.humidity}%`;
    date5.textContent = date5El;
    icon5.setAttribute("src", `http://openweathermap.org/img/wn/${forecast.day5.iconId}.png`);

    day1El.append(date1, icon1, temp1, humid1);
    day2El.append(date2, icon2, temp2, humid2);
    day3El.append(date3, icon3, temp3, humid3);
    day4El.append(date4, icon4, temp4, humid4);
    day5El.append(date5, icon5, temp5, humid5);

}

function clearSearch() {
    var clearResults = document.querySelector(".results");
    clearResults.innerHTML = "";
}

citySearchEl.addEventListener("keypress", function (e){
    if (e.key === "Enter") {
        search();
        // clearSearch();
    }
});