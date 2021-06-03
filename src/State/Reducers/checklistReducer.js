const checklistReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FOLDERS":
      return { ...state, folders: action.payload };
    default:
      return state;
  }
};

export default checklistReducer;
