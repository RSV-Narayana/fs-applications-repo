import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useLogin';

export default function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, data, request } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await request({
      url: '/api/login',
      method: 'POST',
      body: { username, password }
    });
    if (result && result.user && result.role) {
      dispatch(login({ user: result.user, role: result.role }));
      navigate('/dashboard');
    }
    // error is handled by hook
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{t('login')}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="border rounded px-2 py-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : t('login')}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}
