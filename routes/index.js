const express = require('express');
const router = express.Router();
const weatherService = require('../services/weather');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const weather = await weatherService.get();
  weather.humidityPercentage = weather.humidity * 100;
  res.render('index', { title: 'MongoDB World 2019', weather });
});

module.exports = router;
