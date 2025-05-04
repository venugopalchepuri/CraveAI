import React from 'react';
import { useMood } from '../context/MoodContext';
import { Smile, Frown, Zap, Coffee, Utensils, Clock } from 'lucide-react';

interface MoodSelectorProps {
  onClose: () => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onClose }) => {
  const { setMood } = useMood();

  const moods = [
    { name: 'happy', icon: <Smile className="h-6 w-6 text-yellow-500" />, color: 'bg-yellow-100 border-yellow-300' },
    { name: 'sad', icon: <Frown className="h-6 w-6 text-blue-500" />, color: 'bg-blue-100 border-blue-300' },
    { name: 'stressed', icon: <Zap className="h-6 w-6 text-red-500" />, color: 'bg-red-100 border-red-300' },
    { name: 'relaxed', icon: <Coffee className="h-6 w-6 text-green-500" />, color: 'bg-green-100 border-green-300' },
    { name: 'hungry', icon: <Utensils className="h-6 w-6 text-amber-500" />, color: 'bg-amber-100 border-amber-300' },
    { name: 'neutral', icon: <Clock className="h-6 w-6 text-gray-500" />, color: 'bg-gray-100 border-gray-300' },
  ];

  const handleMoodSelect = (mood: 'happy' | 'sad' | 'stressed' | 'relaxed' | 'hungry' | 'neutral') => {
    setMood(mood);
    onClose();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">How are you feeling?</h3>
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className={`flex items-center space-x-2 p-3 rounded-lg border ${mood.color} hover:shadow-md transition-all`}
            onClick={() => handleMoodSelect(mood.name as any)}
          >
            {mood.icon}
            <span className="capitalize">{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;