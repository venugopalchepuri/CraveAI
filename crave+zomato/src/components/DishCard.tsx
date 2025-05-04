import React from 'react';
import { Dish } from '../context/RestaurantContext';
import { Flame, Leaf } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  restaurantName?: string;
  craveScore: number;
  onAddToCart?: () => void;
}

const DishCard: React.FC<DishCardProps> = ({ 
  dish, 
  restaurantName, 
  craveScore,
  onAddToCart 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
          {craveScore}% Match
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
          <div className="flex space-x-1">
            {dish.isVegetarian && (
              <Leaf className="h-5 w-5 text-green-600" />
            )}
            {dish.isSpicy && (
              <Flame className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        {restaurantName && (
          <p className="text-sm text-gray-600 mt-1">{restaurantName}</p>
        )}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{dish.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-lg font-semibold">₹{dish.price}</div>
          {onAddToCart && (
            <button 
              onClick={onAddToCart}
              className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;