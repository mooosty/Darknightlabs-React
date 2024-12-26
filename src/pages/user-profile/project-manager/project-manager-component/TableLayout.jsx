import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { EmptyData, ProjectAccordion } from "../../../../components";
import { GredientGlobalIcon, GradientGraphIcon } from "../../../../utils/constants/images";
import { defaultImg, editIcon, DeleteIcon } from "../../../../utils/constants/images";

const ProjectManagerTableLayout = ({
  filterProject,
  selectedProjects,
  selectedProjectForSynergy,
  createSynergyStep,
  handleSelectProject,
  setIsDeleteConfirmPopupOpen,
  setDltId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="project_page_table">{filterProject.length == 0 ?
        <EmptyData />
        :
        <>
          <table>
            <thead>
              <tr>
                <th>Project name</th>
                <th className="center">Image</th>
                <th className="center">Description</th>
                <th className="center">Role</th>
                <th className="center">Synergies</th>
                <th className="center">Date</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterProject.map((rowData) => {
                return (
                  <tr
                    key={rowData.projectId}
                    className={`${rowData.isFeatured ? "highlighted" : ""} ${selectedProjects.includes(rowData.projectId) ? "selected" : ""
                      } ${selectedProjects.includes(rowData.projectId) && createSynergyStep >= 2 ? "disable" : ""}`}
                  >
                    <td>
                      <div className="table_name">
                        <span className="label"> {rowData.projectName}</span>
                      </div>
                    </td>

                    <td>
                      <div className="table_image">
                        <img
                          src={rowData.synergyImg === "" || !rowData.synergyImg ? defaultImg : rowData.synergyImg}
                          alt=" "
                          onError={(e) => (e.target.src = defaultImg)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="description">
                        <span>{rowData.description}</span>
                      </div>
                    </td>

                    <td>
                      <div className="description">
                        <span>{rowData.role}</span>
                      </div>
                    </td>


                    <td>
                      <div className="table_angles">
                        {rowData.synergiesAngles.slice(0, 3).map((Angle, index) => (
                          <div className={`${index === 0 ? "global" : index === 1 ? "graph" : ""}`} key={index}>
                            <div className="angle_tag">
                              <>
                                {index === 0 && (
                                  <div className="icon">
                                    <GredientGlobalIcon />
                                  </div>
                                )}
                              </>
                              <>
                                {index === 1 && (
                                  <div className="icon">
                                    <GradientGraphIcon />
                                  </div>
                                )}
                              </>
                              <span className="text">
                                <span>{Angle.label}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                        {rowData.synergiesAngles.length > 3 ? (
                          <div className="angle_tag">
                            <span className="angle_tag_count">+{rowData.synergiesAngles.length - 3}</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="date">{rowData.date}</div>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn"
                          onClick={() => {
                            navigate(`/project-manager/${rowData.projectId}`);
                          }}
                        >
                          <img src={editIcon} alt=" " />
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            setIsDeleteConfirmPopupOpen(true);
                            setDltId(rowData.projectId);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      }
      </div>
      <div className="project_page_accordion">{filterProject.length == 0 ?
        <EmptyData />
        :
        <>
          {filterProject.map((rowData, index) => (
            <ProjectAccordion
              key={`${rowData.key}_${index}`}
              projectName={rowData.projectName}
              teamMembers={rowData?.teamMembers}
              synergyImg={rowData.synergyImg}

              role={rowData.role}

              description={rowData.description}
              type={rowData.type}
              status={rowData.status}
              synergiesAngles={rowData.synergiesAngles}
              date={rowData.date}
              isFeatured={rowData.isFeatured}
              checked={selectedProjects.includes(rowData.projectId) || selectedProjectForSynergy === rowData.projectId}
              disabled={selectedProjects.includes(rowData.projectId) && createSynergyStep >= 2}
              onDelete={() => {
                setIsDeleteConfirmPopupOpen(true);
                setDltId(rowData.projectId);
              }}
              onEdit={() => {
                navigate(`/project-manager/${rowData.projectId}`);
              }}
              onSelect={() => {
                handleSelectProject(rowData);
              }}
            />
          ))}
        </>
      }
      </div>
    </>
  );
};

ProjectManagerTableLayout.propTypes = {
  filterProject: PropTypes.array.isRequired,
  selectedProjects: PropTypes.array.isRequired,
  selectedProjectForSynergy: PropTypes.string.isRequired,
  createSynergyStep: PropTypes.number.isRequired,
  handleSelectProject: PropTypes.func.isRequired,
  setIsDeleteConfirmPopupOpen: PropTypes.func.isRequired,
  setDltId: PropTypes.func.isRequired,
};

export default ProjectManagerTableLayout;
