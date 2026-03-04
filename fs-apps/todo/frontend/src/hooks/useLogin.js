import { useState } from 'react';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const request = async ({ url, method = 'GET', body = null, headers = {}, ...options }) => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
      if (!res.ok) throw new Error('API error');
      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'API request failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, request };
}
