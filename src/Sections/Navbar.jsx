import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/navbar.css";

import AppModal from "../Components/AppModal";
import actions from "../State/Actions";
import history from "../history";

export default function Navbar({ folderSelectEnabled = false, folderId = "" }) {
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.checklist.folders);
  const [addModal, setAddModal] = useState(() => false);
  const [folderName, setFolderName] = useState(() => "");

  useEffect(() => {
    if (folderSelectEnabled) dispatch(actions.fetchFolders());
  }, []);

  const renderFolders = () => {
    if (folders?.length)
      return folders.map((folder, i) => {
        if (folder._id === folderId.toString())
          return (
            <option value={folder._id} selected>
              {folder.name}
            </option>
          );
        return (
          <option value={folder._id} onClick={folderSelectHandler}>
            {folder.name}
          </option>
        );
      });
    return <></>;
  };

  const onFolderAdd = () => {
    if (folderName.length < 5) {
      return;
    }
    dispatch(actions.createFolder({ name: folderName }));
    setAddModal(false);
    setFolderName("");
  };

  const folderSelectHandler = (elem) => {
    if (elem.target.value === "Add") {
      setAddModal(true);
    } else {
      history.push(`/dashboard/${elem.target.value}`);
    }
  };

  const closeHandler = () => {
    setAddModal(false);
    history.push(`/dashboard/${folderId}`);
  };

  const logoutHandler = () => {
    dispatch(actions.resetAll());
  };

  const dashboardHandler = () => {
    history.push(`/dashboard/${folderId}`);
  };

  return (
    <>
      <AppModal
        modalIsOpen={addModal}
        setIsOpen={setAddModal}
        modalTitle="Add Folder"
        modalInputPlaceholder="Enter the Name of Folder"
        modalInput={folderName}
        setModalInput={(value) => setFolderName(value)}
        onModalSave={onFolderAdd}
        closeHandler={closeHandler}
      />
      <div className="navbar">
        <div className="navbar-title">CheckList App</div>
        {folderSelectEnabled ? (
          <div className="navbar-folder-container">
            <select
              className="navbar-folder-select"
              disabled={addModal}
              onChange={folderSelectHandler}
            >
              {renderFolders()}
              <option value="Add">Add Folder +</option>
            </select>
          </div>
        ) : (
          <></>
        )}
        <div className="navbar-btns">
          <div
            className="navbar-btn navbar-dashboard-btn"
            onClick={dashboardHandler}
          >
            Dashboard
          </div>
          {/* <div className="navbar-btn navbar-profile-btn">Profile</div> */}
          <div className="navbar-btn navbar-logout-btn" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
}
