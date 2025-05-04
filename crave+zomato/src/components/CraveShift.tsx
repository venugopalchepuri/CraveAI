import React, { useState } from 'react';
import { Clock, CloudRain, CloudSun, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMood } from '../context/MoodContext';

interface CraveShiftProps {
  onTimeChange: (time: string) => void;
  onWeatherChange: (weather: string) => void;
}

const CraveShift: React.FC<CraveShiftProps> = ({ onTimeChange, onWeatherChange }) => {
  const [selectedTime, setSelectedTime] = useState('now');
  const [selectedWeather, setSelectedWeather] = useState('current');
  const { currentMood, moodBasedTheme } = useMood();

  const times = [
    { id: 'morning', label: 'Morning', icon: <Sun className="h-5 w-5" /> },
    { id: 'afternoon', label: 'Afternoon', icon: <CloudSun className="h-5 w-5" /> },
    { id: 'evening', label: 'Evening', icon: <Moon className="h-5 w-5" /> },
    { id: 'now', label: 'Now', icon: <Clock className="h-5 w-5" /> },
  ];

  const weathers = [
    { id: 'sunny', label: 'Sunny', icon: <Sun className="h-5 w-5" /> },
    { id: 'rainy', label: 'Rainy', icon: <CloudRain className="h-5 w-5" /> },
    { id: 'cloudy', label: 'Cloudy', icon: <CloudSun className="h-5 w-5" /> },
    { id: 'current', label: 'Current', icon: <Clock className="h-5 w-5" /> },
  ];

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    onTimeChange(time);
  };

  const handleWeatherChange = (weather: string) => {
    setSelectedWeather(weather);
    onWeatherChange(weather);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${moodBasedTheme.bgGradient}`}>
      <h3 className="text-lg font-semibold mb-3">CraveShift - Time Travel Your Cravings</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">When will you be eating?</p>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {times.map((time) => (
            <motion.button
              key={time.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTimeChange(time.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full border ${
                selectedTime === time.id
                  ? `bg-orange-500 text-white border-orange-500`
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {time.icon}
              <span>{time.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-2">What will the weather be like?</p>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {weathers.map((weather) => (
            <motion.button
              key={weather.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWeatherChange(weather.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full border ${
                selectedWeather === weather.id
                  ? `bg-orange-500 text-white border-orange-500`
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {weather.icon}
              <span>{weather.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Current mood: <span className="font-medium capitalize">{currentMood}</span></p>
        <p className="mt-1">
          {selectedTime !== 'now' || selectedWeather !== 'current' ? (
            <span>Showing recommendations for {selectedTime !== 'now' ? selectedTime : 'now'} 
              {selectedWeather !== 'current' ? ` during ${selectedWeather} weather` : ''}
            </span>
          ) : (
            <span>Showing current recommendations</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CraveShift;