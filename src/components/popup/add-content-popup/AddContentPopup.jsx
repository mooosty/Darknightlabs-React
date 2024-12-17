import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import './addContentPopup.scss'
import Select from '../../select/Select';
import Loader from '../../loader/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from '../../multiselect/Multiselect';
import { getProjectsAPI } from '../../../api-services/projectApis';
import { addSynergyRequest } from '../../../api-services/synergyApi';
import { synergyAnglesOptions } from '../../../utils/constants/options';
import { closeIcon } from '../../../utils/constants/images';
import SuccessfullyPopup from '../synergy-request-successfully-sent-popup/SuccessfullyPopup';

const synergyAngles = synergyAnglesOptions.map((data) => ({
    label: data.label,
    value: data.label
}))

const AddContentPopup = ({ open, handleClose }) => {

    const dispatch = useDispatch()
    const [isSuccessfullyPopupOpen, setIsSuccessfullyPopupOpen] = useState(false);
    const { addSynergyRequestLoading } = useSelector(state => state.synergies)
    const { projects } = useSelector(state => state.project)
    const [selectedSynergyAngles, setSelectedSynergyAngles] = useState([]);

    const formik = useFormik({
        initialValues: {
            coin: '',
            synergyAngles: [],
            projects: '',
            projectName: ''
        },
        onSubmit: () => {
            setIsSuccessfullyPopupOpen(true)
            const payload = {
                //     coin: values.coin,
                //     _project_id: data?.projectId,
                //     project2_id: values?.projects,
                //     synergy_angles: [...selectedSynergyAngles ?? ['asdf']],
                //     synergy_image: data?.img,
                //     synergy_name: `${data?.name} X ${values?.projectName} `
            }
            const isValid = Object.values(payload).every(value => value)

            if (isValid) {
                dispatch(addSynergyRequest(payload)).unwrap().then((response) => {
                    if (response.success) {
                        resetPopup()
                        toast.success('Synergy Requests Created Successfully')
                    } else {
                        toast.success('Synergy Requests Not Created')

                    }
                })
            }
        }
    })
    const { values, setFieldValue, submitForm, resetForm } = formik

    const resetPopup = () => {
        handleClose()
        resetForm()
        setSelectedSynergyAngles([])
    }
    const handleSelectSynergyAnglesChange = (value) => {
        if (selectedSynergyAngles.includes(value)) {
            const data = selectedSynergyAngles.filter((data) => data !== value);
            setSelectedSynergyAngles(data);
        } else {
            setSelectedSynergyAngles([...selectedSynergyAngles, value]);
        }
    }


    useEffect(() => {
        resetForm()
        setSelectedSynergyAngles([])
    }, [open])

    useEffect(() => {
        if (!projects || projects.length === 0) {
            dispatch(getProjectsAPI())
        }
    }, [])



    return (
        <>
            <div className={`synergies_model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_content_popup`}
                >
                    <div className='add_content_model_box'>
                        <div className='add_content_model_body'>
                            <div className='add_content_model_header'>
                                <h3>Add content</h3>
                                <button
                                    className='close'
                                    onClick={resetPopup}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>

                            <form action="#" className='add_content_model_form'>
                                <div className="form_group">
                                    <label htmlFor="project_name">Select project</label>

                                    <Multiselect
                                        options={[
                                            ...synergyAngles
                                        ]}
                                        placeholder={'Project name 111'}
                                        value={
                                            synergyAngles.filter((project) => {
                                                return selectedSynergyAngles?.includes(project.value);
                                            })
                                        }
                                        onChange={(option) => {
                                            handleSelectSynergyAnglesChange(option);
                                        }}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="project_name" >Select type of content</label>
                                    <div className="project_name">
                                        <Select
                                            options={[
                                                { label: 'Tweet', value: 'tweet' },
                                                { label: 'Video', value: 'video' },
                                            ]}
                                            value={values.coin}
                                            onChange={(data) => { setFieldValue('coin', data.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <label htmlFor="project_name" >Select subject</label>
                                    <div className="project_name">
                                        <Select
                                            options={[
                                                { label: 'Subject 1', value: 'Subject1' },
                                                { label: 'Subject 2', value: 'Subject2' },
                                            ]}
                                            value={values.coin}
                                            onChange={(data) => { setFieldValue('coin', data.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <label htmlFor="project_name" >Paste URL</label>
                                    <div className="project_name">
                                        <input
                                            // onChange={handleInputChange} 
                                            name='description'
                                            // value={data?.description} 
                                            type="text"
                                            id="projectName"
                                            placeholder="Add description" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='add_content_model_footer'>
                            <button className='cancel_btn' onClick={resetPopup}>Cancel</button>
                            <button className='save_btn' onClick={submitForm} disabled={addSynergyRequestLoading}>
                                {
                                    (addSynergyRequestLoading) ? <> <Loader loading={addSynergyRequestLoading} isItForButton={true} /> <span>Next project</span> </> : 'Next project'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessfullyPopup
                description={'The team will review and validate it. Feedback will be sent to your inbox.'}
                header={'Thank you for your contribution'}
                open={isSuccessfullyPopupOpen}
                handleClose={() => setIsSuccessfullyPopupOpen(false)}
            />
        </>
    )
}

AddContentPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    data: PropTypes.object,
}

export default AddContentPopup