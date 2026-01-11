import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useItem = () => {
   const [loading,setLoading] = useState(false);
   const [items, setItems] = useState(null);

   const fetchItems = async () => {
    try {
        setLoading(true);
        const res = await axios.get("api/item",{withCredentials : true});
        const data = res.data;
     if(data.error){
        throw new Error(data.error);
    }
        setItems(data);
    } catch (error) {
        toast.error(error.response?.data?.error)
    }finally{
        setLoading(false);
    }
   }

   useEffect(()=>{
    fetchItems();
   },[]);


  return {loading,items,setItems};
}

export default useItem