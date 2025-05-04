import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useMood } from '../context/MoodContext';
import { useRestaurants } from '../context/RestaurantContext';
import { User, Heart, Clock, Settings, LogOut } from 'lucide-react';
import { format } from 'date-fns';
import RestaurantCard from '../components/RestaurantCard';

const Profile: React.FC = () => {
  const { user, logout } = useUser();
  const { moodBasedTheme } = useMood();
  const { allRestaurants } = useRestaurants();
  const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'preferences'>('orders');

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please log in to view your profile</p>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Login
        </button>
      </div>
    );
  }

  const savedRestaurants = allRestaurants.filter(restaurant => 
    user.savedRestaurants.includes(restaurant.id)
  );

  return (
    <div>
      {/* Profile Header */}
      <div className={`rounded-xl p-6 mb-8 ${moodBasedTheme.bgGradient}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="bg-white p-4 rounded-full">
            <User className="h-16 w-16 text-gray-700" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                {user.preferences.favoriteCuisines.join(', ')}
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                Spice: {user.preferences.spiceLevel}
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                Budget: {user.preferences.budget}
              </div>
            </div>
          </div>
          <div className="ml-auto hidden md:block">
            <button 
              onClick={() => logout()}
              className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'orders'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Clock className="h-4 w-4 inline mr-2" />
          Order History
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'saved'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Heart className="h-4 w-4 inline mr-2" />
          Saved Restaurants
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'preferences'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="h-4 w-4 inline mr-2" />
          Preferences
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            {user.orderHistory.length === 0 ? (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {user.orderHistory.map(order => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{order.restaurantName}</h3>
                        <p className="text-sm text-gray-500">
                          {format(order.orderDate, 'PPP')} • {order.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.totalAmount}</p>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <ul className="space-y-1">
                        {order.items.map(item => (
                          <li key={item.dishId} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.dishName}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Saved Restaurants</h2>
            {savedRestaurants.length === 0 ? (
              <p className="text-gray-500">You haven't saved any restaurants yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Favorite Cuisines</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.favoriteCuisines.map(cuisine => (
                    <div key={cuisine} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {cuisine}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.dietaryRestrictions.map(restriction => (
                    <div key={restriction} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {restriction}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Spice Level</h3>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 inline-block">
                  {user.preferences.spiceLevel}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Budget</h3>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 inline-block">
                  {user.preferences.budget}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;