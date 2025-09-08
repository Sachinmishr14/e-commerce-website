import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      alert('Login ho gaya!');
      navigate('/listing');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Login</h2>
      <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
      <p className="text-center mt-3">Account nahi? <a href="/signup">Signup karo</a></p>
    </div>
  );
}

export default Login;