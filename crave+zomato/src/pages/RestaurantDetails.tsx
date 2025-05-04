import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Share2, 
  ChevronLeft,
  Utensils,
  Flame,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRestaurants } from '../context/RestaurantContext';
import { useUser } from '../context/UserContext';
import { useMood } from '../context/MoodContext';
import DishCard from '../components/DishCard';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRestaurantById, craveScore } = useRestaurants();
  const { user, toggleSavedRestaurant } = useUser();
  const { moodBasedTheme } = useMood();
  
  const [restaurant, setRestaurant] = useState(getRestaurantById(id || ''));
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const isSaved = user?.savedRestaurants.includes(id || '') || false;

  useEffect(() => {
    if (id) {
      const restaurantData = getRestaurantById(id);
      setRestaurant(restaurantData);
      
      // Set first category as active if restaurant exists
      if (restaurantData && restaurantData.dishes.length > 0) {
        const categories = [...new Set(restaurantData.dishes.map(dish => dish.category))];
        if (categories.length > 0) {
          setActiveCategory('all');
        }
      }
    }
  }, [id, getRestaurantById]);

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Restaurant not found</p>
        <Link to="/" className="text-orange-500 hover:underline mt-4 inline-block">
          Go back to home
        </Link>
      </div>
    );
  }

  const handleSaveToggle = () => {
    toggleSavedRestaurant(restaurant.id);
  };

  const categories = ['all', ...Array.from(new Set(restaurant.dishes.map(dish => dish.category)))];
  
  const filteredDishes = activeCategory === 'all' 
    ? restaurant.dishes 
    : restaurant.dishes.filter(dish => dish.category === activeCategory);

  return (
    <div>
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
        <ChevronLeft className="h-5 w-5 mr-1" />
        <span>Back to restaurants</span>
      </Link>

      {/* Restaurant Header */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-sm mt-1">{restaurant.cuisine.join(', ')}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center bg-green-500 px-2 py-1 rounded text-white mr-4">
                <Star className="h-4 w-4 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-sm">{restaurant.reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap justify-between">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Location</h3>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{restaurant.address}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Opening Hours</h3>
            <div className="flex items-center mt-1 text-gray-600">
              <Clock className="h-5 w-5 mr-1" />
              <span>{restaurant.openingHours.open} - {restaurant.openingHours.close}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Price Range</h3>
            <div className="mt-1 text-gray-600">
              {'₹'.repeat(restaurant.priceRange)}
              <span className="text-gray-400">{'₹'.repeat(4 - restaurant.priceRange)}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700">Features</h3>
            <div className="flex flex-wrap mt-1 gap-2">
              {restaurant.features.map(feature => (
                <span key={feature} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-2">
          <button 
            onClick={handleSaveToggle}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isSaved 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`h-5 w-5 mr-2 ${isSaved ? 'fill-red-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          
          <button className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Share2 className="h-5 w-5 mr-2" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Menu Section */}
      <div className={`rounded-lg p-4 mb-6 ${moodBasedTheme.bgGradient}`}>
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto space-x-2 pb-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {category === 'all' ? 'All Items' : category}
            </button>
          ))}
        </div>
        
        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map(dish => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DishCard 
                dish={dish} 
                craveScore={craveScore(dish)}
                onAddToCart={() => {}}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;