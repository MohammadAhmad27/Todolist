import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    const [todos, setTodos] = useState([
        { task: "Task 1", id: uuidv4() },
        { task: "Task 2", id: uuidv4() },
        { task: "Task 3", id: uuidv4() }
    ]);


    const [todoInput, setTodoInput] = useState("");
    const [editingTodo, setEditingTodo] = useState({ id: null, task: "" });

    const addTodo = () => {

        setTodos(prevTodos => [...prevTodos, { task: todoInput.trim(), id: uuidv4() }]);
        setTodoInput("");
    };

    const deleteTodo = id => setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

    const startEditing = (id, task) => {
        setEditingTodo({ id, task });
    };

    const saveEditedTodo = () => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === editingTodo.id ? { ...todo, task: editingTodo.task.trim() } : todo
            )
        );
        setEditingTodo({ id: null, task: "" });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Add a task"
                value={todoInput}
                onChange={e => setTodoInput(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>



            <h4>Tasks Todo</h4>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editingTodo.id === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTodo.task}
                                    onChange={e => setEditingTodo({ ...editingTodo, task: e.target.value })}
                                />
                                <button onClick={saveEditedTodo}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{todo.task}</span>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                                <button onClick={() => startEditing(todo.id, todo.task)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
