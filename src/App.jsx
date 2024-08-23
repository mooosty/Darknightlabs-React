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


function App() {

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
            <Route path={`projects/${ROUTER.featuredProjects}`} element={<FeaturedAllProjects />} />
            <Route path={ROUTER.synergies} element={<Synergies />} />
            <Route path={ROUTER.synergyProject} element={<SynergyProject />} />
            <Route path={ROUTER.chat} element={<Chats />} />
          </Route>

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
