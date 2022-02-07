<!-- Project title -->
# Vanilla JavaScript Weather App

<!-- Add buttons here -->
![GitHub release (latest by date)](https://img.shields.io/github/v/release/ibrahimelmokhtar/js-sample-weather-app)
![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fegfwd-weather-app.herokuapp.com%2F)
![GitHub last commit](https://img.shields.io/github/last-commit/ibrahimelmokhtar/js-sample-weather-app)
![GitHub issues](https://img.shields.io/github/issues/ibrahimelmokhtar/js-sample-weather-app)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ibrahimelmokhtar/js-sample-weather-app)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_message=online&url=https%3A%2F%2Fegfwd-weather-app.herokuapp.com%2F)

<!-- Describe your project in brief -->
A weather journal application implemented as part of **Professional Web Development Track** offered by **egFWD Initiative** through **Udacity**.  

# Table of contents

- [Project Title](#vanilla-javascript-weather-app)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
  - [Interface and Architecture](#interface-and-architecture)  
    1. [Architecture](#architecture)  
    2. [Usability](#usability)  
  - [Weather App Behavior](#weather-app-behavior)  
    1. [Zip Code Coordinates](#1-zip-code-coordinates)  
    2. [Handle User Feelings](#2-handle-user-feelings)  
    3. [Weather API Data](#3-weather-api-data)  
    4. [Display Basic Obtained Result](#4-display-basic-obtained-result)
  - [Additional Features](#additional-features)  
    1. [Latitude and Longitude Coordinates](#1-latitude-and-longitude-coordinates)  
    2. [Current Location](#2-current-location)  
    3. [Selection of Temperature Degree](#3-selection-of-temperature-degree)  
    4. [Display More Information](#4-display-more-information)  


# Installation
[(Back to top)](#table-of-contents)

To use this project, you need to follow the commands below:

1. Clone the repository into your local machine: `git clone https://github.com/ibrahimelmokhtar/js-sample-weather-app.git`
2. Run the local server: `node .\server.js`
3. Open the local website on `http://127.0.0.1:5000`  

# Development
[(Back to top)](#table-of-contents)  
In this section, I will explain **how the code works** and **how everything is put together.**  

## Interface and Architecture
[(Back to top)](#table-of-contents)
### Architecture
This project has the structure shown below:  
```
node_modules
website
  - assets
  - css
    -- responsive-tablets.css
    -- responsive.css
    -- styles.css
  - js
    -- app.js
  - index.html
package.json
README.md
server.js
```

### Usability
  This website has a Responsive Design. This means: "All features are usable across modern desktop, tablet, and phone browsers."  


## Weather App Behavior
[(Back to top)](#table-of-contents)
### 1. Zip Code Coordinates
The user is able to enter a specific zipcode, then the website will use this zipcode to fetch weather data from [OpenWeatherMap API](https://openweathermap.org/current) using a URL similar to `https://api.openweathermap.org/data/2.5/weather?zip={zip}&appid={API key}&units=imperial`.

### 2. Handle User Feelings
The website can handle the user feelings and display them, or hide them if the user did NOT enter anything. 

### 3. Weather API Data
The Web API will return an object contains key/value pairs, but I used the following highlighted ones ONLY. 
```
{
  ...
  "weather": [
    {
      ...
      "description": "clear sky",    👈 
      "icon": "01d"   👈 
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,   👈 
    ...
  },
  ... ,
  "dt": 1560350645,   👈 
  "sys": {
    ...
    "country": "US",    👈 
    ...
  },
  ...
  "name": "Mountain View",    👈 
  "cod": 200    👈 
  }                                             
```
### 4. Display Basic Obtained Result
The website displays the following items as a search result:
1. Weather Temperature in Fahrenheit.
2. Current Date.
3. User Feelings.


## Additional Features
[(Back to top)](#table-of-contents)
### 1. Latitude and Longitude Coordinates
The user is able to enter a specific latitude and longitude coordinates, then the website will use these coordinates to fetch weather data from [OpenWeatherMap API](https://openweathermap.org/current) using a URL similar to `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=imperial`.

### 2. Current Location
The website can use the user's current location to find latitude and longitude coordinates, then use these coordinates to fetch weather data using latitude/longitude method.

### 3. Selection of Temperature Degree
The user is able to choose between (Fahrenheit degree) and (Celsius degree) to display the obtained temperature value. 

### 4. Display More Information
The website displays the following additional items along with the search result:
1. [Weather Condition Icon](https://openweathermap.org/weather-conditions): by fetching a specific image using URL similar to `https://openweathermap.org/img/wn/{icon}@2x.png`.
2. Weather Temperature in Celsius, when selected.
3. Weather Condition Description.
4. City, Country Names.
