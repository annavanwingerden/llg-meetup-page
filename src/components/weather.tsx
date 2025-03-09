'use client';

import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, CloudLightning, CloudDrizzle } from 'lucide-react';

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
    95: 'Thunderstorm'
  };
  return weatherCodes[code] || 'Unknown';
};

const getWeatherIcon = (code: number) => {
  switch (true) {
    case [0].includes(code): return <Sun className="h-6 w-6" />;
    case [1, 2, 3].includes(code): return <Cloud className="h-6 w-6" />;
    case [45, 48].includes(code): return <CloudFog className="h-6 w-6" />;
    case [51, 53, 55].includes(code): return <CloudDrizzle className="h-6 w-6" />;
    case [61, 63, 65].includes(code): return <CloudRain className="h-6 w-6" />;
    case [71, 73, 75].includes(code): return <CloudSnow className="h-6 w-6" />;
    case [95].includes(code): return <CloudLightning className="h-6 w-6" />;
    default: return <Cloud className="h-6 w-6" />;
  }
};

const formatForecastTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        console.log('Starting weather fetch');
        
        // Use relative URL instead of absolute URL
        const response = await fetch('/api/weather');
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error details:', errorData);
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Weather data received:', data);
        setWeatherData(data);
      } catch (err) {
        console.error('Detailed fetch error:', err);
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
      {weatherData && (
        <>
          <div className="mb-4 flex items-center">
            {getWeatherIcon(weatherData.current.weather_code)}
            <p className="text-3xl font-bold ml-2">
              {weatherData.current.temperature_2m}°C
            </p>
          </div>
          <p className="text-lg mb-2">
            {getWeatherDescription(weatherData.current.weather_code)}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Precipitation: {weatherData.current.precipitation}mm
          </p>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
            <div className="space-y-3">
              {weatherData.hourly.time.slice(0, 6).map((time, index) => (
                <div key={time} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span className="w-20">{formatForecastTime(time)}</span>
                  <div className="flex items-center">
                    {getWeatherIcon(weatherData.hourly.weather_code[index])}
                  </div>
                  <span className="w-16 text-right">{weatherData.hourly.temperature_2m[index]}°C</span>
                  <span className="w-16 text-right text-gray-600">
                    {weatherData.hourly.precipitation_probability[index]}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}