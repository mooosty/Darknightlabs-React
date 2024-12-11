import "./projectmanager.scss";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/helper/helper";
import { useSelector, useDispatch } from "react-redux";
import useNoScroll from "../../../utils/hooks/useNoScroll";
import { useCallback, useEffect, useState } from "react";
import { synergyAnglesOptions } from "../../../utils/constants/options";
import { GridIcon, ListIcon, TableStatusIcon, InfiniteIcon, MoreIcon } from "../../../utils/SVGs/SVGs";
import { searchIcon, filterIcon, trashIcon, addIcon, closeIcon } from "../../../utils/constants/images";
import { getProjectsAPI, deleteProjectAPI, updateProjectAPI, getMemberApi } from "../../../api-services/projectApis";
import {
  ProjectManagerTableLayout,
  ProjectManagerGridLayout,
  CreateSynergySteps,
  Select,
  DeleteConfirmPopup,
  SynergieaCreatedSuccessfullyPopup,
  BottomMenu,
  Loader,
} from "../../../components";
import TableLayout from "./project-manager-component/TableLayout";
import img from "../../../assets/model-frame.png";

const ProjectsUser = ({ userProjects, setAddNewProject, handleActive, active }) => {
  
  const [activeLayout, setActiveLayout] = useState("TABLE");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedProjectForSynergy, setSelectedProjectForSynergy] = useState(null);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isMultiDltConfirmPopupOpen, setIsMultiDltConfirmPopupOpen] = useState(false);
  const [dltId, setDltId] = useState(null);
  const [filter, setFilter] = useState({
    synergyAngleValue: "",
    status: "",
    sortBy: "",
    type: "",
    searchBy: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.project.projects);
  const projectApiLoading = useSelector((state) => state.project.isLoading);

  const [initialProject, setInitialProject] = useState([]);
  const [filterProject, setFilterProject] = useState([]);
  const [synergies, setSynergies] = useState({
    synergyName: "",
    projects: [],
  });
  const [createSynergyStep, setCreateSynergyStep] = useState(0);
  const [createSynergySuccessPopup, setCreateSynergySuccessPopup] = useState(false);
  useNoScroll([isDeleteConfirmPopupOpen, createSynergySuccessPopup, isMultiDltConfirmPopupOpen]);

  // const handleActive = (key) => {
  //   setActiveLayout(key);
  // };

  const handleFilterOpen = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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
    let data = initialProject;
    if (filter.synergyAngleValue !== "") {
      const filterArr = data.filter((project) => {
        return (
          project.synergiesAngles.findIndex((synergy) => {
            return synergy.label === filter.synergyAngleValue;
          }) !== -1
        );
      });
      data = [...filterArr];
    }
    if (filter.status !== "") {
      const filterArr = data.filter((project) => {
        if (filter.status === "Featured") return project.isFeatured;
        else {
          return !project.isFeatured;
        }
      });
      data = [...filterArr];
    }
    if (filter.type !== "") {
      const filterArr = data.filter((project) => {
        return project.type?.findIndex((typeVal) => typeVal === `#${filter.type}`) !== -1;
      });
      data = [...filterArr];
    }
    if (filter.sortBy !== "") {
      if (filter.sortBy === "name") {
        const filterArr = data.sort((project1, project2) => {
          const projectName1 = project1.projectName.toLowerCase();
          const projectName2 = project2.projectName.toLowerCase();

          return projectName1.localeCompare(projectName2);
        });

        data = [...filterArr];
      } else if (filter.sortBy === "date") {
        const filterArr = data.sort((project1, project2) => {
          var date1 = project1.date.split("/").reverse().join();
          var date2 = project2.date.split("/").reverse().join();
          return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
        });
        data = [...filterArr];
      } else if (filter.sortBy === "description") {
        const filterArr = data.sort((project1, project2) => {
          const description1 = project1.description.trim()?.toLowerCase();
          const description2 = project2.description.trim()?.toLowerCase();

          if (description1 < description2) {
            return -1;
          }
          if (description1 > description2) {
            return 1;
          }
          return 0;
        });
        data = [...filterArr];
      }
    }

    if (filter.searchBy !== "") {
      const searchKeyword = filter.searchBy.toLowerCase();
      data = data.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchKeyword) ||
          project.description.toLowerCase().includes(searchKeyword)
      );
    }

    setFilterProject([...data]);
  }, [filter]);

  useEffect(() => {
    const projectData = [
      ...userProjects.map((project, index) => {
        let tags = project.project_info?.split("#") || [];
        tags = tags.filter((tag) => tag).map((tag) => `#${tag}`);

        let synergy_angles = Object.keys(project.synergy_angles)
          .map((key) => (project.synergy_angles[key] ? { label: project.synergy_angles[key] } : null))
          .filter((item) => item);

        const row = {
          key: index,
          checked: false,
          projectName: project.project_name,
          role : project.job_desc,
          synergyImg: project.image ?? "",
          synergiesAngles: synergy_angles,
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
    setInitialProject([...projectData]);
    console.log("projectData", projectData);
    setFilterProject([...projectData]);
  }, [data , userProjects ]);

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
    <>
      <div className="content_header">
        <div className="content_left">
          <h2>Profile</h2>
        </div>
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="project_page_data">
        <div className="page_data">
          {/* border-radius: 20px;
            background-color: #191917;
            background-image: url("../../assets/model-frame.png");
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 10px;
            min-height: 540px;
            height: calc(100% - 80px); */}

          <div className="project_page_header">
            <div
              style={{
                backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
                marginTop: "10px",
               }}
              className="project_page_header_top"
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: window.innerWidth < 768 ? "column" : "row",
                  flexWrap: window.innerWidth < 768 ? "nowrap" : "wrap",
                  backgroundColor: "transparent",
                  height: "100%",
                  overflowY: "auto",
                  color: "white",
                  gap: "20px",
                  flexDirection: "column",
                  padding: "20px",
                  boxSizing: "border-box",
                  maxWidth: "calc(100vw - 30px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginBottom: "25px",
                    gap: "10px",
                    justifyContent: "",
                  }}
                >
                  <div
                    style={{
                      color: active !== "INFORMATION" ? "#ffffff80" : "white",
                      padding: "15px 10px",
                      display: "flex",
                      justifyContent: "center",
                      borderBottom: "1px solid #ffffff80",
                      cursor: "pointer",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onClick={() => handleActive("INFORMATION")}
                  >
                    PERSONAL INFORMATION
                  </div>
                  <div
                    style={{
                      color: active !== "INVOLVEMENT" ? "#ffffff80" : "white",
                      padding: "15px 10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #ffffff80",
                      cursor: "pointer",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    onClick={() => handleActive("INFORMATION")}
                  >
                    PROJECT INVOLVEMENT
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                  <div className="project_page_header_button">
                    <button
                      className={`btn_gray `}
                      onClick={() => {
                        setAddNewProject(true);
                      }}
                    >
                      Add New Project
                      <img src={addIcon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`project_page_filter ${isFilterOpen ? "active" : ""}`}>
              {/* <div className="angels">
                <Select
                  options={synergyAnglesOptions}
                  placeholder={"All synergies angles"}
                  onChange={(value) => {
                    setSelectedProjects([]);
                    if (value.value === "All") {
                      setFilter({
                        ...filter,
                        synergyAngleValue: "",
                      });
                    } else {
                      setFilter({
                        ...filter,
                        synergyAngleValue: value.value,
                      });
                    }
                  }}
                  showAllOption={true}
                  allOptionText={"All synergies angles"}
                />
              </div> */}
              <div className="type">
                <Select
                  options={[
                    { label: "GAME", value: "GAME" },
                    { label: "AI", value: "AI" },
                    { label: "hey", value: "hey" },
                  ]}
                  onChange={(value) => {
                    setSelectedProjects([]);
                    if (value.value === "All") {
                      setFilter({
                        ...filter,
                        type: "",
                      });
                    } else {
                      setFilter({
                        ...filter,
                        type: value.value,
                      });
                    }
                  }}
                  placeholder={"All project types"}
                  showAllOption={true}
                  allOptionText={"All project types"}
                />
              </div>
              <div className="status">
                <Select
                  options={[
                    { label: "Featured", value: "Featured" },
                    { label: "Non Featured", value: "Non Featured" },
                  ]}
                  placeholder={"All Statuses"}
                  onChange={(value) => {
                    setSelectedProjects([]);
                    if (value.value === "All") {
                      setFilter({
                        ...filter,
                        status: "",
                      });
                    } else {
                      setFilter({
                        ...filter,
                        status: value.value,
                      });
                    }
                  }}
                  showAllOption={true}
                  allOptionText={"All Statuses"}
                />
              </div>
              <div className="sort">
                <Select
                  options={[
                    { label: "Project Name", value: "name" },
                    { label: "Description", value: "description" },
                    { label: "Date", value: "date" },
                  ]}
                  placeholder={"Sort by"}
                  onChange={(value) => {
                    setSelectedProjects([]);
                    setFilter({
                      ...filter,
                      sortBy: value.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="project_page_body">
            {activeLayout === "TABLE" && (
              <TableLayout
                filterProject={filterProject}
                selectedProjects={selectedProjects}
                selectedProjectForSynergy={selectedProjectForSynergy}
                createSynergyStep={createSynergyStep}
                handleSelectProject={handleSelectProject}
                setIsDeleteConfirmPopupOpen={setIsDeleteConfirmPopupOpen}
                setDltId={setDltId}
              />
            )}
            {activeLayout === "GRID" && <ProjectManagerGridLayout filterProject={filterProject} />}
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
    </>
  );
};

export default ProjectsUser;
