import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setError(null);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
    }
  };

  return (
    <form onSubmit={submit} className="form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
  );
}
