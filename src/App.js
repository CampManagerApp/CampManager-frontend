import './App.css';
import AdminPage from './components/pages/AdminPage';
import LoginPage from './components/pages/LoginPage';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/panel" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
