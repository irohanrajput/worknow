import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import JobList from "./components/JobList";
import CreateJob from "./components/CreateJob";
import Dashboard from "./components/Dashboard";
import EmailVerification from "./components/EmailVerification"; // Add this import
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/verify-email/:id/:token"
            element={<EmailVerification />}
          />
          <Route path="/jobs" element={<JobList />} />
          <Route
            path="/create-job"
            element={
              <PrivateRoute>
                <CreateJob />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
