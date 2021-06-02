const initialState = {
  loginError: "",
  registerErrors: {
    username: "",
    email: "",
    password: "",
    age: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, loginError: action.payload };
    case "RESET_LOGIN_ERROR":
      return { ...state, loginError: action.payload };
    case "REGISTER_ERROR":
      return {
        ...state,
        registerErrors: {
          ...state.registerErrors,
          [action.payload.errorKey]: action.payload.errorValue,
        },
      };
    case "RESET_REGISTER_ERRORS":
      return {
        ...state,
        registerErrors: initialState.registerErrors,
      };
    default:
      return state;
  }
};

export default userReducer;
