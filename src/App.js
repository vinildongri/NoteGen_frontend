import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import ChatInput from "./components/ChatInput";
import "./App.css";
import "./stylesCss/SideBar.css";
import "./stylesCss/ChatInput.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="app-layout">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={ <ChatInput /> } />
          </Routes>
        </div>
        <Toaster position="top-center" reverseOrder={ false } />
      </Router>
    </div>
  );
}

export default App;