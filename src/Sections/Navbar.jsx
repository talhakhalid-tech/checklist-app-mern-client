import React, { useEffect, useState } from "react";
import decode from "jwt-decode";
import "../Styles/navbar.css";

import ChecklistFolderApi from "../Apis/ChecklistFolder";
import AppModal from "../Components/AppModal";

export default function Navbar({ folderSelectEnabled = false }) {
  const [folders, setFolders] = useState(() => []);
  const [addModal, setAddModal] = useState(() => false);
  const [folderName, setFolderName] = useState(() => "");

  const fetchFolders = async () => {
    try {
      const userId = decode(localStorage.getItem("checklist-auth-token"))._id;
      const res = await ChecklistFolderApi.get(`/all?userId=${userId}`);
      setFolders(res.data.folders);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const renderFolders = () => {
    if (folders.length > 0)
      return folders.map((folder, i) => {
        if (i === 0)
          return (
            <option value={folder._id} selected>
              {folder.name}
            </option>
          );
        return <option value={folder._id}>{folder.name}</option>;
      });
    return <></>;
  };

  const onFolderAdd = () => {
    if (folderName.length < 3) {
      return;
    }

    setAddModal(false);
    setFolderName("");
  };

  const folderSelectHandler = (elem) => {
    if (elem.target.value === "Add") {
      setAddModal(true);
    }
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
          <div className="navbar-btn navbar-dashboard-btn">Dashboard</div>
          <div className="navbar-btn navbar-profile-btn">Profile</div>
          <div className="navbar-btn navbar-logout-btn">Logout</div>
        </div>
      </div>
    </>
  );
}
