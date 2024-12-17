import PropTypes from 'prop-types';
import './successfullyPopup.scss';
import { closeIcon } from '../../../utils/constants/images';


const SuccessfullyPopup = ({ open, handleClose, header, description }) => {

    return (
        <>
            <div className={`success_model_bg ${open ? 'active' : ''} `}>
                <div className={`success_popup`} >
                    <div className='success_model_box'>
                        <div className='success_model_body'>
                            <div className='success_model_header'>
                                <span className='title'>{header}</span>
                                <button
                                    className='close'
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>

                            <div className="success_model_text">
                                <p>{description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

SuccessfullyPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    header: PropTypes.string,
    description: PropTypes.string,
}

export default SuccessfullyPopup