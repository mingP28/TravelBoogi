//src/components/Local-Info/Weather.js
import React, { useState, useEffect } from "react";

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
            <h2>{city.name}의 날씨 정보</h2>
            <p className="tem">현재 기온: {celsiusTemperature} 도</p>
            <p className="tem-min">최저 기온: {celsiusTemperatureMin} 도</p>
            <p className="tem-max">최고 기온: {celsiusTemperatureMax} 도</p>
            <p className="now-weather">현재 날씨: {weatherData.weather[0].description}</p>
        </div>
    );
};

export default Weather;