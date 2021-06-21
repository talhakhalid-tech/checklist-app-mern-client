import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/checklist.css";

import actions from "../State/Actions";
import Navbar from "../Sections/Navbar";

import history from "../history";

export default function Checklist({ match }) {
  const [checklist, checklistName] = useSelector((state) => {
    if (!state.checklist.currentChecklist) {
      history.push(`/dashboard/${match.params.folderId}`);
      return [[], ""];
    }
    return [
      state.checklist.currentChecklist.checklistItems,
      state.checklist.currentChecklist.checklistName,
    ];
  });

  const dispatch = useDispatch();

  const [adderEnabled, setAdderEnabled] = useState(() => false);
  const [newChecklistValue, setNewChecklistValue] = useState(() => "");
  const [editor, setEditor] = useState(() => {
    return { _id: "", item: "", enabled: false };
  });

  var mongoObjectIdGenerator = function () {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx"
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  };

  const editHandler = (item) => {
    setNewChecklistValue(item.item);
    setEditor({ _id: item._id, item: item.item, enabled: true });
  };

  const onEditItem = (item) => {
    if (newChecklistValue.length < 3) {
      return;
    }
    dispatch(
      actions.updateChecklistItem(
        match.params.folderId,
        match.params.checklistId,
        {
          ...item,
          item: newChecklistValue,
        }
      )
    );
    setEditor({ _id: "", item: "", enabled: false });
    setNewChecklistValue("");
  };

  const deleteHandler = (itemId) => {
    dispatch(
      actions.deleteChecklistItem(
        match.params.folderId,
        match.params.checklistId,
        itemId
      )
    );
  };

  const renderList = () => {
    return checklist.map((item) => {
      if (editor.enabled && editor._id === item._id.toString()) {
        return (
          <div className="checklist-single">
            <input
              type="checkbox"
              className="checklist-checkbox"
              disabled={true}
            />
            <input
              type="text"
              className="checklist-input"
              value={newChecklistValue}
              onChange={(elem) => setNewChecklistValue(elem.target.value)}
            />
            <span
              className="checklist-save-icon"
              onClick={() => onEditItem(item)}
            >
              <i class="far fa-save"></i>
            </span>
          </div>
        );
      }
      return (
        <div className="checklist-single">
          <input
            type="checkbox"
            className="checklist-checkbox"
            checked={item.checked}
            onClick={() => {
              dispatch(
                actions.updateChecklistItem(
                  match.params.folderId,
                  match.params.checklistId,
                  {
                    _id: item._id,
                    item: item.item,
                    checked: !item.checked,
                  }
                )
              );
            }}
          />
          <label className="checklist-text">{item.item}</label>
          <span
            className="checklist-edit-icon"
            onClick={() => editHandler(item)}
          >
            <i class="far fa-edit"></i>
          </span>
          <span
            className="checklist-delete-icon"
            onClick={() => deleteHandler(item._id)}
          >
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      );
    });
  };

  const addButtonHandler = () => {
    if (!editor.enabled) {
      setAdderEnabled(true);
    }
  };

  const onAddItem = () => {
    if (newChecklistValue.length < 10) {
      return;
    }
    const _id = mongoObjectIdGenerator();
    dispatch(
      actions.addChecklistItem(
        match.params.folderId,
        match.params.checklistId,
        {
          _id,
          item: newChecklistValue,
          checked: false,
        }
      )
    );
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

  const getShareableLink = () => {
    return `${window.location.origin}/checklistRead/${btoa(
      match.params.folderId
    )}/${btoa(match.params.checklistId)}`;
  };

  return (
    <div>
      <Navbar folderSelectEnabled={true} folderId={match.params.folderId} />
      <div className="checklist-container">
        <div className="checklist-left-segment">
          <div className="checklist-heading">{checklistName}</div>
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
              value={getShareableLink()}
            />
          </div>
          <div className="checklist-save-button-box">
            <button
              className="checklist-save-button"
              onClick={() =>
                dispatch(
                  actions.saveChecklist(
                    match.params.folderId,
                    match.params.checklistId,
                    checklist
                  )
                )
              }
            >
              Save Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
