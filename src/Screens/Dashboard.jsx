import React from "react";
import Navbar from "../Sections/Navbar";
import "../Styles/dashboard.css";

const processes = [
  {
    name: "process 1",
    completedTasks: 7,
    totalTasks: 10,
  },
  {
    name: "process 2",
    completedTasks: 17,
    totalTasks: 25,
  },
  {
    name: "process 3",
    completedTasks: 12,
    totalTasks: 20,
  },
];

export default function Dashboard() {
  const renderChecklistsList = () => {
    return processes.map((process) => {
      return (
        <tr>
          <td>{process.name}</td>
          <td>{process.completedTasks}</td>
          <td>{process.totalTasks}</td>
          <td>
            <span className="dashboard-checklist-delete-icon">
              <i class="far fa-trash-alt"></i>
            </span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="dashboard">
      <Navbar folderSelectEnabled={true} />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-folder-name">
            Folder Name: Default Folder
          </div>
          <div className="dashboard-searchbar">
            <input type="text" placeholder="Search Process..." />
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
        </div>
      </div>
    </div>
  );
}
