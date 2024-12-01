import PropTypes from 'prop-types';
import './SynergieaCreatedSuccessfullyPopup.scss';
import { closeIcon } from '../../../utils/constants/images';

const SynergieaCreatedSuccessfullyPopup = ({ open, handleClose }) => {

    return (
        <>
            <div className={`success_model_bg ${open ? 'active' : ''} `}>
                <div className={`success_popup`} >
                    <div className='success_model_box'>
                        <div className='success_model_body'>
                            <div className='success_model_header'>
                                <h3> <span>Your synergy</span>
                                    <span> was successfully created!</span>
                                </h3>
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
                                <p> Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

SynergieaCreatedSuccessfullyPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SynergieaCreatedSuccessfullyPopup