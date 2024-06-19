import React, { useContext } from 'react';
import { TodoContext } from '../App';

// Definisikan interface untuk props
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoItem must be used within a TodoContext.Provider');
  }

  const { toggleCompleted, deleteTodo } = context;

  const getTodoTitleStyle = () => {
    return {
      textDecoration: todo.completed ? 'line-through' : 'none',
    };
  };

  return (
    <div style={styles.todoItem}>
      <input type="checkbox" style={styles.checkbox} onChange={() => toggleCompleted(todo.id)} checked={todo.completed} />
      <p style={getTodoTitleStyle()}>{todo.title}</p>
      <button style={styles.button} onClick={() => deleteTodo(todo.id)}>
        x
      </button>
    </div>
  );
};

const styles = {
  todoItem: {
    border: '2px solid #f4f4f4',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  },
  checkbox: {
    height: '18px',
    width: '18px',
  },
  button: {
    backgroundColor: '#BB0000',
    color: '#fff',
    height: '30px',
    width: '30px',
    borderRadius: '100%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default TodoItem;
