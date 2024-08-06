import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import sepratorImage from "../../../assets/seprator-image.png"


import './choosePrioritySynergiesPopup.scss'
import Select from '../../select/Select';

const ChoosePrioritySynergiesPopup = ({ open, handleClose }) => {


    return (
        <>
            <div className={`synergies_model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_synergies_popup`}
                >
                    <div className='synergies_model_box'>
                        <div className='synergies_model_body'>
                            <div className='synergies_model_header'>
                                <h3>choose your priority synergy angles with [project name 1]</h3>
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


                            <div className="seprator-image">
                                <img src={sepratorImage} alt="Separator" />
                            </div>
                            <form action="#" className='synergies_model_form'>
                                <div className="form_group">
                                    <label htmlFor="project_name">Select synergy angles </label>
                                    <Select
                                        options={[
                                            { label: 'IP integration', value: 'IPIntegration' },
                                            { label: 'Hosting AMAS', value: 'HostingAMAS' },
                                            { label: 'Angle48', value: 'Angle48' },
                                            { label: 'Angle49', value: 'Angle49' },
                                            { label: 'Angle50', value: 'Angle50' }
                                        ]}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="project_name" >Select coin </label>
                                    <div className="project_name">
                                        <Select
                                            options={[
                                                { label: 'Coin 1', value: 'Coin1' },
                                                { label: 'Coin 2', value: 'Coin2' },
                                                { label: 'Coin 3', value: 'Coin3' },
                                                { label: 'Coin 4', value: 'Coin4' }
                                            ]}
                                        />                                    </div>
                                </div>
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

ChoosePrioritySynergiesPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default ChoosePrioritySynergiesPopup