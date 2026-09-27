import { useState } from 'react';
import './App.css';

import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Text from './components/Text/Text';
import TodoItem from './components/TodoItem/TodoItem';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리츠 참석하기', completed: true },
    { id: 2, text: '과제하기', completed: false },
    { id: 3, text: '운동하기', completed: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = () => {
    const trimmedText = inputText.trim();

    if (!trimmedText) return;

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = (id) => {
    const trimmedText = editingText.trim();

    if (!trimmedText) return;

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo)));

    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleEditKeyDown = (e, id) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;

    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app">
      <div className="header-container">
        <h1 className="logo-title">TodoMatic</h1>

        <div className="input-section">
          <Text as="h2">할 일을 입력하세요</Text>

          <div className="input-container">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="새 할 일 추가"
            />

            <Button variant="default" onClick={handleAddTodo}>
              추가
            </Button>
          </div>
        </div>

        <div className="button-container">
          <Button
            variant={filter === 'all' ? 'default' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            전체보기
          </Button>

          <Button
            variant={filter === 'active' ? 'default' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            진행 중
          </Button>

          <Button
            variant={filter === 'completed' ? 'default' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            완료됨
          </Button>
        </div>
      </div>

      <div className="list-container">
        <Text as="h2">남은 할 일 {activeCount}개</Text>

        <div className="todo-list-frame">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              editingText={editingText}
              onEditingTextChange={(e) => setEditingText(e.target.value)}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onStartEdit={handleStartEdit}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onEditKeyDown={handleEditKeyDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
