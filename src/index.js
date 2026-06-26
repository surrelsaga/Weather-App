// import css then webpack later will rebundle into JS code so the dist/ (bundled code) will only have html and js
import "./styles.css"

async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();

    console.log(json.latitude);

    return json;
}

function processJSON(url) {
    // this code is wrong
    // the return of then() is still another promise
    // to actually access the value of the async fetchData json promise
    // we need to access inside .then()
    const json = fetchData(url).then((resultJson) => resultJson);
    const latitude = json.latitude;
    console.log(latitude);

    // correct code
    fetchData(url).then((resultJson) => {
        const latitude = resultJson.latitude;
        console.log(latitude)
    });

}

const endPt = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hanoi?key=6NQ57A6JYZH9425ZWCTGC9ZEZ'

processJSON(endPt);
