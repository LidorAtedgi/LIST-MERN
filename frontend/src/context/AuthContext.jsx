import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const checked = useRef(false); 
  const [authUser, setAuthUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;
    
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setAuthUser(res.data.user || null);
      } catch {
        setAuthUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
