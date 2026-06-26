// import css then webpack later will rebundle into JS code so the dist/ (bundled code) will only have html and js
import "./styles.css"

const weatherResult = document.querySelector('.weather-result');
const loadingDisplay = document.querySelector('#loading');

async function fetchData(url) {
    try {
        const response = await fetch(url);

        // check if the HTTP get request return status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weatherData = await response.json();

        return weatherData;
    } catch (error) {
        console.log(`Got this error: ${error}`);

        // later base on this to display weather search result
        return null
    }
}

async function processData(url) {
    loadingDisplay.style.display = 'block';

    try {
        const weatherData = await fetchData(url);

        // from fetchData above, we return null if there's an error
        if(!weatherData) {
            console.log('Display error (could not fetch weather data) on screen');
            weatherResult.innerHTML = `
            <div class="weather-card">
                <p>Could not find the location. Try again!</p>
            </div>
            `;
            
            return;
        }
        
        // if there's no error, then return an object 
        // containing all data that need to be displayed
        let tempC = (weatherData.currentConditions.temp - 32) * 5 / 9;
        tempC = tempC.toFixed(1); //round up to 1 decimal place

        return {
            "location": weatherData.address,
            "tempF": weatherData.currentConditions.temp,
            "tempC": tempC,
            "weatherDesc": weatherData.currentConditions.conditions,
            "icon": weatherData.currentConditions.icon
        }

    } finally {
        loadingDisplay.style.display = 'none';
    }
}

async function displayData(url) {
    const dataObject = await processData(url);

    if(dataObject !== undefined) {
        weatherResult.innerHTML = `
            <div class="weather-card">
                <h3>${dataObject.location}</h3>
                <p>${dataObject["tempC"]}</p>
                <p>${dataObject.weatherDesc}</p>
            </div>
        `;
    }
}


const locationForm = document.querySelector('form');
const locationInput = document.querySelector('#location-input');

locationForm.addEventListener('submit', (event) => {
    // prevent default behavior of a form
    event.preventDefault();

    // read in the input value
    const location = locationInput.value.trim();

    const endPt = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=6NQ57A6JYZH9425ZWCTGC9ZEZ`;

    displayData(endPt);
});
