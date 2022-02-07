/**
 * Start of Global Variables.
 */

// Personal API Key for OpenWeatherMap API:
const apiToken = '95ed0460b8368f3354d9bf96c2a9b0b3';
const apiKey = `${apiToken}&units=imperial`;

// Base URL for OpenWeatherMap API:
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Obtain specific elements from the DOM:
const btnGenerate = document.querySelector('#generate');
const tempUnit = document.querySelector('#temp__unit__selection');
const userInputSelection = document.querySelector('.location__section');
const btnCurrentLocation = document.querySelector('#current__location');

// Data obtained from local server:
let dataFromServer = {};

/**
 * End of Global Variables.
 * Start of Helper Functions.
 */


/**
 * @description Change the state of the input selected by the user.
 * @param {Event} event
 * @param {String} forceActivatedID
 */
const activateInputFields = (event, forceActivatedID='') => {
    // get the id of the event or from the desired ID:
    let inputID = '';
    if (forceActivatedID === '') {
        inputID = event.target.id;
    }
    else {
        inputID = forceActivatedID;
    }

    // check the id to limit the false clicks:
    if (inputID === 'zip__selected' || inputID === 'coords__selected') {
        // Reset input fields and error messages while selecting input method:
        resetInputFields();

        // get all <div> elements inside <section> of class (location__section):
        const inputFields = userInputSelection.querySelectorAll('.user__input');

        for (let i=0; i<inputFields.length; i++) {
            // get the (radio) and (text) inputs:
            const radioInput = inputFields[i].querySelector('input[type="radio"]');
            const textInputs = inputFields[i].querySelectorAll('input[type="text"]');

            // the current element id matches the selected one:
            if (radioInput.getAttribute('id') === inputID) {
                // add (active__input) class into the inputs container class list:
                inputFields[i].classList.add('active__input');

                // mark the (radio) input as checked:
                radioInput.setAttribute('checked', 'true');

                // remove (disabled) attribute from any (text) input:
                for (let j=0; j<textInputs.length; j++) {
                    textInputs[j].removeAttribute('disabled');
                }
            }
            else {
                // remove (active__input) class into the inputs container class list:
                inputFields[i].classList.remove('active__input');

                // remove (checked) attribute from (radio) input:
                radioInput.removeAttribute('checked');

                // add (disabled) attribute to all (text) input and clear its value:
                for (let j=0; j<textInputs.length; j++) {
                    textInputs[j].setAttribute('disabled', 'true');
                    textInputs[j].value = '';
                }
            }
        }
    }
};


/**
 * @description Get current geolocation of the user.
 */
const getCurrentLocation = () => {
    // check that navigator.geolocation is supported by the browser:
    if (navigator.geolocation) {
        // get current location:
        navigator.geolocation.getCurrentPosition(location => {      // success call.
            // activate latitude/longitude input section:
            activateInputFields('', 'coords__selected');

            // obtain text inputs for (latitude) and (longitude):
            const textInputFields = userInputSelection.querySelectorAll('.active__input input[type="text"]');

            // set the value for (latitude) and (longitude):
            textInputFields[0].value = location.coords.latitude;
            textInputFields[1].value = location.coords.longitude;
        }, error => {   // just in case an ERROR happened.
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    window.alert('Website do NOT have the permission to use you location.');
                    break;
            }
        });
    }
    else {
        window.alert('Geolocation is not supported by this browser.');
    }
};


/**
 * @description Reset the style of input fields and error messages back to normal state.
 */
const resetInputFields = () => {
    // get all text input fields:
    const textInputFields = userInputSelection.querySelectorAll('input[type="text"]');

    // get all error messages:
    const errorMessageContainers = userInputSelection.querySelectorAll('.error__container');

    // remove a specific class from input fields to reset its state to normal again:
    for (let i=0; i<textInputFields.length; i++) {
        textInputFields[i].classList.remove('empty__input__highlight');
    }

    // add a specific class from error messages to reset its state to hidden again:
    for (let i=0; i<errorMessageContainers.length; i++) {
        errorMessageContainers[i].classList.add('hide__error');
    }
};



