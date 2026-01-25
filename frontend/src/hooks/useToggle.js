import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useToggle = (setItems) => {
  const [loading, setLoading] = useState(false);

  const toggle = async (listId, itemId) => {
    if (!listId || !itemId) return;

    try {
      setLoading(true);

      const res = await axios.put(
        `/api/list/toggle/${listId}/${itemId}`,
        {},
        { withCredentials: true }
      );

      setItems(res.data.items);
    } catch (error) {
      toast.error(error.response?.data?.error || "Toggle failed");
    } finally {
      setLoading(false);
    }
  };

  return { toggle, loading };
};

export default useToggle;
