import React, { useState } from "react";
import { FiMenu, FiEdit, FiSettings } from "react-icons/fi";
import Setting from "./layouts/Setting";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import Profile from "./user/Profile";
// import { useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";
import UpdateProfile from "./user/UpdateProfile";
import UpdatePassword from "./user/UpdatePassword";

const Sidebar = () => {
  // const { user } = useSelector((state) => state.auth); // From Redux 

  const { data: meData } = useGetMeQuery();
  const user = meData?.user;

  const [active, setActive] = useState(""); 
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSetting, setShowSetting] = useState(false);
  const [showLoin,setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const HandeUpdatePassword = () => {
    setShowUpdatePassword(true);
    setShowProfile(false);
  };

  const handleUpdateProfile = () => {
    setShowUpdate(true);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
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

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };
  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  const recentItems = [
    "Gemini-Style Sidebar Fronte...",
    "Building a Gemini-Style Side...",
    "Gemini-Style Sidebar Code",
    "React Search Bar Code Revi...",
  ];

  return (
    <>
      <div
        className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-top">
          <button className="sidebar-icon-button">
            <FiMenu size={20} />
          </button>
        </div>

        <div>
          <button className="new-chat-button">
            <FiEdit size={20} />
            {!isCollapsed && <span>New chat</span>}
          </button>
        </div>

        <div className="sidebar-main">
          {/* "Gems" section has been completely removed */}

          <div className="sidebar-section pt-5">
            {!isCollapsed && <p className="section-title">Recent</p>}
            <ul className="menu-list">
              {recentItems.map((item, index) => (
                <li key={index} className="menu-item recent-item">
                  {isCollapsed ? '' : <span className="label">{item}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="menu-item"
            onClick={ () => setShowSetting(true)}
          >
            <span className="icon">
              <FiSettings size={18} />
            </span>
            {!isCollapsed && <span className="label me-5 pe-3">Settings & help</span>}
          </div>
        </div>
      </div>

      {/* Setting Card */}
      {showSetting &&
       <Setting 
        onClose={ () => setShowSetting(false)}
        onLogin={ handleLoginClick }
        onOpenProfile={ handleProfileClick }
      />}

      {/* Login Card */}
      { showLoin && 
        <Login 
          onClose={ () => setShowLogin(false)}
          onNewUSer={ handleRegisterClick }
      />}

      {/* Register Card */}
      { showRegister && 
        <Register 
          onClose={ () => setShowRegister(false)}
      />}

      {/* Profile Card */}
      { showProfile && 
        <Profile
          user={user} // from Redux
          onClose={() => setShowProfile(false)}
          onUpdate={handleUpdateProfile}
          onOpenUpdatePasssword={ HandeUpdatePassword }
        />
      }

      {/* Update Profile card */}
      { showUpdate && 
        <UpdateProfile user={ user } onClose={ () => setShowUpdate(false)} />
      }

      {/* Update Password card */}
      { showUpdatePassword && 
        <UpdatePassword onClose={ () => setShowUpdatePassword(false) } />
      }

    </>
  );
};

export default Sidebar;