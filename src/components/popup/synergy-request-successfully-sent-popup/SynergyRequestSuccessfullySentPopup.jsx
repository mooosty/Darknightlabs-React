import PropTypes from 'prop-types';
import './synergyRequestSuccessfullySentPopup.scss';
import { closeIcon } from '../../../utils/constants/images';


const SynergyRequestSuccessfullySentPopup = ({ open, handleClose }) => {

    return (
        <>
            <div className={`success_model_bg ${open ? 'active' : ''} `}>
                <div className={`success_popup`} >
                    <div className='success_model_box'>
                        <div className='success_model_body'>
                            <div className='success_model_header'>
                                 <span className='title'>Your synergy request has been successfully sent!</span>
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
                                <p> Darknight Labs` team is reviewing it, and they will connect you with the project. </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

SynergyRequestSuccessfullySentPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default SynergyRequestSuccessfullySentPopup