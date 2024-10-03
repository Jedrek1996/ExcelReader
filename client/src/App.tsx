import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./provider/UserContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
