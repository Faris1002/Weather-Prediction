import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">WeatherApp</span>
          </div>
          <Link to="/auth">
            <Button>Sign In / Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Your Personal
              <span className="text-blue-600"> Weather</span> Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get accurate 5-day weather forecasts for any city. Save your favorite locations and access them instantly.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Weather Icons */}
          <div className="flex justify-center space-x-8 pt-8">
            <Sun className="h-16 w-16 text-yellow-500 animate-bounce" style={{ animationDelay: '0s' }} />
            <Cloud className="h-16 w-16 text-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <CloudRain className="h-16 w-16 text-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Weather Planning
            </h2>
            <p className="text-xl text-gray-600">
              Simple, accurate, and always up-to-date weather information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>5-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Get detailed weather predictions for the next 5 days including temperature, humidity, and wind speed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Favorite Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Save your favorite locations and quickly access their weather forecasts with just one click.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Sun className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Location Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Automatically detect your current location or search for any city worldwide for instant weather updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of users who rely on our accurate weather forecasts for their daily planning.
            </p>
          </div>
          
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Sign Up Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-semibold">WeatherApp</span>
          </div>
          <p className="text-gray-400">
            © 2024 WeatherApp. All rights reserved. Built with OpenWeather API.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
