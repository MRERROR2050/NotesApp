import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ setUser  }) => {
  const [notes, setNotes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // استخدام useNavigate بشكل صحيح







  useEffect(() => {
    async function sendReq() {
      try {
        const { data } = await axios.get("http://localhost:3000/notes", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    sendReq();
  }, []);

  async function deleteNote(id) {
    const { data } = await axios.delete(`http://localhost:3000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (data.success === true) {
      const newNotes = notes.filter((note) => note._id !== data.deletedNote._id);
      setNotes(newNotes);
    }
  }

  function signout() {
    localStorage.removeItem("user"); // إزالة جميع بيانات localStorage
    setUser(null); // تحديث حالة المستخدم إلى null
    navigate("/login"); // الانتقال إلى صفحة تسجيل الدخول
  }



  return (
    <div>
      <button onClick={signout}>Sign out</button>
      {notes.map((note, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}
        >
          <Link key={note._id} to={`/notes/${note._id}`}>
            <p>{note.title}</p>
            <p>{note.content}</p>
            <p>{moment().format('LT')}</p>
          </Link>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
