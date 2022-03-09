import React, { useState } from "react";
import axios from 'axios'
import API_KEY from './API_KEY'


function App() {

  // States
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const key=API_KEY;
  console.log(key);
  const geoLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${key}`;


  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      const geoData = await axios.get(geoLocation);

      const lat = geoData.data[0].lat;
      const lon = geoData.data[0].lon;
      const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);

      setData(weatherData.data);
      setLocation('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter the location"
        /></div>
      <div className="container">
        <div className="top">
          <div className="location"><p>{data.name}</p></div>
          <div className="temperature">
            {data.main ? <h1>{Math.round((data.main.temp - 273.15) * 10) / 10}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels description">
              {data.main ? <p className="bold" >{Math.round((data.main.feels_like - 273.15) * 10) / 10}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity description">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="winds description">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
