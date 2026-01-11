import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useToggle = (items,setItems) => {
    const [loading, setLoading] = useState(false);
    const toggle = async (id) => {
        if(!items) return;

        try {
            setLoading(true);
            await axios.put(`/api/item/${id}/updateAcquired`);
            setItems(prev =>
                prev.map(item => 
                    item._id === id ? {...item,acquired : !item.acquired} : item
                )
            )
        } catch (error) {
             toast.error(error.response?.data?.error)
        }finally{
            setLoading(false);
        }

    }
  return {toggle,loading}
}

export default useToggle