const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { getImageFromPixabay, getWeatherData, getDataFromGeoNames } = require('./apiServices');

let app = express()

let travelData = [];

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
app.use(express.static('dist'))


app.get('/', (req, res) => {
  try {
    res.sendFile('dist/index.html');
  } catch (err) {
    console.error('Error handling GET / request:', err);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to send the travel data
app.get('/trip', async (req, res) => {
  try {
    res.send(travelData);
  } catch (error) {
    console.error('Error fetching trip data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to update travel data
app.post('/trip', async (req, res) => {
  try {
    const { place, date } = req.body;

    // Fetch coordinates from GeoNames API
    const locationData = await getDataFromGeoNames(process.env.GEONAMES_USERNAME, place);
    if (!locationData) {
      console.error("Failed to get coordinates for:", place);
      return res.status(500).send({ success: false, message: "Failed to get coordinates from GeoNames" });
    }

    // Fetch image from Pixabay API
    const image = await getImageFromPixabay(process.env.PIXABAY_API_KEY, place);

    // Fetch weather data
    const weather = await getWeatherData(process.env.WEATHERBIT_API_KEY, locationData.lat, locationData.lng);
    if (!weather) {
      console.error("Failed to get weather data for coordinates:", locationData);
      return res.status(500).send({ success: false, message: "Failed to get weather data from Weatherbit" });
    }

    // Prepare new travel data
    const newTravelData = {
      name: place,
      date,
      image,
      high: weather.temperature,
      low: weather.temperature,
      weather: weather.weather,
      latitude: locationData.lat,
      longitude: locationData.lng,
    };

    travelData.push(newTravelData);
    res.send({ success: true, data: travelData });
  } catch (error) {
    console.error('Error updating travel data:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
});

//POST route to delete an entry from the travel data
app.delete('/trip', (req, res) => {
  travelData = travelData.filter((data, index) => index != req.body.id);
  res.send({ success: true, detetedId: req.body.id });
})


app.listen(process.env.PORT, function () {
  console.log(`App listening on port ${process.env.PORT}!`)
})

module.exports = app;