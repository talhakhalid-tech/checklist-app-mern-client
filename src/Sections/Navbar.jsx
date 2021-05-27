import React from "react";
import "../Styles/navbar.css";

export default function Navbar({ folderSelectEnabled = false }) {
  return (
    <div className="navbar">
      <div className="navbar-title">CheckList App</div>
      {folderSelectEnabled ? (
        <div className="navbar-folder-container">
          <select className="navbar-folder-select">
            <option value="0">Default Folder</option>
            <option value="1">Audi</option>
            <option value="2">Add Folder +</option>
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
  );
}
