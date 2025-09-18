// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetMeQuery } from "./redux/api/userApi";
import { Toaster } from "react-hot-toast";

// Import Components
import Sidebar from "./components/SideBar";
import Header from "./components/layouts/Header";
import ChatInput from "./components/ChatInput";
// Add imports for your other pages/components as needed
// import Settings from "./components/layouts/Setting";
// import ResetPassword from "./components/user/ResetPassword";

// Import CSS
import "./App.css";
import "./stylesCss/SideBar.css";
import "./stylesCss/Header.css";
import "./stylesCss/ChatInput.css";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data } = useGetMeQuery();
  const user = data?.user;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {/* Conditionally render the overlay for closing the sidebar */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <div className="app-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="main-content">
          <Header toggleSidebar={toggleSidebar} user={user} />

          <div className="content-area">
            <Routes>
              <Route path="/" element={<ChatInput />} />
              {/* Add your other routes here */}
              {/* <Route path="/settings" element={<Settings />} /> */}
              {/* <Route path="/password/reset/:token" element={<ResetPassword />} /> */}
            </Routes>
          </div>
        </div>
      </div>
      
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;