import React, { useEffect, useState } from "react";
import "./ParticipantsModal.css";
import useNonParticipants from "../../../hooks/useNonParticipants";
import useParticipants from "../../../hooks/useParticipants";
import useAddParticipant from "../../../hooks/useAddParticipant";
import useRemoveParticipant from "../../../hooks/useRemoveParticipant";
import { useAuthContext } from "../../../context/AuthContext";

const ParticipantsModal = ({ listId, onClose }) => {
  const { participants, refetch: refetchParticipants } = useParticipants(listId);
  const { users: nonParticipants, refetch: refetchNon } = useNonParticipants(listId);
  const { addParticipant, loading: adding } = useAddParticipant();
  const { removeParticipant, loading: removing } = useRemoveParticipant();
  const {authUser} = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");


  const allUsers = [
    ...participants.map(u => ({ ...u, inList: true })),
    ...nonParticipants
      .filter(u => !participants.some(p => p._id === u._id))
      .map(u => ({ ...u, inList: false }))
  ];

  const filteredUsers = allUsers.filter(u =>
    u.username.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const handleAdd = async (userId) => {
    await addParticipant(listId, userId);
    refetchParticipants();
    refetchNon();
  };

  const handleRemove = async (userId) => {
    await removeParticipant(listId, userId);
    refetchParticipants();
    refetchNon();
  };

  return (
    <div className="modal-backdrop">
      <div className="participants-modal">
        <div className="modal-header">
          <h3>Manage Participants</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="modal-content">
          <ul className="user-list">
            {filteredUsers.map(user => (
              <li key={user._id}>
                {user._id === authUser._id ? "YOU" : user.username}
                {user.inList ? (
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(user._id)}
                    disabled={removing}
                  >
                    🗑️
                  </button>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => handleAdd(user._id)}
                    disabled={adding}
                  >
                    ➕
                  </button>
                )}
              </li>
            ))}
            {filteredUsers.length === 0 && <div className="empty">No users found</div>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
