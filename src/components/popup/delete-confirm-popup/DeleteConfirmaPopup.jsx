import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'

import './DeleteConfirmPopup.scss';
import Loader from '../../loader/Loader';

const DeleteConfirmPopup = ({ open, title = '', description = '', handleClose, handleDelete, isLoading = false }) => {

    return (
        <>
            <div className={`delete_model_bg ${open ? 'active' : ''} `}>
                <div className={`delete_popup`} >
                    <div className='delete_model_box'>
                        <div className='delete_model_body'>
                            <div className='delete_model_header'>
                                <h3>{title}</h3>
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
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className='delete_model_footer'>
                            <button className='cancel_btn' onClick={() => {
                                handleClose()
                            }}>Cancel</button>
                            <button className='delete_btn' disabled={isLoading} onClick={() => {
                                handleDelete()
                            }}>
                                {isLoading ? <> <Loader loading={isLoading} isItForButton={true} />  <p>Delete</p></> : 'Delete'}
                            </button>
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
    handleDelete: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string
}

export default DeleteConfirmPopup