import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ item, onCancel, onConfirm, loading }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box danger">

        <h2>Delete Item</h2>
        <p>
          Are you sure you want to delete  
          <span className="danger-name"> {item.name}</span> ?
        </p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onCancel}>Cancel</button>
          <button className="btn delete" onClick={onConfirm} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
