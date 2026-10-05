import React, { createContext, useContext, useEffect, useState } from 'react';
import { District } from '../api/types';
import { JHARKHAND_DISTRICTS } from '../api/data/districts';

export type FontSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  selectedDistrict: District;
  currentDistrict: District;
  setSelectedDistrict: (d: District) => void;
  setDistrict: (d: District) => void;
  hasChosenDistrictFirstTime: boolean;
  setHasChosenDistrictFirstTime: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('jsk_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    try {
      return (localStorage.getItem('jsk_font_size') as FontSize) || 'md';
    } catch {
      return 'md';
    }
  });

  const [selectedDistrict, setSelectedDistrictState] = useState<District>(() => {
    try {
      const stored = localStorage.getItem('jsk_selected_district');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return JHARKHAND_DISTRICTS[0];
  });

  const [hasChosenDistrictFirstTime, setHasChosenDistrictFirstTime] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jsk_district_chosen') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('jsk_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('jsk_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('jsk_font_size', fontSize);
  }, [fontSize]);

  const toggleDark = () => setIsDark((prev) => !prev);
  const setFontSize = (size: FontSize) => setFontSizeState(size);

  const setSelectedDistrict = (d: District) => {
    setSelectedDistrictState(d);
    try {
      localStorage.setItem('jsk_selected_district', JSON.stringify(d));
      localStorage.setItem('jsk_district_chosen', 'true');
      setHasChosenDistrictFirstTime(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDark,
        fontSize,
        setFontSize,
        selectedDistrict,
        currentDistrict: selectedDistrict,
        setSelectedDistrict,
        setDistrict: setSelectedDistrict,
        hasChosenDistrictFirstTime,
        setHasChosenDistrictFirstTime,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
