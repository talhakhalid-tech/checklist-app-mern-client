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
    try {
      const userInfo = decode(localStorage.getItem("checklist-auth-token"));
      const res = await ChecklistFolderApi.post("/create", {
        name,
        userId: userInfo._id,
      });
      if (res.status === 201) {
        history.push(`/dashboard/${res.data.folder._id}`);
        dispatch({ type: "CREATE_FOLDER", payload: res.data.folder });
      }
    } catch (error) {
      console.log(error);
    }
  };

const createChecklist =
  ({ name, folderId }) =>
  async (dispatch) => {
    try {
      const res = await ChecklistFolderApi.post("/createChecklist", {
        name,
        folderId,
      });
      if (res.status === 201) {
        dispatch({ type: "CREATE_CHECKLIST", payload: res.data.folder });
      }
    } catch (error) {
      console.log(error);
    }
  };

const deleteChecklist =
  ({ folderId, checklistId }) =>
  async (dispatch) => {
    try {
      const res = await ChecklistFolderApi.delete(
        `/deleteChecklist?folderId=${folderId}&checklistId=${checklistId}`
      );
      if (res.status === 202) {
        dispatch({ type: "DELETE_CHECKLIST", payload: res.data.folder });
      }
    } catch (error) {
      console.log(error);
    }
  };

export default { fetchFolders, createFolder, createChecklist, deleteChecklist };
