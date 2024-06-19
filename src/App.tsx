import React, { useState, createContext } from 'react';
import Todos from './components/Todos';
import TodoForm from './components/TodoForm';

// Definisikan interface untuk todo item
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Definisikan interface untuk context
interface TodoContextType {
  toggleCompleted: (todoId: number) => void;
  deleteTodo: (todoId: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Finish Progate React Course',
      completed: false,
    },
    {
      id: 2,
      title: 'Have lunch with Guru Domba',
      completed: false,
    },
    {
      id: 3,
      title: 'Study React with Ninja Ken',
      completed: false,
    },
  ]);

  // Definisikan toggleCompleted
  const toggleCompleted = (todoId: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Definisikan function deleteTodo
  const deleteTodo = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  // Definisikan function addTodo
  const addTodo = (todoTitle: string) => {
    if (todoTitle === '') {
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
  };

  return (
    // Bungkus app dengan provider dari context
    <TodoContext.Provider value={{ toggleCompleted, deleteTodo }}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <Todos todos={todos} />
      </div>
    </TodoContext.Provider>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '12px',
  },
  title: {
    fontSize: '36px',
  },
};

export default App;
