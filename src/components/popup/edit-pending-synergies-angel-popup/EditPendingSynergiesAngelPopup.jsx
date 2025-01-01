import PropTypes from 'prop-types';
import './EditPendingSynergiesAngelPopup.scss';
import { AddCircleIcon, angelBg, CLeseCircleIcon, CloseIcon, GlobalIcon } from '../../../utils/constants/images';

const buttons = [
    {
        id: 1,
        name: 'IP integration',
        checked: true
    },
    {
        id: 2,
        name: 'Angel48',
        checked: true
    },
    {
        id: 3,
        name: 'Hosting AMAS',
    },
    {
        id: 4,
        name: 'IP Angel48',
        checked: true
    },
    {
        id: 5,
        name: 'IP integration',
        checked: true
    },
    {
        id: 6,
        name: 'IP integration',
    },
    {
        id: 7,
        name: 'Angel48',
    },
    {
        id: 8,
        name: 'Hosting AMAS',
    },
    {
        id: 9,
        name: 'IP Angel48',
        checked: true
    },
    {
        id: 10,
        name: 'IP integration',
    },
    {
        id: 11,
        name: 'IP integration',
    },

]

//! Not in use
const EditPendingSynergiesAngelPopup = ({ open, handleClose }) => {

    return (
        <>
            { <div className={`edit_pending_engel_model_bg ${open ? 'active' : ''} `}>
                <div className={`edit_pending_engel_popup`} >
                    <div className='edit_pending_engel_model_box'>
                        <div className="model_body_container">
                            <div className='model_body'>
                                <div className='model_header'>
                                    <h3>Byte City X Neo Tokyo</h3>
                                    <button
                                        className='close'
                                        onClick={() => {
                                            handleClose()
                                        }}
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div className="model_data">
                                    <div className="image">
                                        <img src={angelBg} alt="" />
                                    </div>
                                    <div className={`page active`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Synergy angles </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="angels_container">
                                                {buttons.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" defaultChecked={data.checked} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' />
                                                        <label htmlFor={`angle1+${data.id}`} className='checkbox_label' >
                                                            <div className="checkbox_label_text">
                                                                <GlobalIcon />
                                                                <span className='checkbox_label_text_head'> {data.name}</span>
                                                            </div>
                                                            <div className="angel_add">
                                                                <AddCircleIcon />
                                                            </div>
                                                            <div className="angel_remove">
                                                                <CLeseCircleIcon />
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='edit_engel_model_footer'>
                            <button className='refuse_btn' onClick={handleClose}>Refuse</button>
                            <button className='confirm_btn' onClick={handleClose}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="model_data">
                <div className="image">
                    <img src={angelBg} alt="" />
                </div>
                <div className={`page active`}>
                    <div className="angel_model_data_head">
                        <div className="title">Synergy angles</div>
                    </div>
                    <div className="angel_model_data_body">
                        <div className="angels_container">
                            {buttons.map((data) => (
                                <div key={data.id} className='angel_tab'>
                                    <input type="checkbox" defaultChecked={data.checked} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' />
                                    <label htmlFor={`angle1+${data.id}`} className='checkbox_label' >
                                        <div className="checkbox_label_text">
                                            <GlobalIcon />
                                            <span className='checkbox_label_text_head'> {data.name}</span>
                                        </div>
                                        <div className="angel_add">
                                            <AddCircleIcon />
                                        </div>
                                        <div className="angel_remove">
                                            <CLeseCircleIcon />
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

EditPendingSynergiesAngelPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default EditPendingSynergiesAngelPopup