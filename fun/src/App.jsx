import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [newitem, setnewitem] = useState("");
  const [todos, settodos] = useState(() => {
    // Load saved todos from localStorage on initial render
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newitem.trim()) return; // Prevent adding empty todos

    settodos((currenttodos) => {
      return [
        ...currenttodos,
        { id: crypto.randomUUID(), title: newitem, completed: false },
      ];
    });
    setnewitem("");
  }

  function handleToggle(id) {
    settodos((currenttodos) =>
      currenttodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id) {
    settodos((currenttodos) => currenttodos.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="item form">
        <div className="form-row">
          <label htmlFor="item">New item</label>
          <input
            value={newitem}
            onChange={(e) => setnewitem(e.target.value)}
            type="text"
            id="item"
            placeholder="What needs to be done?"
          />
        </div>
        <button className="btn">add</button>
      </form>
      <h1 className="header">To do list</h1>
      <ul className="list">
        {todos.length === 0 ? (
          <li className="empty-state">No todos yet! Add one above.</li>
        ) : (
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  className="btn btn delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  delete
                </button>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}