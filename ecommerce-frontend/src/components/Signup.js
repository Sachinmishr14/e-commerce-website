import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      alert('Signup ho gaya! Ab login karo.');
      navigate('/login');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Signup</h2>
      <input className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;