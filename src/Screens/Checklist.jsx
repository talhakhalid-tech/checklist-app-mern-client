import React, { useState } from "react";
import "../Styles/checklist.css";

import Navbar from "../Sections/Navbar";

export default function Checklist() {
  const [checklist, setChecklist] = useState(() => {
    return [
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
  });

  const [adderEnabled, setAdderEnabled] = useState(() => false);
  const [newChecklistValue, setNewChecklistValue] = useState(() => "");

  const renderList = () => {
    return checklist.map((item) => {
      return (
        <div className="checklist-single">
          <input
            type="checkbox"
            className="checklist-checkbox"
            checked={item.checked}
            onClick={() =>
              setChecklist((prevState) => {
                return prevState.map((newItem) => {
                  if (newItem.title === item.title) {
                    return { title: newItem.title, checked: !newItem.checked };
                  }
                  return newItem;
                });
              })
            }
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

  const addButtonHandler = () => {
    setAdderEnabled(true);
  };

  const onAddItem = () => {
    if (newChecklistValue.length < 3) {
      return;
    }
    setChecklist((prevState) => {
      if (!prevState.some((item) => item.title === newChecklistValue))
        prevState.push({
          title: newChecklistValue,
          checked: false,
        });
      return prevState;
    });
    setAdderEnabled(false);
    setNewChecklistValue("");
  };

  const showAdder = () => {
    return (
      <div className="checklist-single">
        <input type="checkbox" className="checklist-checkbox" disabled={true} />
        <input
          type="text"
          className="checklist-input"
          value={newChecklistValue}
          onChange={(elem) => setNewChecklistValue(elem.target.value)}
        />
        <span className="checklist-save-icon" onClick={onAddItem}>
          <i class="far fa-save"></i>
        </span>
      </div>
    );
  };

  return (
    <div>
      <Navbar folderSelectEnabled={true} />
      <div className="checklist-container">
        <div className="checklist-left-segment">
          <div className="checklist-heading">CheckList 1</div>
          <div className="checklist-list">
            {renderList()}
            {adderEnabled ? showAdder() : <></>}
            <div className="checklist-addbtn" onClick={addButtonHandler}>
              Click to Add List Item
              <span>
                <i class="fas fa-plus"></i>
              </span>
            </div>
          </div>
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
