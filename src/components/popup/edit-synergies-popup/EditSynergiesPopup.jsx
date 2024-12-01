import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import angelBg from '../../../assets/edit-senergies-hero-image.png'
import './EditSynergiesPopup.scss';
import Multiselect from '../../multiselect/Multiselect';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsAPI } from '../../../api-services/projectApis';

const EditSynergiesPopup = ({ open, handleClose, synergy, onSave = () => { } }) => {
    // open = true
    const projects = useSelector((state) => state.project.projects)
    const [synergyName, setSynergyName] = useState('');
    const [selectedProject, setSelectedProject] = useState([]);
    const dispatch = useDispatch();

    const handleSaveChanges = () => {
        onSave({
            synergyName: synergyName,
            selectedProject: selectedProject
        })
    }


    const handleSelectProjectChange = (value) => {
        if (selectedProject.includes(value)) {
            setSelectedProject([...selectedProject.filter((project_id) => project_id !== value)])
        }
        else {
            if (selectedProject.length < 2)
                setSelectedProject([...selectedProject, value]);
        }
    }

    useEffect(() => {
        if (open) {
            if (projects.length === 0) {
                dispatch(getProjectsAPI());
            }
            setSynergyName(synergy?.synergyName);
            setSelectedProject([...synergy.projects])
        }
    }, [open, synergy])


    return (
        <>
            <div className={`edit_synergies_model_bg ${open ? 'active' : ''} `}>
                <div className={`edit_synergies_popup`} >
                    <div className='edit_synergies_model_box'>
                        <div className="edit_synergies_model_body_container">
                            <div className='edit_synergies_model_body'>
                                <div className='edit_synergies_model_header'>
                                    <h3>Edit synergy</h3>
                                    <button
                                        className='close'
                                        onClick={() => {
                                            handleClose()
                                        }}
                                    >
                                        <img src={closeIcon} alt="close" />
                                    </button>
                                </div>
                                <div className="edit_synergies_model_data">
                                    <div className="image">
                                        <img src={angelBg} alt="" />
                                    </div>
                                    <div className="angel_model_data_head">
                                        <div className="title">{synergy?.synergyName}</div>
                                    </div>
                                    <div className="angel_model_data_body">

                                        <div className="angels_container">
                                            <div className="synergirs_name">
                                                <label htmlFor="synergiesName">
                                                    <span className="title">Synergy Name </span>
                                                </label>
                                                <input type="text" value={synergyName} id="synergiesName" placeholder='Synergy Name' onChange={(e) => setSynergyName(e.target.value)} />
                                            </div>

                                            <div className="synergirs_project">
                                                <label htmlFor="synergiesName">
                                                    <span className="title">Projects </span>
                                                </label>

                                                <div className="synergirs_project_select">
                                                    <Multiselect
                                                        options={[
                                                            ...projects.map((project) => {
                                                                return {
                                                                    label: project.project_name,
                                                                    value: project.project_id
                                                                }
                                                            })
                                                        ]}
                                                        placeholder={'Select'}
                                                        value={
                                                            projects.filter((project) => {
                                                                return selectedProject?.includes(project.project_id);
                                                            })?.map((data) => ({
                                                                label: data.project_name,
                                                                value: data.project_id
                                                            }))
                                                        }
                                                        onChange={handleSelectProjectChange}
                                                        limit={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit_synergies_model_footer'>
                            <button className='back_btn' onClick={handleClose}>Cancel</button>
                            <button disabled={synergyName==='' || selectedProject.length!==2} className='cancel_btn' onClick={() => {
                                handleSaveChanges()
                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

EditSynergiesPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    synergy: PropTypes.object,
    onSave: PropTypes.func
}

export default EditSynergiesPopup