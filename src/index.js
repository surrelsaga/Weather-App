// import css then webpack later will rebundle into JS code so the dist/ (bundled code) will only have html and js
import "./styles.css"

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
    
    return json;
}

async function processJSON(url) {
    const json = await fetchData(url);
    const tempC = (json.currentConditions.temp - 32) * 5 / 9;

    return {
        "location": json.address,
        "tempF": json.currentConditions.temp,
        "tempC": tempC,
        "weatherDesc": json.currentConditions.conditions,
        "icon": json.currentConditions.icon
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

    processJSON(endPt).then((resultObject) => {
        console.log( resultObject.location );
    });
});
