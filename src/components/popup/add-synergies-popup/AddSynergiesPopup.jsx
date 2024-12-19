import PropTypes from 'prop-types';
import './AddSynergiesPopup.scss'
import Select from '../../select/Select';
import { addIcon, closeIcon, GlobalIcon, GrammerlyIcon, GraphIcon, HealthIcon, sepratorImage, StarIcon, trashIcon } from '../../../utils/constants/images';

const AddSynergiesPopup = ({ open, handleClose }) => {


    return (
        <>
            <div className={`synergies_model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_synergies_popup`}
                >
                    <div className='synergies_model_box'>
                        <div className='synergies_model_body'>
                            <div className='synergies_model_header'>
                                <h3>Add new Synergies</h3>
                                <button
                                className='close'
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <p className='synergies_model_description'>Qorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <form action="#" className='synergies_model_form'>
                                <h4 className='synergies_model_form_header'>Add new Synergies</h4>
                                <div className="form_group">
                                    <label htmlFor="project_name">Select Project </label>
                                    <Select
                                        options={[
                                            { label: 'Project 1', value: 'Project 1' },
                                            { label: 'Project 2', value: 'Project 2' }
                                        ]}
                                    />
                                </div>

                                <div className="seprator-image">
                                    <img src={sepratorImage} alt="Separator" />
                                </div>

                                <div className="form_group">
                                    <h4 className='synergies_model_form_header second_header'>New Synergies</h4>
                                    <label htmlFor="project_name" >Add Project</label>
                                    <div className="project_name">
                                        <Select
                                            options={[
                                                { label: 'Project 1', value: 'Project 1' },
                                                { label: 'Project 2', value: 'Project 2' }
                                            ]}
                                        />
                                        <button className="project_name_btn">
                                            <img src={trashIcon} alt="Delete" />
                                        </button>
                                    </div>
                                </div>
                                <div className="form_group">
                                    <label htmlFor="project_name">Synergy Angles</label>
                                    <div className="checkboxs">

                                        <span className='checkbox_angles'>
                                            <input type="checkbox" name="angleName" id="angle1" className='checkbox_input' />
                                            <label htmlFor="angle1" className='checkbox_label' ><GlobalIcon /> IP integration</label>
                                        </span>

                                        <span className='checkbox_angles'>
                                            <input type="checkbox" name="angleName" id="angle2" className='checkbox_input' />
                                            <label htmlFor="angle2" className='checkbox_label' ><GrammerlyIcon /> Angle48</label>
                                        </span>

                                        <span className='checkbox_angles'>
                                            <input type="checkbox" name="angleName" id="angle3" className='checkbox_input' />
                                            <label htmlFor="angle3" className='checkbox_label' ><GraphIcon /> Hosting AMAS</label>
                                        </span>

                                        <span className='checkbox_angles'>
                                            <input type="checkbox" name="angleName" id="angle4" className='checkbox_input' />
                                            <label htmlFor="angle4" className='checkbox_label' ><HealthIcon /> Angle49</label>
                                        </span>

                                        <span className='checkbox_angles'>
                                            <input type="checkbox" name="angleName" id="angle5" className='checkbox_input' />
                                            <label htmlFor="angle5" className='checkbox_label' ><StarIcon /> Angle50</label>
                                        </span>
                                    </div>
                                </div>
                                <div className="form_group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" id="description" placeholder="Description" />
                                </div>
                                <button className='add_more_btn'>Add synergy
                                    <img src={addIcon} alt="" />
                                </button>
                            </form>
                        </div>
                        <div className='synergies_model_footer'>
                            <button className='cancel_btn' onClick={() => {
                                handleClose()
                            }}>Cancel</button>
                            <button className='save_btn' onClick={() => {
                                handleClose()
                            }}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AddSynergiesPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default AddSynergiesPopup