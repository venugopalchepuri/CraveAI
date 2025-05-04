import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useMood } from './MoodContext';
import { useWeather } from './WeatherContext';
import { restaurants } from '../data/restaurants';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: 1 | 2 | 3 | 4; // 1-4, $ to $$$$
  rating: number;
  reviews: number;
  address: string;
  area: string;
  image: string;
  dishes: Dish[];
  openingHours: {
    open: string;
    close: string;
  };
  features: string[];
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  moodTags: string[];
  weatherTags: string[];
}

interface RestaurantContextType {
  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  recommendedRestaurants: Restaurant[];
  recommendedDishes: Dish[];
  filterRestaurants: (filters: RestaurantFilters) => void;
  getRestaurantById: (id: string) => Restaurant | undefined;
  craveScore: (dish: Dish) => number;
  currentFilters: RestaurantFilters;
}

export interface RestaurantFilters {
  cuisine?: string[];
  priceRange?: number[];
  rating?: number;
  vegetarian?: boolean;
  spicy?: boolean;
  area?: string;
  searchQuery?: string;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentMood } = useMood();
  const { weather } = useWeather();
  
  const [allRestaurants] = useState<Restaurant[]>(restaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<Restaurant[]>([]);
  const [recommendedDishes, setRecommendedDishes] = useState<Dish[]>([]);
  const [currentFilters, setCurrentFilters] = useState<RestaurantFilters>({});

  const filterRestaurants = (filters: RestaurantFilters) => {
    setCurrentFilters(filters);
    
    let filtered = [...allRestaurants];
    
    if (filters.cuisine && filters.cuisine.length > 0) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.some(cuisine => filters.cuisine?.includes(cuisine))
      );
    }
    
    if (filters.priceRange && filters.priceRange.length > 0) {
      filtered = filtered.filter(restaurant => 
        filters.priceRange?.includes(restaurant.priceRange)
      );
    }
    
    if (filters.rating) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.rating);
    }
    
    if (filters.area) {
      filtered = filtered.filter(restaurant => 
        restaurant.area.toLowerCase() === filters.area?.toLowerCase()
      );
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) || 
        restaurant.cuisine.some(c => c.toLowerCase().includes(query)) ||
        restaurant.dishes.some(dish => dish.name.toLowerCase().includes(query))
      );
    }
    
    setFilteredRestaurants(filtered);
  };

  const getRestaurantById = (id: string): Restaurant | undefined => {
    return allRestaurants.find(restaurant => restaurant.id === id);
  };

  // Enhanced mood-based scoring system
  const craveScore = (dish: Dish): number => {
    let score = 50; // Base score
    
    // Mood-specific scoring logic
    switch (currentMood) {
      case 'happy':
        // Happy people tend to prefer celebratory, social foods
        score += dish.isPopular ? 30 : 0;
        score += dish.category.toLowerCase().includes('dessert') ? 20 : 0;
        score += dish.price > 300 ? 15 : 0; // More likely to splurge when happy
        break;
        
      case 'sad':
        // Comfort food for sad moods
        score += dish.category.toLowerCase().includes('dessert') ? 25 : 0;
        score += !dish.isSpicy ? 20 : 0; // Less spicy when sad
        score += dish.description.toLowerCase().includes('chocolate') ? 20 : 0;
        score += dish.description.toLowerCase().includes('cheese') ? 15 : 0;
        break;
        
      case 'stressed':
        // Stress eating preferences
        score += dish.isSpicy ? 25 : 0; // Spicy food can help relieve stress
        score += dish.category.toLowerCase().includes('comfort') ? 20 : 0;
        score += dish.isVegetarian ? 15 : 0; // Healthier options for stress
        break;
        
      case 'relaxed':
        // Light and healthy options when relaxed
        score += dish.isVegetarian ? 25 : 0;
        score += !dish.isSpicy ? 15 : 0;
        score += dish.description.toLowerCase().includes('fresh') ? 20 : 0;
        score += dish.description.toLowerCase().includes('salad') ? 15 : 0;
        break;
        
      case 'hungry':
        // Substantial, filling foods when hungry
        score += dish.category.toLowerCase().includes('main') ? 30 : 0;
        score += dish.price > 200 ? 20 : 0; // Larger portions tend to cost more
        score += dish.isPopular ? 15 : 0;
        break;
        
      case 'neutral':
        // Balanced scoring for neutral mood
        score += dish.isPopular ? 20 : 0;
        score += dish.rating >= 4.5 ? 15 : 0;
        score += dish.isVegetarian ? 10 : 0;
        break;
    }
    
    // Weather impact
    switch (weather.condition) {
      case 'rainy':
        score += dish.isSpicy ? 15 : 0;
        score += dish.category.toLowerCase().includes('soup') ? 20 : 0;
        break;
      case 'sunny':
        score += dish.category.toLowerCase().includes('salad') ? 15 : 0;
        score += dish.description.toLowerCase().includes('fresh') ? 15 : 0;
        break;
      case 'cloudy':
        score += dish.category.toLowerCase().includes('comfort') ? 15 : 0;
        break;
      case 'snowy':
        score += dish.isSpicy ? 20 : 0;
        score += dish.category.toLowerCase().includes('hot') ? 15 : 0;
        break;
    }

    // Temperature adjustments
    if (weather.temperature > 30) {
      score -= dish.isSpicy ? 15 : 0;
      score += dish.description.toLowerCase().includes('cold') ? 15 : 0;
    } else if (weather.temperature < 15) {
      score += dish.isSpicy ? 15 : 0;
      score += dish.description.toLowerCase().includes('hot') ? 15 : 0;
    }
    
    // Cap the score at 100
    return Math.min(Math.max(score, 0), 100);
  };

  // Update recommendations based on mood and weather
  useEffect(() => {
    // Get recommended restaurants
    const getRecommendedRestaurants = () => {
      const scored = allRestaurants.map(restaurant => {
        // Calculate mood-specific restaurant score
        let restaurantScore = 0;
        
        // Base score on cuisine types that match the mood
        switch (currentMood) {
          case 'happy':
            restaurantScore += restaurant.priceRange >= 3 ? 20 : 0; // Fancy restaurants
            restaurantScore += restaurant.features.includes('Outdoor Seating') ? 15 : 0;
            break;
          case 'sad':
            restaurantScore += restaurant.cuisine.includes('Italian') ? 20 : 0; // Comfort food
            restaurantScore += restaurant.cuisine.includes('American') ? 15 : 0;
            break;
          case 'stressed':
            restaurantScore += restaurant.cuisine.includes('Japanese') ? 20 : 0; // Calming cuisine
            restaurantScore += restaurant.rating >= 4.5 ? 15 : 0; // Reliable choices
            break;
          case 'relaxed':
            restaurantScore += restaurant.cuisine.includes('Mediterranean') ? 20 : 0;
            restaurantScore += restaurant.features.includes('Indoor Seating') ? 15 : 0;
            break;
          case 'hungry':
            restaurantScore += restaurant.cuisine.includes('North Indian') ? 20 : 0;
            restaurantScore += restaurant.cuisine.includes('Chinese') ? 15 : 0;
            break;
          case 'neutral':
            restaurantScore += restaurant.rating >= 4.0 ? 20 : 0;
            restaurantScore += restaurant.reviews > 1000 ? 15 : 0;
            break;
        }

        // Calculate average dish score
        const avgDishScore = restaurant.dishes.reduce((sum, dish) => sum + craveScore(dish), 0) / restaurant.dishes.length;
        
        return { 
          restaurant, 
          score: (restaurantScore + avgDishScore) / 2 
        };
      });
      
      // Sort by score and take top 5
      const topRestaurants = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.restaurant);
      
      setRecommendedRestaurants(topRestaurants);
    };
    
    // Get recommended dishes
    const getRecommendedDishes = () => {
      // Collect all dishes
      const allDishes = allRestaurants.flatMap(restaurant => 
        restaurant.dishes.map(dish => ({
          ...dish,
          restaurantName: restaurant.name,
          restaurantId: restaurant.id
        }))
      );
      
      // Score and sort dishes
      const scoredDishes = allDishes
        .map(dish => ({ dish, score: craveScore(dish) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(item => item.dish);
      
      setRecommendedDishes(scoredDishes);
    };
    
    getRecommendedRestaurants();
    getRecommendedDishes();
  }, [currentMood, weather, allRestaurants]);

  return (
    <RestaurantContext.Provider 
      value={{ 
        allRestaurants, 
        filteredRestaurants, 
        recommendedRestaurants,
        recommendedDishes,
        filterRestaurants, 
        getRestaurantById,
        craveScore,
        currentFilters
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};