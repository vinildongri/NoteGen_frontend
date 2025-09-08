import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "../../stylesCss/Login.css";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";

const Login = ({ onClose, onNewUSer }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ login, { isLoading, data, error }] = useLoginMutation();

  useEffect( () => {
    if(error){
      toast.error(error?.data?.message || "Login Faild");
    }
    if (data) {
      toast.success("Login Successful!");
      onClose(); // close the login card
    }
  }, [error, data, onClose]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        {/* Close Button */}
        <button className="login-close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>

        <h2>Login</h2>

        <form onSubmit={ submitHandler }>
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            required 
            name="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input 
            type="password" 
            className=" mb-0" 
            placeholder="Enter your password" 
            required 
            name="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
          />

          <p className="login-link right-align pt-0 mt-0 mb-3">Forgot Password</p>

          <button 
            type="submit" 
            className="login-submit-btn" 
            disabled={ isLoading }
          >
            { isLoading ? "Athenticating..." : "Login"}
          </button>

          <p className="login-link right-align" onClick={ onNewUSer }>New User</p>
        </form>

      </div>
    </div>
  );
};

export default Login;