import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useUpdate = (setItems) => {
    const [loading, setLoading] = useState(false);
    const update = async (id,newName) => {
        try {
            setLoading(true);
            const res = await axios.put(`/api/item/${id}/updateName`,{newName},{ withCredentials: true });
            setItems(prev =>
                prev.map(item => 
                    item._id === id ? res.data : item
                )
            )
            toast.success("The item was update successfully!");
        } catch (error) {
             toast.error(error.response?.data?.error)
        }finally{
            setLoading(false);
        }

    }
  return {update,loading}
}

export default useUpdate