import { createContext, useContext } from "react";

// use context TYPE - 2

//context creation
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

//making everyone aware about the context
export const ThemeProvider = ThemeContext.Provider;

//using/(consuming the state) the context
export default function useTheme() {
  return useContext(ThemeContext);
}
