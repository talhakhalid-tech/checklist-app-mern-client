let updatedFolders;

const checklistReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FOLDERS":
      return { ...state, folders: action.payload };
    case "CREATE_FOLDER":
      return { ...state, folders: state.folders.push(action.payload.folder) };
    case "CREATE_CHECKLIST":
      updatedFolders = state.folders.map((folder) => {
        if (folder._id === action.payload._id) {
          return action.payload;
        }
        return folder;
      });
      return { ...state, folders: updatedFolders };
    case "DELETE_CHECKLIST":
      updatedFolders = state.folders.map((folder) => {
        if (folder._id === action.payload._id) {
          return action.payload;
        }
        return folder;
      });
      return { ...state, folders: updatedFolders };
    default:
      return state;
  }
};

export default checklistReducer;
