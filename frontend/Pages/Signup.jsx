import React, { useState } from 'react'
import axios from "axios"

import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();


    const submitForm = async  () => {
      const {data} = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,

      })

      if (data.message === "Create New User Successfully") {
        navigate("/login");
      }
        
    }

  return (
    <div>
        <h1>name</h1>
        <input type="text" onChange={(e) => setName(e.target.value)}  value={name}  />
        <h2>email</h2>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <h1>password</h1>
        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />

        <button onClick={submitForm}>Signup</button>
    </div>
  )
}

export default Signup