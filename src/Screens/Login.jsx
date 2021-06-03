import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/login-register.css";

import actions from "../State/Actions";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginError = useSelector((state) => state.user.loginError);
  const folders = useSelector((state) => state.checklist.folders);

  const [passwordType, setPasswordType] = useState(() => "password");
  const [passwordVisible, setPasswordVisible] = useState(() => false);
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");

  const redirectDefault = async () => {
    const defaultFolder = folders.find(
      (folder) => folder.name === "Default Folder"
    );
    history.push({
      pathname: `/dashboard/${defaultFolder._id}`,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("checklist-auth-token")) {
      dispatch(actions.fetchFolders());
    }
  }, []);

  useEffect(() => {
    if (folders) redirectDefault();
  }, [folders]);

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
    dispatch(actions.loginUser({ email, password }));
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
              dispatch(actions.resetLoginError());
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
              dispatch(actions.resetLoginError());
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
