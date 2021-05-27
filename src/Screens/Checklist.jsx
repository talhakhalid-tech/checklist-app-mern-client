import React from "react";
import "../Styles/checklist.css";

import Navbar from "../Sections/Navbar";

const list = [
  {
    title: "item 1",
    checked: true,
  },
  {
    title: "item 2",
    checked: true,
  },
  {
    title: "item 3",
    checked: false,
  },
  {
    title: "item 4",
    checked: false,
  },
  {
    title: "item 5",
    checked: false,
  },
];

export default function Checklist() {
  const renderList = () => {
    return list.map((item) => {
      return (
        <div className="checklist-single">
          <input
            type="checkbox"
            className="checklist-checkbox"
            checked={item.checked}
          />
          <label className="checklist-text">{item.title}</label>
          <span className="checklist-edit-icon">
            <i class="far fa-edit"></i>
          </span>
          <span className="checklist-delete-icon">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      );
    });
  };

  return (
    <div>
      <Navbar folderSelectEnabled={true} />
      <div className="checklist-container">
        <div className="checklist-left-segment">
          <div className="checklist-heading">CheckList 1</div>
          <div className="checklist-list">{renderList()}</div>
        </div>
        <div className="checklist-right-segment">
          <div className="checklist-sharelink-container">
            <div className="checklist-sharelink-heading">Checklist Link</div>
            <input
              type="text"
              className="checklist-sharelink-box"
              disabled={true}
              value="https://www.checkli.com/process/60ae37316c4a3"
            />
          </div>
          <div className="checklist-delete-button-box">
            <button className="checklist-delete-button">
              Delete Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
