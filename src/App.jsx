import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProjectManager from './pages/project-manager/ProjectManager'
import { ROUTER } from './utils/routes/routes'
import './App.scss'
import Layout from './components/layout/Layout'
import UserProfile from './pages/user-profile/UserProfile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Navigate to={ROUTER.projectManager} />} />

          <Route element={<Layout />}>
            <Route path={ROUTER.projectManager} element={<ProjectManager />} />
            <Route path={ROUTER.userProfile} element={<UserProfile />} />
          </Route>

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
