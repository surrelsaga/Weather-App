// import css then webpack later will rebundle into JS code so the dist/ (bundled code) will only have html and js
import "./styles.css"

const weatherResult = document.querySelector('.weather-result');
const loadingDisplay = document.querySelector('#loading');

// maps weatherData.icon values to a background css class
const iconToBgClass = {
    'clear-day': 'bg-clear',
    'clear-night': 'bg-night',
    'partly-cloudy-day': 'bg-cloudy',
    'partly-cloudy-night': 'bg-night',
    'cloudy': 'bg-cloudy',
    'rain': 'bg-rain',
    'showers-day': 'bg-rain',
    'showers-night': 'bg-rain',
    'thunder-rain': 'bg-rain',
    'snow': 'bg-snow',
    'snow-showers-day': 'bg-snow',
    'snow-showers-night': 'bg-snow',
    'fog': 'bg-fog',
    'wind': 'bg-cloudy'
};

function setBackground(icon) {
    // remove any existing bg-* class, then add the matching one
    document.body.classList.forEach((cls) => {
        if (cls.startsWith('bg-')) document.body.classList.remove(cls);
    });
    document.body.classList.add(iconToBgClass[icon] || 'bg-default');
}

async function fetchData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=6NQ57A6JYZH9425ZWCTGC9ZEZ`;

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

async function processData(location) {
    loadingDisplay.style.display = 'block';

    try {
        const weatherData = await fetchData(location);

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

function renderData(dataObject, unit) {
    // if data does not exist
    if(!dataObject) return;
    // change bg color
    setBackground(dataObject.icon);

    const temp = (unit === 'C') ? `${dataObject.tempC} °C` : `${dataObject.tempF} °F`;

    // render on the page
    weatherResult.innerHTML = `
        <div class="weather-card">
            <h3>${dataObject.location}</h3>
            <p id="temp">${temp}</p>
            <p>${dataObject.weatherDesc}</p>
        </div>
    `;
}

async function loadData(location) {
    try {
        const dataObject = await processData(location);
        if(!dataObject !== undefined) {
            currentData = dataObject;
            renderData(currentData, currentTempUnit);
        }
    } catch (error) {
        console.log(error);
    }
}

const locationForm = document.querySelector('form');
const locationInput = document.querySelector('#location-input');
const toggleUnitBtn = document.querySelector('#toggle-unit');

let location;
let currentTempUnit = 'C'; // by default the unit is celsius
let currentData; // to store current loaded data

locationForm.addEventListener('submit', (event) => {
    // prevent default behavior of a form
    event.preventDefault();

    // read in the input value
    location = locationInput.value.trim();

    loadData(location);
});


toggleUnitBtn.addEventListener('click', () => {
    if(currentTempUnit === 'C') {
        currentTempUnit = 'F';
    } else if(currentTempUnit === 'F') {
        currentTempUnit = 'C';
    }

    const tempDisplay = document.querySelector('#temp');
    if(tempDisplay) {
        renderData(currentData, currentTempUnit);
    }
});
