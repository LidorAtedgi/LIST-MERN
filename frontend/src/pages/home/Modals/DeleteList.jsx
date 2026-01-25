import useDeleteList from "../../../hooks/useDeleteList";
import "./DeleteConfirmModal.css";

const DeleteList = ({ list, onCancel, refetch ,onSelect}) => {
    
  const {deleteList,loading} = useDeleteList();

  const handleSubmit = async () => {
   const success = await deleteList(list._id);
   if (success) await refetch(); 
   onSelect(null);
   onCancel();
  };
  return (
    <div className="modal-backdrop">
      <div className="modal-box danger">

        <h2>Delete list</h2>
        <p className="text">
          Are you sure you want to delete  
          <span className="danger-name"> {list.name}</span> ?
        </p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onCancel}>Cancel</button>
          <button className="btn delete" onClick={handleSubmit} disabled={loading}>
            {loading ? <div className="spinner"></div> : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteList;
