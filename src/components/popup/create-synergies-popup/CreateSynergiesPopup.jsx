import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'

import './CreateSynergiesPopup.scss';

const CreateSynergiesPopup = ({ open, handleClose }) => {

    return (
        <>
            <div className={`create_model_bg ${open ? 'active' : ''} `}>
                <div className={`create_popup`} >
                    <div className='create_model_box'>
                        <div className='create_model_body'>
                            <div className='create_model_header'>
                                <h3>Create synergy</h3>
                                <button
                                    className='close'
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <div className="form_group">
                                <label htmlFor="projectName">Create synergy name</label>
                                <input type="text" id="projectName" placeholder="Ex. Synergy 1581" />
                            </div>
                        </div>
                        <div className='create_model_footer'>
                            <button className='refuse_btn' onClick={() => {
                                handleClose()
                            }}>Refuse</button>
                            <button className='next_btn' onClick={() => {
                                handleClose()
                            }}>Next project</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CreateSynergiesPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default CreateSynergiesPopup