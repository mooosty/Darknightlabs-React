import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Authentication from "./pages/authentication/Authentication";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projects/project-details/ProjectDetails";
import ProjectManager from "./pages/project-manager/ProjectManager";
import ProjectManagerEdit from "./pages/project-manager-edit/ProjectManagerEdit";
import Synergies from "./pages/synergies/Synergies";
import Investment from "./pages/investment/Investment";
import UserProfile from "./pages/user-profile/UserProfile";
import Karma from "./pages/karma/Karma";
import { ROUTER } from "./utils/routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${ROUTER.authentication}`} element={<Authentication />} />
        <Route path="/" element={<Layout />}>
          <Route path={`/${ROUTER.projects}`} element={<Projects />} />
          <Route path={`/${ROUTER.projectDetails}/:id`} element={<ProjectDetails />} />
          <Route path={`/${ROUTER.projectManager}`} element={<ProjectManager />} />
          <Route path={`/${ROUTER.projectManagerEdit}/:id`} element={<ProjectManagerEdit />} />
          <Route path={`/${ROUTER.synergies}`} element={<Synergies />} />
          <Route path={`/${ROUTER.investment}`} element={<Investment />} />
          <Route path={`/${ROUTER.profile}`} element={<UserProfile />} />
          <Route path={`/${ROUTER.karma}`} element={<Karma />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
