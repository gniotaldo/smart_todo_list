import { useState, useEffect } from 'react';
import { Todo, FilterType } from '../types/todo';
import { api } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.fetchTasks().then(data => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const addTask = async (text: string) => {
    const newTasks = [...tasks, { id: Date.now(), text, completed: false }];
    setTasks(newTasks);
    await api.saveTasks(newTasks);
  };

  const toggleTodo = async (id: number) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    await api.saveTasks(newTasks);
  };

  const deleteTodo = async (id: number) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    await api.saveTasks(newTasks);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return { tasks: filteredTasks, addTask, toggleTodo, deleteTodo, filter, setFilter, loading };
};