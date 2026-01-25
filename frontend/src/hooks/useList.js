import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchLists = async () => {
    try {
      const res = await axios.get("/api/list/getLists", {
        withCredentials: true
      });
      setLists(res.data);
    } catch {
      toast.error("Failed to load lists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return { lists, setLists, loading ,refetch: fetchLists};
};

export default useLists;
