import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TodoPage from './pages/TodoPage';
import AllPage from './pages/AllPage';
import CompletedPage from './pages/CompletedPage';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      const savedTodos = localStorage.getItem('todos');
      const savedData = savedTasks ?? savedTodos;

      if (savedData === null) {
        return [];
      }

      const parsedData = JSON.parse(savedData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error('할 일 목록을 불러오지 못했습니다.', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(todos));
    } catch (error) {
      console.error('할 일 목록 저장에 실패했습니다.', error);
    }
  }, [todos]);

  const handleAddTodo = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo)),
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoPage
              todos={todos}
              onAdd={handleAddTodo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />

        <Route
          path="/all"
          element={
            <AllPage
              todos={todos}
              onAdd={handleAddTodo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />

        <Route
          path="/completed"
          element={
            <CompletedPage
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
