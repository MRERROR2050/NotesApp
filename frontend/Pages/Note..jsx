import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Note({ user }) {
  const params = useParams();

  const [note, setNote] = useState({});
  useEffect(() => {
    async function sendReq() {
      const { data } = await axios.get(
        `http://localhost:3000/notes/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
console.log(params.id);
      
      setNote(data.note);
    }
    sendReq();
  }, []);

  return (
    <div>
      <p>title: {note.title}</p>
      <p>content: {note.content}</p>
    
      <Link to={`/notes/${params.id}/edit`}>Update </Link>
    </div>
  );
}

export default Note;
