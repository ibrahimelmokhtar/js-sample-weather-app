// Personal API Key for OpenWeatherMap API

// Obtain specific elements from the DOM:
const inputZipcode = document.querySelector('#zip');
const inputFeeling = document.querySelector('#feelings');
const btnGenerate = document.querySelector('#generate');

// Function called by the event listener of (Generate) button:
const generateNewEntry = () => {
    console.log('Button clicked ...');
    console.log(inputZipcode.value);
    console.log(inputFeeling.value);
};

// Event listener for the (Generate) button:
btnGenerate.addEventListener('click', generateNewEntry);

/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to GET Project Data */
