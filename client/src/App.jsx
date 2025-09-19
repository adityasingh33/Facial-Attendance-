import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AttendanceScanner from './pages/AttendanceScanner';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      
      {/* Protected Routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        {user?.role === 'student' && (
           <Route index element={<StudentDashboard />} />
        )}
        {user?.role === 'teacher' && (
          <>
            <Route index element={<TeacherDashboard />} />
            <Route path="scan" element={<AttendanceScanner />} />
            {/* Add other teacher routes here */}
          </>
        )}
      </Route>

      {/* Fallback for logged-in users with no matching role */}
      {user && <Route path="*" element={<Navigate to="/" />} />}

    </Routes>
  );
}

export default App;
