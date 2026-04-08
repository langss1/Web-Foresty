import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import TeamPage from './pages/public/TeamPage';
import DisplayList from './pages/public/DisplayList';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="h-screen w-screen bg-[#0a0a0c] flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Initializing Secure Session...</div>
    </div>
  );
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/prestasi" element={<DisplayList table="prestasi" title="Prestasi" />} />
            <Route path="/projects" element={<DisplayList table="projects" title="Projects & Research" />} />
            <Route path="/awards" element={<DisplayList table="awards" title="Awards & Honors" />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="*" element={<div className="h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
            <p className="mt-4 text-xl font-bold text-gray-400 uppercase tracking-widest">Resource Not Found</p>
            <button onClick={() => window.location.href = '/'} className="mt-10 px-8 py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-all uppercase text-xs tracking-widest">Return to Home</button>
          </div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
