import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/checklist.css";

import actions from "../State/Actions";
import Navbar from "../Sections/Navbar";

export default function ChecklistRead({ match }) {
  const [checklist, checklistName] = useSelector((state) => {
    if (state.checklist.readOnlyChecklist)
      return [
        state.checklist.readOnlyChecklist.checklistItems,
        state.checklist.readOnlyChecklist.checklistName,
      ];
    return [[], ""];
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.getReadOnlyChecklist(
        atob(match.params.folderId),
        atob(match.params.checklistId)
      )
    );
  }, []);

  const renderList = () => {
    console.log(checklist, checklistName);
    return checklist.map((item) => {
      return (
        <div className="checklist-single">
          <input
            type="checkbox"
            className="checklist-checkbox"
            checked={item.checked}
            disabled={true}
          />
          <label className="checklist-text">{item.item}</label>
        </div>
      );
    });
  };

  return (
    <div>
      <Navbar folderSelectEnabled={false} folderId={match.params.folderId} />
      <div className="checklist-container">
        <div className="checklist-segment">
          <div className="checklist-heading">{checklistName}</div>
          <div className="checklist-list">{renderList()}</div>
        </div>
      </div>
    </div>
  );
}
