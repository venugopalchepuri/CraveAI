import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { RestaurantFilters as FilterType } from '../context/RestaurantContext';
import { motion } from 'framer-motion';

interface RestaurantFiltersProps {
  onFilterChange: (filters: FilterType) => void;
  currentFilters: FilterType;
}

const RestaurantFilters: React.FC<RestaurantFiltersProps> = ({ 
  onFilterChange,
  currentFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>(currentFilters);

  const cuisines = [
    'North Indian', 
    'South Indian', 
    'Chinese', 
    'Italian', 
    'American', 
    'Japanese'
  ];

  const areas = [
    'Andheri', 
    'Bandra', 
    'Juhu', 
    'Matunga', 
    'Lower Parel', 
    'Worli'
  ];

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleCuisineChange = (cuisine: string) => {
    const currentCuisines = filters.cuisine || [];
    const updatedCuisines = currentCuisines.includes(cuisine)
      ? currentCuisines.filter(c => c !== cuisine)
      : [...currentCuisines, cuisine];
    
    setFilters({
      ...filters,
      cuisine: updatedCuisines
    });
  };

  const handlePriceChange = (price: number) => {
    const currentPrices = filters.priceRange || [];
    const updatedPrices = currentPrices.includes(price)
      ? currentPrices.filter(p => p !== price)
      : [...currentPrices, price];
    
    setFilters({
      ...filters,
      priceRange: updatedPrices
    });
  };

  const handleAreaChange = (area: string) => {
    setFilters({
      ...filters,
      area: filters.area === area ? undefined : area
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    });
  };

  const handleVegetarianChange = (isVegetarian: boolean) => {
    setFilters({
      ...filters,
      vegetarian: isVegetarian
    });
  };

  const handleSpicyChange = (isSpicy: boolean) => {
    setFilters({
      ...filters,
      spicy: isSpicy
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters: FilterType = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = () => {
    return (
      (filters.cuisine && filters.cuisine.length > 0) ||
      (filters.priceRange && filters.priceRange.length > 0) ||
      filters.rating !== undefined ||
      filters.area !== undefined ||
      filters.vegetarian !== undefined ||
      filters.spicy !== undefined
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <button
          onClick={toggleFilter}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 text-gray-600" />
          <span>Filters</span>
          {hasActiveFilters() && (
            <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </button>
        
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-800"
          >
            Clear all
          </button>
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white rounded-lg shadow-md p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button onClick={toggleFilter}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Cuisines */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Cuisine</h4>
            <div className="flex flex-wrap gap-2">
              {cuisines.map(cuisine => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineChange(cuisine)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.cuisine?.includes(cuisine)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(price => (
                <button
                  key={price}
                  onClick={() => handlePriceChange(price)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.priceRange?.includes(price)
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {'₹'.repeat(price)}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Rating</h4>
            <div className="flex gap-2">
              {[3, 3.5, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.rating === rating
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {rating}+ ★
                </button>
              ))}
            </div>
          </div>

          {/* Areas */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Area</h4>
            <div className="flex flex-wrap gap-2">
              {areas.map(area => (
                <button
                  key={area}
                  onClick={() => handleAreaChange(area)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.area === area
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Food Preferences */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Food Preferences</h4>
            <div className="flex gap-2">
              <button
                onClick={() => handleVegetarianChange(!filters.vegetarian)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.vegetarian
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => handleSpicyChange(!filters.spicy)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.spicy
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Spicy
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantFilters;