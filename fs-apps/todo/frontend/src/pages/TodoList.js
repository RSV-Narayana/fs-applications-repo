import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from '../todoSlice';

export default function TodoList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.items);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleToggle = (todo) => {
    dispatch(toggleTodo({ id: todo._id, completed: !todo.completed }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-secondary">{t('todo')}</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-2 py-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('todo')}
        />
        <button className="bg-primary text-white px-4 py-1 rounded" onClick={handleAdd}>
          {t('add') || 'Add'}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center gap-2 mb-2">
            <span
              className={todo.completed ? 'line-through cursor-pointer' : 'cursor-pointer'}
              onClick={() => handleToggle(todo)}
            >
              {todo.text}
            </span>
            <button className="text-red-500" onClick={() => handleDelete(todo._id)}>
              {t('delete') || 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
