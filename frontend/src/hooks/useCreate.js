import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useCreate = (setItems) => {
  const [loading, setLoading] = useState(false);

  const create = async (listId,name) => {
    if (!listId || !name?.trim()) return toast.error("Invalid name or list ID");

    try {
      setLoading(true);

      const res = await axios.post(
        `/api/list/addItem/${listId}`,
        { name: name.trim() },
        { withCredentials: true }
      );

      setItems(res.data.items || []);

      toast.success("Item created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};

export default useCreate;
