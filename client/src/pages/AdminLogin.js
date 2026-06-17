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
          <svg viewBox="0 0 48 28" fill="none" width="48" height="28">
            <ellipse cx="14" cy="14" rx="10" ry="10" stroke="#00F5FF" strokeWidth="2.5" fill="none"/>
            <ellipse cx="34" cy="14" rx="10" ry="10" stroke="#00F5FF" strokeWidth="2.5" fill="none"/>
            <line x1="6" y1="5" x2="42" y2="23" stroke="#00F5FF" strokeWidth="2" opacity="0.6"/>
          </svg>
          <span className="login-brand">INFINITY</span>
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
