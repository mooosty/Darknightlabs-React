import PropTypes from 'prop-types';
import './DeleteConfirmPopup.scss';
import { Loader } from '../../../components';
import { CloseIcon } from '../../../utils/constants/images';

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
                                    <CloseIcon />
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
    isLoading: PropTypes.bool,
    description: PropTypes.string
}

export default DeleteConfirmPopup