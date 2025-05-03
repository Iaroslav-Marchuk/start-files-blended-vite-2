import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    const savedData = localStorage.getItem('todosData');
    if (savedData !== null) {
      return JSON.parse(savedData);
    }
    return [
      { id: '1', text: 'Practice more' },
      { id: '2', text: 'Get all tasks done on time' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('todosData', JSON.stringify(todos));
  }, [todos]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    id: '',
    text: '',
  });

  const fintTodos = text => {
    return todos.some(todo => {
      return todo.text.trim().toLowerCase() === text.trim().toLowerCase();
    });
  };

  const addNewTodo = inputValue => {
    if (!fintTodos(inputValue.text)) {
      setTodos(prevTodos => {
        return [...prevTodos, inputValue];
      });
    } else {
      toast.error('Todo with the same text already exists!');
    }
  };

  const deleteTodo = todoId => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId);
    });
  };

  const handleEditTodo = (currentId, currentText) => {
    setIsEditing(true);
    setCurrentTodo({ id: currentId, text: currentText });
  };

  const updateTodo = (currentId, currentText) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === currentId ? { ...todo, text: currentText } : todo
      );
    });
    setIsEditing(false);
    setCurrentTodo({ id: '', text: '' });
  };

  const cancelUpdate = () => {
    setIsEditing(false);
    setCurrentTodo({ id: '', text: '' });
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          id={currentTodo.id}
          defaultValue={currentTodo.text}
          onUpdate={updateTodo}
          onCancel={cancelUpdate}
          onCheck={fintTodos}
        />
      ) : (
        <Form onAddTodo={addNewTodo} />
      )}

      {todos.length === 0 ? (
        <Text textAlign="center">There are no any todos ...</Text>
      ) : (
        <TodoList
          todosList={todos}
          onDelete={deleteTodo}
          onEdit={handleEditTodo}
        />
      )}
    </>
  );
};

export default Todos;
