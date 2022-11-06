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
import { useNavigate, Route, Routes } from "react-router-dom";
import ApplicationContextProvider from './components/common/ApplicationContextProvider';
import { USER_STATUS } from './context/UserStatusContext';


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <ErrorBoundary>
        <ApplicationContextProvider>
            <ApplicationNavbar />
            <Routes>
              <Route path="/superadmin" element={<LoginPage next_user_status={USER_STATUS.SUPERADMIN} goto={() => { navigate('/superadmin/panel') }} />} />
              <Route path="/login" element={<LoginPage goto={() => { navigate('/listoforganisations') }} />} />
              <Route path="/superadmin/panel" element={<SuperAdminPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/superadmin/organisation/create" element={<CreateOrganisationPage />} />
              <Route path="/superadmin/organisation/update" element={<UpdateOrganisationPage />} >
                <Route path=":organisationId" element={<UpdateOrganisationPage />} />
              </Route>
              <Route path="/listoforganisations" element={<ListOfOrganisationsPage />} />
              <Route path="/admin/organisationusers" element={<ListOfOrgUsersPage />} />
              <Route path="/admin/organisationusers/add" element={<AddOrgUserPage />} />
              <Route path="/admin/organisationusers/update" element={<UpdateOrgUserPage />} >
                <Route path=":userId" element={<UpdateOrgUserPage />} />
              </Route>
            </Routes>
        </ApplicationContextProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
