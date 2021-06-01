import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/login-register.css";

import ChecklistUserApi from "../Apis/ChecklistUser";

export default function Register() {
  const history = useHistory();

  const [passwordType, setPasswordType] = useState(() => "password");

  const [passwordVisible, setPasswordVisible] = useState(() => false);

  const [username, setUsername] = useState(() => "");

  const [email, setEmail] = useState(() => "");

  const [password, setPassword] = useState(() => "");

  const [age, setAge] = useState(() => "");

  const [inputErrors, setInputErrors] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
      age: "",
    };
  });

  const visibilityHandler = () => {
    if (passwordVisible) {
      setPasswordType("password");
      setPasswordVisible(false);
      return;
    }
    setPasswordType("text");
    setPasswordVisible(true);
  };

  const setError = (errorKey = null, errorValue) => {
    setInputErrors((prevState) => {
      return {
        ...prevState,
        [errorKey]: errorValue,
      };
    });
  };

  const registerHandler = async () => {
    if (username.length < 3) {
      return setError(
        "username",
        "Username length must be minimum 3 characters"
      );
    }
    if (username.length > 30) {
      return setError(
        "username",
        "Username length must be maximum 30 characters"
      );
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return setError("email", "Please enter valid Email Address");
    }
    if (password.length < 5) {
      return setError(
        "password",
        "Password length must be minimum 5 characters"
      );
    }
    if (age === "") {
      return setError("age", "Age is a required field");
    }

    try {
      const res = await ChecklistUserApi.post("/register", {
        email,
        password,
        age,
        name: username,
      });
      if (res.status === 201) {
        history.push("/");
      }
    } catch (error) {}
  };

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
            onChange={(elem) => {
              setUsername(elem.target.value);
              setError("username", "");
            }}
          />
        </div>
        {inputErrors.username ? (
          <div className="register-input-error">{inputErrors.username}</div>
        ) : (
          <></>
        )}
        <div className="register-input">
          <input
            className="register-email-input"
            placeholder="Email Address"
            type="text"
            value={email}
            onChange={(elem) => {
              setEmail(elem.target.value);
              setError("email", "");
            }}
          />
        </div>

        {inputErrors.email ? (
          <div className="register-input-error">{inputErrors.email}</div>
        ) : (
          <></>
        )}
        <div className="register-input">
          <input
            className="register-password-input"
            placeholder="Password"
            type={passwordType}
            value={password}
            onChange={(elem) => {
              setPassword(elem.target.value);
              setError("password", "");
            }}
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

        {inputErrors.password ? (
          <div className="register-input-error">{inputErrors.password}</div>
        ) : (
          <></>
        )}
        <div className="register-input">
          <input
            className="register-age-input"
            placeholder="Age"
            type="number"
            value={age}
            min={13}
            onChange={(elem) => {
              setAge(elem.target.value);
              setError("age", "");
            }}
          />
        </div>

        {inputErrors.age ? (
          <div className="register-input-error">{inputErrors.age}</div>
        ) : (
          <></>
        )}
        <button className="register-button" onClick={registerHandler}>
          Register
        </button>
        <div className="login-register-text" onClick={() => history.push("/")}>
          Already Have an Account?
        </div>
      </div>
    </div>
  );
}
