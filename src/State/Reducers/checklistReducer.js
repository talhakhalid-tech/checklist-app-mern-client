let updatedFolders;
let currentChecklistItems;

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
    case "SET_CHECKLIST":
      return { ...state, currentChecklist: action.payload };
    case "ADD_CHECKLIST_ITEM":
      return {
        ...state,
        ...state.currentChecklist.checklistItems.push(action.payload),
      };
    case "UPDATE_CHECKLIST_ITEM":
      currentChecklistItems = state.currentChecklist.checklistItems.map(
        (item) => {
          if (item._id.toString() === action.payload._id.toString())
            return action.payload;
          return item;
        }
      );
      return {
        ...state,
        currentChecklist: {
          ...state.currentChecklist,
          checklistItems: currentChecklistItems,
        },
      };
    case "DELETE_CHECKLIST_ITEM":
      console.log(currentChecklistItems);
      currentChecklistItems = state.currentChecklist.checklistItems.filter(
        (item) => {
          if (item._id.toString() !== action.payload.toString()) return item;
        }
      );
      console.log(currentChecklistItems);
      return {
        ...state,
        currentChecklist: {
          ...state.currentChecklist,
          checklistItems: currentChecklistItems,
        },
      };
    case "SET_READONLY_CHECKLIST":
      return { ...state, readOnlyChecklist: action.payload };
    case "RESET_ALL":
      return {};
    default:
      return state;
  }
};

export default checklistReducer;
