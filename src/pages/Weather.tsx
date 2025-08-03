import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { FavoritesSection } from '@/components/weather/FavoritesSection';
import { Search, MapPin, Heart, LogOut, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  list: Array<{
    dt_txt: string;
    main: {
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
  city: {
    name: string;
    country: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
}

export const Weather = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const [favoritesRefresh, setFavoritesRefresh] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const fetchWeather = async (city?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await supabase.functions.invoke('weather', {
        body: city ? { city } : { lat, lon }
      });

      if (response.error) {
        setError(response.error.message || 'Failed to fetch weather data');
        setWeatherData(null);
      } else {
        setWeatherData(response.data);
        setCurrentCity(response.data.city.name);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(undefined, position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError('Failed to get your location. Please search for a city instead.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const addToFavorites = async () => {
    if (!weatherData || !user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          city_name: weatherData.city.name,
          country: weatherData.city.country,
          lat: weatherData.city.coord.lat,
          lon: weatherData.city.coord.lon
        });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast({
            title: "Already in favorites",
            description: "This city is already in your favorites list",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add to favorites",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Success",
          description: "City added to favorites!"
        });
        // Trigger refresh of favorites list
        setFavoritesRefresh(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const handleFavoriteSelect = (city: string, lat: number, lon: number) => {
    fetchWeather(undefined, lat, lon);
  };

  const getDailyForecasts = (weatherData: WeatherData) => {
    const dailyForecasts: { [key: string]: any } = {};
    
    weatherData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date: item.dt_txt,
          temp: { min: item.main.temp_min, max: item.main.temp_max },
          weather: item.weather[0],
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      } else {
        dailyForecasts[date].temp.min = Math.min(dailyForecasts[date].temp.min, item.main.temp_min);
        dailyForecasts[date].temp.max = Math.max(dailyForecasts[date].temp.max, item.main.temp_max);
      }
    });

    return Object.values(dailyForecasts).slice(0, 5);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Weather Forecast</h1>
          <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Weather Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle>Search Weather</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    placeholder="Enter city name..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading}>
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                <Button 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  disabled={loading}
                  className="w-full flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  Use Current Location
                </Button>
              </CardContent>
            </Card>

            {/* Loading State */}
            {loading && (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mr-2" />
                  Loading weather data...
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Weather Display */}
            {weatherData && !loading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {weatherData.city.name}, {weatherData.city.country}
                  </h2>
                  <Button onClick={addToFavorites} className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Add to Favorites
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {getDailyForecasts(weatherData).map((day: any, index) => (
                    <WeatherCard
                      key={index}
                      date={day.date}
                      temp={day.temp}
                      weather={day.weather}
                      humidity={day.humidity}
                      windSpeed={day.windSpeed}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Favorites Section */}
          <div className="lg:col-span-1">
            <FavoritesSection 
              onCitySelect={handleFavoriteSelect} 
              refreshTrigger={favoritesRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};