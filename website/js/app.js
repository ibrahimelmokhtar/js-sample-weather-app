/**
 * Start of Global Variables.
 */

// Personal API Key for OpenWeatherMap API:
const apiToken = '95ed0460b8368f3354d9bf96c2a9b0b3';
const apiKey = `${apiToken}&units=imperial`;

// Base URL for OpenWeatherMap API:
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';

// Obtain specific elements from the DOM:
const inputZipcode = document.querySelector('#zip');
const inputFeeling = document.querySelector('#feelings');
const btnGenerate = document.querySelector('#generate');

/**
 * End of Global Variables.
 * Start of Helper Functions.
 */

// Capture data entered by the user from user interface.
const captureUserData = () => {
    // capture user inputs from the website:
    const userData = {
        zipCode: inputZipcode.value,
        feeling: inputFeeling.value,
    };

    // check input is valid:
    if (userData.zipCode !== '') {
        // generate new entry using the entered data:
        generateNewEntry(userData);
    }
    else {
        console.log('zip code is NOT specified ...');
    }
};

// Extract specific parts from date object found in the Web API data.
const extractDate = (dateString) => {
    const date = dateString.split(' ').slice(0, 4).join(' ');

    return date;
};

// Extract specific data from both user data and WEB API data.
const extractDataToPost = (userData, webAPIData) => {
    // extract date from Web API data, formated as: (DayName MONTH DAY YEAR):
    const date = extractDate(Date(webAPIData.dt));

    // data to be posted to the server:
    const combinedData = {
        tempInFahrenheit: webAPIData.main.temp,
        date: date,
        userResponse: userData.feeling,
    };

    return combinedData;
};

//  Display appropriate error message.
const handleErrors = (error) => {
    console.log(`error: ${error}`);
};

/**
 * End of Helper Functions.
 * Start of Main Finctions.
 */

// Function called by the event listener of (Generate) button:
const generateNewEntry = async (userData) => {
    // get the zipcode value:
    const zipCode = userData.zipCode;

    // fetch data from web API:
    try {
        fetchWebData(baseURL, zipCode, apiKey)
        .then(webAPIData => {
            // construct desired data object to be posted:
            const combinedData = extractDataToPost(userData, webAPIData);

            // post constructed data:
            postData('/addEntry', combinedData);
        });
    } catch (error) {
        handleErrors(error);
    }
};

// Function to GET Web API Data:
const fetchWebData = async (baseURL, zipCode, apiKey) => {
    // construct the desired url from given pieces of information:
    const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;

    try {
        // fetch the data from the web api:
        const response = await fetch(url);

        // convert the response data into json data:
        const webAPIData = await response.json();

        // check if the response is done successfully:
        if (webAPIData.cod !== 200) {
            console.clear();
            window.alert(`Code: ${webAPIData.cod}\nMessage: ${webAPIData.message}`);
        }
        else {
            return webAPIData;
        }

    } catch(error) {
            handleErrors(error);
    }
};

// Function to POST data:
const postData = async (url, data) => {
    console.log(data);
};

// Function to GET Project Data:


/**
 * End of Main Functions.
 * Start of Event Listeners.
 */

// Event listener for the (Generate) button:
btnGenerate.addEventListener('click', captureUserData);

/**
 * End of Event Listeners.
 */