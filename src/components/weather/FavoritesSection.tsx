import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Favorite {
  id: string;
  city_name: string;
  country: string;
  lat: number;
  lon: number;
}

interface FavoritesSectionProps {
  onCitySelect: (city: string, lat: number, lon: number) => void;
  refreshTrigger?: number; // Add this to force refresh
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({ onCitySelect, refreshTrigger }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        toast({
          title: "Error",
          description: "Failed to load favorites",
          variant: "destructive"
        });
      } else {
        setFavorites(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [refreshTrigger]); // Add refreshTrigger as dependency

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove favorite",
          variant: "destructive"
        });
      } else {
        setFavorites(favorites.filter(fav => fav.id !== id));
        toast({
          title: "Success",
          description: "Favorite removed successfully"
        });
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Favorite Cities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading favorites...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Favorite Cities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            No favorite cities yet. Search for a city and add it to favorites!
          </div>
        ) : (
          <div className="space-y-2">
            {favorites.map((favorite) => (
              <div 
                key={favorite.id} 
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <button
                  onClick={() => onCitySelect(favorite.city_name, favorite.lat, favorite.lon)}
                  className="flex-1 text-left hover:text-primary transition-colors"
                >
                  <div className="font-medium">{favorite.city_name}</div>
                  <div className="text-sm text-muted-foreground">{favorite.country}</div>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavorite(favorite.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};