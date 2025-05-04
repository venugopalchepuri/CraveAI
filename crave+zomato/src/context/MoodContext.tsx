import React, { createContext, useState, useContext, ReactNode } from 'react';

type Mood = 'happy' | 'sad' | 'stressed' | 'relaxed' | 'hungry' | 'neutral';

interface MoodContextType {
  currentMood: Mood;
  setMood: (mood: Mood) => void;
  moodHistory: { mood: Mood; timestamp: Date }[];
  moodBasedTheme: {
    primaryColor: string;
    secondaryColor: string;
    bgGradient: string;
    cardBg: string;
    buttonGradient: string;
    shadowColor: string;
  };
}

const defaultMoodThemes = {
  happy: {
    primaryColor: 'text-yellow-500',
    secondaryColor: 'text-orange-400',
    bgGradient: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600',
    shadowColor: 'shadow-yellow-200',
  },
  sad: {
    primaryColor: 'text-blue-500',
    secondaryColor: 'text-indigo-400',
    bgGradient: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600',
    shadowColor: 'shadow-blue-200',
  },
  stressed: {
    primaryColor: 'text-red-500',
    secondaryColor: 'text-pink-400',
    bgGradient: 'bg-gradient-to-br from-red-100 via-pink-50 to-rose-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600',
    shadowColor: 'shadow-red-200',
  },
  relaxed: {
    primaryColor: 'text-green-500',
    secondaryColor: 'text-teal-400',
    bgGradient: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600',
    shadowColor: 'shadow-green-200',
  },
  hungry: {
    primaryColor: 'text-amber-500',
    secondaryColor: 'text-yellow-400',
    bgGradient: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600',
    shadowColor: 'shadow-amber-200',
  },
  neutral: {
    primaryColor: 'text-gray-500',
    secondaryColor: 'text-slate-400',
    bgGradient: 'bg-gradient-to-br from-gray-100 via-slate-50 to-zinc-100',
    cardBg: 'bg-white backdrop-blur-md bg-opacity-90',
    buttonGradient: 'bg-gradient-to-r from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600',
    shadowColor: 'shadow-gray-200',
  },
};

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<Mood>('neutral');
  const [moodHistory, setMoodHistory] = useState<{ mood: Mood; timestamp: Date }[]>([
    { mood: 'neutral', timestamp: new Date() },
  ]);

  const setMood = (mood: Mood) => {
    setCurrentMood(mood);
    setMoodHistory([...moodHistory, { mood, timestamp: new Date() }]);
  };

  const moodBasedTheme = defaultMoodThemes[currentMood];

  return (
    <MoodContext.Provider value={{ currentMood, setMood, moodHistory, moodBasedTheme }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};