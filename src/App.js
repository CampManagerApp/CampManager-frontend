import './App.css';
import AdminPage from './components/pages/AdminPage';
import LoginPage from './components/pages/LoginPage';
import { Routes, Route } from "react-router-dom";
import RegisterPage from './components/pages/RegisterPage';
import OrganisationInfoPage from './components/pages/OrganisationInfoPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/panel" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/organisationinfo" element={<OrganisationInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
