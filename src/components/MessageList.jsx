import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        "https://my-pagger-default-rtdb.asia-southeast1.firebasedatabase.app/praveen.json"
      );
      if (response.data) {
        const messagesArray = Object.values(response.data);
        setMessages(messagesArray);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // 👇 Lazy load using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 👇 Fetch when visible, and keep updating every 5 seconds
  useEffect(() => {
    let intervalId;
    if (isVisible) {
      fetchMessage(); // initial fetch
      intervalId = setInterval(fetchMessage, 5000); // re-fetch every 5s
    }
    return () => clearInterval(intervalId);
  }, [isVisible]);

  return (
    <div ref={ref} className="message-list">
      {messages.length === 0 ? (
        <p>Loading messages...</p>
      ) : (
        messages.map((msgObj, index) => (
          <div key={index}>
            <p><b>{msgObj.name}</b></p>
            <p>{msgObj.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
