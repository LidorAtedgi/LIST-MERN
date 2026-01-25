import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useDeleteList = () => {
  const [loading, setLoading] = useState(false);

  const deleteList = async (listId) => {
    if (!listId) return;

    try {
      setLoading(true);
       await axios.delete( `/api/list/delete/${listId}`,{ withCredentials: true });
      toast.success("Item deleted successfully.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteList, loading };
};

export default useDeleteList;
