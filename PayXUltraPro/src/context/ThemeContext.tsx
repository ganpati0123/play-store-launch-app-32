// PayX Ultra Pro - Theme Context
// Global theme state management with smooth transitions

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColors, ColorPalette } from '../theme';

interface ThemeContextType {
  isDark: boolean;
  colors: ColorPalette;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  theme: 'light' | 'dark' | 'system';


  // Animation state
  isTransitioning: boolean;
  animationDuration: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@PayXUltraPro:theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('system');
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [animationDuration] = useState<number>(300);
  
  const colors = getColors(isDark);

  // Load saved theme on mount
  useEffect(() => {
    loadTheme();
  }, []);

  // Update isDark when system color scheme changes
  useEffect(() => {
    if (theme === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme, systemColorScheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme as 'light' | 'dark' | 'system');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const setTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    setIsTransitioning(true);
    
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
      
      if (newTheme === 'system') {
        setIsDark(systemColorScheme === 'dark');
      } else {
        setIsDark(newTheme === 'dark');
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, animationDuration);
    } catch (error) {
      console.error('Failed to save theme:', error);
      setIsTransitioning(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const value: ThemeContextType = {
    isDark,
    colors,
    toggleTheme,
    setTheme,
    theme,
    isTransitioning,
    animationDuration,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;