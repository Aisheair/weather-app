//3a88da9fbcec4e01119f57e37d147be9
//API 

const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3a88da9fbcec4e01119f57e37d147be9";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error)
        }
    }
    else[
        displayError("Please enter a city")
    ]

})

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl)

    if(!response.ok){
        throw new Error("Could Not Find The City")
    }
    else{
        return await response.json();
    }
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data
       
           card.textContent = "",
           card.style.display = "flex"

           const cityDisplay = document.createElement("h1")
           const tempDisplay = document.createElement("p")
           const humidityDisplay = document.createElement("p")
           const desDisplay = document.createElement("p")
           const weatherEmoji = document.createElement("p")
            cityDisplay.textContent = city;
            tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            desDisplay.textContent = description;
            weatherEmoji.textContent = getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay")
            tempDisplay.classList.add("tempdisplay")
            humidityDisplay.classList.add("humidityDisplay")
            desDisplay.classList.add("humidityDisplay")
            weatherEmoji.classList.add("weatherEmoji")

            card.appendChild(cityDisplay)
            card.appendChild(tempDisplay)
            card.appendChild(humidityDisplay)
            card.appendChild(desDisplay)
            card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";
    
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";
            
        case (weatherid >= 500 && weatherid < 600):
            return "🌧️";
            
        case (weatherid >= 600 && weatherid < 700):
            return "🌨️";
            
        case (weatherid >= 700 && weatherid < 800):
            return "🌫️";
            
        case (weatherid == 800):
            return "☀️";

        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
                
            default:
                return "⁉️"
            
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay")

    card.textContent = "";
    card.style.display ="flex"
    card.appendChild(errorDisplay);

}
