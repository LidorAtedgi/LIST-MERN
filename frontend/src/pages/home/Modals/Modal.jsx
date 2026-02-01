import React, { useState } from "react";
import "./Modal.css";
import useCreate from "../../../hooks/useCreate";
import useUpdate from "../../../hooks/useUpdate";

function Modal({ onClose, setItems, mode, item, listId }) {
  const [name, setName] = useState(item?.name || "");
  const { create, loading: loadingCreate } = useCreate(setItems);
  const { updateItem, loading: loadingUpdate } = useUpdate(setItems);

  const handleSubmit = async () => {
    if (mode === "create") {
      await create(listId, name);
    } else {
      await updateItem(listId, item._id, name);
      onClose();
    }
    setName("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!loadingCreate && !loadingUpdate && name.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "create" ? "Create new item" : "Update item"}</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} disabled={loadingCreate || loadingUpdate}>
            {(loadingCreate || loadingUpdate) ? <div className="spinner"></div> : mode === "create" ? "Create" : "Update"}
          </button>
          <button onClick={onClose} disabled={loadingCreate || loadingUpdate}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
