const express = require('express');
const router = express.Router();
const weatherService = require('../services/weather');
const historicalWeatherService = require('../services/historical-weather');
const debug = require('debug')('mdbw19-compass-for-developers:index-route');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const weather = await weatherService.get();
  const now = new Date();
  const currentHour = now.getUTCHours();
  const currentDay = now.getUTCDate();
  const currentMonth = now.getUTCMonth() + 1;
  debug(`Getting average weather for hour:${currentHour} day:${currentDay} month:${currentMonth}`);
  const averageWeather = await historicalWeatherService.getAverage(req.app.locals.dbClient, currentHour, currentDay, currentMonth);
  weather.humidityPercentage = weather.humidity * 100;
  res.render('index', { title: 'MongoDB World 2019', weather,  averageWeather, day: currentDay, month: currentMonth});
});

module.exports = router;
