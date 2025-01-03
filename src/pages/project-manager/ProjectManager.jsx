import "./projectmanager.scss";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper/helper";
import { useSelector, useDispatch } from "react-redux";
import useNoScroll from "../../utils/hooks/useNoScroll";
import { useEffect, useState } from "react";
import { synergyAnglesOptions } from "../../utils/constants/options";
import { SearchIcon, FilterIcon, DeleteIcon, PlusIcon, CloseIcon, ListIcon, GridIcon, TableStatusIcon, InfiniteIcon, MoreIcon } from "../../utils/constants/images";
import { getProjectsAPI, deleteProjectAPI, updateProjectAPI, getMemberApi } from "../../api-services/projectApis";
import {
  ProjectManagerTableLayout,
  ProjectManagerGridLayout,
  CreateSynergySteps,
  Select,
  DeleteConfirmPopup,
  SynergieaCreatedSuccessfullyPopup,
  BottomMenu,
  Loader,
  CustomSearch,
} from "../../components";

const ProjectManager = () => {
  const [activeLayout, setActiveLayout] = useState("TABLE");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
  const [searchStr, setSearchStr] = useState('')
  const [createSynergyStep, setCreateSynergyStep] = useState(0);
  const [createSynergySuccessPopup, setCreateSynergySuccessPopup] = useState(false);
  useNoScroll([isDeleteConfirmPopupOpen, createSynergySuccessPopup, isMultiDltConfirmPopupOpen]);

  const handleActive = (key) => {
    setActiveLayout(key);
  };

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

  const handleSelectAllProjects = () => {
    if (selectedProjects.length === filterProject.length && filterProject.length !== 0) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects([...filterProject.map((project) => project.projectId)]);
    }
  };

  const handleCancelSelection = () => {
    setSelectedProjects([]);
  };

  const handleAddFeature = (isAdd) => {
    let projects = [
      ...data.filter((project) => {
        return selectedProjects.includes(project.project_id) && (isAdd ? !project.featured : project.featured);
      }),
    ];

    const resArr = projects.map((project) => {
      const data = {
        projectId: project.project_id,
        projectData: {
          featured: isAdd ? 1 : 0,
        },
      };
      return dispatch(updateProjectAPI(data));
    });

    Promise.allSettled(resArr).then(() => {
      setSelectedProjects([]);
    });
  };

  const handleCreateSynergy = () => {
    setSelectedProjects([selectedProjects[0]]);
    setCreateSynergyStep(createSynergyStep + 1);
  };

  const handleSynergize = () => {
    setCreateSynergyStep(createSynergyStep + 1);
    let synergyName = "";
    let projects = [
      ...data.filter((project) => {
        if (selectedProjects[0] === project.project_id || selectedProjectForSynergy === project.project_id) {
          if (synergyName === "") {
            synergyName += project.project_name;
          } else {
            synergyName += " X " + project.project_name;
          }
          return true;
        }
        return false;
      }),
    ];
    setSynergies({
      ...synergies,
      synergyName: synergyName,
      groupName: synergyName,
      projects: projects,
    });
  };

  const handleSearchChange = (value) => {
    setSearchStr(value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prevFilter) => ({
        ...prevFilter,
        searchBy: searchStr,
      }));
    }, 500)
    return () => clearTimeout(timer)
  }, [searchStr])

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
      ...data.map((project, index) => {
        let tags = project.project_info?.split("#") || [];
        tags = tags.filter((tag) => tag).map((tag) => `#${tag}`);

        let synergy_angles = Object.keys(project.synergy_angles)
          .map((key) => (project.synergy_angles[key] ? { label: project.synergy_angles[key] } : null))
          .filter((item) => item);

        const row = {
          key: index,
          checked: false,
          projectName: project.project_name,
          teamMembers: project?.teamMembers ?? [],
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
    setFilterProject([...projectData]);
  }, [data]);

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
    <div className="project_manager_wrapper">
      <div className="project_manager_header">
        <div className="content_left">
          <h2>Projects Manager</h2>
          <div className="search_wrap">
            <CustomSearch placeholder="Search" value={searchStr} onSearchChange={(e) => handleSearchChange(e.target.value)} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          </div>
        </div>
        {isSearchOpen && <div className="mobile_search">
          <span className="icon"><SearchIcon /></span>
          <input type="text" value={searchStr} placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
        </div>}
        <div className="content_right">
          <a href="#">Darknight Labs</a>
        </div>
      </div>
      <div className="project_manager_page_data">
        <div className={`page_data ${isSearchOpen ? 'search_open' : ''}`}>
          <div className="project_page_header">
            <div className="project_page_header_top">
              <div className="project_pagination">
                <button
                  className={`project_pagination_btn ${activeLayout === "TABLE" ? "active" : ""}`}
                  onClick={() => handleActive("TABLE")}
                >
                  <ListIcon />
                </button>
                <button
                  className={`project_pagination_btn ${activeLayout === "GRID" ? "active" : ""}`}
                  onClick={() => handleActive("GRID")}
                >
                  <GridIcon />
                </button>
              </div>
              <div className="project_page_header_button">
                <button className="btn_gray btn_filter" onClick={handleFilterOpen}>
                  Filters{" "}
                  {Object.values(filter).filter((value) => value !== "").length > 0 &&
                    `(${Object.values(filter).filter((value) => value !== "").length})`}
                  <FilterIcon />
                </button>
                <button
                  className={`btn_gray `}
                  onClick={() => {
                    navigate("/project-manager/add");
                  }}
                >
                  Add New Project
                  <PlusIcon />
                </button>
                {createSynergyStep < 2 ? (
                  <button
                    className={`btn_gray ${createSynergyStep >= 1 ? "active" : ""}`}
                    onClick={() => {
                      setCreateSynergyStep(createSynergyStep + 1);
                    }}
                    disabled={!(createSynergyStep >= 1)}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    disabled={selectedProjectForSynergy === null}
                    className={`btn_gray ${createSynergyStep >= 1 ? "active" : ""}`}
                    onClick={handleSynergize}
                  >
                    Synergize
                  </button>
                )}
              </div>
            </div>
            <div className={`project_page_filter ${isFilterOpen ? "active" : ""}`}>
              <div className="angels">
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
              </div>
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
            <div className="project_table_view">
              {activeLayout === "TABLE" && (
                <div className={`project_page_table_handler ${!(createSynergyStep >= 1) > 0 ? "active" : ""}`}>
                  <div className="selected_count">
                    <div className="costum_checkbox">
                      <input
                        type="checkbox"
                        id="checkboxSelected"
                        className="costum_checkbox_input"
                        checked={selectedProjects.length === filterProject.length && filterProject.length !== 0}
                        readOnly
                      />
                      <label
                        htmlFor="checkboxSelected"
                        className="costum_checkbox_label"
                        onClick={handleSelectAllProjects}
                      ></label>
                    </div>
                    <span>{selectedProjects.length} Selected</span>
                  </div>
                  {selectedProjects.length > 0 && (
                    <>
                      <div className="table_actions">
                        <button className="btn_cancle btn_gray" onClick={handleCancelSelection}>
                          <CloseIcon />
                          <span>Cancel</span>
                        </button>
                        {
                          data
                            .filter((project) => selectedProjects.includes(project.project_id))
                            .every((items) => items?.featured == 1) ? (
                            <button
                              className="btn_cancle btn_gray"
                              onClick={() => {
                                handleAddFeature(false);
                              }}
                            >
                              <CloseIcon />
                              <span>Remove Featured</span>
                            </button>
                          ) : (
                            <button
                              className="btn_featured btn_gray"
                              onClick={() => {
                                handleAddFeature(true);
                              }}
                            >
                              <TableStatusIcon />
                              <span>Add to Featured</span>
                            </button>
                          )
                        }


                        <button
                          className="btn_create btn_gray"
                          onClick={() => {
                            handleCreateSynergy();
                          }}
                        >
                          <InfiniteIcon />
                          <span>Create Synergy</span>
                        </button>
                        <button
                          className="btn_delete"
                          onClick={() => {
                            setIsMultiDltConfirmPopupOpen(true);
                          }}
                        >
                          <DeleteIcon />
                          <span>Delete</span>
                        </button>
                      </div>
                      <div className="table_actions_button">
                        <button
                          className="button_delete "
                          onClick={() => {
                            setIsMultiDltConfirmPopupOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                        <button className="menu_button" onClick={() => setIsBottomMenuOpen(true)}>
                          <MoreIcon />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              {activeLayout === "TABLE" && (
                <ProjectManagerTableLayout
                  filterProject={filterProject}
                  selectedProjects={selectedProjects}
                  selectedProjectForSynergy={selectedProjectForSynergy}
                  createSynergyStep={createSynergyStep}
                  handleSelectProject={handleSelectProject}
                  setIsDeleteConfirmPopupOpen={setIsDeleteConfirmPopupOpen}
                  setDltId={setDltId}
                />
              )}
            </div>
            <div className="project_grid_view">
              {activeLayout === "GRID" && <ProjectManagerGridLayout filterProject={filterProject} />}
            </div>
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

      <BottomMenu open={isBottomMenuOpen}>
        <button
          onClick={() => {
            handleCancelSelection();
            setIsBottomMenuOpen(false);
          }}
        >
          <CloseIcon />
          <span>Cancel</span>
        </button>
        {
          data
            .filter((project) => selectedProjects.includes(project.project_id))
            .every((items) => items?.featured == 1) ?
            <button
              onClick={() => {
                handleAddFeature(false);
                setIsBottomMenuOpen(false);
              }}
            >
              <CloseIcon />
              <span>Remove Featured</span>
            </button>
            :
            <button
              onClick={() => {
                handleAddFeature(true);
                setIsBottomMenuOpen(false);
              }}
            >
              <TableStatusIcon />
              Add to Featured
            </button>
        }
        <button
          onClick={() => {
            handleCreateSynergy();
            setIsBottomMenuOpen(false);
          }}
        >
          <InfiniteIcon />
          <span>Create synergy</span>
        </button>
        <button
          onClick={() => {
            setIsMultiDltConfirmPopupOpen(true);
            setIsBottomMenuOpen(false);
          }}
        >
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </BottomMenu>

      <Loader loading={projectApiLoading} />
    </div>
  );
};

export default ProjectManager;
