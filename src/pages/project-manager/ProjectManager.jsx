import './projectManager.scss'
import searchIcon from "../../assets/search-icon.png"
import addIcon from "../../assets/add-icon.png"
import { GridIcon, ListIcon, TableStatusIcon, GredientGlobalIcon, GradientGraphIcon, InfiniteIcon, MoreIcon, AddCircleIcon, CLeseCircleIcon, GlobalIcon, DownAccordionIcon } from '../../utils/SVGs/SVGs'
import filterIcon from "../../assets/filter.svg";
import tableActorImage3 from "../../assets/avatar-3.jpg";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.png";
import closeIcon from "../../assets/X-icon.png";
import { Fragment, useCallback, useEffect, useState } from 'react';
import Select from "../../components/select/Select"
import ProjectAccordion from '../../components/project-accordion/ProjectAccordion';
import BottomMenu from '../../components/buttom-menu/BottomMenu';
import DeleteConfirmPopup from '../../components/popup/delete-confirm-popup/DeleteConfirmaPopup';
import { Tooltip } from 'react-tooltip';
import { getProjectsAPI, deleteProjectAPI, updateProjectAPI, getMemberApi } from '../../api-services/projectApis';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateSynergiesPopup from '../../components/popup/create-synergies-popup/CreateSynergiesPopup';
import ConfirmSynergiesPopup from '../../components/popup/confirm-senergies-popup/ConfirmSynergiesPopup';
import SynergieaCreatedSuccessfullyPopup from '../../components/popup/synergiea-created-successfully-popup/SynergieaCreatedSuccessfullyPopup';
import Loader from '../../components/loader/Loader';
import { createSynergyApi } from '../../api-services/synergyApi';
import { createGroupAPI, createUserAPI } from '../../api-services/chatApis';
import CustomTooltip from '../../components/customTooltip/CustomTooltip';
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';


