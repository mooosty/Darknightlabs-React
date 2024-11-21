import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'

import './AddAngelPopup.scss'
import { useState } from 'react';
import { useEffect } from 'react';

const AddAngelPopup = ({ open, handleClose, handleAddNewAngel, defaultValue }) => {
    const [data, setData] = useState({})
    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    useEffect(() => { setData({ project_name: defaultValue }) }, [defaultValue])
    return (
        <>
            <div className={`model_bg ${open ? 'active' : ''} `}>
                <div className={`add_angel_popup`}>
                    <div className='model_box'>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new angle</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                        setData({})
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <p className='model_description'>Qorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <form action="#" className='model_form'>
                                <div className="form_group">
                                    <label htmlFor="project_name">Project Name</label>
                                    <input onChange={handleInputChange} name='project_name' value={data?.project_name} type="text" id="projectName" placeholder="Add project name" />
                                </div>
                                <div className="form_group">
                                    <label htmlFor="description">Description</label>
                                    <input onChange={handleInputChange} name='description' value={data?.description} type="text" id="projectName" placeholder="Add description" />
                                </div>
                            </form>
                        </div>
                        <div className='model_footer'>
                            <button className='cancel_btn' onClick={() => { handleClose(); setData({}) }}>Cancel</button>
                            <button className='save_btn' onClick={() => { handleAddNewAngel(data); setData({}) }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AddAngelPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleAddNewAngel: PropTypes.func,
    defaultValue: PropTypes.string
}

export default AddAngelPopup