import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const OPENWEATHER_API_KEY = "bcc6296d194daffaef136b674443eca5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherRequest {
  city?: string;
  lat?: number;
  lon?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, lat, lon }: WeatherRequest = await req.json();
    
    let url = '';
    
    if (city) {
      // Get coordinates first, then weather
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${OPENWEATHER_API_KEY}`;
      
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        return new Response(
          JSON.stringify({ error: 'City not found' }),
          { 
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      const { lat: cityLat, lon: cityLon, country } = geoData[0];
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      
      const weatherResponse = await fetch(url);
      const weatherData = await weatherResponse.json();
      
      return new Response(
        JSON.stringify({
          ...weatherData,
          city: {
            ...weatherData.city,
            country: country
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    } else {
      return new Response(
        JSON.stringify({ error: 'Either city name or coordinates (lat, lon) must be provided' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenWeather API error:', data);
      return new Response(
        JSON.stringify({ error: data.message || 'Failed to fetch weather data' }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Weather function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});