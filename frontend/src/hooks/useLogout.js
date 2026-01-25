import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
       try {
        setLoading(true);
        const res = await axios.post("/api/auth/logout", {}, { withCredentials: true });
        const data = res.data;
         if(data.error){
              throw new Error(data.error);
         }
       setAuthUser(null);
       toast.success("Logout succssesfully");
       } catch (error) {
        toast.error(error.response?.data?.error)
       }finally{
        setLoading(false);
       }
    }
    return {loading,logout};
}

export default useLogout;