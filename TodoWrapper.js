import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EdittodoForm } from "./EdittodoForm";
import { Modal } from "bootstrap";


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const Modal = ({isOpen, closeModal}) => {
    return(
      isOpen &&(
        <div className="modal">
          <div className="modal-content"> 
          <span className="close" onClick={closeModal}>&times;</span>
          <p>This is your modal content</p>
          </div>
        </div>
      )
    );
  };

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    ));
  }

  const editTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EdittodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
                 
        )
      )}
    </div>
  );
};