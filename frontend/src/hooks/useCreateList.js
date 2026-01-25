import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useCreateList = () => {
  const [loading, setLoading] = useState(false);

  const createList = async (name) => {
    if (!name) return toast.error("Invalid name");

    try {
      setLoading(true);
      await axios.post(
        "/api/list/create",
        { name: name.trim() },
        { withCredentials: true }
      );
      toast.success("List created successfully!");
      return true; 
    } catch (error) {
      toast.error(error.response?.data?.error || "Creation failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createList, loading };
};


export default useCreateList;
