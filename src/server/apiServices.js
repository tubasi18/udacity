const axios = require('axios');


const getImageFromPixabay = (key, image) => {
  const url = `https://pixabay.com/api/?key=${key}&q=${image}`;

  return axios.get(url)
    .then(response => {
      if (response.data.totalHits !== 0) {
        // Return the URL of the first image in the search results
        return response.data.hits[0].largeImageURL;
      } else {
        // Return a default not-found image URL if no results are found
        return "https://i.ibb.co/PwKhD7c/not-found-2384304-1280.jpg";
      }
    })
    .catch(error => {
      console.error("Error fetching data from Pixabay:", error);
      // Return a default not-found image URL in case of an error
      return "https://i.ibb.co/PwKhD7c/not-found-2384304-1280.jpg";
    });
};


const getDataFromGeoNames = async (username, city) => {
  const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;
  try {
    return await axios.get(url)
      .then(res => {
        return {
          lat: res.data.geonames[0].lat,
          lng: res.data.geonames[0].lng
        }
      });
  } catch (e) {
    console.log(e);
  }
}


const getWeatherData = (apiKey, lat, lon) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
  return axios.get(url)
    .then(response => {
      const data = response.data;
      if (data && data.data && data.data.length > 0) {
        const weather = data.data[0];
        return {
          temperature: weather.temp,
          weather: weather.weather.description,
        };
      } else {
        console.error("No weather data found.");
      }
    })
    .catch(error => {
      console.error("Error fetching data from Weatherbit:", error);
    });
};

module.exports = { getImageFromPixabay, getWeatherData, getDataFromGeoNames };
