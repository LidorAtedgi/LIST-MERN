import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useCreate = (setItems) => {
  const [loading, setLoading] = useState(false);

  const create = async (name) => {
    if (!name.trim()) return toast.error("item name cannot be empty");

    try {
      setLoading(true);
      const res = await axios.post( "/api/item/create",{ name },{ withCredentials: true });
      setItems(prev => [...prev, res.data]);
      toast.success("The item was created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};

export default useCreate;
