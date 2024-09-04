import './projectManager.scss'
import searchIcon from "../../assets/search-icon.png"
import addIcon from "../../assets/add-icon.png"
import { GridIcon, ListIcon, TableStatusIcon, GredientGlobalIcon, GradientGraphIcon, InfiniteIcon, MoreIcon } from '../../utils/SVGs/SVGs'
import filterIcon from "../../assets/filter.svg";
import tableActor1 from "../../assets/tableActorImage.jpg";
import tableActor2 from "../../assets/tableActorImage1.jpg";
import tableActor3 from "../../assets/tableActorImage2.jpg";
import tableActorImage1 from "../../assets/avatar-1.jpg";
import tableActorImage2 from "../../assets/avatar-2.jpg";
import tableActorImage3 from "../../assets/avatar-3.jpg";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.png";
import closeIcon from "../../assets/X-icon.png";
import { useEffect, useState } from 'react';
import Select from "../../components/select/Select"
import ProjectAccordion from '../../components/project-accordion/ProjectAccordion';
import ButtomMenu from '../../components/buttom-menu/ButtomMenu';
import DeleteConfirmPopup from '../../components/popup/delete-confirm-popup/DeleteConfirmaPopup';
import { Tooltip } from 'react-tooltip';
import { getProjectsAPI, deleteProjectAPI } from '../../api-services/projectApis';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFeature } from '../../store/slice/projectSlice';


const tableData = [
    {
        key: 1,
        checked: true,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor2,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor3,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage1,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        isFeatured: true,
        date: '12/12/2024',
        disabled: false
    },
    {
        key: 2,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor2,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor3,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage2,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        status: 'Default',
        date: '12/12/2024',
    },
    {
        key: 3,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage3,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        isFeatured: true,
        date: '12/12/2024',
    },
    {
        key: 4,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor2,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor3,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage1,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        isFeatured: true,
        date: '12/12/2024',
    },
    {
        key: 5,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor2,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor3,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage2,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        status: 'Default',
        date: '12/12/2024',
    },
    {
        key: 6,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage3,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        status: 'Default',
        date: '12/12/2024',
    },
    {
        key: 7,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor2,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor3,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage3,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        status: 'Default',
        date: '12/12/2024',
    },
    {
        key: 8,
        projectName: 'Project 1581',
        teamMembers: [
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            },
            {
                icon: tableActor1,
                tooltip: 'Alexander - Founder and CEO'
            }],
        synergyImg: tableActorImage2,
        description: 'Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
        synergiesAngles: [
            {
                label: 'IP integration',
            },
            {
                label: 'Hosting AMAS',
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            },
            {
                label: 'Angle48'
            }],
        type: ['🌐 #Metaverse', '🤖 #AI', '👾 #Gaming'],
        status: 'Default',
        date: '12/12/2024',
    }
]

