import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNote = () => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const navigate = useNavigate();

    const submitForm = async () => {
      const data = JSON.parse(localStorage.getItem("user"))
      
        const response = await axios.post("http://localhost:3000/notes", {
          token:data.token,
          title,
          content,
       
        });
      
        
        if (response.data.message === "success to Add note") {
          navigate("/dashboard");
        } else {
          console.log(response.data);
        }
      };



  return (
    <div>
        <h1>title</h1>
          <input type="email" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <h1>content</h1>
        <input type="text" onChange={(e) => setContent(e.target.value)} value={content} />
        <button onClick={submitForm}>ADD</button>
    </div>
  )
}

export default AddNote