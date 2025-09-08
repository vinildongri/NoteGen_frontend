import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "../../stylesCss/Register.css";
import { useRegisterMutation } from "../../redux/api/authApi.js"
import toast from "react-hot-toast";

const Register = ({ onClose }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, error, data}] = useRegisterMutation();

  console.log(data); 

  useEffect(() => {
    if (data) {
      toast.success("Registered successfully!");
      onClose(); // auto close modal
    }
  }, [data, onClose]);

  

  useEffect( () => {
    if(error){
      toast.error(error?.data?.message || "Registration failed");
    }
  },[error]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    const registerData = {
      name,
      email,
      password,
    };

    register(registerData);
  };

  return (
    <div className="register-overlay">
      <div className="register-card">
        
        {/* Close Button */}
        <button className="register-close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>

        <h2 className="register-heading">Register</h2>

        <form className="register-form" onSubmit={ submitHandler }>
          <label htmlFor="name">Name</label>
          <input 
            id="name" 
            type="text" 
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={ (e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />

          <button 
            type="submit" 
            className="register-btn"
            disabled={ isLoading }
          >
            { isLoading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
