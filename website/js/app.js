// Personal API Key for OpenWeatherMap API:
const apiToken = '95ed0460b8368f3354d9bf96c2a9b0b3';
const apiKey = `${apiToken}&units=imperial`;

// Base URL for OpenWeatherMap API:
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

// Obtain specific elements from the DOM:
const inputZipcode = document.querySelector('#zip');
const inputFeeling = document.querySelector('#feelings');
const btnGenerate = document.querySelector('#generate');

// Function called by the event listener of (Generate) button:
const generateNewEntry = () => {
    if (inputZipcode.value !== '') {
        // get the entered zip code:
        const zipCode = inputZipcode.value;

        // fetch web api data:
        try {
            fetchWebData(baseURL, zipCode, apiKey)
                .then(data => {
                    console.log(data);
                });
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
    else {
        console.log('zip code is NOT specified ...');
    }
};

// Event listener for the (Generate) button:
btnGenerate.addEventListener('click', generateNewEntry);

// Function to GET Web API Data:
const fetchWebData = async (baseURL, zipCode, apiKey) => {
    // construct the desired url from given pieces of information:
    const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;

    try {
        // fetch the data from the web api:
        const response = await fetch(url);

        // convert the response data into json data:
        const data = await response.json();

        // check if the response is done successfully:
        if (data.cod !== 200) {
            console.clear();
            window.alert(`Code: ${data.cod}\nMessage: ${data.message}`);
        }
        else {
            return data;
        }

    } catch(error) {
        console.log(`error: ${error}`);
    }
};

/* Function to POST data */

/* Function to GET Project Data */