/**
 * @description Alert the user for an empty input field.
 * @param {HTMLInputElement} textInputField
 */
const alertEmptyInput = (textInputField) => {
    textInputField.classList.add('empty__input__highlight');
};


/**
 * @description Display error message according to the empty input fields.
 * @param {HTMLElement} activeErrorMessage
 * @param {String} emptyFields
 * @param {String} forceErrorMessage
 */
const displayErrorMessage = (activeErrorMessage, emptyFields, forceErrorMessage='') => {
    // obtain main container element that contains the displayed data:
    const displaySection = document.querySelector('.display__section');

    // hide the main container that contains the displayed data:
    displaySection.style.display = 'none';

    // set error message according to empty input field:
    let errorMessage = '';
    switch (emptyFields) {
        case 'zipcode':
            errorMessage = 'Zip Code';
            break;
        case 'coords':
            errorMessage = 'Latitude and/or Longitude';
            break;
    }

    if (forceErrorMessage === '') {
        forceErrorMessage = `${errorMessage} MUST be specified.`;
    }

    // set textContent value:
    activeErrorMessage.querySelector('p').textContent = forceErrorMessage;

    // display the error container:
    activeErrorMessage.classList.remove('hide__error');
};


/**
 * @description Create error message using web api error code and error message.
 * @param {String} errorCode
 * @param {String} errorMessage
 */
const createErrorCodeMessage = (errorCode, errorMessage) => {
    // Obtain specific elements from the DOM:
    const activeRadioInput = userInputSelection.querySelector('.active__input input[type="radio"]');
    const activeTextInputs = userInputSelection.querySelectorAll('.active__input input[type="text"]');
    const activeErrorMessage = userInputSelection.querySelector('.active__input + .error__container');

    // construct appropriate error message:
    const forceErrorMessage = `Error ${errorCode}:\t${errorMessage}`;

    // highlight the empty inputs:
    switch (activeRadioInput.id) {
        case 'zip__selected':
            alertEmptyInput(activeTextInputs[0]);
            break;
        case 'coords__selected':
            alertEmptyInput(activeTextInputs[0]);
            alertEmptyInput(activeTextInputs[1]);
            break;
    }

    // display an error message:
    displayErrorMessage(activeErrorMessage, '', forceErrorMessage);
};


/**
 * @description Check the data entered by the user.
 * @param {Object} userData
 */
const checkUserInputs = (userData) => {
    // Obtain specific elements from the DOM:
    const activeRadioInput = userInputSelection.querySelector('.active__input input[type="radio"]');
    const activeTextInputs = userInputSelection.querySelectorAll('.active__input input[type="text"]');
    const activeErrorMessage = userInputSelection.querySelector('.active__input + .error__container');

    // highlight the empty inputs then display an error message:
    switch (activeRadioInput.id) {
        case 'zip__selected':
            if (userData.zipCode === '') {
                alertEmptyInput(activeTextInputs[0]);
                displayErrorMessage(activeErrorMessage, 'zipcode');
            }
            break;

        case 'coords__selected':
            if (userData.latitude === '') {
                alertEmptyInput(activeTextInputs[0]);
                displayErrorMessage(activeErrorMessage, 'coords');
            }
            if (userData.longitude === '') {
                alertEmptyInput(activeTextInputs[1]);
                displayErrorMessage(activeErrorMessage, 'coords');
            }
            break;
    }

    // remove the user feelings if it's empty:
    const displayedRows = document.querySelectorAll('.row__displayed');
    if (userData.feeling === '') {
        displayedRows[2].style.display = 'none';
    }
    else {
        displayedRows[2].style.display = 'flex';
    }
};


/**
 * @description Capture data entered by the user from user interface.
 */
