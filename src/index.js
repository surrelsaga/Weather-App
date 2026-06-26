// import css then webpack later will rebundle into JS code so the dist/ (bundled code) will only have html and js
import "./styles.css"

async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    
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

const endPt = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hanoi?key=6NQ57A6JYZH9425ZWCTGC9ZEZ'

console.log( await processJSON(endPt) );
