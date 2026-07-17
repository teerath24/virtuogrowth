"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useEffect,
} from "react";

const ThemeContext = createContext(undefined);

// Helper functions for localStorage
const getTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("virtuo-theme") === "dark" ? "dark" : "light";
};

const setTheme = (isDark) => {
  const theme = isDark ? "dark" : "light";
  localStorage.setItem("virtuo-theme", theme);
  document.documentElement.classList.toggle("dark", isDark);
};

// Subscribe to localStorage changes (for multi-tab sync)
const subscribeToThemeChanges = (onChange) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

export function ThemeProvider({ children }) {
  const isDark = useSyncExternalStore(
    subscribeToThemeChanges,
    () => getTheme() === "dark",
    () => false,
  );

  // Keeps the <html> tag's dark class in sync with the toggle state
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    const newValue = !isDark;
    setTheme(newValue);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "virtuo-theme",
        newValue: newValue ? "dark" : "light",
      }),
    );
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
