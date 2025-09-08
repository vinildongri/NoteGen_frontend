import React, { useState } from "react";
import { FiX, FiUser, FiLogIn, FiLogOut, FiMoon, FiHelpCircle } from "react-icons/fi";
import "../../stylesCss/Setting.css";
import toast from "react-hot-toast";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Setting = ({ onClose, onLogin, onOpenProfile }) => {

  const clickOutOfCard = (e) => {
    if (e.target.classList.contains("setting-overlay")) {
      onClose();
    }
  };

  // ✅ fetch logged-in user from API (works even after refresh)
  const { data: meData, isLoading } = useGetMeQuery();
  const user = meData?.user;

  const [logout] = useLazyLogoutQuery();
  
  const logoutHandler = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(()=>{window.location.reload()}, 500);
  };

  return (
    <>
      <div className="setting-overlay" onClick={clickOutOfCard}>
        <div className="setting-card">
          {/* Close Button */}
          <button className="close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>

          {/* Title */}
          <h2 className="setting-title ms-0 me-5 fw-bold">⚙️ Settings</h2>

          {/* Menu Items */}
          <ul className="setting-list">
            {user ? (
              <li className="setting-item" onClick={onOpenProfile}>
                <FiUser className="icon" /> <span>{user?.name}</span>
              </li>
            ) : (
              !isLoading && (
                <li className="setting-item" onClick={onLogin}>
                  <FiLogIn className="icon" /> <span>Login</span>
                </li>
              )
            )}

            {/* ✅ Logout only shows if user exists */}
            {user && (
              <li className="setting-item" onClick={logoutHandler}>
                <FiLogOut className="icon" /> <span>Logout</span>
              </li>
            )}

            <li className="setting-item">
              <FiMoon className="icon" /> <span>Theme</span>
            </li>
            <li className="setting-item">
              <FiHelpCircle className="icon" /> <span>Help</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Setting;
