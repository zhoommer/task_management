import { useContext, createContext, useState } from "react";


type IColorThemeContext = {
  theme: 'light' | 'dark';
  toggleTheme: (newTheme: 'light' | 'dark') => void;
};

const ColorThemeContext = createContext<IColorThemeContext | null>(null);

const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <ColorThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
};

const useColorThemeProvider = () => {
  const context = useContext(ColorThemeContext);
  if (!context) throw new Error('useThemeProvider must be used within a ThemeProvider');

  return context;
};

export { ColorThemeContext, ColorThemeProvider, useColorThemeProvider };

