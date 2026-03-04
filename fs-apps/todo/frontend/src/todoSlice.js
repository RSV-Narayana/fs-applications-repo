import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL || '/api/todos';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const res = await fetch(API_URL);
  return await res.json();
});

export const addTodo = createAsyncThunk('todo/addTodo', async (text) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return await res.json();
});

export const toggleTodo = createAsyncThunk('todo/toggleTodo', async ({ id, completed }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  return await res.json();
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return id;
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.items = state.items.map((t) => (t._id === action.payload._id ? action.payload : t));
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
