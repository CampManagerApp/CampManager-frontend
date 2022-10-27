import './App.css';
import SuperAdminPage from './pages/superadmin/SuperAdminPage';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import ApplicationNavbar from './components/common/ApplicationNavbar';
import CreateOrganisationPage from './pages/organisation/CreatreOrganisationPage';
import ListOfOrganisationsPage from './pages/users/ListOfOrganisationsPage';
import UpdateOrganisationPage from './pages/organisation/UpdateOrganisationPage';
import ListOfOrgUsersPage from './pages/users/ListOfOrgUsersPage';
import AddOrgUserPage from './pages/organisation/AddOrgUserPage';
import UpdateOrgUserPage from './pages/organisation/UpdateOrgUserPage';
import ErrorBoundary from './components/errors/ErrorBoundary';
import UserStatusProvider from './context/UserStatusContext';
import { useNavigate, Route, Routes } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <ErrorBoundary>
        <UserStatusProvider>
          <ApplicationNavbar />
          <Routes>
            <Route path="/admin" element={<LoginPage goto={() => { navigate('/admin/panel') }} />} />
            <Route path="/login" element={<LoginPage goto={() => { navigate('/listoforganisations') }} />} />
            <Route path="/admin/panel" element={<SuperAdminPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/organisation/create" element={<CreateOrganisationPage />} />
            <Route path="/admin/organisation/update" element={<UpdateOrganisationPage />} >
              <Route path=":organisationId" element={<UpdateOrganisationPage />} />
            </Route>
            <Route path="/listoforganisations" element={<ListOfOrganisationsPage />} />
            <Route path="/admin/organisationusers" element={<ListOfOrgUsersPage />} />
            <Route path="/admin/organisationusers/add" element={<AddOrgUserPage />} />
            <Route path="/admin/organisationusers/update" element={<UpdateOrgUserPage />} >
              <Route path=":userId" element={<UpdateOrgUserPage />} />
            </Route>
          </Routes>
        </UserStatusProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
