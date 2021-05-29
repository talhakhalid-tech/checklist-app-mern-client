import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "../Styles/modal.css";

// const customStyles = {
//   content: {
//     width: "40vw",
//     height: "30vh",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

Modal.setAppElement("#root");

export default function AppModal({
  modalIsOpen = false,
  setIsOpen = null,
  onModalSave = null,
  modalInputPlaceholder = "Enter...",
  onCloseModal = null,
  modalInput = "",
  setModalInput = null,
}) {
  function onCloseModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-container"
      >
        <span className="modal-close-icon" onClick={onCloseModal}>
          <i class="fas fa-times"></i>
        </span>
        <div className="modal-heading">Add Checklist</div>
        <input
          className="modal-input"
          value={modalInput}
          onChange={(elem) => setModalInput(elem.target.value)}
          placeholder={modalInputPlaceholder}
        />
        <div className="modal-savebtn" onClick={onModalSave}>
          Save
        </div>
      </Modal>
    </div>
  );
}

ReactDOM.render(<AppModal />, document.getElementById("root"));