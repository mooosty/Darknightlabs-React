import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import addIcon from "../../../assets/add-icon.png"

import './AddAngelPopup.scss'
import Select from '../../select/Select';

const AddAngelPopup = ({ open, handleClose }) => {
    return (
        <>
            <div className={`model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_angel_popup`}
                >
                    <div className='model_box'>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new angle</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <p className='model_description'>Qorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <form action="#" className='model_form'>
                                <div className="form_group">
                                    <label htmlFor="projectName">Project Name</label>
                                    <input type="text" id="projectName" value="Project 1581" placeholder="Add project name" />
                                </div>
                                <div className="form_group">
                                    <label htmlFor="projectName">Description</label>
                                    <Select
                                        options={[
                                            { label: 'Description', value: 'description' },
                                            { label: 'Description 2', value: 'description 2' }
                                        ]}
                                    />
                                </div>
                                <button className='add_more_btn'>Add more
                                    <img src={addIcon} alt="" />

                                </button>
                            </form>
                        </div>
                        <div className='model_footer'>
                            <button className='cancel_btn'>Cancel</button>
                            <button className='save_btn'>Save</button>
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
}

export default AddAngelPopup