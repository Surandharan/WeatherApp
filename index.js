const apiKey = "db64bb6612d9d44056f6bec403faa052";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
    apiCall(searchBox.value);
})

const apiCall = async (city) => {
    if(city == "") return;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    if(response.status == 404) {
        document.querySelector(".error").style.display="block";
        return;
    }

    document.querySelector(".error").style.display="none";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    if(data.weather[0].main == "Fog"){
        weatherIcon.src = "images/mist.png";
    }
}

apiCall("Sydney");