const captureUserData = () => {
    // create an object to capture user inputs from the website:
    const userData = {
        zipCode: '',
        latitude: '',
        longitude: '',
        feeling: '',
    };

    // obtain the user feelings from DOM into user data object:
    const inputFeeling = document.querySelector('#feelings');
    userData.feeling = inputFeeling.value;

    // Obtain input elements from the DOM:
    const activeInputContainer = userInputSelection.querySelector('.active__input');
    const activeTextInputs = activeInputContainer.querySelectorAll('input[type="text"]');

    // capture the activated input fields:
    if (activeTextInputs.length === 1) {
        userData.zipCode = activeTextInputs[0].value;
    }
    else {
        userData.latitude = activeTextInputs[0].value;
        userData.longitude = activeTextInputs[1].value;
    }

    // check user's input is valid:
    checkUserInputs(userData);

    // double check that activated input is valid:
    if ((userData.zipCode !== '') || (userData.latitude !== '' && userData.longitude !== '')) {
        // Reset input fields and error messages before generating new entry:
        resetInputFields();

        // generate new entry using the entered data:
        generateNewEntry(userData);
    }
};


/**
 * @description Extract specific parts from date object found in the Web API data.
 * @param {String} dateString
 * @returns {String} Desired date formatting.
 */
const extractDate = (dateString) => {
    const date = dateString.split(' ').slice(0, 4).join(' ');

    return date;
};


/**
 * @description Extract specific data from both user data and WEB API data.
 * @param {Object} userData
 * @param {Object} webAPIData
 * @returns {Object} Combination of these TWO objects.
 */
const extractDataToPost = (userData, webAPIData) => {
    // extract date from Web API data, formated as: (DayName MONTH DAY YEAR):
    const date = extractDate(Date(webAPIData.dt));

    // data to be posted to the server:
    const combinedData = {
        tempInFahrenheit: webAPIData.main.temp,
        date: date,
        userResponse: userData.feeling,
        place: `${webAPIData.name}, ${webAPIData.sys.country}`,
        weatherDescription: webAPIData.weather['0'].description,
        weatherIcon: webAPIData.weather['0'].icon,
    };

    return combinedData;
};


/**
 * @description Display appropriate error message.
 * @param {Error} error
 */
const handleErrors = (error) => {
    console.log(`error: ${error}`);
};


/**
 * @description Convert Fahrenheit degree into Celsius degree.
 * @returns {Number} Temperature in Celsius.
 */
const convertToCelsius = () => {
    return ((dataFromServer.tempInFahrenheit-32)*(5/9)).toFixed(2);
};


/**
 * @description Remove (active__degree) class.
 */
const removeActiveUnit = () => {
    for (let i=0; i<tempUnit.children.length; i++) {
        if (tempUnit.children[i].classList.contains('active__degree')) {
            tempUnit.children[i].classList.remove('active__degree');
        }
    }
};


/**
 * @description Change the unit of the displayed temperature.
 * @param {Event} event
 */
const changeTempUnit = (event) => {
    // Obtain the required element for displaying temp value:
    const tempDisplayed = document.querySelector('#temp__value');

    switch (event.target.id) {
        case 'temp__Fahrenheit':
            removeActiveUnit();
            event.target.classList.add('active__degree');
            tempDisplayed.textContent = dataFromServer.tempInFahrenheit;
            break;
        case 'temp__Celsius':
            removeActiveUnit();
            event.target.classList.add('active__degree');
            tempDisplayed.textContent = convertToCelsius();
            break;
    }
};


/**
 * @description Get the source URL for the weather icon.
 * @returns {String} URL of the desired icon.
 */
const getWeatherIconSrc = () => {
    const weatherIconCode = dataFromServer.weatherIcon;
    const weatherIconSrc = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    return weatherIconSrc;
};


/**
 * End of Helper Functions.
 * Start of Main Finctions.
 */


