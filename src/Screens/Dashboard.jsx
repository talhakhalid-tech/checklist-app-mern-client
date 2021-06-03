import React, { useState } from "react";
import Navbar from "../Sections/Navbar";
import { useSelector } from "react-redux";
import "../Styles/dashboard.css";

import AppModal from "../Components/AppModal";

export default function Dashboard({ match, location }) {
  console.log(match.params.folderId);

  const [checklists, setChecklists] = useState(() => []);

  const [addModal, setAddModal] = useState(() => false);
  const [checklistName, setChecklistName] = useState(() => "");

  const renderChecklistsList = () => {
    return checklists.map((checklist) => {
      return (
        <tr>
          <td>{checklist.name}</td>
          <td>{checklist.completedTasks}</td>
          <td>{checklist.totalTasks}</td>
          <td>
            <span className="dashboard-checklist-delete-icon">
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
    if (checklistName.length < 3) {
      return;
    }
    setChecklists((prevState) => {
      if (!prevState.some((checklist) => checklist.name === checklistName))
        prevState.push({
          name: checklistName,
          completedTasks: 0,
          totalTasks: 0,
        });
      return prevState;
    });
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
      <Navbar folderSelectEnabled={true} />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-folder-name">
            Folder Name: Default Folder
          </div>
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