const synergyAnglesOptions = [
    {
        label: 'Getting whitelist spots',
        value: 'Getting whitelist spots',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Giving whitelists spots',
        value: 'Giving whitelists spots',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Hosting AMAs',
        value: 'Hosting AMAs',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Integrating branded game assets',
        value: 'Integrating branded game assets',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Integrating your own branded assets',
        value: 'Integrating your own branded assets',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Getting early alpha',
        value: 'Getting early alpha',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Sharing early alpha',
        value: 'Sharing early alpha',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
]


const ProjectManager = () => {
    const [activeLayout, setActiveLayout] = useState('TAB');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false)
    const [selectedProjects, setSelectedProjects] = useState([])
    const [selectedProjectForSynergy, setSelectedProjectForSynergy] = useState(null);
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const [isMultiDltConfirmPopupOpen, setIsMultiDltConfirmPopupOpen] = useState(false);
    const [dltId, setDltId] = useState(null);
    const [filter, setFilter] = useState({
        synergyAngleValue: '',
        status: '',
        sortBy: '',
        type: '',
        searchBy: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.project.projects)
    const projectApiLoading = useSelector((state) => state.project.isLoading)

    const synergyApiLoading = useSelector((state) => state.synergies.isLoading)

    const [initialProject, setInitialProject] = useState([])
    const [filterProject, setFilterProject] = useState([])
    const [synergies, setSynergies] = useState({
        synergyName: '',
        projects: []
    });
    const [createSynergyStep, setCreateSynergyStep] = useState(0);
    const [projectCounter, setProjectCounter] = useState(0);
    const [createSynergySuccessPopup, setCreateSynergySuccessPopup] = useState(false);


    const formatDate = (date) => {
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
        })).then(() => {
            setIsDeleteConfirmPopupOpen(false);
            setDltId(null);
        })
    }

    const handleSelectProject = ({ projectId }) => {
        if (createSynergyStep === 0) {
            let tmpSelectedProjects = [...selectedProjects]
            const project = tmpSelectedProjects.find((item) => item === projectId)
            if (project) {
                tmpSelectedProjects = tmpSelectedProjects.filter((item) => item !== projectId)
            } else {
                tmpSelectedProjects.push(projectId)
            }
            setSelectedProjects([...tmpSelectedProjects])
        }
        else if (createSynergyStep === 2) {
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
                setSelectedProjectForSynergy(null)
            }
            else {
                setSelectedProjectForSynergy(projectId)
            }
        }
    }

    const handleSelectAllProjects = () => {
        if (selectedProjects.length === filterProject.length && filterProject.length !== 0) {
            setSelectedProjects([])
        } else {
            setSelectedProjects([
                ...filterProject.map((project) => project.projectId)
            ])
        }
    }

    const handleCancelSelection = () => {
        setSelectedProjects([])
    }

    const handleAddFeature = () => {
        let projects = [...data.filter((project) => {
            return selectedProjects.includes(project.project_id) && !project.featured;
        })]

        const resArr = projects.map((project) => {

            const data = {
                "projectId": project.project_id,
                "projectData": {
                    "featured": 1,
                }
            }
            return dispatch(updateProjectAPI(data));
        })

        Promise.allSettled(resArr).then(() => {
            setSelectedProjects([])
        })
    }

    const handleCreateSynergy = () => {
        setSelectedProjects([selectedProjects[0]]);
        setCreateSynergyStep(createSynergyStep + 1);
    }

    const handleSynergize = () => {
        setCreateSynergyStep(createSynergyStep + 1);
        let synergyName = '';
        let projects = [...data.filter((project) => {
            if (selectedProjects[0] === project.project_id || selectedProjectForSynergy === project.project_id) {
                if (synergyName === '') {
                    synergyName += project.project_name
                }
                else {
                    synergyName += ' X ' + project.project_name
                }
                return true;
            }
            return false
        })]
        setSynergies({
            ...synergies,
            synergyName: synergyName,
            groupName: synergyName,
            projects: projects
        })
    }

    const handleSynergy = (data) => {
        setSynergies(prevSynergies => ({
            ...prevSynergies,
            projects: prevSynergies.projects.map((project, index) => {
                if (index === projectCounter) {
                    const currentSynergy = project.synergy || Object.entries(synergies.projects[projectCounter].synergy_angles).map(([key, value]) => value);
                    const synergyExists = currentSynergy.some(item => item === data);
                    if (synergyExists) {
                        const updatedSynergy = currentSynergy.filter(item => item !== data);
                        return {
                            ...project,
                            synergy: updatedSynergy,
                        };
                    } else {
                        return {
                            ...project,
                            synergy: [...currentSynergy, data],
                        };
                    }
                }
                return project;
            }),
        }));
    };

    const handleSubmitSynergy = () => {
        const data = {
            "_project_id": synergies.projects[0]['project_id'],
            "project2_id": synergies.projects[1]['project_id'],
            "date": new Date().toISOString(),
            "synergy_name": synergies.synergyName,
            "synergy_angles": [...Object.entries(synergies.projects[0]['synergy_angles']).map((obj) => obj[1]), ...Object.entries(synergies.projects[1]['synergy_angles']).map((obj) => obj[1])],
            "price": 0,
            "synergy_image": synergies.projects[0]['image']
        }

        const users = []
        synergies.projects?.forEach((project) => {
            if (project.teamMembers) {
                project.teamMembers.forEach((member) => {
                    const exists = users.find((user) => user.id === member.id)
                    if (!exists) {
                        users.push({ ...member })
                    }
                })
            }
        })

        const groupData = {
            name: synergies.groupName,
            users: [...users.map((item) => item.id)]
        }

        dispatch(createSynergyApi(data)).then(async () => {
            try {
                const userPromises = users.map((user) => {
                    const payload = {
                        _id: user.id,
                        name: user.username,
                        email: user.email,
                        password: `${user.id}@@@${user.email}`,
                    }
                    return dispatch(createUserAPI(payload))
                })

                await Promise.allSettled(userPromises)

                dispatch(createGroupAPI(groupData)).then((res) => {
                    setCreateSynergyStep(0);
                    setProjectCounter(0);
                    setSynergies({
                        synergyName: '',
                        projects: []
                    })
                    setSelectedProjects([]);
                    setSelectedProjectForSynergy(null);
                    setCreateSynergySuccessPopup(true);

                    if (res?.error?.code === "ERR_BAD_REQUEST") {
                        throw new Error(res?.error);
                    }
                }).catch(() => {
                    toast.error("Synergy Not Created");
                })
            } catch (err) {
                console.error('err', err)
            }
        }).catch((err) => { console.error('err :>> ', err) });
    }


    const handleSearchChange = useCallback(
        debounce((value) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                searchBy: value,
            }));
        }, 500),
        []
    );


    useEffect(() => {
        let data = initialProject;
        if (filter.synergyAngleValue !== '') {
            const filterArr = data.filter((project) => {
                return project.synergiesAngles.findIndex((synergy) => {
                    return synergy.label === filter.synergyAngleValue;
                }) !== -1;
            });
            data = [...filterArr];
        }
        if (filter.status !== '') {
            const filterArr = data.filter((project) => {
                if (filter.status === 'Featured')
                    return project.isFeatured
                else {
                    return !project.isFeatured
                }
            })
            data = [...filterArr];
        }
        if (filter.type !== '') {
            const filterArr = data.filter((project) => {
                return project.type?.findIndex((typeVal) => typeVal === `#${filter.type}`) !== -1
            })
            data = [...filterArr];
        }
        if (filter.sortBy !== '') {
            if (filter.sortBy === 'name') {
                const filterArr = data.sort((project1, project2) => {
                    const projectName1 = project1.projectName.toLowerCase();
                    const projectName2 = project2.projectName.toLowerCase();

                    return projectName1.localeCompare(projectName2);
                });

                data = [...filterArr];
            }
            else if (filter.sortBy === 'date') {
                const filterArr = data.sort((project1, project2) => {
                    var date1 = project1.date.split('/').reverse().join();
                    var date2 = project2.date.split('/').reverse().join();
                    return date1 < date2 ? -1 : (date1 > date2 ? 1 : 0);
                });
                data = [...filterArr];
            }
            else if (filter.sortBy === 'description') {
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
                })
                data = [...filterArr];
            }
        }

        if (filter.searchBy !== '') {
            const searchKeyword = filter.searchBy.toLowerCase();
            data = data.filter((project) =>
                project.projectName.toLowerCase().includes(searchKeyword) ||
                project.description.toLowerCase().includes(searchKeyword)
            );
        }


        setFilterProject([...data])
    }, [filter])

    useEffect(() => {
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
                    teamMembers: project?.teamMembers ?? [],
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
        setInitialProject([...projectData])
        setFilterProject([...projectData])
    }, [data])

    useEffect(() => {
        if (data.length === 0)
            dispatch(getProjectsAPI()).then((res) => {
                if (res?.payload?.length > 0) {
                    res.payload.map((project) => {
                        dispatch(getMemberApi(project.project_id))
                    })
                }
            });
    }, [])


    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Projects Manager</h2>
                    <div className="search_box">
                        <img className="search_icon" src={searchIcon} alt="Search" />
                        <input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="project_page_data">
                <div className="page_data">
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
                                    Filters {Object.values(filter).filter(value => value !== '').length > 0 &&
                                        `(${Object.values(filter).filter(value => value !== '').length})`}<img src={filterIcon} alt=" " />
                                </button>
                                <button className={`btn_gray `} onClick={() => {
                                    navigate('/project-manager/add')
                                }}>
                                    Add New Project
                                    <img src={addIcon} alt="" />
                                </button>
                                {createSynergyStep < 2 ? <button className={`btn_gray ${createSynergyStep >= 1 ? 'active' : ''}`} onClick={() => {
                                    setCreateSynergyStep(createSynergyStep + 1)
                                }} disabled={!(createSynergyStep >= 1)}>
                                    Next Step
                                </button> : <button disabled={selectedProjectForSynergy === null} className={`btn_gray ${createSynergyStep >= 1 ? 'active' : ''}`} onClick={handleSynergize}>
                                    Synergize
                                </button>}
                            </div>
                        </div>
                        <div className={`project_page_filter ${isFilterOpen ? 'active' : ''}`}>
                            <div className="angels">
                                <Select
                                    options={synergyAnglesOptions}
                                    placeholder={'All synergies angles'}
                                    onChange={(value) => {
                                        setSelectedProjects([])
                                        if (value.value === 'All') {
                                            setFilter({
                                                ...filter,
                                                synergyAngleValue: ''
                                            })
                                        }
                                        else {
                                            setFilter({
                                                ...filter,
                                                synergyAngleValue: value.value
                                            })
                                        }
                                    }}
                                    showAllOption={true}
                                    allOptionText={"All synergies angles"}
                                />
                            </div>
                            <div className="type">
                                <Select
                                    options={[
                                        { label: 'GAME', value: 'GAME' },
                                        { label: 'AI', value: 'AI' },
                                        { label: 'hey', value: 'hey' },
                                    ]}
                                    onChange={(value) => {
                                        setSelectedProjects([])
                                        if (value.value === 'All') {
                                            setFilter({
                                                ...filter,
                                                type: ''
                                            })
                                        }
                                        else {
                                            setFilter({
                                                ...filter,
                                                type: value.value
                                            })
                                        }
                                    }}
                                    placeholder={'All project types'}
                                    showAllOption={true}
                                    allOptionText={"All project types"}
                                />
                            </div>
                            <div className="status">
                                <Select
                                    options={[
                                        { label: 'Featured', value: 'Featured' },
                                        { label: 'Non Featured', value: 'Non Featured' },
                                    ]}
                                    placeholder={'All Statuses'}
                                    onChange={(value) => {
                                        setSelectedProjects([])
                                        if (value.value === 'All') {
                                            setFilter({
                                                ...filter,
                                                status: ''
                                            })
                                        }
                                        else {
                                            setFilter({
                                                ...filter,
                                                status: value.value
                                            })
                                        }
                                    }}
                                    showAllOption={true}
                                    allOptionText={"All Statuses"}
                                />
                            </div>
                            <div className="sort">
                                <Select
                                    options={[
                                        { label: 'Project Name', value: 'name' },
                                        { label: 'Description', value: 'description' },
                                        { label: 'Date', value: 'date' },
                                    ]}
                                    placeholder={'Sort by'}
                                    onChange={(value) => {
                                        setSelectedProjects([])
                                        setFilter({
                                            ...filter,
                                            sortBy: value.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="project_page_body">
                        {/* {(selectedProjects.length > 0 && !(createSynergyStep >= 1)) && */}
                        <div className={`project_page_table_handler ${(!(createSynergyStep >= 1)) > 0 ? 'active' : ''}`}>
                            <div className="selected_count">
                                <div className="costum_checkbox">
                                    <input
                                        type="checkbox"
                                        id='checkboxSelected'
                                        className='costum_checkbox_input'
                                        checked={selectedProjects.length === filterProject.length && filterProject.length !== 0}
                                        readOnly
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

                            {selectedProjects.length > 0 && (
                                <>
                                    <div className="table_actions">
                                        <button className="btn_cancle btn_gray" onClick={handleCancelSelection}>
                                            <img src={closeIcon} alt="Add" />
                                            <span>Cancel</span>
                                        </button>
                                        <button className="btn_featured btn_gray" onClick={() => {
                                            handleAddFeature()
                                        }}>
                                            <TableStatusIcon />
                                            <span>Add to Featured</span>
                                        </button>
                                        <button className="btn_create btn_gray" onClick={() => {
                                            handleCreateSynergy();
                                        }}>
                                            <InfiniteIcon />
                                            <span>Create synergy</span>
                                        </button>
                                        <button className="btn_delete" onClick={() => {
                                            setIsMultiDltConfirmPopupOpen(true);
                                        }}>
                                            <img src={trashIcon} alt="Delete" />
                                            <span>Delete</span>
                                        </button>
                                    </div>

                                    <div className="table_actions_button">
                                        <button className="button_delete " onClick={() => {
                                            setIsMultiDltConfirmPopupOpen(true);
                                        }}>
                                            <img src={trashIcon} alt="Delete" />
                                        </button>
                                        <button className="menu_button" onClick={() => setIsBottomMenuOpen(true)}>
                                            <MoreIcon />
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                        {/* } */}

                        {activeLayout === 'LAYOUT' && <div className='card_container'>

                            {
                                filterProject.map((rowData, index) => {
                                    return (
                                        <div key={index} className="card">
                                            <div className="card_image">
                                                <img src={rowData.synergyImg} alt=" " />
                                            </div>
                                            <div className="card_body">
                                                <div className="name">
                                                    {rowData.projectName} </div>

                                                <div className='description'>
                                                    {rowData.description}

                                                </div>
                                                <div className="tabs">
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

                                                <div className='tabs'>
                                                    {
                                                        rowData.type.map((type, index) => (
                                                            <div key={index} className='angle_tag'>
                                                                <span className='text'>
                                                                    <span>{type}</span>
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>



                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>}

                        {activeLayout === 'TAB' &&
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
                                                                                    <CustomTooltip text={member.twitter}>
                                                                                        <img src={member.profile_picture ? member.profile_picture : tableActorImage3} alt="" title="Alexander - Founder and CEO" />
                                                                                    </CustomTooltip>
                                                                                </li>
                                                                                {/* <Tooltip
                                                                                place="top"
                                                                                style={{
                                                                                    maxWidth: '500px',
                                                                                    boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                                                    background: 'rgba(79, 79, 79, 1)',
                                                                                    opacity: '1',
                                                                                }}
                                                                                anchorSelect={`#tooltip_team_member_${index}`}
                                                                            >
                                                                                {member.twitter}
                                                                            </Tooltip> */}
                                                                            </Fragment>
                                                                        )
                                                                    })}
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
                        }

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
                handleDelete={() => handleDelete(dltId)}
                isLoading={projectApiLoading && isDeleteConfirmPopupOpen}
            />
            <DeleteConfirmPopup
                title='Are You Sure ?'
                description={`After once a delete project can't be recover...`}
                open={isMultiDltConfirmPopupOpen}
                handleClose={() => {
                    setIsMultiDltConfirmPopupOpen(false);
                }}
                handleDelete={() => {
                    dispatch(deleteProjectAPI({
                        "projectIds": [
                            ...selectedProjects
                        ]
                    })).then(() => {
                        setSelectedProjects([])
                    })
                    setIsMultiDltConfirmPopupOpen(false);
                }}
            />
            <CreateSynergiesPopup
                open={createSynergyStep >= 3}
                title={createSynergyStep === 3 ? 'Create Synergy' :
                    createSynergyStep === 3 ? synergies.projects[projectCounter]['project_name'] :
                        createSynergyStep === 4 ? 'Edit synergy angles' :
                            createSynergyStep === 5 ? 'Confirm Synergy' : ''}
                onClose={() => {
                    setCreateSynergyStep(0);
                    setProjectCounter(0);
                    setSynergies({
                        synergyName: '',
                        projects: []
                    })
                    setSelectedProjects([]);
                    setSelectedProjectForSynergy(null);
                }}
                body={
                    <>
                        {
                            createSynergyStep === 3 && <>
                                <div className="form_group">
                                    <label htmlFor="projectName">Create synergy name</label>
                                    <input type="text" id="projectName" placeholder="Ex. Synergy 1581" value={synergies.synergyName} onChange={(e) => setSynergies({ ...synergies, synergyName: e.target.value })} />
                                </div>
                            </>
                        }

                        {createSynergyStep === 4 && <>
                            <div className='model_body'>
                                <div className="model_data">
                                    <div className="image">
                                        <img src={synergies.projects[projectCounter].image} alt="" />
                                    </div>
                                    <div className={`page active`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Synergy angles </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="angels_container">
                                                {(synergies.projects[projectCounter] && synergies.projects[projectCounter].synergy_angles) && (
                                                    Object.entries(synergies.projects[projectCounter].synergy_angles).map(([key, value]) => (
                                                        <div key={key} className='angel_tab'>
                                                            <input
                                                                type="checkbox"
                                                                defaultChecked={
                                                                    synergies.projects[projectCounter]?.synergy ?
                                                                        synergies.projects[projectCounter]?.synergy?.some((value) => value === value) :
                                                                        Object.entries(synergies.projects[projectCounter]?.synergy_angles).some(([value]) => value === value)
                                                                }
                                                                name="angleName"
                                                                id={`angle1+${key}`}
                                                                className='checkbox_input'
                                                            />
                                                            <label htmlFor={`angle1+${key}`} className='checkbox_label' onClick={() => handleSynergy(value)}>
                                                                <div className="checkbox_label_text">
                                                                    <GlobalIcon />
                                                                    <span className='checkbox_label_text_head'>{value}</span>
                                                                </div>
                                                                <div className="angel_add">
                                                                    <AddCircleIcon />
                                                                </div>
                                                                <div className="angel_remove">
                                                                    <CLeseCircleIcon />
                                                                </div>
                                                            </label>
                                                        </div>
                                                    ))
                                                )}
                                                {/* {synergies.projects[projectCounter].synergy_angles.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" checked={synergies.projects[projectCounter]?.synergy?.some(synergy => synergy.id === data.id) || false} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' />
                                                        <label htmlFor={`angle1+${data.id}`} className='checkbox_label' onClick={() => handleSynergy(data)}>
                                                            <div className="checkbox_label_text" >
                                                                <GlobalIcon />
                                                                <span className='checkbox_label_text_head'>{data.name}</span>
                                                            </div>
                                                            <div className="angel_add">
                                                                <AddCircleIcon />
                                                            </div>
                                                            <div className="angel_remove" >
                                                                <CLeseCircleIcon />
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}

                        {createSynergyStep === 5 &&
                            <>
                                <div className="confirm_synergies_data_body">
                                    {synergies.projects.map((data, index) => (
                                        <div className='accordion' key={index}>
                                            <input className='accordion_input' type="checkbox" id={`angle_+${index}`} />
                                            <label className='accordion_label' htmlFor={`angle_+${index}`}>
                                                <div className="header">
                                                    <span>{data.project_name}</span>
                                                    <DownAccordionIcon />
                                                </div>
                                            </label>

                                            <div className='accordion_content'>
                                                <div className="header_name">Synergy angles</div>
                                                <div className="checkboxs">
                                                    {data?.synergy ? data?.synergy?.map((item, index) => {
                                                        return (
                                                            <span className='checkbox_angles' key={index}>
                                                                <input checked={true} type="checkbox" name="angleName" id={`angles_+${index}`} className='checkbox_input' />
                                                                <label htmlFor={`angles_+${index}`} className='checkbox_label' ><GlobalIcon />{item} </label>
                                                            </span>
                                                        )
                                                    }) : Object.entries(synergies.projects[index].synergy_angles).map(([key, value], index) => {
                                                        return (
                                                            <span className='checkbox_angles' key={key}>
                                                                <input checked={true} type="checkbox" name="angleName" id={`angles_+${index}`} className='checkbox_input' />
                                                                <label htmlFor={`angles_+${index}`} className='checkbox_label' ><GlobalIcon />{value} </label>
                                                            </span>
                                                        )
                                                    })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                            </>
                        }
                    </>

                }
                footer={
                    <>
                        {createSynergyStep === 3 && <>
                            <button className='refuse_btn' onClick={() => {
                                setCreateSynergyStep(createSynergyStep - 1);
                            }}>Refuse</button>
                            <button className='next_btn' onClick={() => {
                                setCreateSynergyStep(createSynergyStep + 1);
                            }}>Next project</button>
                        </>}
                        {
                            createSynergyStep === 4 && <>
                                <button className='refuse_btn' onClick={() => {
                                    if (projectCounter === 0) {
                                        setCreateSynergyStep(3);
                                    }
                                    else {
                                        setProjectCounter(projectCounter - 1);
                                    }
                                }}>Back</button>
                                <div className='project_counter'>
                                    {projectCounter + 1}/{synergies.projects.length}
                                </div>
                                <button className='next_btn' onClick={() => {
                                    if (projectCounter === synergies.projects.length - 1) {
                                        setCreateSynergyStep(5);
                                    } else {
                                        setProjectCounter(projectCounter + 1);
                                    }
                                }}>{projectCounter === synergies.projects.length - 1 ? "Confirm" : 'Next project'}</button>
                            </>
                        }
                        {
                            createSynergyStep === 5 && <>
                                <button className='refuse_btn' onClick={() => {
                                    setCreateSynergyStep(4);
                                }}>Back</button>
                                <button className='next_btn' onClick={() => {
                                    handleSubmitSynergy()
                                }} disabled={synergyApiLoading}>

                                    {
                                        (synergyApiLoading) ? <> <Loader loading={synergyApiLoading} isItForbutton={true} /> <p>Create synergy </p> </> : 'Create synergy '
                                    }

                                </button>
                            </>
                        }
                    </>
                }
            />
            <SynergieaCreatedSuccessfullyPopup
                open={createSynergySuccessPopup}
                handleClose={() => {
                    setCreateSynergySuccessPopup(false);
                }}
            />
            < ConfirmSynergiesPopup
                open={false}
            />

            <BottomMenu
                open={isBottomMenuOpen}
            >
                <button onClick={() => {
                    handleCancelSelection()
                    setIsBottomMenuOpen(false)
                }}>
                    <img src={closeIcon} alt="Add" />
                    <span>Cancel</span>
                </button>
                <button onClick={() => {
                    handleAddFeature()
                    setIsBottomMenuOpen(false);
                }}>
                    <TableStatusIcon />
                    Add to Featured
                </button>
                <button onClick={() => {
                    handleCreateSynergy();
                    setIsBottomMenuOpen(false);
                }}>
                    <InfiniteIcon />
                    <span>Create synergy</span>
                </button>
                <button onClick={() => {
                    setIsMultiDltConfirmPopupOpen(true);
                    setIsBottomMenuOpen(false);
                }}>
                    <img src={trashIcon} alt="Delete" />
                    <span>Delete</span>
                </button>

            </BottomMenu>

            <Loader loading={projectApiLoading} />
        </>
    )
}

export default ProjectManager