const ProjectManager = () => {
    const [activeLayout, setActiveLayout] = useState('TAB');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false)
    const [selectedProjects, setSelectedProjects] = useState([])
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const [dltId,setDltId]=useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.project.projects)
    console.log('data :>> ', data);
    const projectData = [
        ...data.map((project, index) => {
            let tags = project.project_info?.split('#') || [];
            tags = tags.filter(tag => tag).map(tag => `#${tag}`);

            let synergy_angles = Object.keys(project.synergy_angles)
                .map(key => project.synergy_angles[key] ? { label: project.synergy_angles[key] } : null)
                .filter(item => item);

            const row = {
                key: index,
                checked: false,
                projectName: project.project_name,
                teamMembers: [
                ],
                synergyImg: project.image ?? '',
                synergiesAngles: synergy_angles,
                type: tags,
                isFeatured: project.featured,
                date: formatDate(project.date),
                disabled: false,
                description: project.description,
                projectId: project.project_id,
            }
            return row;
        })
    ]

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }

    const handleActive = (key) => {
        setActiveLayout(key);
    }

    const handleFilterOpen = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const handleDelete = (projectId) => {
        dispatch(deleteProjectAPI({
            "projectIds": [
                projectId
            ]
        })).then(()=>{
            console.log('suCcess :>> ', );
            setIsDeleteConfirmPopupOpen(false);
            setDltId(null);
        })
    }

    const handleSelectProject = ({ projectId }) => {
        let tmpSelectedProjects = [...selectedProjects]
        const project = tmpSelectedProjects.find((item) => item === projectId)
        if (project) {
            tmpSelectedProjects = tmpSelectedProjects.filter((item) => item !== projectId)
        } else {
            tmpSelectedProjects.push(projectId)
        }
        setSelectedProjects([...tmpSelectedProjects])
    }

    const handleSelectAllProjects = () => {
        if (selectedProjects.length === projectData.length && projectData.length !== 0) {
            setSelectedProjects([])
        } else {
            setSelectedProjects([
                ...projectData.map((project) => project.projectId)
            ])
        }
    }

    const handleCancelSelection = () => {
        setSelectedProjects([])
    }

    useEffect(() => {
        if (data.length === 0)
            dispatch(getProjectsAPI());
    }, [])

    // console.log('selectedProjects', selectedProjects)
    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Projects Manager</h2>
                    <div className="search_box">
                        <img className="search_icon" src={searchIcon} alt="Search" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="project_page_data">
                <div className="project_page_header">
                    <div className="project_page_header_top">
                        <div className="project_pagination">
                            <button className={`project_pagination_btn ${activeLayout === 'TAB' ? 'active' : ''}`} onClick={() => handleActive('TAB')} >
                                <ListIcon />
                            </button>
                            <button className={`project_pagination_btn ${activeLayout === 'LAYOUT' ? 'active' : ''}`} onClick={() => handleActive('LAYOUT')} >
                                <GridIcon />
                            </button>
                        </div>
                        <div className='project_page_header_button'>
                            <button
                                className="btn_gray btn_filter"
                                onClick={handleFilterOpen}
                            >
                                Filters <img src={filterIcon} alt=" " />
                            </button>
                            <button className={`btn_gray `} onClick={()=>{
                                navigate('/project-manager/ADD')
                            }}>
                                Add New Project
                                <img src={addIcon} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className={`project_page_filter ${isFilterOpen ? 'active' : ''}`}>
                        <div className="angels">
                            <Select
                                options={[
                                    { label: 'Project 1581', value: 'Project 1581' },
                                ]}
                                placeholder={'All synergies angles'}
                            />
                        </div>
                        <div className="project">
                            <Select
                                options={[
                                    { label: 'Gaming', value: 'Gaming' },
                                    { label: 'AI', value: 'AI' },
                                    { label: 'Metaverse', value: 'Metaverse' },
                                ]}
                                placeholder={'All project types'}
                            />
                        </div>
                        <div className="sort">
                            <Select
                                options={[
                                    { label: 'Status', value: 'Status' },
                                    { label: 'Date', value: 'Date' },
                                ]}
                                placeholder={'Sort by'}
                            />
                        </div>
                    </div>
                </div>
                <div className="project_page_body">
                    {selectedProjects.length > 0 && <div className="project_page_table_handler">
                        <div className="selected_count">
                            <div className="costum_checkbox">
                                <input
                                    type="checkbox"
                                    id='checkboxSelected'
                                    className='costum_checkbox_input'
                                    checked={selectedProjects.length === projectData.length && projectData.length !== 0}
                                />
                                <label
                                    htmlFor='checkboxSelected'
                                    className='costum_checkbox_label'
                                    onClick={handleSelectAllProjects}
                                ></label>
                            </div>
                            <span>
                                {selectedProjects.length} Selected
                            </span>
                        </div>
                        <div className="table_actions">
                            <button className="btn_cancle btn_gray" onClick={handleCancelSelection}>
                                <img src={closeIcon} alt="Add" />
                                <span>Cancel</span>
                            </button>
                            <button className="btn_featured btn_gray" onClick={()=>{
                                dispatch(addFeature(selectedProjects))
                            }}>
                                <TableStatusIcon />
                                <span>Add to Featured</span>
                            </button>
                            <button className="btn_create btn_gray">
                                <InfiniteIcon />
                                <span>Create synergy</span>
                            </button>
                            <button className="btn_delete " onClick={() => {
                                dispatch(deleteProjectAPI({
                                    "projectIds": [
                                        ...selectedProjects
                                    ]
                                }))
                            }}>
                                <img src={trashIcon} alt="Delete" />
                                <span>Delete</span>
                            </button>
                        </div>

                        <div className="table_actions_button">
                            <button className="button_delete ">
                                <img src={trashIcon} alt="Delete" />
                            </button>
                            <button className="menu_button" onClick={() => setIsBottomMenuOpen(true)}>
                                <MoreIcon />
                            </button>
                        </div>
                    </div>}

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
                                    projectData.map((rowData) => {
                                        return (
                                            <tr key={rowData.projectId} className={`${rowData.isFeatured ? 'heighlighted' : ''} ${selectedProjects.includes(selectedProjects.projectId) ? 'selected' : ''}`}>
                                                <td>
                                                    <div className='table_name'>
                                                        <div
                                                            className="costum_checkbox"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className='costum_checkbox_input'
                                                                checked={selectedProjects.includes(rowData.projectId)}
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
                                                            {rowData.teamMembers.map((member, index) => (
                                                                <>
                                                                    <li
                                                                        key={index}
                                                                        id={`tooltip_team_member_${index}`}
                                                                    >
                                                                        <img src={member.icon} alt="" title="Alexander - Founder and CEO" />
                                                                    </li>
                                                                    <Tooltip
                                                                        place="top"
                                                                        style={{
                                                                            maxWidth: '500px',
                                                                            boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                                            background: 'rgba(79, 79, 79, 1)',
                                                                            opacity: '1',
                                                                        }}
                                                                        anchorSelect={`#tooltip_team_member_${index}`}
                                                                    >
                                                                        {member.tooltip}
                                                                    </Tooltip>
                                                                </>
                                                            ))
                                                            }
                                                        </ul>

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table_image">
                                                        <img src={rowData.synergyImg} alt=" " />
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
                                                                    <div className=' angle_tag'>
                                                                        <>{index === 0 && <GredientGlobalIcon />}</>
                                                                        <>{index === 1 && <GradientGraphIcon />}</>
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
                            projectData.map((rowData) => (
                                <ProjectAccordion
                                    key={rowData.key}
                                    projectName={rowData.projectName}
                                    teamMembers={rowData.teamMembers}
                                    synergyImg={rowData.synergyImg}
                                    description={rowData.description}
                                    type={rowData.type}
                                    status={rowData.status}
                                    synergiesAngles={rowData.synergiesAngles}
                                    date={rowData.date}
                                    isFeatured={rowData.isFeatured}
                                    checked={rowData.checked}
                                    onDelete={() => {
                                        handleDelete(rowData.projectId)
                                    }}
                                    onEdit={() => {
                                        navigate(`/project-manager/${rowData.projectId}`)
                                    }}
                                />))
                        }
                    </div>
                </div>
            </div>
            <DeleteConfirmPopup
                title='Are You Sure ?'
                description={`After once a delete project can't be recover...`}
                open={isDeleteConfirmPopupOpen}
                handleClose={() => {
                    setIsDeleteConfirmPopupOpen(false);
                    setDltId(null);
                }}
                handleDelete={()=> handleDelete(dltId)}
            />
            <ButtomMenu
                open={isBottomMenuOpen}
                handleClose={() => setIsBottomMenuOpen(false)}
            />
        </>
    )
}

export default ProjectManager
