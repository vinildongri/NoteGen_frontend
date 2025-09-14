import React, { useContext } from "react";
// import { ThemeContext } from "./ThemeContext";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    // <Button variant={theme === "light" ? "dark" : "light"} onClick={toggleTheme}>
    //   {theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
    // </Button>
    <p 
      ariant={theme === "light" ? "dark" : "light"}
      onClick={toggleTheme}
    >
      {theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
    </p>
  );
};

export default DarkModeToggle;
