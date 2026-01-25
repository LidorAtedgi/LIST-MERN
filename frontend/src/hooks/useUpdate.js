import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateItem = (setItems) => {
  const [loading, setLoading] = useState(false);

  const updateItem = async (listId, itemId, newName = null, quantity = null) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `/api/list/update/${listId}/${itemId}`,
        { newName, quantity },
        { withCredentials: true }
      );
      setItems(res.data.items);
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { updateItem, loading };
};

export default useUpdateItem;
