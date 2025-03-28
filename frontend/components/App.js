import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./authContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
