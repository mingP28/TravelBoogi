//src/components/Local-Info/Weather.js
import React, { useState, useEffect } from "react";
import { MdWbSunny } from "react-icons/md";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { BsCloudSunFill } from "react-icons/bs";


const Weather = ({city, apiKey}) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    setWeatherData(data);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

    fetchWeatherData();
  }, [city.lat, city.lon, apiKey]);

  useEffect(() => {
    console.log('Weather data:', weatherData);
  }, [weatherData]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const celsiusTemperature = (weatherData.main.temp - 273.15).toFixed(1); // 절대온도에서 섭씨온도로
  const celsiusTemperatureMin = (weatherData.main.temp_min - 273.15).toFixed(1);
  const celsiusTemperatureMax = (weatherData.main.temp_max - 273.15).toFixed(1);

    return (
        <div className="section-mint">
            <h2 className="city-kor">{city.name}</h2>
            <h2 className="city-eng" >{city.id}</h2>
            <div className="city-info">{city.description}</div>
            <p>
                <MdWbSunny />
                <span className="tem">&nbsp; 현재 기온: {celsiusTemperature}도 &nbsp;</span>
                <BsCloudSunFill />
                <span className="now-weather">&nbsp;현재 날씨: {weatherData.weather[0].description}</span>
            </p>
            <p>
                <FaTemperatureArrowDown />
                <span className="tem-min">&nbsp; 최저 기온: {celsiusTemperatureMin}도 &nbsp;</span>
                <FaTemperatureArrowUp />
                <span className="tem-max">&nbsp; 최고 기온: {celsiusTemperatureMax}도</span>
            </p>

        </div>
    );
};

export default Weather;