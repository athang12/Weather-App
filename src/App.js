// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resp,setresp]=useState();
  const [citiesInput, setCitiesInput] = useState('');
  const [weatherData, setWeatherData] = useState(false);

  async function fetchWeatherData(city) {
    // Here, you can use any weather API of your choice to fetch real-time weather data.
    // Example: OpenWeatherMap API
    const apiKey = 'cc525bd1fbd2601be9e383269a19f61e';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    const response = await axios.get(apiUrl);
    return `${response.data.main.temp}C`;
  }

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
        const response = await axios.post('http://localhost:3001/getWeather', {
        cities: citiesInput.split(',').map(city => city.trim())
      });
      // console.log(response)
      setresp(response);
      const {city,data,desc,img}=response.data;
      setWeatherData(true)
      console.log(data,desc,img);
      // setWeatherData(response.data.weather);
    } catch (error) {
      console.error('Error fetching weather:', error.message);
    }
  };

  return (
    
    <div className="App p-5 bg-[url('https://i.pinimg.com/originals/12/cf/dc/12cfdcbb2320824919f1f1b119591d39.jpg')] w-screen h-full bg-cover min-h-screen ">
    <div className='flex justify-center' ><h1 className='text-6xl mb-10 font-bold font-serif text-white mt-2'>Weather App</h1></div>
      <div className='flex justify-center'>
      
      <div className=''>
        <label htmlFor="citiesInput" className='text-xl pr-5 font-bold text-white '>Enter Cities (Comma-Separated): </label>
        <input
          type="text"
          id="citiesInput"
          className=' rounded-xl p-2 w-80 '
          value={citiesInput}
          onChange={handleCitiesInput}
        />
        <p className='text-xl pr-5 font-bold text-white '>For eg Pune,Mumbai,Tokyo</p>
        <button className='block border-2 boder-blue-500 p-2 mt-4 bg-cyan-600 font-bold text-lg text-white rounded-xl ml-auto' onClick={getWeather}>Get Weather</button>
      </div>
      
      </div>
      {weatherData && (
        <div>
          <h2 className='mt-10 text-5xl font-bold mb-4 '>Weather Results:</h2>
          <div className='grid grid-cols-4 gap-4'>
            {resp.data.map(( {city,data,desc,img},id) => (
              <div className='ml-2 w-80 h-50 p-5 bg-gradient-to-r from-cyan-600 to-cyan-400  border-2 border-black rounded-lg  shadow-lg shadow-gray-700 font-bold mt-8' key={id}>
              <h2 className='text-blue-100 m-1 text-4xl font-bold mb-2'>{city}</h2>
              <h3 className='text-blue-100 m-1 text-xl'>Description : {desc}</h3>
              <h3 className='text-blue-100 m-1 text-xl'>Temperature : {data.temp} C</h3>
              <h3 className='text-blue-100 m-1 text-xl'>Temperature_Min : {data.temp_min} C</h3>
              <h3 className='text-blue-100 m-1 text-xl'>Temperature_Max : {data.temp_max} C</h3>
              <h3 className='text-blue-100 m-1 text-xl'>Pressure : {data.pressure} hPa</h3>
              <h3 className='text-blue-100 m-1 text-xl'>Humidity : {data.humidity}%</h3>
              <img className='' src={img}/> 
              </div>
            ))}
          </div>
        </div>
      )}
      <div><h2 className='text-xl ml-96 mt-12 font-bold text-black '>In case of any error or invalid results please refresh the page and try again !</h2></div>
    </div>
  );
}

export default App;
