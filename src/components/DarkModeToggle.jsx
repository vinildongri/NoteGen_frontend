import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const darkToggleStyle = {
    marginLeft: "4px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.95rem",
    width: "350px", // set your desired width here
  };

  const iconColor = "blue"; // You can also use a hex like "#007BFF"
  const iconSize = 24;

  return (
    <li style={darkToggleStyle} onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <FiMoon color={iconColor} /> <span>Dark Mode</span>
        </>
      ) : (
        <>
          <FiSun color={iconColor} /> <span>Light Mode</span>
        </>
      )}
    </li>
  );
};

export default DarkModeToggle;
