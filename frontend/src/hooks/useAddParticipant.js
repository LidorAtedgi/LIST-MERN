import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useAddParticipant = () => {
  const [loading, setLoading] = useState(false);

  const addParticipant = async (listId, userId) => {
    try {
      setLoading(true);
      await axios.put(`/api/list/participant/add/${listId}/${userId}`);
      toast.success("Added!");
    }catch(error) {
     toast.error(error.response?.data?.error || "Delete failed");
    }
    finally {
      setLoading(false);
    }
  };

  return { addParticipant, loading };
};

export default useAddParticipant;
