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

const openChecklist =
  ({ folderId, checklistId, checklist }) =>
  (dispatch) => {
    try {
      history.push(`/checklist/${folderId}/${checklistId}`);
      dispatch({
        type: "SET_CHECKLIST",
        payload: checklist,
      });
    } catch (error) {
      console.log(error);
    }
  };

const addChecklistItem = (folderId, checklistId, item) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_CHECKLIST_ITEM",
      payload: item,
    });
    await ChecklistFolderApi.post("/addChecklistItem", {
      folderId,
      checklistId,
      item,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateChecklistItem =
  (folderId, checklistId, item) => async (dispatch) => {
    try {
      dispatch({
        type: "UPDATE_CHECKLIST_ITEM",
        payload: item,
      });
      await ChecklistFolderApi.patch("/updateChecklistItem", {
        folderId,
        checklistId,
        item,
      });
    } catch (error) {
      console.log(error);
    }
  };

const deleteChecklistItem =
  (folderId, checklistId, itemId) => async (dispatch) => {
    try {
      dispatch({
        type: "DELETE_CHECKLIST_ITEM",
        payload: itemId,
      });

      await ChecklistFolderApi.delete(
        `/deleteChecklistItem?folderId=${folderId}&checklistId=${checklistId}&itemId=${itemId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

const getReadOnlyChecklist = (folderId, checklistId) => async (dispatch) => {
  try {
    const res = await ChecklistFolderApi.get(
      `/getChecklist?folderId=${folderId}&checklistId=${checklistId}`
    );
    dispatch({
      type: "SET_READONLY_CHECKLIST",
      payload: res.data.checklist,
    });
  } catch (error) {
    console.log(error);
  }
};

const saveChecklist =
  (folderId, checklistId, checklist) => async (dispatch) => {
    try {
      const res = await ChecklistFolderApi.post("/saveChecklist", {
        folderId,
        checklistId,
        checklist,
      });
      if (res.status === 202) {
        history.push(`/dashboard/${folderId}`);
      }
    } catch (error) {
      alert("Oop, An Error Occured While Saving Checklist");
    }
  };

const resetAll = () => async (dispatch) => {
  await localStorage.removeItem("checklist-auth-token");
  dispatch({
    type: "RESET_ALL",
  });
  history.push("/");
};

export default {
  fetchFolders,
  createFolder,
  createChecklist,
  deleteChecklist,
  openChecklist,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
  getReadOnlyChecklist,
  saveChecklist,
  resetAll,
};
