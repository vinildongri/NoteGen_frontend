import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import "../../stylesCss/ResetPassword.css";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate(); // ✅ navigation hook

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "An error occurred");
    }

    if (isSuccess) {
      toast.success("Password Reset Successfully");
      setTimeout(()=>{ navigate("/") },1000);
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!token) {
      return toast.error("Invalid or missing token");
    }

    resetPassword({ token, body: { password, confirmPassword } });
  };

  const handleClose = () => {
    navigate("/"); // ✅ redirect to home
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-container">
        {/* Header with close button */}
        <div className="reset-header">
          <h2 className="reset-title">🔒 Reset Your Password</h2>
          <span><br /></span>
          <button className="reset-close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form className="reset-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="reset-btn" disabled={isLoading}>
            {isLoading ? "Updating Password ..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
