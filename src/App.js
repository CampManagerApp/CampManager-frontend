import './App.css';
import SuperAdminPage from './components/pages/superadmin/SuperAdminPage';
import LoginPage from './components/pages/authentication/LoginPage';
import { Routes, Route } from "react-router-dom";
import RegisterPage from './components/pages/authentication/RegisterPage';
import OrganisationInfoPage from './components/pages/organisation/OrganisationInfoPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/panel" element={<SuperAdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/organisationinfo" element={<OrganisationInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
