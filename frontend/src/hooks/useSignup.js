import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
 const [loading,setLoading] = useState(false);
 const {setAuthUser} = useAuthContext()

 const signup = async({username,password,confirmPassword}) => {
     const success = handleInputErrors({username,password,confirmPassword});
     if(!success) return;
     setLoading(true);
     try {
      const res = await axios.post("/api/auth/signup", {
      username,
      password,
      confirmPassword
    }, {
      withCredentials: true
    });
    const data = res.data;
    if(data.error){
        throw new Error(data.error);
    }
    setAuthUser(data);
    toast.success("Account created!");
     } catch (error) {
        toast.error(error.response?.data?.error)
     }finally{
        setLoading(false);
     }
 }
 return {loading,signup};
}

export default useSignup


function handleInputErrors({username,password,confirmPassword}){
    if(!username || !password || !confirmPassword){
        toast.error('Please fill in all fields');
        return false;
    }
    if(password!==confirmPassword){
        toast.error('Passwords do not match');
        return false;
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}