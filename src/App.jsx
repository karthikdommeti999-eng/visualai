import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AICoach } from './pages/AICoach';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Fallbacks can go here */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
