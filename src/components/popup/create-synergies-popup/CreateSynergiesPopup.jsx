import PropTypes from 'prop-types';
import './CreateSynergiesPopup.scss';
import { CloseIcon } from '../../../utils/constants/images';

const CreateSynergiesPopup = ({ open, footer, body, title, onClose }) => {

    return (
        <>
            <div className={`create_model_bg ${open ? 'active' : ''} `}>
                <div className={`create_popup`} >
                    <div className='create_model_box'>
                        <div className='create_model_body'>
                            <div className='create_model_header'>
                                <h3>{title}</h3>
                                <button
                                    className='close'
                                    onClick={() => {
                                        onClose()
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            {body}
                        </div>
                        <div className='create_model_footer'>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CreateSynergiesPopup.propTypes = {
    open: PropTypes.bool,
    footer: PropTypes.any,
    body: PropTypes.any,
    title: PropTypes.any,
    onClose: PropTypes.any
}

export default CreateSynergiesPopup