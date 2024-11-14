import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ROUTER } from './utils/routes/routes'
import './App.scss'
import Layout from './components/layout/Layout'
import UserProfile from './pages/user-profile/UserProfile'
import SynergiesManager from './pages/synergies-manager/SynergiesManager'
import ProjectManager from './pages/project-manager/ProjectManager'
import ProjectManagerEdit from './pages/project-manager-edit/ProjectManagerEdit'
import FeaturedAllProjects from './pages/projects/featured-all-projects/FeaturedAllProjects'
import Projects from './pages/projects/Projects'
import Synergies from './pages/synergies/Synergies'
import SynergyProject from './pages/synergies/synergy-project/SynergyProject'
import Chats from './pages/chats/Chats'
import PendingSynergies from './pages/pending-synergies/PendingSynergies'
import { injectStore } from './store/injector'
import { store } from './store/store'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProjectDetails from './pages/projects/project-details/ProjectDetails'
import Investment from './pages/investment/Investment'

function App() {

  injectStore(store)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Navigate to={ROUTER.projectManager} />} />

          <Route element={<Layout />}>
            <Route path={ROUTER.projectManager} element={<ProjectManager />} />
            <Route path={`${ROUTER.projectManager}/:projectId`} element={<ProjectManagerEdit />} />
            <Route path={ROUTER.profile} element={<UserProfile />} />
            <Route path={ROUTER.synergiesManager} element={<SynergiesManager />} />
            <Route path={ROUTER.projects} element={<Projects />} />
            <Route path={ROUTER.featuredProjects} element={<FeaturedAllProjects />} />
            <Route path={ROUTER.synergies} element={<Synergies />} />
            <Route path={ROUTER.synergyProject} element={<SynergyProject />} />
            <Route path={ROUTER.chat} element={<Chats />} />
            <Route path={ROUTER.pendingSynergies} element={<PendingSynergies />} />
            <Route path={ROUTER.projectDetails} element={<ProjectDetails />} />
            <Route path={ROUTER.investment} element={<Investment />} />
          </Route>

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
