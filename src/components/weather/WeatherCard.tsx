import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherCardProps {
  date: string;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  humidity: number;
  windSpeed: number;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temp,
  weather,
  humidity,
  windSpeed
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-center">
          {formatDate(date)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-12 h-12"
          />
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round(temp.max)}°
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(temp.min)}°
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="font-medium capitalize">{weather.description}</div>
        </div>
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Humidity:</span>
            <span>{humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Wind:</span>
            <span>{windSpeed} m/s</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};