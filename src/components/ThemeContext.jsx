"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
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
  // This is the pro way - no useEffect, no warnings
  const isDark = useSyncExternalStore(
    subscribeToThemeChanges,
    () => getTheme() === "dark",
    () => false, // Server fallback
  );

  const toggleTheme = useCallback(() => {
    const newValue = !isDark;
    setTheme(newValue);
    // Manually dispatch event for same-tab updates
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
