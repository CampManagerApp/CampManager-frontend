import './App.css';
import SuperAdminPage from './pages/superadmin/SuperAdminPage';
import LoginPage from './pages/authentication/LoginPage';
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/authentication/RegisterPage';
import OrganisationInfoPage from './pages/organisation/OrganisationInfoPage';
import ApplicationNavbar from './components/common/ApplicationNavbar';
import CreateOrganisationPage from './pages/organisation/CreatreOrganisationPage';



function App() {
  return (
    <div className="App">
      <ApplicationNavbar />
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin/panel" element={<SuperAdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/organisationinfo" element={<OrganisationInfoPage />} />
        <Route path="/admin/organisation/create" element={<CreateOrganisationPage />} />
      </Routes>
    </div>
  );
}

export default App;
