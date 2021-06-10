var locationHeader = document.getElementById('locationHeader');
var currentWeatherItems = document.getElementById('currentWeatherTxt');
var cityName;
var previousCities = [];

var forecastContainer = document.getElementById('cardContainer');
var previousSearches = document.getElementById('previousSearches');
if(localStorage.getItem('cities') != null){
    previousCities.push(localStorage.getItem('cities'));
    for(city in previousCities){
        var li = document.createElement('li');
        li.textContent= city;
        previousSearches.append(li);
    }
}
var submitBtn = document.getElementById('submitCityBtn');

submitBtn.addEventListener('click', function () {
    var cityNameInput = document.querySelector('#inputCity');
    var cityName = cityNameInput.value.trim();
    previousCities.push(cityName);
    localStorage.setItem('cities', previousCities);
    var li = document.createElement('li');
    li.textContent = cityName;
    previousSearches.append(li);
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=5b85eae79992d4e646d4f2b1a54268fe&units=imperial';
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=5b85eae79992d4e646d4f2b1a54268fe';
    console.log(cityName);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            todaysWeather(data, cityName);
            //calling temp code ==> data.main.temp
        })
    ;

    fetch(forecastUrl)
        .then(function (response){
            return response.json();
        }).then(function (data) {
            appendForecast(data);
            console.log(data);
        })
    ;

    
})

//create todays weather card
function todaysWeather(weatherData, city){
    var weatherIconCode = weatherData.weather[0].icon;
    var iconImage = "http://openweathermap.org/img/w/" + weatherIconCode + ".png";
    locationHeader.textContent = city + ' ('+ moment().format('LL') + ')';
    // document.getElementById('weatherIcon').setAttribute('src', iconImage);
    //Had difficulties trying to pull and utilize icon in the code
    console.log(weatherData.main.temp);
    for(var i=0; i<3; i++){
    var li = document.createElement('li');
    if(i==0){
        li.textContent = 'Temp: ' + weatherData.main.temp; 
    }else if(i==1){
        li.textContent = 'Wind: ' + weatherData.wind.speed + ' MPH';
    }else{
        li.textContent = 'Humidity: '+ weatherData.main.humidity + ' %';
    }
    currentWeatherItems.append(li);
    }
}

//create 5-day forecast cards
function appendForecast(forecast){
    console.log(forecast);
    for(var i=0; i<5; i++){
        var forecastDate = document.createElement('h3');
        forecastDate.textContent = moment.js(forecast.list[i].dt).format('LL');
        forecastContainer.append(forecastDate);
    }
}

{/* <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div> */}