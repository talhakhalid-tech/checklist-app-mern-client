import ChecklistFolderApi from "../../Apis/ChecklistFolder";
import decode from "jwt-decode";

import history from "../../history";

const fetchFolders = () => async (dispatch) => {
  try {
    const userInfo = decode(localStorage.getItem("checklist-auth-token"));
    const res = await ChecklistFolderApi.get(`/all?userId=${userInfo._id}`);
    dispatch({ type: "SET_FOLDERS", payload: res.data.folders });
  } catch (error) {}
};

const createFolder =
  ({ name }) =>
  async (dispatch) => {
      try{

      }catch(error){
          
      }
  };

export default { fetchFolders };
