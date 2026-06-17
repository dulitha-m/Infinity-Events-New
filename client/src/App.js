import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#000' }}>
      <div style={{ fontFamily:'Bebas Neue', fontSize:28, letterSpacing:6, color:'rgba(0,245,255,0.6)' }}>LOADING...</div>
    </div>
  );
  return admin ? children : <Navigate to="/admin/login" replace />;
}

function PublicLayout() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main><Home /></main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0d0d14', color: '#F0EEE8',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'Syne, sans-serif', fontSize: '12px', letterSpacing: '1px',
            },
            success: { iconTheme: { primary: '#FFB800', secondary: '#000' } },
            error: { iconTheme: { primary: '#9B30FF', secondary: '#000' } },
          }}
        />
        <Routes>
          <Route path="/" element={<PublicLayout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
