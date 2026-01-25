import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useRemoveParticipant = () => {
  const [loading, setLoading] = useState(false);

  const removeParticipant = async (listId, userId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/list/participant/delete/${listId}/${userId}`);
      toast.success("Delete success");
    }catch(error){
        toast.error(error.response?.data?.error || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return { removeParticipant, loading };
};

export default useRemoveParticipant;
