import React, { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi'; // Import the icons
import "../../stylesCss/Profile.css";

const Profile = ({ user, onClose, onUpdate, onOpenUpdatePasssword }) => {

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="profile-close-btn" onClick={onClose}>✕</button>

        <h2 className="profile-title me-3">Your Profile</h2>

        <ul className="profile-list">
          <li className="profile-item">
            <strong>User Name:</strong> {user?.name || 'N/A'}
          </li>

          <li className="profile-item">
            <strong>Email:</strong> {user?.email || 'N/A'}
          </li>

          <li className="profile-item">
            <button className="profile-update-button" onClick={ onUpdate }>
              <FiUser style={{ marginRight: '5px' }} /> Update Profile
            </button>
          </li>

          <li className="profile-item">
            <button className="profile-update-button" onClick={ onOpenUpdatePasssword }>
              <FiLock style={{ marginRight: '5px' }} /> Update Password
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
