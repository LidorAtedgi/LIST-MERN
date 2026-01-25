import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
const [loading,setLoading] = useState(false);
const {setAuthUser} = useAuthContext();

const login = async ({username,password}) => {

     const success = handleInputErrors({username,password});
     if(!success) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
      username,
      password
    }, {
      withCredentials: true
    });
    const data = res.data;
    if(data.error){
        throw new Error(data.error);
    }
    setAuthUser(data);
    toast.success("Login succssesfully!");
    } catch (error) {
        toast.error(error.response?.data?.error)
    }finally{
        setLoading(false);
    }
}
return {loading,login}
}

export default useLogin

function handleInputErrors({username,password}){
    if(!username || !password ){
        toast.error('Please fill in all fields');
        return false;
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}