import "./projectmanager.scss";
import { formatDate } from "../../../utils/helper/helper";
import { useSelector, useDispatch } from "react-redux";
import useNoScroll from "../../../utils/hooks/useNoScroll";
import { useEffect, useState } from "react";
import { PlusIcon, ThreeDots } from "../../../utils/constants/images";
import { getProjectsAPI, deleteProjectAPI, getMemberApi } from "../../../api-services/projectApis";
import { CreateSynergySteps, DeleteConfirmPopup, SynergieaCreatedSuccessfullyPopup, Loader, } from "../../../components";
import TableLayout from "./project-manager-component/TableLayout";
import PropTypes from "prop-types";
import { CustomDropdown } from "../../../components";

const ProjectsUser = ({ userProjects, setAddNewProject, handleActive, active }) => {

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedProjectForSynergy, setSelectedProjectForSynergy] = useState(null);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isMultiDltConfirmPopupOpen, setIsMultiDltConfirmPopupOpen] = useState(false);
  const [dltId, setDltId] = useState(null);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.project.projects);
  const projectApiLoading = useSelector((state) => state.project.isLoading);
  const [filterProject, setFilterProject] = useState([]);
  const [synergies, setSynergies] = useState({
    synergyName: "",
    projects: [],
  });
  const [createSynergyStep, setCreateSynergyStep] = useState(0);
  const [createSynergySuccessPopup, setCreateSynergySuccessPopup] = useState(false);
  useNoScroll([isDeleteConfirmPopupOpen, createSynergySuccessPopup, isMultiDltConfirmPopupOpen]);

  const handleDelete = (projectId) => {
    dispatch(
      deleteProjectAPI({
        projectIds: [projectId],
      })
    ).then(() => {
      setIsDeleteConfirmPopupOpen(false);
      setDltId(null);
    });
  };

  const headerToggleButton = [
    {
      label: 'PERSONAL INFORMATION',
      key: 'INFORMATION',
      onClick: () => handleActive("INFORMATION")
    },
    {
      label: ' PROJECT INVOLVEMENT',
      key: 'INVOLVEMENT',
      onClick: () => handleActive("INVOLVEMENT")
    },
    {
      label: 'AMBASSADORS',
      key: 'AMBASSADORS',
      onClick: () => handleActive("AMBASSADORS")
    },
  ]

  const handleSelectProject = ({ projectId }) => {
    if (createSynergyStep === 0) {
      let tmpSelectedProjects = [...selectedProjects];
      const project = tmpSelectedProjects.find((item) => item === projectId);
      if (project) {
        tmpSelectedProjects = tmpSelectedProjects.filter((item) => item !== projectId);
      } else {
        tmpSelectedProjects.push(projectId);
      }
      setSelectedProjects([...tmpSelectedProjects]);
    } else if (createSynergyStep === 2) {
      // let tmpSelectedProjects = [...selectedProjectForSynergy]
      // const project = tmpSelectedProjects.find((item) => item === projectId)
      // const findInSelected = selectedProjects.find((item) => item === projectId)
      // if (!findInSelected) {
      //     if (project) {
      //         tmpSelectedProjects = tmpSelectedProjects.filter((item) => item !== projectId)
      //     } else {
      //         tmpSelectedProjects.push(projectId)
      //     }
      // }
      if (selectedProjectForSynergy === projectId) {
        setSelectedProjectForSynergy(null);
      } else {
        setSelectedProjectForSynergy(projectId);
      }
    }
  };

  useEffect(() => {
    const projectData = [
      ...userProjects.map((project, index) => {
        let tags = project.project_info?.split("#") || [];
        tags = tags.filter((tag) => tag).map((tag) => `#${tag}`);

        const synergyAngleData = project.synergy_angles ? JSON.parse(project.synergy_angles) : {}
        let synergyAngle = []
        Object.keys(synergyAngleData ?? {}).forEach((key) => {
          if (synergyAngleData[key]) {
            synergyAngle.push({ label: synergyAngleData[key] })
          }
        })

        const row = {
          key: index,
          checked: false,
          projectName: project.project_name,
          role: project.job_desc,
          synergyImg: project.image ?? "",
          synergiesAngles: synergyAngle,
          type: tags,
          isFeatured: project.featured,
          date: formatDate(project.date),
          disabled: false,
          description: project.description,
          projectId: project.project_id,
        };
        return row;
      }),
    ];
    setFilterProject([...projectData]);
  }, [data, userProjects]);

  useEffect(() => {
    if (data.length === 0)
      dispatch(getProjectsAPI()).then((res) => {
        if (res?.payload?.length > 0) {
          res.payload.map((project) => {
            dispatch(getMemberApi(project.project_id));
          });
        }
      });
  }, []);

  return (
    <div className="project_user_content_details_wrapper">
      <div className="project_user_content_header">
        <div className="project_user_content_left">
          <h2>Profile</h2>
        </div>
        <div className="project_user_content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="project_user_page_data">
        <div className="page_data">
          <div className="header_button">
            <div className="header_toggle_button">
              {headerToggleButton.map((data) => {
                return (
                  <div
                    key={data.key}
                    className={`buttons ${active === data.key ? "active" : ""}`}
                    onClick={data.onClick}
                  >
                    {data.label}
                  </div>
                )
              })}
            </div>
            <div className="header_toggle_dropDown">
              <CustomDropdown
                toggleButton={
                  <ThreeDots />
                }
                items={headerToggleButton}
              />
            </div>
          </div>
          <div className="project_user_page_header">
            <div className="pagination">
              <span>Project</span>
            </div>
            <button className="btn_gray add_project_btn" onClick={() => { setAddNewProject(true); }}>
              Add New Project
              <PlusIcon />
            </button>
          </div>

          <div className="project_user_page_body">
            <TableLayout
              filterProject={filterProject}
              selectedProjects={selectedProjects}
              selectedProjectForSynergy={selectedProjectForSynergy}
              createSynergyStep={createSynergyStep}
              handleSelectProject={handleSelectProject}
              setIsDeleteConfirmPopupOpen={setIsDeleteConfirmPopupOpen}
              setDltId={setDltId}
            />
          </div>
        </div>
      </div>
      <DeleteConfirmPopup
        title="Are You Sure ?"
        description={`After once a delete project can't be recover...`}
        open={isDeleteConfirmPopupOpen}
        handleClose={() => {
          setIsDeleteConfirmPopupOpen(false);
          setDltId(null);
        }}
        handleDelete={() => handleDelete(dltId)}
        isLoading={projectApiLoading && isDeleteConfirmPopupOpen}
      />
      <DeleteConfirmPopup
        title="Are You Sure ?"
        description={`After once a delete project can't be recover...`}
        open={isMultiDltConfirmPopupOpen}
        handleClose={() => {
          setIsMultiDltConfirmPopupOpen(false);
        }}
        handleDelete={() => {
          dispatch(
            deleteProjectAPI({
              projectIds: [...selectedProjects],
            })
          ).then(() => {
            setSelectedProjects([]);
          });
          setIsMultiDltConfirmPopupOpen(false);
        }}
      />

      <CreateSynergySteps
        createSynergyStep={createSynergyStep}
        setCreateSynergyStep={setCreateSynergyStep}
        synergies={synergies}
        setSynergies={setSynergies}
        setSelectedProjects={setSelectedProjects}
        setSelectedProjectForSynergy={setSelectedProjectForSynergy}
        setCreateSynergySuccessPopup={setCreateSynergySuccessPopup}
      />

      <SynergieaCreatedSuccessfullyPopup
        open={createSynergySuccessPopup}
        handleClose={() => {
          setCreateSynergySuccessPopup(false);
        }}
      />

      <Loader loading={projectApiLoading} />
    </div>
  );
};

ProjectsUser.propTypes = {
  userProjects: PropTypes.array.isRequired,
  setAddNewProject: PropTypes.func.isRequired,
  handleActive: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ProjectsUser;
