import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for saved theme in localStorage
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme globally via data-bs-theme (Bootstrap components if any)
    document.documentElement.setAttribute("data-bs-theme", theme);

    // Apply body class for background and text color
    document.body.className = theme;

    // Save theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Wrap children in a top-level div to apply background inheritance */}
      <div className={theme === "dark" ? "dark-mode" : "light-mode"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
