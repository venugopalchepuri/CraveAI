import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface WeatherData {
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'stormy' | 'unknown';
  temperature: number;
  humidity: number;
  location: string;
}

interface WeatherContextType {
  weather: WeatherData;
  isLoading: boolean;
  error: string | null;
}

const defaultWeather: WeatherData = {
  condition: 'sunny',
  temperature: 25,
  humidity: 60,
  location: 'Mumbai',
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData>(defaultWeather);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch from a weather API
    // For now, we'll simulate with mock data
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data - in a real app, this would come from an API
        const conditions: Array<WeatherData['condition']> = ['sunny', 'rainy', 'cloudy', 'snowy', 'stormy'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        const randomTemp = Math.floor(Math.random() * 35) + 5; // 5-40°C
        
        setWeather({
          condition: randomCondition,
          temperature: randomTemp,
          humidity: Math.floor(Math.random() * 60) + 30, // 30-90%
          location: 'Mumbai',
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, isLoading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};