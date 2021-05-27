import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/login-register.css";

export default function Login() {
  const history = useHistory();

  const [passwordType, setPasswordType] = useState(() => "password");

  const [passwordVisible, setPasswordVisible] = useState(() => false);

  const [email, setEmail] = useState(() => "");

  const [password, setPassword] = useState(() => "");

  const visibilityHandler = () => {
    if (passwordVisible) {
      setPasswordType("password");
      setPasswordVisible(false);
      return;
    }
    setPasswordType("text");
    setPasswordVisible(true);
  };

  const loginHandler = () => {};

  return (
    <div className="login-container">
      <div className="login-sub-container">
        <div className="login-heading">CheckList App</div>
        <div className="login-input">
          <input
            className="login-email-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(elem) => setEmail(elem.target.value)}
          />
        </div>
        <div className="login-input">
          <input
            className="login-password-input"
            placeholder="Password"
            type={passwordType}
            value={password}
            onChange={(elem) => setPassword(elem.target.value)}
          />
          {passwordVisible ? (
            <span className="login-input-icon" onClick={visibilityHandler}>
              <i class="far fa-eye"></i>
            </span>
          ) : (
            <span className="login-input-icon" onClick={visibilityHandler}>
              <i class="far fa-eye-slash"></i>
            </span>
          )}
        </div>
        <div className="login-forgot-text">Forgot Password?</div>
        <button className="login-button" onClick={loginHandler}>
          Login
        </button>
        <div
          className="login-register-text"
          onClick={() => history.push("/register")}
        >
          Don't Have an Account?
        </div>
      </div>
    </div>
  );
}
