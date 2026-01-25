import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateList = () => {
  const [loading, setLoading] = useState(false);

  const updateList = async (listId,newName) => {
    if (!listId ||!newName?.trim()) return;

    try {
      setLoading(true);
        await axios.put(
        `/api/list/update/${listId}`,
        { newName: newName.trim() },
        { withCredentials: true }
      );
      toast.success("Item updated successfully!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateList, loading };
};

export default useUpdateList;
