import './projects.scss'
import searchIcon from "../../assets/search-icon.png"
import addIcon from "../../assets/add-icon.png"
import { GridIcon, ListIcon, TableStatusIcon, GredientGlobalIcon, GradientGraphIcon, InfiniteIcon } from '../../utils/SVGs/SVGs'
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
import { useState } from 'react';
import Select from "../../components/select/Select"

const tableData = [
    {
        key: 1,
        checked: true,
        projectName: 'Project 1581',
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor2,
            },
            {
                icon: tableActor3,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor2,
            },
            {
                icon: tableActor3,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor2,
            },
            {
                icon: tableActor3,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor2,
            },
            {
                icon: tableActor3,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor2,
            },
            {
                icon: tableActor3,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            }],
        creator: 'Joan of Arc',
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
        creatorImg: [
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            },
            {
                icon: tableActor1,
            }],
        creator: 'Joan of Arc',
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

const Projects = () => {
    const [activeLayout, setActiveLayout] = useState('TAB');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleActive = (key) => {
        setActiveLayout(key);
    }

    const handleFilterOpen = () => {
        setIsFilterOpen(!isFilterOpen);
    }

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
                            <button className={`btn_gray `} >
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
                    <div className="project_page_table_handler">
                        <div className="selected_count">
                            <div className="costum_checkbox">
                                <input type="checkbox" id='checkboxSelected' className='costum_checkbox_input' defaultChecked='checked' />
                                <label htmlFor='checkboxSelected' className='costum_checkbox_label'></label>
                            </div>
                            <span>
                                1 Selected
                            </span>
                        </div>
                        <div className="table_actions">
                            <button className="btn_cancle btn_gray">
                                <img src={closeIcon} alt="Add" />
                                <span>Cancel</span>
                            </button>
                            <button className="btn_featured btn_gray">
                                <TableStatusIcon />
                                <span>Add to Featured</span>
                            </button>
                            <button className="btn_create btn_gray">
                                <InfiniteIcon />
                                <span>Create synergy</span>
                            </button>
                            <button className="btn_delete ">
                                <img src={trashIcon} alt="Delete" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
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
                                    tableData.map((rowData) => {
                                        return (
                                            <tr key={rowData.key} className={`${rowData.isFeatured ? 'heighlighted' : ''} ${rowData.checked ? 'selected' : ''}`}>
                                                <td>
                                                    <div className='table_name'>
                                                        <div className="costum_checkbox">
                                                            <input type="checkbox" id={`tableName_${rowData.key}`} className='costum_checkbox_input' checked={rowData.checked} />
                                                            <label htmlFor={`tableName_${rowData.key}`} className='costum_checkbox_label'></label>
                                                        </div>
                                                        <span className='label'> {rowData.projectName}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='actor'>
                                                        <ul>
                                                            {rowData.creatorImg.map((Actor, index) => (
                                                                <li key={index}>
                                                                    <img src={Actor.icon} alt="" title="Alexander - Founder and CEO" />
                                                                </li>
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
                                                        <button className='btn'>
                                                            <img src={editIcon} alt=" " />
                                                        </button>
                                                        <button className='btn'>
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
                </div>
            </div>
        </>
    )
}

export default Projects
