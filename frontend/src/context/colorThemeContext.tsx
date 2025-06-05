import { useContext, createContext, useState, useEffect } from "react";


type IColorThemeContext = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ColorThemeContext = createContext<IColorThemeContext | null>(null);

const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const localTheme = localStorage.getItem('theme');

  const [theme, setTheme] = useState<'light' | 'dark'>(localTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

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

