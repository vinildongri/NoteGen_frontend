import React, { useEffect, useState } from "react";
import "../../stylesCss/UpdatePassword.css";
import { useUpdatePasswordMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";

const UpdatePassword = ( {onClose} ) => {

  const [updatePassword, { isLoading, error, isSuccess}] = useUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const submitHandler = (e) => {
    e.preventDefault();

    if(!oldPassword || !newPassword){
      return toast.error("Please fill all fields");
    }

    if(oldPassword === newPassword){
      return toast.error("New password must be different");
    }

    const userData = {
      oldPassword,
      // newPassword,
      password: newPassword,  // 🔑 rename here
    };

    updatePassword(userData);
  };

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("Password Updated");
      setTimeout(()=>{window.location.reload()}, 500);
    }
    setOldPassword("");
    setNewPassword("");
  },[error, isSuccess]);

  return (
    <div className="update-password-wrapper">
      <div className="update-password-container">
        <div className="update-password-header">
          <h2>Update Password</h2>
          <button className="close-btn" onClick={ onClose }>×</button>
        </div>

        <form className="update-password-form" onSubmit={ submitHandler }>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={ isLoading }>
            { isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;