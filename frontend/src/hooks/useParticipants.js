import { useEffect, useState } from "react";
import axios from "axios";

const useParticipants = (listId) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchParticipants = async () => {
    if (!listId) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/list/participants/${listId}`,
        { withCredentials: true }
      );
      console.log(data)
      setParticipants(data);
    } catch (err) {
      console.error("useParticipants", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [listId]);

  return {
    participants,
    loading,
    refetch: fetchParticipants
  };
};

export default useParticipants;
