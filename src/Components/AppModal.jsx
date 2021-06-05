import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "../Styles/modal.css";

Modal.setAppElement("#root");

export default function AppModal({
  modalIsOpen = false,
  setIsOpen = null,
  onModalSave = null,
  modalTitle = "Add Modal",
  modalInputPlaceholder = "Enter...",
  onCloseModal = null,
  modalInput = "",
  setModalInput = null,
  closeHandler = null,
}) {
  function onCloseModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeHandler ? closeHandler : onCloseModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal-container"
      >
        <span
          className="modal-close-icon"
          onClick={closeHandler ? closeHandler : onCloseModal}
        >
          <i class="fas fa-times"></i>
        </span>
        <div className="modal-heading">{modalTitle}</div>
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
