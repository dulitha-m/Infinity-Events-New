import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AdminLogin.css';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow" />
      <div className="login-box">
        <div className="login-logo">
          <img src="/images/Logo.png" alt="Infinity Logo" className="login-logo-img" />
        </div>
        <h1 className="login-title">Admin Portal</h1>
        <p className="login-sub">Sign in to manage content</p>
        <form className="login-form" onSubmit={submit}>
          <div className="login-field">
            <label>Email</label>
            <input
              name="email" type="email" required
              value={form.email} onChange={handle}
              placeholder="admin@infinityeventsint.com"
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              name="password" type="password" required
              value={form.password} onChange={handle}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
