import "./App.css";
import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { where, collection, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase"; // Aggiungi auth import

import AuthForm from "./App";
import Footer from "./components/Footer";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Verifica lo stato di autenticazione all'avvio
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (user) {
      // Filtra i todo in base all'utente attualmente autenticato
      const q = query(
        collection(db, "todos"),
        where("userId", "==", user.uid) // Filtro per userId dell'utente autenticato
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
      });
      return () => unsub();
    }
  }, [user]);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => console.error("Errore nel logout:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Title />
      {!user ? (
        <div>
          <h2></h2>
          <AuthForm />
        </div>
      ) : (
        <div>
          <button className="log-btn" onClick={handleLogout}>Logout</button>
          <AddTodo />
          <div className="todo_container">
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default TodoApp;
