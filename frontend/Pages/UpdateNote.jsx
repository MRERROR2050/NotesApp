import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateNote({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();

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
      setTitle(data.note.title);
      setContent(data.note.content);
    }
    sendReq();
  }, []);

  const navigate = useNavigate();
  async function submitForm() {
    const { data } = await axios.put(
      `http://localhost:3000/notes/${params.id}`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data.success === true) {
      navigate(`/notes/${params.id}`);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor="">title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="">content</label>
      <textarea
        name=""
        id=""
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>

      <button onClick={submitForm}>Edit</button>
    </div>
  );
}

export default UpdateNote;
