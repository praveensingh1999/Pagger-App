import { useState } from "react"
import React  from 'react'
import axios from "axios";

function Form() {
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");
  
  const handleNameChange = (e) =>{
      setname(e.target.value);
  }
  const handleMessageChange = (e) =>{
      setmessage(e.target.value);
  }
  const handleSubmit = async(e) =>{
      e.preventDefault();
      console.log(name , message);
      const formName = name.trim();
      const formMessage = message.trim();
      if(!formName || !formMessage){
          alert("Filled all the required data!");
          return;
      }
      if(formName.length < 3){
          alert("Name atleast contain three characters!");
          return;
      }
      if(formMessage.length < 10){
          alert("Message altleast contain ten characters");
          return;
      }
  
     await axios.post("https://my-pagger-default-rtdb.asia-southeast1.firebasedatabase.app/praveen.json",
      {
          name: name,
          message: message
      }
     );
     setmessage("");
     setname("");
  }
  
    return (
      <div className="myform">
          <form action="">
              <div className="header">
              <h1 id="heading">Send Messages to Praveen </h1>
          </div>
          <div className="form-input">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"/></svg>
              <input type="text" placeholder="write your name" onChange={handleNameChange} value={name}/>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M267.7 576.9C267.7 576.9 267.7 576.9 267.7 576.9L229.9 603.6C222.6 608.8 213 609.4 205 605.3C197 601.2 192 593 192 584L192 512L160 512C107 512 64 469 64 416L64 192C64 139 107 96 160 96L480 96C533 96 576 139 576 192L576 416C576 469 533 512 480 512L359.6 512L267.7 576.9zM332 472.8C340.1 467.1 349.8 464 359.7 464L480 464C506.5 464 528 442.5 528 416L528 192C528 165.5 506.5 144 480 144L160 144C133.5 144 112 165.5 112 192L112 416C112 442.5 133.5 464 160 464L216 464C226.4 464 235.3 470.6 238.6 479.9C239.5 482.4 240 485.1 240 488L240 537.7C272.7 514.6 303.3 493 331.9 472.8z"/></svg>
              <textarea placeholder="write your message" onChange={handleMessageChange} value={message}></textarea>
          </div>
          <div className="form-button">
              <button onClick={handleSubmit}>Send</button>
          </div>
          </form>
      </div>
    )
  }
  
  export default Form
