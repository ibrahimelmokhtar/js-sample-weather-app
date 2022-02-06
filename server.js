// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes:
const express = require('express');

// Start up an instance of app:
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Middleware
 * Here we are configuring express to use body-parser as middle-ware.
 */

// Parse a specific media type: (application/json):
app.use(bodyParser.json());

// Parse requests where the (Content-Type) header matches the (type) option ONLY:
app.use(bodyParser.urlencoded({extended: 'false'}));

// Cors for cross origin allowance:
app.use(cors());

// Initialize the main project folder:
app.use(express.static('./website'));

// Spin up the server:
const port = (process.env.PORT || 5000);    // required for Heroku hosting.
const hostName = '127.0.0.1';

// Callback to debug:
const listening = () => {
    console.log(`server is up and running on http://${hostName}:${port}`);
};

const server = app.listen(port, listening);

// Callback function to complete GET '/all':
const getEntry = (req, res) => {
    res.send(projectData);
};

// Initialize GET '/all' route with a callback function:
app.get('/all', getEntry);

// Callback function to complete POST '/addEntry':
const postNewEntry = (req, res) => {
    // save the new data into projectData object:
    projectData = req.body;
    console.log(req.body);
};

// Initialize POST '/addEntry' route with a callback function:
app.post('/addEntry', postNewEntry);
