// src/components/layouts/Avatar.js
import React from "react";
import "../../stylesCss/Avatar.css";

const Avatar = ({ user, onClose, onClickManageProfile }) => {
  if (!user) return null;

  const { name, email } = user;

  return (
    <div className="avatar-card">
      <div className="avatar-header">
        <button className="close-btn" onClick={() => onClose?.()}>×</button>
      </div>

      <div className="avatar-initials">{name.charAt(0).toUpperCase()}</div>

      <div className="avatar-details">
        <h3 className="avatar-name">Hi, {name}!</h3>
        <p className="avatar-email">{email}</p>
      </div>

      <div className="avatar-actions">
        <button className="btn" onClick={() => onClickManageProfile?.()}>
          Manage Your Profile
        </button>
      </div>
    </div>
  );
};

export default Avatar;
