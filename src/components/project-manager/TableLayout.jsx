import PropTypes from 'prop-types';
import { Fragment } from 'react';
import CustomTooltip from '../../components/customTooltip/CustomTooltip';
import trashIcon from "../../assets/trash-icon.png";
import defaultImg from '../../assets/project-card-img-1.png';
import tableActorImage3 from "../../assets/avatar-3.jpg";
import ProjectAccordion from '../../components/project-accordion/ProjectAccordion';
import { useNavigate } from 'react-router-dom';
import { GredientGlobalIcon, GradientGraphIcon, TableStatusIcon } from '../../utils/SVGs/SVGs';
import editIcon from '../../assets/edit-icon.svg';


const ProjectManagerTableLayout = ({ filterProject, selectedProjects, selectedProjectForSynergy, createSynergyStep, handleSelectProject, setIsDeleteConfirmPopupOpen, setDltId }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="project_page_table">
                <table>
                    <thead>
                        <tr>
                            <th>Project name</th>
                            <th className='center'>Team members</th>
                            <th className='center'>Image</th>
                            <th className='center'>Description</th>
                            <th className='center'>Synergies</th>
                            <th className='center'>Type</th>
                            <th className='center'>Status</th>
                            <th className='center'>Date</th>
                            <th className='center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterProject.map((rowData) => {
                                return (
                                    <tr key={rowData.projectId} className={`${rowData.isFeatured ? 'heighlighted' : ''} ${selectedProjects.includes(rowData.projectId) ? 'selected' : ''} ${selectedProjects.includes(rowData.projectId) && createSynergyStep >= 2 ? 'disable' : ''}`}>
                                        <td>
                                            <div className='table_name'>
                                                <div
                                                    className="costum_checkbox"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className='costum_checkbox_input'
                                                        checked={selectedProjects.includes(rowData.projectId) || selectedProjectForSynergy === rowData.projectId}
                                                        readOnly
                                                    />
                                                    <label
                                                        className='costum_checkbox_label'
                                                        onClick={() => handleSelectProject(rowData)}
                                                    ></label>
                                                </div>
                                                <span className='label'> {rowData.projectName}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='actor'>
                                                <ul>
                                                    {rowData?.teamMembers?.map((member, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <li
                                                                    id={`tooltip_team_member_${index}`}
                                                                >
                                                                    <CustomTooltip text={`${member.firstname} ${member.lastname}`} place='top' >
                                                                        <img src={member.profile_picture ? member.profile_picture : tableActorImage3} alt="" title={member.twitter} />
                                                                    </CustomTooltip>
                                                                </li>
                                                            </Fragment>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table_image">
                                                <img src={rowData.synergyImg === '' || !rowData.synergyImg ? defaultImg : rowData.synergyImg} alt=" " onError={(e) => e.target.src = defaultImg} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="description">
                                                <span>{rowData.description}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='table_angles'>

                                                {
                                                    rowData.synergiesAngles.slice(0, 3).map((Angle, index) => (
                                                        <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                                            <div className='angle_tag'>
                                                                <>{index === 0 && <div className='icon'><GredientGlobalIcon /></div>}</>
                                                                <>{index === 1 && <div className='icon'><GradientGraphIcon /></div>}</>
                                                                <span className='text'>
                                                                    <span>{Angle.label}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {rowData.synergiesAngles.length > 3 ?
                                                    <div className="angle_tag">
                                                        <span className='angle_tag_count'>+{rowData.synergiesAngles.length - 3}</span>
                                                    </div>
                                                    : ''}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='table_type'>
                                                {
                                                    rowData.type.map((type, index) => (
                                                        <div key={index} className='table_tag'>{type}</div>
                                                    ))
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status">
                                                {rowData.isFeatured ?
                                                    <div className="status_tabs">
                                                        <div className='status_tab'>
                                                            <TableStatusIcon />
                                                            <span>Featured</span>
                                                        </div>
                                                    </div>
                                                    : <span>{rowData.status}</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="date">{rowData.date}</div>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <button className='btn' onClick={() => {
                                                    navigate(`/project-manager/${rowData.projectId}`)
                                                }}>
                                                    <img src={editIcon} alt=" " />
                                                </button>
                                                <button className='btn' onClick={() => {
                                                    setIsDeleteConfirmPopupOpen(true);
                                                    setDltId(rowData.projectId)
                                                }}>
                                                    <img src={trashIcon} alt=" " />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="project_page_accordion">
                {
                    filterProject.map((rowData, index) => (
                        <ProjectAccordion
                            key={`${rowData.key}_${index}`}
                            projectName={rowData.projectName}
                            teamMembers={rowData?.teamMembers}
                            synergyImg={rowData.synergyImg}
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
                                setDltId(rowData.projectId)
                            }}
                            onEdit={() => {
                                navigate(`/project-manager/${rowData.projectId}`)
                            }}
                            onSelect={() => {
                                handleSelectProject(rowData)
                            }}
                        />))
                }
            </div>
        </>
    )
}

ProjectManagerTableLayout.propTypes = {
    filterProject: PropTypes.array.isRequired,
    selectedProjects: PropTypes.array.isRequired,
    selectedProjectForSynergy: PropTypes.string.isRequired,
    createSynergyStep: PropTypes.number.isRequired,
    handleSelectProject: PropTypes.func.isRequired,
    setIsDeleteConfirmPopupOpen: PropTypes.func.isRequired,
    setDltId: PropTypes.func.isRequired,
}

export default ProjectManagerTableLayout