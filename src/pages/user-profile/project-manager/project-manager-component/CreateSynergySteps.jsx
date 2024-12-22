import { useState } from 'react';
import PropTypes from 'prop-types'
import Loader from '../loader/Loader';
import { useDispatch } from 'react-redux';
import { createSynergyApi } from '../../api-services/synergyApi';
import CreateSynergiesPopup from '../popup/create-synergies-popup/CreateSynergiesPopup';
import { GlobalIcon, AddCircleIcon, CLeseCircleIcon, DownAccordionIcon } from '../../utils/constants/images';


const CreateSynergySteps = ({ createSynergyStep, setCreateSynergyStep, synergies, setSynergies, setSelectedProjects, setSelectedProjectForSynergy }) => {
    const dispatch = useDispatch();
    const [projectCounter, setProjectCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSynergy = (data) => {
        setSynergies(prevSynergies => ({
            ...prevSynergies,
            projects: prevSynergies.projects.map((project, index) => {
                if (index === projectCounter) {
                    const currentSynergy = project.synergy || Object.values(synergies.projects[projectCounter].synergy_angles)
                    const synergyExists = currentSynergy.some(item => item === data);
                    if (synergyExists) {
                        const updatedSynergy = currentSynergy.filter(item => item !== data);
                        return {
                            ...project,
                            synergy: updatedSynergy,
                        };
                    } else {
                        return {
                            ...project,
                            synergy: [...currentSynergy, data],
                        };
                    }
                }
                return project;
            }),
        }));
    };

    const handleSubmitSynergy = () => {
        const data = {
            "_project_id": synergies.projects[0]['project_id'],
            "project2_id": synergies.projects[1]['project_id'],
            "date": new Date().toISOString(),
            "synergy_name": synergies.synergyName,
            "synergy_angles": [...Object.entries(synergies.projects[0]['synergy_angles']).map((obj) => obj[1]), ...Object.entries(synergies.projects[1]['synergy_angles']).map((obj) => obj[1])],
            "price": 0,
            "synergy_image": synergies.projects[0]['image']
        }

        const users = []
        synergies.projects?.forEach((project) => {
            if (project.teamMembers) {
                project.teamMembers.forEach((member) => {
                    const exists = users.find((user) => user.id === member.id)
                    if (!exists) {
                        users.push({ ...member })
                    }
                })
            }
        })

        // const groupData = {
        //     name: synergies.groupName,
        //     users: [...users.map((item) => item.id)]
        // }

        setIsLoading(true)
        dispatch(createSynergyApi(data)).unwrap().then(z).catch((err) => {
            console.error('err :>> ', err)
            setIsLoading(false)
        })
    }



    return (
        <CreateSynergiesPopup
            open={createSynergyStep >= 3}
            title={createSynergyStep === 3 ? 'Create Synergy' :
                createSynergyStep === 3 ? synergies.projects[projectCounter]['project_name'] :
                    createSynergyStep === 4 ? 'Edit synergy angles' :
                        createSynergyStep === 5 ? 'Confirm Synergy' : ''}
            onClose={() => {
                setCreateSynergyStep(0);
                setProjectCounter(0);
                setSynergies({
                    synergyName: '',
                    projects: []
                })
                setSelectedProjects([]);
                setSelectedProjectForSynergy(null);
            }}
            body={
                <>
                    {
                        createSynergyStep === 3 && <>
                            <div className="form_group">
                                <label htmlFor="projectName">Create synergy name</label>
                                <input type="text" id="projectName" placeholder="Ex. Synergy 1581" value={synergies.synergyName} onChange={(e) => setSynergies({ ...synergies, synergyName: e.target.value })} />
                            </div>
                        </>
                    }

                    {createSynergyStep === 4 && <>
                        <div className='model_body'>
                            <div className="model_data">
                                <div className="image">
                                    <img src={synergies.projects[projectCounter].image} alt="" />
                                </div>
                                <div className={`page active`}>
                                    <div className="angel_model_data_head">
                                        <div className="title">Synergy angles</div>
                                    </div>
                                    <div className="angel_model_data_body">
                                        <div className="angels_container">
                                            {(synergies.projects[projectCounter] && synergies.projects[projectCounter].synergy_angles) && (
                                                Object.entries(synergies.projects[projectCounter].synergy_angles).map(([key, value]) => (
                                                    <div key={key} className='angel_tab'>
                                                        <input
                                                            type="checkbox"
                                                            defaultChecked={
                                                                synergies.projects[projectCounter]?.synergy ?
                                                                    synergies.projects[projectCounter]?.synergy?.some((value) => value === value) :
                                                                    Object.entries(synergies.projects[projectCounter]?.synergy_angles).some(([value]) => value === value)
                                                            }
                                                            name="angleName"
                                                            id={`angle1+${key}`}
                                                            className='checkbox_input'
                                                        />
                                                        <label htmlFor={`angle1+${key}`} className='checkbox_label' onClick={() => handleSynergy(value)}>
                                                            <div className="checkbox_label_text">
                                                                <GlobalIcon />
                                                                <span className='checkbox_label_text_head'>{value}</span>
                                                            </div>
                                                            <div className="angel_add">
                                                                <AddCircleIcon />
                                                            </div>
                                                            <div className="angel_remove">
                                                                <CLeseCircleIcon />
                                                            </div>
                                                        </label>
                                                    </div>
                                                ))
                                            )}
                                            {/* {synergies.projects[projectCounter].synergy_angles.map((data) => (
                                        <div key={data.id} className='angel_tab'>
                                            <input type="checkbox" checked={synergies.projects[projectCounter]?.synergy?.some(synergy => synergy.id === data.id) || false} name="angleName" id={`angle1+${data.id}`} className='checkbox_input' />
                                            <label htmlFor={`angle1+${data.id}`} className='checkbox_label' onClick={() => handleSynergy(data)}>
                                                <div className="checkbox_label_text" >
                                                    <GlobalIcon />
                                                    <span className='checkbox_label_text_head'>{data.name}</span>
                                                </div>
                                                <div className="angel_add">
                                                    <AddCircleIcon />
                                                </div>
                                                <div className="angel_remove" >
                                                    <CLeseCircleIcon />
                                                </div>
                                            </label>
                                        </div>
                                    ))} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}

                    {createSynergyStep === 5 &&
                        <>
                            <div className="confirm_synergies_data_body">
                                {synergies.projects.map((data, index) => (
                                    <div className='accordion' key={index}>
                                        <input className='accordion_input' type="checkbox" id={`angle_+${index}`} />
                                        <label className='accordion_label' htmlFor={`angle_+${index}`}>
                                            <div className="header">
                                                <span>{data.project_name}</span>
                                                <DownAccordionIcon />
                                            </div>
                                        </label>

                                        <div className='accordion_content'>
                                            <div className="header_name">Synergy angles</div>
                                            <div className="checkboxs">
                                                {data?.synergy ? data?.synergy?.map((item, index) => {
                                                    return (
                                                        <span className='checkbox_angles' key={index}>
                                                            <input checked={true} type="checkbox" name="angleName" id={`angles_+${index}`} className='checkbox_input' />
                                                            <label htmlFor={`angles_+${index}`} className='checkbox_label' ><GlobalIcon />{item} </label>
                                                        </span>
                                                    )
                                                }) : Object.entries(synergies.projects[index].synergy_angles).map(([key, value], index) => {
                                                    return (
                                                        <span className='checkbox_angles' key={key}>
                                                            <input checked={true} type="checkbox" name="angleName" id={`angles_+${index}`} className='checkbox_input' />
                                                            <label htmlFor={`angles_+${index}`} className='checkbox_label' ><GlobalIcon />{value} </label>
                                                        </span>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                </>
            }
            footer={
                <>
                    {createSynergyStep === 3 && <>
                        <button className='refuse_btn' onClick={() => {
                            setCreateSynergyStep(createSynergyStep - 1);
                        }}>Refuse</button>
                        <button className='next_btn' onClick={() => {
                            setCreateSynergyStep(createSynergyStep + 1);
                        }}>Next project</button>
                    </>}
                    {
                        createSynergyStep === 4 && <>
                            <button className='refuse_btn' onClick={() => {
                                if (projectCounter === 0) {
                                    setCreateSynergyStep(3);
                                }
                                else {
                                    setProjectCounter(projectCounter - 1);
                                }
                            }}>Back</button>
                            <div className='project_counter'>
                                {projectCounter + 1}/{synergies.projects.length}
                            </div>
                            <button className='next_btn' onClick={() => {
                                if (projectCounter === synergies.projects.length - 1) {
                                    setCreateSynergyStep(5);
                                } else {
                                    setProjectCounter(projectCounter + 1);
                                }
                            }}>{projectCounter === synergies.projects.length - 1 ? "Confirm" : 'Next project'}</button>
                        </>
                    }
                    {
                        createSynergyStep === 5 && <>
                            <button className='refuse_btn' onClick={() => {
                                setCreateSynergyStep(4);
                            }}>Back</button>
                            <button
                                className='next_btn'
                                onClick={() => {
                                    handleSubmitSynergy()
                                }}
                                disabled={isLoading}
                            >
                                {
                                    (isLoading) ? <> <Loader loading={isLoading} isItForButton={true} /> <p>Create synergy </p> </> : 'Create synergy '
                                }
                            </button>
                        </>
                    }
                </>
            }
        />
    )
}

CreateSynergySteps.propTypes = {
    createSynergyStep: PropTypes.number,
    setCreateSynergyStep: PropTypes.func,
    synergies: PropTypes.object,
    projectCounter: PropTypes.number,
    setProjectCounter: PropTypes.func,
    synergyName: PropTypes.string,
    setSynergies: PropTypes.func,
    isLoading: PropTypes.bool,
    handleSubmitSynergy: PropTypes.func,
    selectedProjects: PropTypes.array,
    setSelectedProjects: PropTypes.func,
    selectedProjectForSynergy: PropTypes.object,
    setSelectedProjectForSynergy: PropTypes.func,
    handleSynergy: PropTypes.func,
    setCreateSynergySuccessPopup: PropTypes.func,
}

export default CreateSynergySteps