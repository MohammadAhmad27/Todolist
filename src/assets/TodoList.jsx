import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList() {
  const [todo, setTodo] = useState(() => {
    const savedTodo = localStorage.getItem("todo");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  const [todoInput, setTodoInput] = useState("");
  const [editingTodo, setEditingTodo] = useState({ id: null, task: "" });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [todoInput]);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleChange = (e) => {
    setTodoInput(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput !== "") {
      setTodo((prevTodo) => [
        ...prevTodo,
        { task: todoInput, id: uuidv4(), completed: false },
      ]);
      setTodoInput("");
    }
  };

  const deleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, task) => {
    setEditingTodo({ id, task });
  };

  const saveEditedTodo = () => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, task: editingTodo.task } : todo
      )
    );
    setEditingTodo({ id: null, task: "" });
  };

  const toggleComplete = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h4 className="heading">Tasks Todo</h4>
      <div className="sticky-header">
        <form onSubmit={addTodo}>
          <div className="form">
            <input
              ref={inputRef}
              className="input"
              type="text"
              placeholder="Add a task"
              value={todoInput}
              onChange={handleChange}
            />
            <button>Add</button>
          </div>
        </form>
      </div>

      {todo.length > 0 && (
        <div>
          <h5>Completed Tasks</h5>
          <ul className="todo-list">
            {todo.map(
              (todoItem) =>
                todoItem.completed && (
                  <div key={todoItem.id} className="completed">
                    <div className="todo-item">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => toggleComplete(todoItem.id)}
                      />
                      {editingTodo.id === todoItem.id ? (
                        <>
                          <input
                            type="text"
                            value={editingTodo.task}
                            onChange={(e) => {
                              setEditingTodo({
                                ...editingTodo,
                                task: e.target.value,
                              });
                            }}
                          />
                          <button
                            className="save-button"
                            onClick={saveEditedTodo}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <span>{todoItem.task}</span>
                      )}
                      {editingTodo.id !== todoItem.id && (
                        <div className="button-container">
                          <button
                            onClick={() => {
                              deleteTodo(todoItem.id);
                            }}
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                          <button
                            onClick={() => {
                              startEditing(todoItem.id, todoItem.task);
                            }}
                          >
                            <i className="far fa-edit"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </ul>
        </div>
      )}

      {todo.length > 0 && (
        <div>
          <h5>Pending Tasks</h5>
          <ul className="todo-list">
            {todo.map(
              (todoItem) =>
                !todoItem.completed && (
                  <div key={todoItem.id}>
                    <div className="todo-item">
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleComplete(todoItem.id)}
                      />
                      {editingTodo.id === todoItem.id ? (
                        <>
                          <input
                            type="text"
                            value={editingTodo.task}
                            onChange={(e) => {
                              setEditingTodo({
                                ...editingTodo,
                                task: e.target.value,
                              });
                            }}
                          />
                          <button
                            className="save-button"
                            onClick={saveEditedTodo}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <span>{todoItem.task}</span>
                      )}
                      {editingTodo.id !== todoItem.id && (
                        <div className="button-container">
                          <button
                            onClick={() => {
                              deleteTodo(todoItem.id);
                            }}
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                          <button
                            onClick={() => {
                              startEditing(todoItem.id, todoItem.task);
                            }}
                          >
                            <i className="far fa-edit"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
