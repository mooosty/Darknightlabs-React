import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import './createSynergyRequestPopup.scss'
import Select from '../../select/Select';
import Loader from '../../loader/Loader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Multiselect from '../../multiselect/Multiselect';
import { getProjectsAPI } from '../../../api-services/projectApis';
import { addSynergyRequest } from '../../../api-services/synergyApi';
import { synergyAnglesOptions } from '../../../utils/constants/options';
import { CloseIcon, sepratorImage } from '../../../utils/constants/images';

const synergyAngles = synergyAnglesOptions.map((data) => ({
    label: data.label,
    value: data.label
}))

const ChoosePrioritySynergiesPopup = ({ open, handleClose, data }) => {

    const dispatch = useDispatch()
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
            const payload = {
                coin: values.coin,
                _project_id: data?.projectId,
                project2_id: values?.projects,
                synergy_angles: [...selectedSynergyAngles ?? ['asdf']],
                synergy_image: data?.img,
                synergy_name: `${data?.name} X ${values?.projectName} `
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
                    className={`add_synergies_popup`}
                >
                    <div className='synergies_model_box'>
                        <div className='synergies_model_body'>
                            <div className='synergies_model_header'>
                                <h3>Choose your priority synergy angles with {data?.name}</h3>
                                <button
                                    className='close'
                                    onClick={resetPopup}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            <p className='synergies_model_description'>Choose your priority synergy angles with paired project</p>


                            <div className="seprator-image">
                                <img src={sepratorImage} alt="Separator" />
                            </div>
                            <form action="#" className='synergies_model_form'>
                                <div className="form_group">
                                    <label htmlFor="project_name">Select synergy angles </label>

                                    <Multiselect
                                        options={[
                                            ...synergyAngles
                                        ]}
                                        placeholder={'Select'}
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
                                <div className="form_group">
                                    <label htmlFor="project_name" >Select Project </label>
                                    <div className="project_name">
                                        <Select
                                            options={
                                                projects?.filter((item) => item?.project_id != data?.projectId)?.map((items) => {
                                                    return ({
                                                        value: items?.project_id,
                                                        label: items?.project_name
                                                    })
                                                })
                                            }
                                            value={values?.projects}
                                            onChange={(data) => {
                                                setFieldValue('projects', data.value)
                                                setFieldValue('projectName', data.label)
                                            }}
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
    data: PropTypes.object,
    synergyId: PropTypes.string,
}

export default ChoosePrioritySynergiesPopup