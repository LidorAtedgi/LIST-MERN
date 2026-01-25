import React, { useState } from "react";
import "./Modal.css";
import useCreateList from "../../../hooks/useCreateList";
import useUpdateList from "../../../hooks/useUpdateList";

function CreateList({ onClose, mode, list ,refetch}) {
const [name, setName] = useState(list?.name || "");
const {createList,loading:loadingCreate} = useCreateList();
const {updateList,loading:loadingUpdate} = useUpdateList();

 const handleSubmit = async () => {
    if(mode==="create"){
   const success = await createList(name);
    if (success) await refetch(); 
    }else{
    const success = await updateList(list._id,name);
    if (success) await refetch();  
    }
   onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
         <h2>{mode === "create" ? "Create new list" : "Update name list"}</h2>
            <input
            value={name}
            onChange={e => setName(e.target.value)}
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


export default CreateList;
