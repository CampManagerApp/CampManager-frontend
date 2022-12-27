import './App.css';
import { useEffect } from 'react';
import { loggedRequest } from './config';
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { USER_STATUS } from './context/UserStatusContext';
import { I18nextProvider } from "react-i18next";


import SuperAdminPage from './pages/superadmin/SuperAdminPage';
import LoginPage from './pages/authentication/LoginPage';
import RegisterPage from './pages/authentication/RegisterPage';
import CreateOrganisationPage from './pages/organisation/CreatreOrganisationPage';
import ListOfOrganisationsPage from './pages/users/ListOfOrganisationsPage';
import UpdateOrganisationPage from './pages/organisation/UpdateOrganisationPage';
import ListOfOrgUsersPage from './pages/users/ListOfOrgUsersPage';
import AddOrgUserPage from './pages/organisation/AddOrgUserPage';
import UpdateOrgUserPage from './pages/organisation/UpdateOrgUserPage';
import ApplicationContextProvider from './components/common/ApplicationContextProvider';
import ApplicationHeader from './components/common/ApplicationHeader';
import AppFooter from './components/common/footer/AppFooter';
import AddNewUserOrganisation from './pages/users/choseOrganisation/AddNewUserOrganisationPage';
import ProfileUserPage from './pages/users/ProfileUserPage';
import OrganisationPage from './pages/organisation/OrganisationPage';
import CampPage from './pages/camp/CampPage';
import CampParticipantsPage from './pages/camp/CampParticipantsPage';
import CampParticipantsList from './pages/camp/CampParticipantsList';
import OrganisationParticipantsList from './pages/organisation/OrganisationParticipantsList';
import CampaingsListPage from './pages/organisation/campaings/CampaingsListPage';
import CreateCampaign from './pages/organisation/campaings/admin/CreateCampaign';
import CreateTable from './pages/organisation/campaings/tables/CreateTable';
import CreateCampaignParticipants from './pages/organisation/campaings/admin/CreateCampaignParticipants';
import CampCounsellorsList from './pages/camp/CampCounsellorsList';
import i18next from "i18next";
import CampParticipantInfo from './pages/camp/CampParticipantInfo';
import CampCounsellorInfo from './pages/camp/CampCounsellorInfo';
import CampParticipantsSelect from './pages/camp/CampParticipantsSelect';
import CampParticipantAdd from './pages/camp/CampParticipantAdd';
import TablesListPage from './pages/organisation/campaings/tables/TablesListPage';
import ShowTableList from './pages/organisation/campaings/tables/ShowTableList';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // configure action to catch 403
    const interceptor = loggedRequest.interceptors.response.use(function (config) {
      return config;
    }, function (error) {
      // Do something with request error
      if (error.response.status == 403) {
        localStorage.removeItem("token")
        navigate('/listoforganisations')
      }
      return Promise.reject(error);
    });
  }, [])

  return (
    <div className="App">
      <I18nextProvider i18n={i18next}>
        <ApplicationContextProvider>
          <ApplicationHeader />
          <Routes>
            <Route path="/superadmin" element={<LoginPage next_user_status={USER_STATUS.SUPERADMIN} goto={() => { navigate('/superadmin/panel') }} />} />
            <Route path="/login" element={<LoginPage goto={() => { navigate('/listoforganisations') }} />} />
            <Route path="/superadmin/panel" element={<SuperAdminPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/superadmin/organisation/create" element={<CreateOrganisationPage />} />
            <Route path="/superadmin/organisation/update" element={<UpdateOrganisationPage />} >
              <Route path=":organisationId" element={<UpdateOrganisationPage />} />
            </Route>
            <Route path="/admin/organisationusers" element={<ListOfOrgUsersPage />} />
            <Route path="/admin/organisationusers/add" element={<AddOrgUserPage />} />
            <Route path="/admin/organisationusers/update" element={<UpdateOrgUserPage />} >
              <Route path=":userId" element={<UpdateOrgUserPage />} />
            </Route>
            {/* user organisations list */}
            <Route path="/listoforganisations" element={<ListOfOrganisationsPage />} />
            <Route path="/user/listoforganisations/add" element={<AddNewUserOrganisation />} ></Route>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/organisation" element={<OrganisationPage />}>
              <Route path=":organisationId" element={<OrganisationPage />} />
            </Route>
            <Route path="/organisation/members/list" element={<OrganisationParticipantsList />}></Route>
            <Route path="/organisation/campaings" element={<CampaingsListPage />} />
            <Route path="/admin/createcampaign" element={<CreateCampaign />} />
            <Route path="/admin/createcampaign/participants" element={<CreateCampaignParticipants />} />
            <Route path="/camp" element={<CampPage />}></Route>
            <Route path="/camp/participants" element={<CampParticipantsPage />}></Route>
            <Route path="/camp/participants/list" element={<CampParticipantsList />}></Route>
            <Route path="/camp/participants/list/participant" element={<CampParticipantInfo />}></Route>
            <Route path="/camp/counsellors/list" element={<CampCounsellorsList />}></Route>
            <Route path="/camp/counsellors/list/counsellor" element={<CampCounsellorInfo />}></Route>
            <Route path="/camp/participants/list/add" element={<CampParticipantsSelect />}></Route>
            <Route path="/camp/participants/list/addpart" element={<CampParticipantAdd />}></Route>
            <Route path="/camp/tables" element={<TablesListPage />}></Route>
            <Route path="/camp/tables/info" element={<ShowTableList />}></Route>
            <Route path="/camp/tables/createtable" element={<CreateTable />}></Route>
            <Route path="/profile" element={<ProfileUserPage />}></Route>
          </Routes>
          <AppFooter />
        </ApplicationContextProvider >
      </I18nextProvider>
    </div >
  );
}

export default App;
