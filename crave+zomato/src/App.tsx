import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import Profile from './pages/Profile';
import CraveAnalytics from './pages/CraveAnalytics';
import Payment from './pages/Payment';
import { MoodProvider } from './context/MoodContext';
import { WeatherProvider } from './context/WeatherContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <MoodProvider>
          <WeatherProvider>
            <RestaurantProvider>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="container mx-auto px-4 py-6">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/analytics" element={<CraveAnalytics />} />
                    <Route path="/payment" element={<Payment />} />
                  </Routes>
                </main>
              </div>
            </RestaurantProvider>
          </WeatherProvider>
        </MoodProvider>
      </UserProvider>
    </Router>
  );
}

export default App