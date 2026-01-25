import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setAuthUser(res.data.user || null);
        if(res.data.user)
        navigate("/", { replace: true });
        else
        navigate("/login", { replace: true });    
      } catch (err) {
        setAuthUser(null);
        navigate("/login", { replace: true });
      }
    };
    fetchMe();
  }, []);

  return <div className="spinner"></div>;
};

export default RedirectPage;
