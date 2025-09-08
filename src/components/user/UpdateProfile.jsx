import React, { useEffect, useState } from "react";
import "../../stylesCss/UpdateProfile.css";
import { useUpdateUserMutation } from "../../redux/api/authApi";
import { toast } from "react-hot-toast";

const UpdateProfile = ({ user, onClose }) => {
  // console.log({user});
  
  const [updateProfile, { isLoading, error, isSuccess}] = useUpdateUserMutation();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

   useEffect(() => {
    if(user){
      setName(user.name || "");
      setEmail(user.email || "");
    }
  },[user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {}
    if (name) userData.name = name;
    if (email) userData.email = email;
    
    updateProfile(userData);
  };

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }
    if(isSuccess){
      toast.success("User Updated");
      setTimeout(()=>{window.location.reload()}, 500);
    }
  },[error, isSuccess]);

  return (
    <div className="update-profile-wrapper">
      <div className="update-profile-container">
        {/* Close button */}
        <button className="close-btn" onClick={ onClose }>
          ×
        </button>

        <h2>Update Profile</h2>

        <form className="update-profile-form" onSubmit={ submitHandler }>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              // placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              // placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="update-btn" disabled={isLoading}>
            { isLoading ? ("Updating...") : ("Update Profile")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
