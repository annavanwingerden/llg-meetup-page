'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  current: {
    temperature_2m: number;
    precipitation: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
}

const getWeatherDescription = (code: number): string => {
  // WMO Weather interpretation codes (WW)
  const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
  };
  return weatherCodes[code] || 'Unknown';
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log('Starting weather fetch'); // Debug log
        
        const response = await fetch('/api/weather');
        console.log('Response status:', response.status); // Debug log
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error details:', errorData); // Debug log
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Weather data received:', data); // Debug log
        setWeatherData(data);
      } catch (err) {
        console.error('Detailed fetch error:', err); // Debug log
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };
  
    fetchWeather();
  }, []);


  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
      <div className="mb-4">
        <p className="text-3xl font-bold">
          {weatherData.current.temperature_2m}°C
        </p>
        <p className="text-lg">
          {getWeatherDescription(weatherData.current.weather_code)}
        </p>
        <p className="text-sm text-gray-600">
          Precipitation: {weatherData.current.precipitation}mm
        </p>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
        <div className="space-y-2">
          {weatherData.hourly.time.slice(0, 6).map((time, index) => (
            <div key={time} className="flex justify-between items-center">
              <span>{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{weatherData.hourly.temperature_2m[index]}°C</span>
              <span>{weatherData.hourly.precipitation_probability[index]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}