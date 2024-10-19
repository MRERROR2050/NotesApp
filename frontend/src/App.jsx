import React, { useState,createContext } from 'react'
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



export const UserContext = createContext(
  JSON.parse(localStorage.getItem("user"))
);
const App = () => {


  

const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")))
 



  

  return (
    <UserContext.Provider value={user}>
    <Router>
    <div>
       <Routes>
          <Route path="/signup"  element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard setUser={setUser}  /> : <Navigate to={"/login"}/>} />
          <Route path="/addnote" element={user ? <AddNote /> : <Navigate to={"/login"} />} /> 
          <Route path="/notes/:id" element={<Note />} />
          <Route path="/notes/:id/edit" element={<UpdateNote />} />
       
        </Routes>

    </div>
    </Router>
    </UserContext.Provider>
  )
}

export default App