import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useDelete = (setItems) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = async (listId,itemId) => {
    if (!listId || !itemId) return;

    try {
      setLoading(true);

      const res = await axios.delete(
        `/api/list/delete/${listId}/${itemId}`,
        { withCredentials: true }
      );

      setItems(res.data.items || []);

      toast.success("Item deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading };
};

export default useDelete;
