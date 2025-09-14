import React, { useEffect, useState } from "react";
import "../../stylesCss/ForgotPassword.css";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const ForgotPassword = ({ onClose }) => {

  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Email sent. Please check Your Inbox");
    }
  },[error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter Email");
    return;
  }
  
    forgotPassword({ email });
  }

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">
        {/* Close button */}
        <button className="forgot-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Title */}
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your email to receive a reset link
        </p>

        {/* Form */}
        <form className="forgot-form" onSubmit={ submitHandler }>
          <div className="forgot-form-group">
            <label htmlFor="email">Email Address</label>
            <input 
                type="email" 
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="forgot-btn" disabled={isLoading}>
            {isLoading ? "Sending Reset Link ..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
