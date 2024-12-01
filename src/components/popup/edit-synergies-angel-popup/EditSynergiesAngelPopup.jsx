import { useState } from 'react';
import PropTypes from 'prop-types';
import './EditSynergiesAngelPopup.scss';
import { AddCircleIcon, CLeseCircleIcon, GlobalIcon, RightCornerArrowIcon } from '../../../utils/SVGs/SVGs';
import { angelBg, closeIcon } from '../../../utils/constants/images';

const buttons = [
    {
        id: 1,
        name: 'IP integration',
        checked: true
    },
    {
        id: 2,
        name: 'Angle48',
        checked: true
    },
    {
        id: 3,
        name: 'Hosting AMAS',
    },
    {
        id: 4,
        name: 'IP Angle48',
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
        name: 'Angle48',
    },
    {
        id: 8,
        name: 'Hosting AMAS',
    },
    {
        id: 9,
        name: 'IP Angle48',
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

const buttons2 = [
    {
        id: 1,
        name: 'IP integration',
        checked: true
    },
    {
        id: 2,
        name: 'Angle48',
    },
    {
        id: 3,
        name: 'Hosting AMAS',
    },
    {
        id: 4,
        name: 'IP Angle48',
        checked: true
    },
]
const EditSynergiesAngelPopup = ({ open, handleClose }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const handleBackPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < 4) {
            setCurrentPage(currentPage + 1);
        }
    }
    return (
        <>
            <div className={`edit_engel_model_bg ${open ? 'active' : ''} `}>
                <div className={`edit_engel_popup`} >
                    <div className='edit_engel_model_box'>
                        <div className="edit_engel_model_body_container">
                            <div className='edit_engel_model_body'>
                                <div className='edit_engel_model_header'>
                                    <h3>Edit synergy angles</h3>
                                    <button
                                        className='close'
                                        onClick={() => {
                                            handleClose()
                                        }}
                                    >
                                        <img src={closeIcon} alt="close" />
                                    </button>
                                </div>
                                <div className="edit_engel_model_data">
                                    <div className="image">
                                        <img src={angelBg} alt="" />
                                    </div>
                                    <div className={`page ${currentPage === 1 ? 'active' : ''}`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Project Name 1 </div>
                                            <div className="arrow">
                                                <RightCornerArrowIcon />
                                            </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="title">Synergy angles </div>
                                            <div className="angels_container">
                                                {buttons.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" checked={data.checked} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' readOnly={true}/>
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

                                    <div className={`page ${currentPage === 2 ? 'active' : ''}`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Project Name 2 </div>
                                            <div className="arrow">
                                                <RightCornerArrowIcon />
                                            </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="title">Synergy angles </div>
                                            <div className="angels_container">
                                                {buttons2.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" checked={data.checked} name="angleName" id={`angle2+${data.id}`} className='checkbox_input' readOnly={true}/>
                                                        <label htmlFor={`angle2+${data.id}`} className='checkbox_label' >
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

                                    <div className={`page ${currentPage === 3 ? 'active' : ''}`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Project Name 3 </div>
                                            <div className="arrow">
                                                <RightCornerArrowIcon />
                                            </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="title">Synergy angles </div>
                                            <div className="angels_container">
                                                {buttons.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" checked={data.checked} name="angleName" id={`angle3+${data.id}`} className='checkbox_input' readOnly={true}/>
                                                        <label htmlFor={`angle3+${data.id}`} className='checkbox_label' >
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

                                    <div className={`page ${currentPage === 4 ? 'active' : ''}`}>
                                        <div className="angel_model_data_head">
                                            <div className="title">Project Name 4 </div>
                                            <div className="arrow">
                                                <RightCornerArrowIcon />
                                            </div>
                                        </div>
                                        <div className="angel_model_data_body">
                                            <div className="title">Synergy angles </div>
                                            <div className="angels_container">
                                                {buttons2.map((data) => (
                                                    <div key={data.id} className='angel_tab'>
                                                        <input type="checkbox" checked={data.checked} name="angleName" id={`angle4+${data.id}`} className='checkbox_input' readOnly={true}/>
                                                        <label htmlFor={`angle4+${data.id}`} className='checkbox_label' >
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
                            <button className='back_btn' onClick={handleBackPage}>Back</button>
                            <div className="pagination">
                                {currentPage}/4
                            </div>
                            <button className='cancel_btn' onClick={handleNextPage}>Next Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

EditSynergiesAngelPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default EditSynergiesAngelPopup