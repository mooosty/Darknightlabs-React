import { useState } from 'react';
import './projectAccordion.scss';
import PropTypes from 'prop-types';
import { defaultImg, DownIcon, editIcon, GlobalIcon, GradientGraphIcon, GredientGlobalIcon, tableActorImage3, TableStatusIcon, DeleteIcon } from '../../utils/constants/images';

const ProjectAccordion = ({
    role,
    projectName,
    teamMembers,
    synergyImg,
    description,
    synergiesAngles = [],
    type,
    status,
    isFeatured,
    checked,
    disabled,
    date,
    onEdit = () => { },
    onDelete = () => { },
    onSelect = () => { },
}) => {
    const [open, setOpen] = useState(false);

    const handleDelete = (e) => {
        e.stopPropagation()
        onDelete()
    }

    const handleEdit = (e) => {
        onEdit()
        e.stopPropagation()
    }


    return (
        <>
            <div
                className={`project_accordion_conrtainer ${open ? 'active' : ''} ${disabled ? 'disable' : ''}`}
            >
                <div className={`project_accordion ${isFeatured ? 'highlighted' : ''} ${checked ? 'selected' : ''} `}>
                    <div className='project_accordion_label' >
                        <div className="table_row">
                            <div className='content'>
                                <div className='left'>
                                    <div>
                                        <div className="costum_checkbox">
                                            <input type="checkbox" checked={checked} className='costum_checkbox_input' readOnly />
                                            <label className='costum_checkbox_label' onClick={() => onSelect()}></label>
                                        </div>
                                    </div>
                                    <DownIcon className='table_arrow' onClick={() => setOpen(!open)} />
                                    <div className="creator_img">
                                        <img src={synergyImg === '' || !synergyImg ? defaultImg : synergyImg} alt="" onError={(e) => e.target.src = defaultImg} />
                                    </div>
                                    <div className="table_name">{projectName}</div>
                                </div>
                                <div className="content_center">
                                    <div className='center'>
                                        <div className='creator'>
                                            <ul>
                                                {teamMembers?.map((member, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            id={`tooltip_team_member_${index}`}
                                                        >
                                                            <img src={member.profile_picture ? member.profile_picture : tableActorImage3} alt="" title="Alexander - Founder and CEO" />

                                                        </li>
                                                    )
                                                })}
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
                                    <DeleteIcon />
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
                                        {teamMembers?.map((member, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    id={`tooltip_team_member_${index}`}
                                                >
                                                    <img src={member.profile_picture ? member.profile_picture : tableActorImage3} alt="" title="Alexander - Founder and CEO" />

                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="data_container">
                                <span className='label'>Type:</span>
                                <div className='type'>
                                    {type.map((type, index) => (
                                        <div key={index} className='table_tag'>{type}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="data_container">
                                <span className='label'>Role:</span>
                                <div className='type'>
                                   
                                        <div  className='table_tag'>{role}</div>
                              
                                </div>
                            </div>
                            <div className="data_container angel_container">
                                <span className='label'>Angels:</span>
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
        </>
    )
}

ProjectAccordion.propTypes = {
    role: PropTypes.string,
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
    onSelect: PropTypes.func,
    isFeatured: PropTypes.number,
    checked: PropTypes.bool,
    disabled: PropTypes.bool
}

export default ProjectAccordion
