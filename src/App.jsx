import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Authentication from "./pages/authentication/Authentication";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/project-details/ProjectDetails";
import ProjectManager from "./pages/project-manager/ProjectManager";
import ProjectManagerEdit from "./pages/project-manager-edit/ProjectManagerEdit";
import Synergies from "./pages/synergies/Synergies";
import Investment from "./pages/investment/Investment";
import UserProfile from "./pages/user-profile/UserProfile";
import Chats from './pages/chats/Chats'
import InitialDataLoader from './components/InitialDataLoader';
import SynergiesDetails from './pages/synergies/synergies-details/SynergiesDetails'

import Karma from "./pages/karma/Karma";
import MyContent from './pages/my-content/MyContent'
import AmbassadorProjects from './pages/ambassador-projects/ambassadorProjects'
import AmbassadorProjectDetails from './pages/ambassador-projects/ambassador-project-details/AmbassadorProjectDetails'
import { ROUTER } from "./utils/routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SynergyRequest from "./pages/pending-synergies/SynergyRequest";
import SynergiesManager from "./pages/synergies-manager/SynergiesManager";
import ProtectedFeatureRoute from './components/routing/ProtectedFeatureRoute';
import Welcome from './pages/welcome/Welcome';
import Home from './pages/home/Home';
import Error404 from './pages/error404/Error404';
import Error405 from './pages/error405/Error405';
import SocietyFullList from './pages/home/society-full-list/SocietyFullList';

function App() {
  return (
    <BrowserRouter>
      <InitialDataLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/${ROUTER.societyFullList}`} element={<SocietyFullList />} />
        <Route path={`/${ROUTER.authentication}`} element={<Authentication />} />

        <Route path="/" element={<Layout />}>
          <Route path={`/${ROUTER.welcome}`} element={<Welcome />} />
          <Route path={`/${ROUTER.projects}`} element={<ProtectedFeatureRoute feature="PROJECTS"><Projects /></ProtectedFeatureRoute>} />
          <Route path={ROUTER.myContent} element={<MyContent />} />
          <Route path={ROUTER.ambassadorProjects} element={<AmbassadorProjects />} />
          <Route path={`${ROUTER.ambassadorProjects}/:projectId`} element={<AmbassadorProjectDetails />} />
          <Route path={`${ROUTER.projects}/:projectId`} element={<ProjectDetails />} />
          <Route path={`/${ROUTER.projectManager}`} element={<ProjectManager />} />
          <Route path={`/${ROUTER.projectManagerEdit}/:id`} element={<ProjectManagerEdit />} />
          <Route path={`/${ROUTER.synergyRequests}`} element={<SynergyRequest />} />
          <Route path={`/${ROUTER.synergiesManager}`} element={<SynergiesManager />} />

          <Route path={`/${ROUTER.synergies}`} element={<ProtectedFeatureRoute feature="SYNERGIES"><Synergies /> </ProtectedFeatureRoute>} />
          <Route path={`${ROUTER.synergies}/:synergyId`} element={<ProtectedFeatureRoute feature="SYNERGIES"> <SynergiesDetails /> </ProtectedFeatureRoute>} />

          <Route path={`/${ROUTER.investment}`} element={<Investment />} />
          <Route path={`/${ROUTER.profile}`} element={<UserProfile />} />
          <Route path={`/${ROUTER.karma}`} element={<Karma />} />
          <Route path={ROUTER.chat} element={<ProtectedFeatureRoute feature="CHAT">   <Chats /> </ProtectedFeatureRoute>} />
          <Route path={`${ROUTER.chat}/:id`} element={<ProtectedFeatureRoute feature="CHAT"><Chats /></ProtectedFeatureRoute>} />
        </Route>

        <Route path={`/${ROUTER.error404}`} element={<Error404 />} />
        <Route path={`/${ROUTER.error405}`} element={<Error405 />} />
        <Route path={`*`} element={<Navigate to={ROUTER.error404} />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
