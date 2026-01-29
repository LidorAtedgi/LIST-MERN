
// hooks/useDeleteUser.js
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const deleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete("/api/users/me");

      localStorage.removeItem("authUser");
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete account");
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
