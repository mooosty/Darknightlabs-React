import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import angelBg from '../../../assets/edit-senergies-hero-image.png'
import './EditSynergiesPopup.scss';
import Multiselect from '../../multiselect/Multiselect';

const EditSynergiesPopup = ({ open, handleClose }) => {


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
                                        <div className="title">Synergy Name </div>
                                    </div>
                                    <div className="angel_model_data_body">

                                        <div className="angels_container">
                                            <div className="synergirs_name">
                                                <label htmlFor="synergiesName">
                                                    <span className="title">Synergy Name </span>
                                                </label>
                                                <input type="text" id="synergiesName" placeholder='Synergy Name' />
                                            </div>

                                            <div className="synergirs_project">
                                                <label htmlFor="synergiesName">
                                                    <span className="title">Projects </span>
                                                </label>

                                                <div className="synergirs_project_select">
                                                    <Multiselect
                                                        options={[
                                                            { label: 'Project Name 1', value: 'project_1' },
                                                            { label: 'Project Name 2', value: 'project_2' },
                                                            { label: 'Project Name 3', value: 'project_3' },
                                                            { label: 'Project Name 4', value: 'project_4' },
                                                            { label: 'Project Name 5', value: 'project_6' }
                                                        ]}
                                                        placeholder={'Select'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit_synergies_model_footer'>
                            <button className='back_btn' >Cancel</button>
                            <button className='cancel_btn'>Save</button>
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
}

export default EditSynergiesPopup