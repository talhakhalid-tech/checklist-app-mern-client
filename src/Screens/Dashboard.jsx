import React, { useState, useEffect } from "react";
import Navbar from "../Sections/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/dashboard.css";

import AppModal from "../Components/AppModal";
import actions from "../State/Actions";

export default function Dashboard({ match }) {
  const dispatch = useDispatch();

  const [checklists, folderName] = useSelector((state) => {
    if (Array.isArray(state.checklist.folders)) {
      const folder = state.checklist.folders.find((folder) => {
        if (folder._id === match.params.folderId) return folder;
      });
      return folder ? [folder.checklists, folder.name] : [[], ""];
    }
    return [[], ""];
  });

  const [addModal, setAddModal] = useState(() => false);
  const [checklistName, setChecklistName] = useState(() => "");

  useEffect(() => {
    dispatch(actions.fetchFolders());
  }, []);

  const deleteChecklist = (checklistId) => {
    dispatch(
      actions.deleteChecklist({ folderId: match.params.folderId, checklistId })
    );
  };

  const renderChecklistsList = () => {
    return checklists.map((checklist) => {
      return (
        <tr>
          <td>{checklist.checklistName}</td>
          <td>
            {checklist.checklistItems.reduce((prevState, item) => {
              if (item.checked) {
                return (prevState += 1);
              }
            }, 0)}
          </td>
          <td>{checklist.checklistItems.length}</td>
          <td>
            <span
              className="dashboard-checklist-delete-icon"
              onClick={() => deleteChecklist(checklist._id)}
            >
              <i class="far fa-trash-alt"></i>
            </span>
          </td>
        </tr>
      );
    });
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const onChecklistAdd = () => {
    if (checklistName.length < 5) {
      return;
    }
    dispatch(
      actions.createChecklist({
        name: checklistName,
        folderId: match.params.folderId,
      })
    );
    setAddModal(false);
    setChecklistName("");
  };

  return (
    <div className="dashboard">
      <AppModal
        modalIsOpen={addModal}
        setIsOpen={setAddModal}
        modalTitle="Add Checklist"
        modalInputPlaceholder="Enter the name of Checklist"
        modalInput={checklistName}
        setModalInput={(value) => setChecklistName(value)}
        onModalSave={onChecklistAdd}
      />
      <Navbar folderSelectEnabled={true} folderId={match.params.folderId} />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-folder-name">Folder Name: {folderName}</div>
          <div className="dashboard-searchbar">
            <input type="text" placeholder="Search Checklist..." />
            <span className="dashboard-searchbar-icon">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
        <div className="dashboard-checklists">
          <table className="dashboard-checklist-list">
            <tbody>
              <tr className="dashboard-checklist-list-head">
                <th className="dashboard-checklist-list-name-heading">
                  CheckList Name
                </th>
                <th className="dashboard-checklist-list-completed-heading">
                  Competed Tasks
                </th>
                <th className="dashboard-checklist-list-total-heading">
                  Total Tasks
                </th>
                <th className="dashboard-checklist-list-delete-heading">
                  Delete
                </th>
              </tr>
              {renderChecklistsList()}
            </tbody>
          </table>
          <div className="dashboard-checklist-addbtn" onClick={openAddModal}>
            Click to Add Checklist{" "}
            <span>
              <i class="fas fa-plus"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
