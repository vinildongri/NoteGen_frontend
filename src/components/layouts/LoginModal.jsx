import React from 'react';
import "../../stylesCss/LoginModal.css";

const LoginModal = ({ onClickLogin, onClickSignUp, stayLoggedOut }) => {
  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <h2>Welcome back</h2>
        <p>Log in or sign up to get smarter responses, upload files and images, and more.</p>
        
        <div className="modal-buttons">
            <button className="login-button" onClick={onClickLogin}>
                Log in
            </button>
            <button className="signup-button" onClick={onClickSignUp}>
                Sign up for free
            </button>
        </div>

        <button className="stay-logged-out fw-bold" onClick={ stayLoggedOut }>
          Stay logged out
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
