import { createContext, ReactNode, useContext, useState } from "react";

export const ThemeContext = createContext({theme: 'dark', toggleTheme: ()=>{}});


export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProvider({children}:{children: ReactNode}) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((state)=>theme === 'dark'? 'light': 'dark');
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
        </ThemeContext.Provider>
  )
}