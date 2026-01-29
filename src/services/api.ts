import { Todo } from '../types/todo';

const STORAGE_KEY = 'taskflow_tasks';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  fetchTasks: async (): Promise<Todo[]> => {
    await delay(500);
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: async (tasks: Todo[]): Promise<void> => {
    await delay(300);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};