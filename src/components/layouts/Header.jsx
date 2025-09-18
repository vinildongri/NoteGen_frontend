// src/components/Header.js

import React from 'react';
import { FiMenu, FiPlus } from 'react-icons/fi'; // Icons for menu and new chat

// The Header now receives the toggleSidebar function and user info as props
const Header = ({ toggleSidebar, user }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* This is the hamburger menu button, which only shows on mobile via CSS */}
        <button className="menu-button" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1 className="header-title">NoteGen</h1>
      </div>

      <div className="header-right">
        <div className="user-profile">
          {user?.avatar ? (
            <img src={user.avatar.url} alt={user.name} className="user-avatar" />
          ) : (
            <div className="user-initial">{user?.name ? user.name.charAt(0) : 'G'}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;