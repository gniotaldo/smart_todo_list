import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  const { tasks, addTask, toggleTodo, deleteTodo, filter, setFilter, loading } = useTasks();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTask(inputValue);
    setInputValue('');
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.id - a.id;
  });

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-64px)] pt-6 px-4 md:pt-12 pb-10 w-full">
      <div className="w-full max-w-xl md:max-w-6xl bg-white shadow-2xl rounded-[2rem] p-6 md:p-10 border border-white">
        <div className="md:grid md:grid-cols-[1fr_1.5fr] md:gap-12 md:items-start">
          
          <aside className="md:sticky md:top-4">
            <h1 className="text-4xl font-black text-gray-900 mb-6 text-center md:text-left tracking-tight">
              Smart Todo List
            </h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
              <input 
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-gray-800 placeholder-gray-400 shadow-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Co planujesz zrobić?"
              />
              <button className="w-full bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                Dodaj
              </button>
            </form>

            <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              {(['all', 'active', 'completed'] as const).map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex-1 md:flex-none ${
                    filter === f 
                    ? 'bg-blue-600 text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'Wszystkie' : f === 'active' ? 'Aktywne' : 'Gotowe'}
                </button>
              ))}
            </div>
          </aside>

          <section className="border-t-2 border-gray-50 pt-8 md:pt-0 md:border-t-0 md:border-l-2 md:pl-10 min-h-[300px]">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
              </div>
            ) : (
              <ul className="space-y-4">
                <AnimatePresence mode='popLayout'>
                  {sortedTasks.map(todo => (
                    <motion.li 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      key={todo.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <input 
                          type="checkbox" 
                          checked={todo.completed} 
                          onChange={() => toggleTodo(todo.id)} 
                          className="w-6 h-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-0 cursor-pointer" 
                        />
                        <span className={`text-lg font-medium truncate transition-all duration-500 ${
                          todo.completed ? 'line-through text-gray-300' : 'text-gray-700'
                        }`}>
                          {todo.text}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteTodo(todo.id)} 
                        className="ml-3 bg-white text-red-500 border border-red-100 p-2 rounded-xl hover:bg-red-500 hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
                {tasks.length === 0 && (
                  <div className="text-center py-20 flex flex-col items-center">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-400 font-medium italic">Twoja lista jest pusta...</p>
                  </div>
                )}
              </ul>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};