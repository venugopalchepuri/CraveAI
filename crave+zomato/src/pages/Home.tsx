import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import CraveShift from '../components/CraveShift';
import RestaurantFilters from '../components/RestaurantFilters';
import CraveAIGenie from '../components/CraveAIGenie';
import { useRestaurants, RestaurantFilters as FilterType } from '../context/RestaurantContext';
import { useMood } from '../context/MoodContext';
import { useWeather } from '../context/WeatherContext';

const Home: React.FC = () => {
  const { 
    filteredRestaurants, 
    recommendedRestaurants, 
    recommendedDishes,
    filterRestaurants,
    craveScore,
    currentFilters
  } = useRestaurants();
  
  const { currentMood, moodBasedTheme } = useMood();
  const { weather } = useWeather();
  
  const [timeFilter, setTimeFilter] = useState('now');
  const [weatherFilter, setWeatherFilter] = useState('current');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply search filter
  useEffect(() => {
    filterRestaurants({
      ...currentFilters,
      searchQuery
    });
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: FilterType) => {
    filterRestaurants({
      ...filters,
      searchQuery
    });
  };

  const handleTimeChange = (time: string) => {
    setTimeFilter(time);
    // In a real app, this would update recommendations based on time
  };

  const handleWeatherChange = (weather: string) => {
    setWeatherFilter(weather);
    // In a real app, this would update recommendations based on weather
  };

  return (
    <div>
      {/* Hero Section with Dynamic Mood UI */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-xl p-6 mb-8 ${moodBasedTheme.bgGradient}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${moodBasedTheme.primaryColor}`}
          >
            Discover Food for Your {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood
          </motion.h1>
          <p className="text-gray-600 mb-6">
            Current Weather: {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}, {weather.temperature}°C in {weather.location}
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </motion.div>

      {/* CraveShift - Time Travel */}
      <div className="mb-8">
        <CraveShift 
          onTimeChange={handleTimeChange} 
          onWeatherChange={handleWeatherChange} 
        />
      </div>

      {/* Filters */}
      <RestaurantFilters 
        onFilterChange={handleFilterChange}
        currentFilters={currentFilters}
      />

      {/* Recommended Dishes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended for Your Mood</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedDishes.slice(0, 4).map(dish => (
            <DishCard 
              key={dish.id} 
              dish={dish} 
              craveScore={craveScore(dish)}
            />
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {searchQuery ? 'Search Results' : 'Recommended Restaurants'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery ? filteredRestaurants : recommendedRestaurants).map(restaurant => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant}
              showCraveScore={true}
            />
          ))}
          {(searchQuery ? filteredRestaurants : recommendedRestaurants).length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No restaurants found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* All Restaurants Section */}
      {!searchQuery && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">All Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard 
                key={restaurant.id} 
                restaurant={restaurant} 
              />
            ))}
          </div>
        </section>
      )}

      {/* CraveAI Genie */}
      <CraveAIGenie />
    </div>
  );
};

export default Home;