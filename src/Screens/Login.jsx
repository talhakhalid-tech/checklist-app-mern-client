import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";
import "../Styles/login-register.css";

import ChecklistUserApi from "../Apis/ChecklistUser";
import ChecklistFolderApi from "../Apis/ChecklistFolder";

export default function Login() {
  const history = useHistory();

  const [passwordType, setPasswordType] = useState(() => "password");

  const [passwordVisible, setPasswordVisible] = useState(() => false);

  const [email, setEmail] = useState(() => "");

  const [password, setPassword] = useState(() => "");

  const [loginError, setLoginError] = useState(() => "");

  const dashboardRedirect = async () => {
    const userInfo = decode(localStorage.getItem("checklist-auth-token"));
    const res = await ChecklistFolderApi.get(
      `/defaultFolder?userId=${userInfo._id}`
    );
    history.push({
      pathname: `/dashboard/${res.data.defaultFolder._id}`,
      state: {
        folder: res.data.defaultFolder,
      },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("checklist-auth-token")) {
      dashboardRedirect();
    }
  }, []);

  const visibilityHandler = () => {
    if (passwordVisible) {
      setPasswordType("password");
      setPasswordVisible(false);
      return;
    }
    setPasswordType("text");
    setPasswordVisible(true);
  };

  const loginHandler = async () => {
    try {
      const res = await ChecklistUserApi.post("/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("checklist-auth-token", res.data.token);
        history.push("/dashboard");
      }
    } catch (error) {
      setLoginError(error.response.data.error);
    }
  };

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
            onChange={(elem) => {
              setEmail(elem.target.value);
              setLoginError("");
            }}
          />
        </div>
        <div className="login-input">
          <input
            className="login-password-input"
            placeholder="Password"
            type={passwordType}
            value={password}
            onChange={(elem) => {
              setPassword(elem.target.value);
              setLoginError("");
            }}
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
        {loginError ? <div className="login-error">{loginError}</div> : <></>}
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
