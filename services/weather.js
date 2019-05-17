const fetch = require('node-fetch');

const {darksky_api_key} = require('../config.json');
const CITIES = {
    NYC: [40.730610, -73.935242]
};
const WEATHER_SERVICE_URL = (units='us') =>
    `https://api.darksky.net/forecast/${darksky_api_key}/${CITIES.NYC.join()}?units=${units}&exclude=minutely,hourly,daily,alerts,flags`;

module.exports = {
    get: (units) =>
        fetch(WEATHER_SERVICE_URL(units))
            .then(res => res.json())
            .then(body => body.currently)
};