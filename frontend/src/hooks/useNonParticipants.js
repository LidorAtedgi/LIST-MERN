import { useEffect, useState } from "react";
import axios from "axios";

const useNonParticipants = (listId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (!listId) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/list/non-participants/${listId}`,
        { withCredentials: true }
      );
      setUsers(data);
    } catch (err) {
      console.error("useNonParticipants", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [listId]);

  return {
    users,
    loading,
    refetch: fetchUsers
  };
};

export default useNonParticipants;
