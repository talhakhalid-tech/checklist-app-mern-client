import ChecklistUserApi from "../../Apis/ChecklistUser";
import ChecklistFolderApi from "../../Apis/ChecklistFolder";
import history from "../../history";

const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    console.log({ email, password });
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
      dispatch({ type: "LOGIN_ERROR", payload: error.response.data.error });
    }
  };

const registerUser =
  ({ username, email, password, age }) =>
  async (dispatch) => {
    if (username.length < 3) {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: {
          errorKey: "username",
          errorValue: "Username length must be minimum 3 characters",
        },
      });
    }
    if (username.length > 30) {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: {
          errorKey: "username",
          errorValue: "Username length must be maximum 30 characters",
        },
      });
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: {
          errorKey: "email",
          errorValue: "Please enter valid Email Address",
        },
      });
    }
    if (password.length < 5) {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: {
          errorKey: "password",
          errorValue: "Password length must be minimum 5 characters",
        },
      });
    }
    if (age === "") {
      return dispatch({
        type: "REGISTER_ERROR",
        payload: {
          errorKey: "age",
          errorValue: "Age is a required field",
        },
      });
    }
    try {
      const res = await ChecklistUserApi.post("/register", {
        email,
        password,
        age,
        name: username,
      });
      if (res.status === 201) {
        await ChecklistFolderApi.post("/create", {
          name: "Default Folder",
          userId: res.data.userId,
        });
        history.push("/");
      }
    } catch (error) {}
  };

const resetLoginError = () => async (dispatch) => {
  dispatch({ type: "RESET_LOGIN_ERROR", payload: "" });
};

const resetRegisterErrors = () => async (dispatch) => {
  dispatch({ type: "RESET_REGISTER_ERRORS" });
};

export default {
  loginUser,
  resetLoginError,
  registerUser,
  resetRegisterErrors,
};
