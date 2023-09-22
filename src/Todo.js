import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { BiEdit } from "react-icons/bi";
import { FaThumbsUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (todo !== "") {
      setTodos([...todos, { item: todo, id: Date.now(), status: false }]);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id == editId);
      const updateTodo = todos.map((to) =>
        to.id == editTodo.id
          ? (to = { id: to.id, item: todo })
          : (to = { id: to.id, item: to.item })
      );

      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
  };

  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  });

  const handleDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const handleComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) return { ...list, status: !list.status };
      return list;
    });
    setTodos(complete);
  };

  const handleEdit = (id) => {
    let editTodo = todos.find((todo) => todo.id === id);
    setTodo(editTodo.item);
    setEditId(editTodo.id);
  };

  return (
    <body>
      <div className="todo-app">
        <h2>TODO APP</h2>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter tasks todo..."
            className="todo-input"
            value={todo}
            ref={inputRef}
            onChange={(event) => setTodo(event.target.value)}
          />
          <button onClick={handleClick} className="todo-button">
            {editId ? "EDIT" : "ADD"}
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li className="todo-list">
              <div id={todo.status ? "list-item" : ""}>{todo.item}</div>

              <span className="icons">
                <FaThumbsUp
                  id="complete"
                  onClick={() => handleComplete(todo.id)}
                />
                <BiEdit id="edit" onClick={() => handleEdit(todo.id)} />

                <MdDelete id="delete" onClick={() => handleDelete(todo.id)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
}

export default Todo;
