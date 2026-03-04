import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { t } = useTranslation();
  const { role } = useSelector((state) => state.user);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primary">{t('dashboard')}</h1>
      <p>{t('welcome')}</p>
      <nav className="flex gap-4 mt-4">
        <Link to="/todos" className="text-blue-600">Todo List</Link>
        {role === 'admin' && <Link to="/admin" className="text-red-600">Admin Panel</Link>}
        {role === 'user' && <Link to="/profile" className="text-green-600">Profile</Link>}
      </nav>
    </div>
  );
}