/**
 * @description Function called by the event listener of (Generate) button.
 * @param {Object} userData
 */
const generateNewEntry = async (userData) => {
    // get the location values:
    const zipCode = userData.zipCode;
    const latitude = userData.latitude;
    const longitude = userData.longitude;

    // fetch data from web API:
    try {
        fetchWebData(baseURL, apiKey, zipCode, latitude, longitude)
            .then(webAPIData => {
                // construct desired data object to be posted:
                const combinedData = extractDataToPost(userData, webAPIData);

                // post constructed data:
                postData('/addEntry', combinedData);

                // get data from local server:
                getData('/all')
                    .then(() => {
                        // update the UI with the fetched data:
                        updateUI();
                    });
            });
    } catch (error) {
        handleErrors(error);
    }
};


/**
 * @description GET data from the Web API.
 * @param {String} baseURL
 * @param {String} apiKey
 * @param {String} zipCode
 * @param {String} latitude
 * @param {String} longitude
 * @returns {Object} Data fetched from Web API.
 */
const fetchWebData = async (baseURL, apiKey, zipCode, latitude, longitude) => {
    // construct the desired url from given pieces of information:
    let url = '';
    if (zipCode !== '') {
        url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    }
    else {
        url = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    }

    try {
        // fetch the data from the web api:
        const response = await fetch(url);

        // convert the response data into json data:
        const webAPIData = await response.json();

        // check if the response is done successfully:
        if (webAPIData.cod !== 200) {
            createErrorCodeMessage(webAPIData.cod, webAPIData.message);
        }
        else {
            return webAPIData;
        }

    } catch(error) {
            handleErrors(error);
    }
};


/**
 * @description POST data into the server.
 * @param {String} url
 * @param {Object} data
 * @returns {Object} Data posted to the server.
 */
const postData = async (url, data) => {
    const requestHeader = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, requestHeader);

        // convert the response data into json data:
        const newDataEntry = await response.json();

        return newDataEntry;
    } catch (error) {
        handleErrors(error);
    }
};


/**
 * @description GET data from the server.
 * @param {String} url
 */
const getData = async (url) => {
    try {
        const response = await fetch(url);

        // convert the response data into json data:
        dataFromServer = await response.json();

    } catch (error) {
        handleErrors(error);
    }
};


/**
 * @description Update UI with the final desired data.
 */
const updateUI = () => {
    // obtain main container element that contains the displayed data:
    const displaySection = document.querySelector('.display__section');

    // obtain required elements to be manipulated:
    const dateDisplayed = document.querySelector('#date');
    const tempDisplayed = document.querySelector('#temp__value');
    const contentDisplayed = document.querySelector('#content');
    const placeDisplayed = document.querySelector('#weather__place');
    const descriptionDisplayed = document.querySelector('#weather__description');
    const iconDisplayed = document.querySelector('#weather__icon img');

    // update the displayed values:
    dateDisplayed.textContent = dataFromServer.date;
    tempDisplayed.textContent = dataFromServer.tempInFahrenheit;
    contentDisplayed.textContent = dataFromServer.userResponse;
    placeDisplayed.textContent = dataFromServer.place;
    descriptionDisplayed.textContent = dataFromServer.weatherDescription;
    iconDisplayed.setAttribute('src', getWeatherIconSrc());


    // show the main container that contains the displayed data:
    displaySection.style.display = 'block';
};


/**
 * End of Main Functions.
 * Start of Event Listeners.
 */


// Event listener for the (Generate) button:
btnGenerate.addEventListener('click', captureUserData);

// Event listener for temperature unit selection:
tempUnit.addEventListener('click', changeTempUnit);

// Event listener for the input selection ((zipcode) or (latitude/longitude)):
userInputSelection.addEventListener('click', activateInputFields);

// Event listener for the (Current Location) button:
btnCurrentLocation.addEventListener('click', getCurrentLocation);

/**
 * End of Event Listeners.
 */
