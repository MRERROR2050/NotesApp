import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const navigate = useNavigate();

    const submitForm = async () => {
        const { data } = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
    
        if (data.message === "Login success") {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(JSON.parse(localStorage.getItem("user")));
          navigate("/dashboard"); 
        }
      };

  
  return (
    <div>
         <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <h1>password</h1>
        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />

        <button onClick={submitForm}>Login</button>
    </div>
  )
}

export default Login