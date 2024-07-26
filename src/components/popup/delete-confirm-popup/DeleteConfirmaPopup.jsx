import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'

import './DeleteConfirmPopup.scss';

const DeleteConfirmPopup = ({ open, handleClose }) => {

    return (
        <>
            <div className={`delete_model_bg ${open ? 'active' : ''} `}>
                <div className={`delete_popup`} >
                    <div className='delete_model_box'>
                        <div className='delete_model_body'>
                            <div className='delete_model_header'>
                                <h3>Are you sure</h3>
                                <button
                                    className='close'
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>

                            <div className="delete_model_text">
                                <p> Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                            </div>
                        </div>
                        <div className='delete_model_footer'>
                            <button className='cancel_btn' onClick={() => {
                                handleClose()
                            }}>Cancel</button>
                            <button className='delete_btn' onClick={() => {
                                handleClose()
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

DeleteConfirmPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default DeleteConfirmPopup