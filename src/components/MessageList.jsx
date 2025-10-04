import axios from 'axios'
import React, { useState,useEffect } from 'react'

function MessageList() {
    const [message, setmessage] = useState([]);

     const fetchmessage = async()=>{
            const response = await axios.get("https://my-pagger-default-rtdb.asia-southeast1.firebasedatabase.app/praveen.json");
             const messagesArray = Object.values(response.data);
            setmessage(messagesArray)
             
        }

        useEffect(() => {
        fetchmessage();
    }, []);
  return (
    <div className="message-list">
        
       {message.map((msgObj) => {
          return <div><p>{msgObj.name}</p> <p>{msgObj.message}</p></div>
        })
        }
          
    </div>
  )
}

export default MessageList