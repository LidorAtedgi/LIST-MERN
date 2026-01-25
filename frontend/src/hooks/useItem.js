import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useItem = (listId) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    if (!listId) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `/api/list/getListbyId/${listId}`,
        { withCredentials: true }
      );

      const list = res.data;
      if (!list || list.error) {
        throw new Error(list?.error || "List not found");
      }

      setItems(list.items || []);

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [listId]);

  return { loading, items, setItems, refetch: fetchItems };
};

export default useItem;
