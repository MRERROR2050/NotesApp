import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, 
  Routes,
  Link,
  Navigate
} from 'react-router-dom';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import AddNote from '../Pages/AddNote';
import UpdateNote from '../Pages/UpdateNote';
import Note from '../Pages/Note.';


const App = () => {

  const data = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));



  

  return (
    <Router>
    <div>
       <Routes>
          <Route path="/signup"  element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard setUser={setUser}  /> : <Navigate to={"/login"}/>} />
          <Route path="/addnote" element={user ? <AddNote /> : <Navigate to={"/login"} />} /> 
          <Route path="/notes/:id" element={<Note user={user} />} />
          <Route path="/notes/:id/edit" element={<UpdateNote user={user} />} />
       
        </Routes>

    </div>
    </Router>
  )
}

export default App