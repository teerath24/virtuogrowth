/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage on initial load
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("virtuo-theme");
      console.log("Initial localStorage value:", saved); // Debug
      if (saved) {
        return saved === "dark";
      }
      // Default to light mode instead of system preference
      return false;
    }
    return false;
  });

  useEffect(() => {
    // Save to localStorage whenever theme changes
    if (typeof window !== "undefined") {
      localStorage.setItem("virtuo-theme", isDark ? "dark" : "light");
      console.log("Theme changed to:", isDark ? "dark" : "light"); // Debug log
    }

    // Update document class for global styling
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      console.log("Added dark class to root"); // Debug log
    } else {
      root.classList.remove("dark");
      console.log("Removed dark class from root"); // Debug log
    }
  }, [isDark]);

  const toggleTheme = () => {
    console.log("Toggle clicked, current isDark:", isDark); // Debug log
    setIsDark((prev) => !prev);
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
