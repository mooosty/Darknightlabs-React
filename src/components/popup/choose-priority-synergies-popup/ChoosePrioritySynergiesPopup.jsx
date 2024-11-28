import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import sepratorImage from "../../../assets/seprator-image.png"
import { useFormik } from 'formik';

import './choosePrioritySynergiesPopup.scss'
import Select from '../../select/Select';
import { useDispatch, useSelector } from 'react-redux';
import { addSynergyRequest } from '../../../api-services/synergyApi';
import Loader from '../../loader/Loader';


const ChoosePrioritySynergiesPopup = ({ open, handleClose, projectId }) => {
    const userId = useSelector(state => state.auth.userId)
    const { addSynergyRequestLoading } = useSelector(state => state.synergies)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            coin: '',
            synergyAngles: []
        },
        onSubmit: () => {
            const payload = {
                _uid: userId,
                coin: values.coin,
                _project_id: projectId,
                partnerships: [values.synergyAngles ?? ''],
            }
            const isValid = Object.values(payload).every(value => value)

            if (isValid) {
                dispatch(addSynergyRequest(payload)).unwrap().then(() => {
                    resetPopup()
                })
            }
        }
    })
    const { values, setFieldValue, submitForm, resetForm } = formik

    const resetPopup = () => {
        handleClose()
        resetForm()
    }

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
                                    onClick={resetPopup}
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
                                        value={values.synergyAngles}
                                        onChange={(data) => { setFieldValue('synergyAngles', data.value) }}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="project_name" >Select coin </label>
                                    <div className="project_name">
                                        <Select
                                            options={[
                                                { label: '1', value: '1' },
                                                { label: '2', value: '2' },
                                                { label: '3', value: '3' },
                                                { label: '4', value: '4' }
                                            ]}
                                            value={values.coin}
                                            onChange={(data) => { setFieldValue('coin', data.value) }}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='synergies_model_footer'>
                            <button className='cancel_btn' onClick={resetPopup}>Cancel</button>
                            <button className='save_btn' onClick={submitForm} disabled={addSynergyRequestLoading}>
                                {
                                    (addSynergyRequestLoading) ? <> <Loader loading={addSynergyRequestLoading} isItForButton={true} /> <span>Confirm</span> </> : 'Confirm'
                                }
                            </button>
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
    projectId: PropTypes.string,
    synergyId: PropTypes.string
}

export default ChoosePrioritySynergiesPopup