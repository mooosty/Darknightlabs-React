import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import './ConfirmSynergiesPopup.scss';
import { DownAccordionIcon, GlobalIcon } from '../../../utils/SVGs/SVGs';

const accordion = [
    {
        id: 1,
        name: 'Project Name 1',
        angel1: 'IP integration',
        angel2: 'Angle48',
        angel3: 'Hosting AMAS',
        angel4: 'IP Angle48',
        angel5: 'IP integration',
    },
    {
        id: 2,
        name: 'Project Name 2',
        angel1: 'IP integration',
        angel2: 'Angle48',
        angel3: 'Hosting AMAS',
        angel4: 'IP Angle48',
        angel5: 'IP integration',
    },
    {
        id: 3,
        name: 'Project Name 3',
        angel1: 'IP integration',
        angel2: 'Angle48',
        angel3: 'Hosting AMAS',
        angel4: 'IP Angle48',
        angel5: 'IP integration',
    },
    {
        id: 4,
        name: 'Project Name 4',
        angel1: 'IP integration',
        angel2: 'Angle48',
        angel3: 'Hosting AMAS',
        angel4: 'IP Angle48',
        angel5: 'IP integration',
    },
]

const ConfirmSynergiesPopup = ({ open, handleClose }) => {



    return (
        <>
            <div className={`confirm_synergies_model_bg ${open ? 'active' : ''} `}>
                <div className={`confirm_synergies_popup`} >
                    <div className='confirm_synergies_model_box'>
                        <div className='confirm_synergies_model_body'>
                            <div className='confirm_synergies_data_header'>
                                <h3>Confirm synergy</h3>
                                <button
                                    className='close'
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <div className="confirm_synergies_data_body">
                                {accordion.map((data) => (
                                    <div className='accordion' key={data.id}>
                                        <input className='accordion_input' type="checkbox" id={`angle_+${data.id}`} />
                                        <label className='accordion_label' htmlFor={`angle_+${data.id}`}>
                                            <div className="header">
                                                <span>{data.name}</span>
                                                <DownAccordionIcon />
                                            </div>
                                        </label>

                                        <div className='accordion_content'>
                                            <div className="header_name">Synergy angles</div>
                                            <div className="checkboxs">
                                                <span className='checkbox_angles'>
                                                    <input type="checkbox" name="angleName" id={`angles_+${data.angel1}+${data.id}`} className='checkbox_input' />
                                                    <label htmlFor={`angles_+${data.angel1}+${data.id}`} className='checkbox_label' ><GlobalIcon />{data.angel1} </label>
                                                </span>
                                                <span className='checkbox_angles'>
                                                    <input type="checkbox" name="angleName" id={`angle_+${data.angel2}+${data.id}`} className='checkbox_input' />
                                                    <label htmlFor={`angle_+${data.angel2}+${data.id}`} className='checkbox_label' ><GlobalIcon />{data.angel2} </label>
                                                </span>
                                                <span className='checkbox_angles'>
                                                    <input type="checkbox" name="angleName" id={`angle_+${data.angel3}+${data.id}`} className='checkbox_input' />
                                                    <label htmlFor={`angle_+${data.angel3}+${data.id}`} className='checkbox_label' ><GlobalIcon />{data.angel3} </label>
                                                </span>
                                                <span className='checkbox_angles'>
                                                    <input type="checkbox" name="angleName" id={`angle_+${data.angel4}+${data.id}`} className='checkbox_input' />
                                                    <label htmlFor={`angle_+${data.angel4}+${data.id}`} className='checkbox_label' ><GlobalIcon />{data.angel4} </label>
                                                </span>
                                                <span className='checkbox_angles'>
                                                    <input type="checkbox" name="angleName" id={`angle_+${data.angel5}+${data.id}`} className='checkbox_input' />
                                                    <label htmlFor={`angle_+${data.angel5}+${data.id}`} className='checkbox_label' ><GlobalIcon />{data.angel5} </label>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                        <div className='confirm_synergies_model_footer'>
                            <button className='back_btn' onClick={() => {
                                handleClose()
                            }}>Back</button>
                            <button className='create_btn' onClick={() => {
                                handleClose()
                            }}>Create synergy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ConfirmSynergiesPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default ConfirmSynergiesPopup