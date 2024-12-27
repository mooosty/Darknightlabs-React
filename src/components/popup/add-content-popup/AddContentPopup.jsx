import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import './addContentPopup.scss'
import {Select, Loader} from '../../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsAPI } from '../../../api-services/projectApis';
import { CloseIcon } from '../../../utils/constants/images';
import { createContentAPI, updateContentAPI } from '../../../api-services/contentApis';
import { useParams } from 'react-router-dom';
import { axiosApi } from '../../../api-services/service';

const AddContentPopup = ({ open, handleClose, isEdit, editableData, getData, openSuccessPopup, isDisableProjectSelect, contentType }) => {

    const dispatch = useDispatch()
    const { projectId } = useParams()
    const { projects } = useSelector(state => state.project)
    const { isLoading } = useSelector(state => state.content)
    const userData = useSelector(state => state.auth)
    const [contentRequirements, setContentRequirements] = useState([])

    const formik = useFormik({
        initialValues: {
            project_id: '',
            type: contentType,
            subject: '',
            url: '',
            user_id: userData?.userId,
            status: 'Submitted'
        },
        onSubmit: (values) => {
            const isValid = Object.values(values).every(value => value)
            if (isValid) {
                if (isEdit) {
                    dispatch(updateContentAPI(values)).unwrap().then((response) => {
                        if (response) {
                            handleClose()
                            resetForm()
                            toast.success('Content Updated Successfully')
                            getData()
                        } else {
                            toast.error('Content Not Updated')
                        }
                    })
                } else {
                    dispatch(createContentAPI(values)).then((response) => {
                        if (response) {
                            handleClose()
                            openSuccessPopup()
                            resetForm()
                            getData()
                            toast.success('Content Created Successfully')
                        } else {
                            toast.error('Content Not Created')
                        }
                    })
                }
            } else {
                toast.error('Please Enter All Required Fields.')
            }
        }
    })

    const { values, setFieldValue, submitForm, resetForm } = formik

    useEffect(() => {
        if (isEdit) {
            setFieldValue('project_id', editableData?.project_id)
            setFieldValue('subject', editableData?.subject)
            setFieldValue('url', editableData?.url)
            setFieldValue('type', editableData?.type)
            setFieldValue('content_id', editableData?.content_id)
        } else {
            resetForm()
            setFieldValue('type', contentType)
        }
    }, [open])

    useEffect(() => {
        dispatch(getProjectsAPI())
            .then(() => {
                if (!isEdit && isDisableProjectSelect)
                    setFieldValue('project_id', parseInt(projectId))
            })
    }, [projectId]);

    useEffect(() => {
        if (values.project_id) {
            axiosApi.get(`/content-requirements/project/${values.project_id}`)
                .then(response => {
                    if (response?.data) {
                        setContentRequirements(response.data)
                    }
                })
                .catch(error => {
                    console.error('Error fetching content requirements:', error)
                })
        }
    }, [values.project_id])

    return (
        <>
            <div className={`synergies_model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_content_popup`}
                >
                    <div className='add_content_model_box'>
                        <div className='add_content_model_body'>
                            <div className='add_content_model_header'>
                                <h3>{isEdit ? "Edit" : 'Add'} {contentType}</h3>
                                <button
                                    className='close'
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            <form action="#" className='add_content_model_form'>
                                <div className="form_group">
                                    <label htmlFor="project_name">Select project</label>

                                    <Select
                                        options={projects?.map((data) => {
                                            return {
                                                label: data?.project_name, value: data?.project_id
                                            }
                                        })}
                                        disable={isDisableProjectSelect}
                                        placeholder={'Select Project'}
                                        value={values.project_id}
                                        onChange={(data) => { setFieldValue('project_id', data.value) }}
                                    />
                                </div>

                                <div className="form_group">
                                    <label htmlFor="project_name" >Select a topic</label>
                                    <div className="project_name">
                                        <Select
                                            placeholder={'Select subject'}
                                            options={contentRequirements.map(req => ({
                                                label: req.title,
                                                value: req.title
                                            }))}
                                            value={values.subject}
                                            onChange={(data) => { setFieldValue('subject', data.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <label htmlFor="project_name" >Paste URL</label>
                                    <div className="project_name">
                                        <input
                                            onChange={(e) => setFieldValue('url', e.target.value)}
                                            name='url'
                                            value={values?.url}
                                            type="text"
                                            id="projectName"
                                            placeholder="Paste URL" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='add_content_model_footer'>
                            <button className='cancel_btn' onClick={handleClose}>Cancel</button>
                            <button className='save_btn' onClick={submitForm} disabled={isLoading}>
                                {
                                    isLoading ? <> <Loader loading={isLoading} isItForButton={true} /> <span>{isEdit ? 'Save' : 'Submit'}</span> </> : `${isEdit ? 'Save' : 'Submit'}`
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AddContentPopup.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    data: PropTypes.object,
    isEdit: PropTypes.bool,
    editableData: PropTypes.object,
    getData: PropTypes.func,
    openSuccessPopup: PropTypes.func,
    isDisableProjectSelect: PropTypes.bool,
    contentType: PropTypes.string.isRequired
}

export default AddContentPopup