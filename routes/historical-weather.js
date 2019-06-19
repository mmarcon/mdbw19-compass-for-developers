const express = require('express');
const router = express.Router();
const historicalWeatherService = require('../services/historical-weather');

/* GET home page. */
router.get('/historical-weather', async (req, res, next) => {
  const historicalWeather = await historicalWeatherService.getMonthlyAveragesWithQuery(req.app.locals.dbClient);
  res.render('historical-weather', { title: 'MongoDB World 2019', historicalWeather });
});

module.exports = router;
