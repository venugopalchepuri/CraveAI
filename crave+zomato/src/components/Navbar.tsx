import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, MapPin, BarChart3 } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import MoodSelector from './MoodSelector';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const { moodBasedTheme, currentMood } = useMood();
  const { user, isLoggedIn } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMoodSelector = () => {
    setShowMoodSelector(!showMoodSelector);
  };

  return (
    <nav className={`sticky top-0 z-50 shadow-md ${moodBasedTheme.bgGradient}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className={`h-8 w-8 ${moodBasedTheme.primaryColor}`} />
            <div className="flex flex-col">
              <span className={`font-bold text-xl ${moodBasedTheme.primaryColor}`}>CraveAI</span>
              <span className="text-xs text-gray-600">Predict your cravings</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button 
                onClick={toggleMoodSelector}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${moodBasedTheme.primaryColor} border-${moodBasedTheme.primaryColor.replace('text-', '')}`}
              >
                <span className="capitalize">{currentMood}</span>
              </button>
              {showMoodSelector && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
                  <MoodSelector onClose={() => setShowMoodSelector(false)} />
                </div>
              )}
            </div>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-gray-900 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1" />
              <span>Crave Analytics</span>
            </Link>
            {isLoggedIn ? (
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5 mr-1" />
                <span>{user?.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={toggleMoodSelector}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full border w-fit ${moodBasedTheme.primaryColor} border-${moodBasedTheme.primaryColor.replace('text-', '')}`}
              >
                <span className="capitalize">{currentMood}</span>
              </button>
              {showMoodSelector && (
                <div className="bg-white shadow-lg rounded-lg p-4">
                  <MoodSelector onClose={() => setShowMoodSelector(false)} />
                </div>
              )}
              <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-gray-900 flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Crave Analytics</span>
              </Link>
              {isLoggedIn ? (
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
                  <User className="h-5 w-5 mr-1" />
                  <span>{user?.name}</span>
                </Link>
              ) : (
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-fit">
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;