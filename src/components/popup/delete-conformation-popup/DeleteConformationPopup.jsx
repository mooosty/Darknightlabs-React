import PropTypes from 'prop-types';
import './DeleteConformationPopup.scss'
import { CloseIcon } from '../../../utils/constants/images';

const DeleteConformationPopup = ({ open, handleClose }) => {
    return (
        <>
            <div className={`model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`delete_conformation_popup`}
                >
                    <div className='model_box'>
                        <div className='model_body'>
                        <div className='model_header'>
                                <h3>Add new Synergies</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            
                        </div>
                        <div className='model_footer'>
                            <button className='cancel_btn' onClick={() => {
                                handleClose()
                            }}>Cancel</button>
                            <button className='save_btn' onClick={() => {
                                handleClose()
                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

DeleteConformationPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default DeleteConformationPopup