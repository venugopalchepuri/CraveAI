import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Heart } from 'lucide-react';
import { Restaurant } from '../context/RestaurantContext';
import { useUser } from '../context/UserContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
  showCraveScore?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, showCraveScore = false }) => {
  const { user, toggleSavedRestaurant } = useUser();
  const isSaved = user?.savedRestaurants.includes(restaurant.id) || false;

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedRestaurant(restaurant.id);
  };

  // Calculate average crave score for display
  const avgCraveScore = showCraveScore
    ? Math.floor(
        restaurant.dishes.reduce((sum, dish) => {
          // This is a simplified version - in a real app, we'd use the actual craveScore function
          return sum + (dish.isPopular ? 85 : 70);
        }, 0) / restaurant.dishes.length
      )
    : null;

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleSaveToggle}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
          >
            <Heart
              className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
          {showCraveScore && avgCraveScore && (
            <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
              {avgCraveScore}% Match
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-800">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine.join(', ')}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{restaurant.area}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{restaurant.openingHours.open} - {restaurant.openingHours.close}</span>
            </div>
            <div className="text-sm font-medium">
              {'₹'.repeat(restaurant.priceRange)}
              <span className="text-gray-400">{'₹'.repeat(4 - restaurant.priceRange)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;