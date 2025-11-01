// src/components/layouts/Header.js
import React from 'react';
import { FiMenu } from 'react-icons/fi';

const Header = ({ toggleSidebar, user, onAvatarClick }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <h1 className="header-title">NoteGen</h1>
      </div>

      <div className="header-right">
        <div
          className="user-profile "
          onClick={() => onAvatarClick?.()}
          style={{ cursor: 'pointer' }}
        >
          {user?.avatar ? (
            <img src={user.avatar.url} alt={user.name} className="user-avatar" />
          ) : (
            <div className="user-initial text-primary">
              {user?.name ? user.name.charAt(0) : 'G'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
