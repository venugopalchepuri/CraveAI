import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: {
    dishId: string;
    dishName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    favoriteCuisines: string[];
    dietaryRestrictions: string[];
    spiceLevel: 'mild' | 'medium' | 'hot';
    budget: 'low' | 'medium' | 'high';
  };
  orderHistory: Order[];
  savedRestaurants: string[];
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  addToOrderHistory: (order: Order) => void;
  toggleSavedRestaurant: (restaurantId: string) => void;
}

const defaultUser: User = {
  id: 'user1',
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  preferences: {
    favoriteCuisines: ['North Indian', 'Chinese', 'Italian'],
    dietaryRestrictions: ['No Beef'],
    spiceLevel: 'medium',
    budget: 'medium',
  },
  orderHistory: [
    {
      id: 'order1',
      restaurantId: 'rest1',
      restaurantName: 'Punjabi Tadka',
      items: [
        {
          dishId: 'dish1',
          dishName: 'Butter Chicken',
          quantity: 1,
          price: 350,
        },
        {
          dishId: 'dish2',
          dishName: 'Garlic Naan',
          quantity: 2,
          price: 60,
        },
      ],
      totalAmount: 470,
      orderDate: new Date(2023, 5, 15),
      status: 'delivered',
    },
  ],
  savedRestaurants: ['rest1', 'rest3'],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser); // For demo, start with a logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // For demo, start as logged in

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would validate credentials with a backend
    // For demo purposes, we'll just set the default user
    setUser(defaultUser);
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updatePreferences = (preferences: Partial<User['preferences']>): void => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        },
      });
    }
  };

  const addToOrderHistory = (order: Order): void => {
    if (user) {
      setUser({
        ...user,
        orderHistory: [order, ...user.orderHistory],
      });
    }
  };

  const toggleSavedRestaurant = (restaurantId: string): void => {
    if (user) {
      const isSaved = user.savedRestaurants.includes(restaurantId);
      const updatedSavedRestaurants = isSaved
        ? user.savedRestaurants.filter(id => id !== restaurantId)
        : [...user.savedRestaurants, restaurantId];

      setUser({
        ...user,
        savedRestaurants: updatedSavedRestaurants,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updatePreferences,
        addToOrderHistory,
        toggleSavedRestaurant,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};