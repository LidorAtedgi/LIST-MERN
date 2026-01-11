import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useDelete = (items,setItems) => {
    const [loading, setLoading] = useState(false);
    const deleteItem = async (id) => {
        if(!items) return;
       try {
         setLoading(true);
         const res = await axios.get(`api/item/${id}/delete`)
         setItems(prev => prev.filter(item => item._id !== id)); 
         toast.success(`${res.data} was deleted successfully.`)
       } catch (error) {
        toast.error(error.response?.data?.error);
       }finally{
        setLoading(false);
       }
    }

  return {deleteItem,loading}
}

export default useDelete;