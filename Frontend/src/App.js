import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./components/SetAvatar";
import AdminDashboard from "./components/AdminDashboard";
import AdminUserDetails from "./pages/AdminUserDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<AdminUserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
