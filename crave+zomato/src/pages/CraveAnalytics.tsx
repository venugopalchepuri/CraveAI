import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useMood } from '../context/MoodContext';
import { useUser } from '../context/UserContext';
import { format } from 'date-fns';

const CraveAnalytics: React.FC = () => {
  const { moodHistory, moodBasedTheme } = useMood();
  const { user } = useUser();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Mock data for the charts
  const moodData = [
    { name: 'Happy', value: 8 },
    { name: 'Sad', value: 3 },
    { name: 'Stressed', value: 5 },
    { name: 'Relaxed', value: 7 },
    { name: 'Hungry', value: 10 },
    { name: 'Neutral', value: 4 }
  ];

  const weatherCravingData = [
    { weather: 'Sunny', spicy: 4, sweet: 8, savory: 6 },
    { weather: 'Rainy', spicy: 8, sweet: 5, savory: 7 },
    { weather: 'Cloudy', spicy: 6, sweet: 6, savory: 8 },
    { weather: 'Snowy', spicy: 9, sweet: 3, savory: 5 }
  ];

  const timeOfDayCravingData = [
    { time: 'Morning', coffee: 9, breakfast: 8, snacks: 3 },
    { time: 'Afternoon', coffee: 5, lunch: 9, snacks: 6 },
    { time: 'Evening', coffee: 3, dinner: 8, snacks: 7 },
    { time: 'Night', coffee: 1, dinner: 4, snacks: 9 }
  ];

  const cuisinePreferenceData = [
    { name: 'North Indian', value: 35 },
    { name: 'Chinese', value: 25 },
    { name: 'Italian', value: 20 },
    { name: 'South Indian', value: 10 },
    { name: 'American', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B'];

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your crave analytics</p>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className={`rounded-xl p-6 mb-8 ${moodBasedTheme.bgGradient}`}>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Craving Graph</h1>
        <p className="text-gray-600">
          Discover patterns in your food preferences based on mood, weather, and time of day
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === 'week'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'year'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mood Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Mood Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {moodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Your most common mood is <span className="font-medium">Hungry</span>, followed by <span className="font-medium">Happy</span>.
          </p>
        </div>

        {/* Cuisine Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cuisine Preferences</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cuisinePreferenceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cuisinePreferenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            You prefer <span className="font-medium">North Indian</span> cuisine the most, followed by <span className="font-medium">Chinese</span>.
          </p>
        </div>
      </div>

      {/* Weather Impact on Cravings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Weather Impact on Cravings</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weatherCravingData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weather" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="spicy" fill="#FF6B6B" name="Spicy Food" />
              <Bar dataKey="sweet" fill="#4BC0C0" name="Sweet Food" />
              <Bar dataKey="savory" fill="#FFCE56" name="Savory Food" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-lg">Key Insights:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>You crave <span className="font-medium">spicy food</span> more during rainy and snowy weather</li>
            <li>On sunny days, you prefer <span className="font-medium">sweet dishes</span></li>
            <li>Cloudy weather increases your craving for <span className="font-medium">savory meals</span></li>
          </ul>
        </div>
      </div>

      {/* Time of Day Cravings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Time of Day Cravings</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={timeOfDayCravingData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="coffee" fill="#A78BFA" name="Coffee" />
              <Bar dataKey="breakfast" fill="#F59E0B" name="Breakfast" />
              <Bar dataKey="lunch" fill="#10B981" name="Lunch" />
              <Bar dataKey="dinner" fill="#3B82F6" name="Dinner" />
              <Bar dataKey="snacks" fill="#EC4899" name="Snacks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h3 className="font-medium text-lg">Key Insights:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
            <li>Your coffee consumption is highest in the <span className="font-medium">morning</span></li>
            <li>You tend to snack more at <span className="font-medium">night</span></li>
            <li>Your biggest meals are typically <span className="font-medium">lunch</span> in the afternoon</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CraveAnalytics;