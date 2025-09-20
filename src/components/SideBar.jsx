// src/components/SideBar.js
import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiEdit, FiSettings } from "react-icons/fi";
import { useGetMeQuery } from "../redux/api/userApi";

// Layouts & User Components
import Setting from "./layouts/Setting";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Profile from "./user/Profile";
import UpdateProfile from "./user/UpdateProfile";
import UpdatePassword from "./user/UpdatePassword";
import ForgotPassword from "./user/ForgotPassword";

import "../stylesCss/ForgotPassword.css";

const Sidebar = ({ isOpen, toggleSidebar, openProfile, setOpenProfile, showLogin, setShowLogin, showRegister, setShowRegister }) => {
  
  const sidebarRef = useRef(null);
  const { data: meData } = useGetMeQuery();
  const user = meData?.user;

  // --- Local states ---
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSetting, setShowSetting] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showRegister, setShowRegister] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleUpdatePassword = () => {
    setShowUpdatePassword(true);
  };

  const handleUpdateProfile = () => {
    setShowUpdate(true);
  };

  const handleProfileClick = () => {
    setOpenProfile(true);
    setShowSetting(false);
  };

  const handleLoginClick = () => {
    setShowSetting(false);
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleMouseEnter = () => setIsCollapsed(false);
  const handleMouseLeave = () => setIsCollapsed(true);

  const recentItems = [
    "Gemini-Style Sidebar Fronte...",
    "Building a Gemini-Style Side...",
    "Gemini-Style Sidebar Code",
    "React Search Bar Code Revi...",
  ];

  const showText = !isCollapsed || isOpen;

  // --- Click outside to close Sidebar ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top */}
        <div className="sidebar-top">
          <button className="sidebar-icon-button" onClick={toggleSidebar}>
            <FiMenu size={20} />
          </button>
        </div>

        {/* New Chat */}
        <div>
          <button className="new-chat-button">
            <FiEdit size={20} />
            {showText && <span>New chat</span>}
          </button>
        </div>

        {/* Main Content */}
        <div className="sidebar-main">
          <div className="sidebar-section pt-5">
            {showText && <p className="section-title">Recent</p>}
            <ul className="menu-list">
              {recentItems.map((item, index) => (
                <li key={index} className="menu-item recent-item">
                  {showText && <span className="label">{item}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <div
            className="menu-item"
            onClick={() =>{
               setShowSetting(true);
               
                if (isOpen) {
                  toggleSidebar(); // close mobile sidebar
                } else {
                  setIsCollapsed(true); // collapse sidebar on desktop
                }
            }}
          >
            <span className="icon">
              <FiSettings size={18} />
            </span>
            {showText && <span className="label me-5 pe-3">Settings & help</span>}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {showSetting && (
        <Setting
          onClose={() => setShowSetting(false)}
          onLogin={handleLoginClick}
          onOpenProfile={handleProfileClick}
        />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onNewUSer={handleRegisterClick}
          onForgotPassword={() => setShowLogin(false)}
          // onClickLogin={handleLoginClick}
        />
      )}

      {showRegister && <Register onClose={() => setShowRegister(false)} />}

      {openProfile && (
        <Profile
          user={user}
          onClose={() => setOpenProfile(false)} // close from Sidebar
          onUpdate={handleUpdateProfile}
          onOpenUpdatePasssword={handleUpdatePassword}
        />
      )}

      {showUpdate && <UpdateProfile user={user} onClose={() => setShowUpdate(false)} />}
      {showUpdatePassword && <UpdatePassword onClose={() => setShowUpdatePassword(false)} />}
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
    </>
  );
};

export default Sidebar;
