// Setup empty JS object to act as endpoint for all routes

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
const port = 8080;
const hostName = '127.0.0.1';
const server = app.listen(port, listening);

// Callback to debug:
function listening() {
    console.log(`server is up and running on http://${hostName}:${port}`);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
