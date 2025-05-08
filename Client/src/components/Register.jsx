import React, { useState } from 'react';
import { register } from '../api/auth';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const user = await register(form);
      setSuccess(true);
      onRegister && onRegister(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      <div className="mb-3">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className="form-control" />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required className="form-control" />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Registration successful!</div>}
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
