import './projectAccordion.scss';
import PropTypes from 'prop-types';
import trashIcon from "../../assets/trash-icon.png";
import editIcon from "../../assets/edit-icon.svg";
import { DownIcon, GlobalIcon, GradientGraphIcon, GredientGlobalIcon, TableStatusIcon } from '../../utils/SVGs/SVGs';
import { useState } from 'react';
import DeleteConfirmPopup from '../popup/delete-confirm-popup/DeleteConfirmaPopup';


const ProjectAccordion = ({
    projectName,
    teamMembers,
    synergyImg,
    description,
    synergiesAngles = [],
    type,
    status,
    isFeatured,
    checked,
    date,
    onEdit = () => { },
    onDelete = () => { },
}) => {
    const id = Math.round(Math.random() * 1000)
    const [open, setOpen] = useState(false);
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    
    const handleDelete = (e) => {
        e.stopPropagation()
        setIsDeleteConfirmPopupOpen(true)
    }

    const handleEdit = (e) => {
        onEdit()
        e.stopPropagation()
    }


    return (
        <>
            <div
                className={`project_accordion_conrtainer ${open ? 'active' : ''}`}
            >
                <div className={`project_accordion ${isFeatured ? 'heighlighted' : ''} ${checked ? 'selected' : ''}`}>
                    <div className='project_accordion_label' >
                        <div className="table_row">
                            <div className='content'>
                                <div className='left'>
                                    <div>
                                        <div className="costum_checkbox">
                                            <input type="checkbox" id={`checkbox_${id}`} className='costum_checkbox_input' />
                                            <label htmlFor={`checkbox_${id}`} className='costum_checkbox_label'></label>
                                        </div>
                                    </div>
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="creator_img">
                                        <img src={synergyImg} alt="" />
                                    </div>
                                    <div className="table_name">{projectName}</div>
                                </div>
                                <div className="content_center">
                                    <div className='center'>
                                        <div className='creator'>
                                            <ul>
                                                {teamMembers.map((Actor, index) => (
                                                    <li key={index}>
                                                        <img src={Actor.icon} alt="" title="Alexander - Founder and CEO" />
                                                    </li>
                                                ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='right'>
                                        <div className="status">
                                            {isFeatured ?
                                                <div className="status_tabs">
                                                    <div className='status_tab'>
                                                        <TableStatusIcon />
                                                        <span>Featured</span>
                                                    </div>
                                                </div>
                                                : <span>{status}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <button className='delete_btn' onClick={handleDelete}>
                                    <img src={trashIcon} alt=" " />
                                </button>
                                <button onClick={handleEdit}>
                                    <img src={editIcon} alt=" " />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="accordion_content">
                        <div className="table_data">
                            <div className="data_container">
                                <span className='label'>Date:</span>
                                <div className='date'>
                                    {date}
                                </div>
                            </div>
                            <div className="data_container creator_container">
                                <span className='label'>Members:</span>
                                <div className='creator'>
                                    <ul>
                                        {teamMembers.map((Actor, index) => (
                                            <li key={index}>
                                                <img src={Actor.icon} alt="" title="Alexander - Founder and CEO" />
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="data_container">
                                <span className='label'>Type:</span>
                                <div className='type'>
                                    {type.map((type, index) => (
                                        <div key={index} className='table_tag'>
                                            {type}
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                            <div className="data_container angel_container">
                                <span className='label'>Angles:</span>
                                <div className='angle'>
                                    {synergiesAngles && synergiesAngles.slice(0, 3).map((data, index) => (
                                        <div className={`${index === 0 ? 'global' : (index === 1 ? 'graph' : '')}`} key={index}>
                                            <div className=' angle_tag'>
                                                <>{index === 0 && <GredientGlobalIcon />}</>
                                                <>{index === 1 && <GradientGraphIcon />}</>
                                                <>{index > 1 && <GlobalIcon />}</>
                                                <span className='text'>
                                                    <span>{data.label}</span>
                                                </span>
                                            </div>

                                        </div>
                                    ))}
                                    {synergiesAngles.length > 3 ?
                                        <div className="angle_tag">
                                            <span className='angle_tag_count'>+{synergiesAngles.length - 3}</span>
                                        </div>
                                        : ''}
                                </div>
                            </div>
                            <div className="data_container description_container">
                                <span className='label'>Description:</span>
                                <div className='description'>
                                    <span>{description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmPopup
                open={isDeleteConfirmPopupOpen}
                handleClose={() => setIsDeleteConfirmPopupOpen(false)}
                handleDelete={onDelete}
            />
        </>
    )
}

ProjectAccordion.propTypes = {
    projectName: PropTypes.string,
    teamMembers: PropTypes.array,
    synergyImg: PropTypes.any,
    description: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    synergiesAngles: PropTypes.array,
    type: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    isFeatured: PropTypes.bool,
    checked: PropTypes.bool,

}

export default ProjectAccordion
