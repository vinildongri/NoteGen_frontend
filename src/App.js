// src/App.js
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetMeQuery } from "./redux/api/userApi";
import { Toaster } from "react-hot-toast";

// Components
import Sidebar from "./components/SideBar";
import Header from "./components/layouts/Header";
import ChatInput from "./components/ChatInput";
import Avatar from "./components/layouts/Avatar";
import LoginModal from "./components/layouts/LoginModal";

// CSS
import "./App.css";
import "./stylesCss/SideBar.css";
import "./stylesCss/Header.css";
import "./stylesCss/ChatInput.css";
import "./stylesCss/LoginModal.css";

function App({ onManageProfile }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showSidebarProfile, setShowSidebarProfile] = useState(false); // <- lifted state
  const [sidebarLoginOpen, setSidebarLoginOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [sidebarRegisterOpen, setSidebarRegisterOpen] = useState(false);

  const loginModalHandler = () => {
    setSidebarLoginOpen(true);
    setShowLoginModal(false);
  }

  const registerHandler = () => {
    setSidebarRegisterOpen(true);
    setShowLoginModal(false);
  }

  const { data } = useGetMeQuery();
  const user = data?.user;

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleAvatar = () => setShowAvatar(prev => !prev);

  // Clicking Manage Profile anywhere
  const handleManageProfile = () => {
    setShowAvatar(false); // close avatar card if open
    setShowSidebarProfile(true); // open profile in Sidebar
    if (typeof onManageProfile === "function") {
      onManageProfile();
    }
  }

  // --- Click outside avatar to close ---
  const avatarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAvatar && avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowAvatar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAvatar]);

return (
  <Router>
    <div className="app-layout">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        openProfile={showSidebarProfile} 
        setOpenProfile={setShowSidebarProfile}
        showLogin={sidebarLoginOpen}       // ✅ pass state
        setShowLogin={setSidebarLoginOpen}  // ✅ pass setter
        showRegister={sidebarRegisterOpen}
        setShowRegister={setSidebarRegisterOpen}
      />

      <div className="main-content">
        <Header 
          toggleSidebar={toggleSidebar} 
          user={user} 
          onAvatarClick={toggleAvatar} 
        />

        <div className="content-area">
          <Routes>
            <Route path="/" 
              element={
                <ChatInput 
                  onLoginClick={() => setSidebarLoginOpen(true)} // pass setter
                  onSignUpClick={() => setSidebarRegisterOpen(true)}
                />} 
            />
          </Routes>

          {showAvatar && 
            <div ref={avatarRef}>
              <Avatar 
                user={user}
                onClose={() => setShowAvatar(false)}
                onClickManageProfile={handleManageProfile}
              />
            </div>
          }
        </div>
      </div>
    </div>

    {/* 🔹 Show Login Modal on top of everything */}
    {!user && showLoginModal && (
      <LoginModal 
        // onClickLogin={() => setSidebarLoginOpen(true)}
        onClickLogin={ loginModalHandler }
        onClickSignUp={ registerHandler }
        stayLoggedOut={ ()=> setShowLoginModal(false)}
      />
    )}

    <Toaster position="top-center" reverseOrder={false} />
  </Router>
);

}

export default App;
