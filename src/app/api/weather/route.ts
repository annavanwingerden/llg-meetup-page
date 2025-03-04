import { NextResponse } from 'next/server';

const LONDON_LAT = 51.5;
const LONDON_LON = -0.17;

export async function GET() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LONDON_LAT}&longitude=${LONDON_LON}&current=temperature_2m,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&wind_speed_unit=mph&forecast_days=1`;
    
    console.log('Fetching from URL:', url); // Debug log

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}