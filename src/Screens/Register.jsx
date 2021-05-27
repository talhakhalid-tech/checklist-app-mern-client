import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/login-register.css";

export default function Register() {
  const history = useHistory();

  const [passwordType, setPasswordType] = useState(() => "password");

  const [passwordVisible, setPasswordVisible] = useState(() => false);

  const [username, setUsername] = useState(() => "");

  const [email, setEmail] = useState(() => "");

  const [password, setPassword] = useState(() => "");

  const [age, setAge] = useState(() => "");

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
    <div className="register-container">
      <div className="register-sub-container">
        <div className="register-heading">CheckList App</div>
        <div className="register-input">
          <input
            className="register-name-input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(elem) => setUsername(elem.target.value)}
          />
        </div>
        <div className="register-input">
          <input
            className="register-email-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(elem) => setEmail(elem.target.value)}
          />
        </div>
        <div className="register-input">
          <input
            className="register-password-input"
            placeholder="Password"
            type={passwordType}
            value={password}
            onChange={(elem) => setPassword(elem.target.value)}
          />
          {passwordVisible ? (
            <span className="register-input-icon" onClick={visibilityHandler}>
              <i class="far fa-eye"></i>
            </span>
          ) : (
            <span className="register-input-icon" onClick={visibilityHandler}>
              <i class="far fa-eye-slash"></i>
            </span>
          )}
        </div>
        <div className="register-input">
          <input
            className="register-age-input"
            placeholder="Age"
            type="number"
            value={age}
            min={13}
            onChange={(elem) => setAge(elem.target.value)}
          />
        </div>
        <button className="register-button" onClick={loginHandler}>
          Register
        </button>
        <div className="login-register-text" onClick={() => history.push("/")}>
          Already Have an Account?
        </div>
      </div>
    </div>
  );
}
