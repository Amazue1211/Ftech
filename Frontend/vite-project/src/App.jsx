import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Analytics from "./pages/Analytics";
import Budget from "./pages/Budget";
import Savings from "./pages/Savings";
// import AI from "./pages/AI";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import NotfoundPage from "./pages/NotfoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/landingpage" element={<LandingPage />} />
        {/* <Route path="/ai" element={<AI />} /> */}
        <Route path="/profile" element={<Profile />} />
             <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;