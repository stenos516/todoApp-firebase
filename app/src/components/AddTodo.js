import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";

function AddTodo() {
  const [title, setTitle] = useState("");

  const addTodo = async () => {
    if (!auth.currentUser) return; 
    const newTodo = {
      title: title,
      completed: false,
      userId: auth.currentUser.uid, 
    };
    await addDoc(collection(db, "todos"), newTodo);
    setTitle(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      addTodo();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;
