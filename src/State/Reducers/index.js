import { combineReducers } from "redux";

import userReducer from "./userReducer";
import checklistReducer from "./checklistReducer";

export default combineReducers({
  user: userReducer,
  checklist: checklistReducer,
});
