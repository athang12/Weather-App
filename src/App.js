// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resp,setresp]=useState();
  const [citiesInput, setCitiesInput] = useState('');
  const [weatherData, setWeatherData] = useState(false);

 

  const handleCitiesInput = (event) => {
    setCitiesInput(event.target.value);
  };

  const getWeather = async () => {
    try {
      if(citiesInput === '')
      {
        alert('Please enter at least one city');
        return;
      }
      const temp = citiesInput.split(',').map(city => city.trim())
      console.log(temp)
        const response = await axios.post('https://weather-app-backend-production-1532.up.railway.app/getWeather', {
        cities: citiesInput.split(',').map(city => city.trim())
      });
      // console.log(response)
      setresp(response);
      const {city,data,desc,img}=response.data;
      setWeatherData(true)
      console.log(city,data,desc,img);
      // setWeatherData(response.data.weather);
    } catch (error) {
      console.error('Error fetching weather:', error.message);
    }
  };

  return (
    <div className="App p-5 bg-cover min-h-screen bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(\'https://i.pinimg.com/originals/12/cf/dc/12cfdcbb2320824919f1f1b119591d39.jpg\')' }}>
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl mb-6 font-bold font-serif text-white mt-2">Weather App</h1>
      </div>

      <div className="max-w-md mx-auto">
        <label htmlFor="citiesInput" className="text-xl font-bold text-white block">Enter Cities (Comma-Separated): </label>
        <input
          type="text"
          id="citiesInput"
          className="rounded-xl p-2 w-full"
          value={citiesInput}
          onChange={handleCitiesInput}
        />
        <p className="text-xl font-bold text-white block mt-2">For example: Pune, Mumbai, Tokyo</p>
        <button className="block border-2 border-blue-500 p-2 mt-4 bg-cyan-600 font-bold text-lg text-white rounded-xl w-full" onClick={getWeather}>
          Get Weather
        </button>
      </div>

      {weatherData && (
        <div className="mt-6">
          <h2 className="text-3xl font-bold mb-4">Weather Results:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resp.data.map(({ city, data, desc, img }, id) => (
              <div key={id} className="p-4 bg-gradient-to-r from-cyan-600 to-cyan-400 border-2 border-black rounded-lg shadow-lg shadow-gray-700 font-bold">
                <h2 className="text-blue-100 m-1 text-2xl font-bold mb-2">{city}</h2>
                <h3 className="text-blue-100 m-1 text-lg">Description: {desc}</h3>
                <h3 className="text-blue-100 m-1 text-lg">Temperature: {data.temp} C</h3>
                <h3 className="text-blue-100 m-1 text-lg">Temperature_Min: {data.temp_min} C</h3>
                <h3 className="text-blue-100 m-1 text-lg">Temperature_Max: {data.temp_max} C</h3>
                <h3 className="text-blue-100 m-1 text-lg">Pressure: {data.pressure} hPa</h3>
                <h3 className="text-blue-100 m-1 text-lg">Humidity: {data.humidity}%</h3>
                <img className="mt-4" src={img} alt="weather images" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <h2 className="text-lg font-bold text-black">In case of any error or invalid results please refresh the page and try again!</h2>
      </div>
    </div>
  );
}

export default App;
