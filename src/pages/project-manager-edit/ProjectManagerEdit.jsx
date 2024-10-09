import searchIcon from "../../assets/search-icon.png"
import autherProfile from "../../assets/auther-profile.png"
import trashIcon from "../../assets/trash-icon.png"
import addIcon from "../../assets/add-icon.png"
import sepratorImage from "../../assets/seprator-image.png"
import uploadIcon from "../../assets/document-upload.png"
import "./projectManagerEdit.scss"
import Select from "../../components/select/Select"
import arrowRight from "../../assets/arrow-right.png"
import AddAngelPopup from "../../components/popup/add-angel-popup/AddAngelPopup"
import { useEffect, useState } from "react"
import { useFormik } from 'formik';
import { addProjectAPI, deleteProjectAPI, addMemberAPI } from "../../api-services/projectApis"
import { getUsersAPI } from "../../api-services/userApis"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, Link } from "react-router-dom"
// import { updateProject } from "../../store/slice/projectSlice"
import { updateProjectAPI } from "../../api-services/projectApis"
import DeleteConfirmPopup from "../../components/popup/delete-confirm-popup/DeleteConfirmaPopup"


const synergyAnglesOptions = [
    {
        label: 'Getting whitelist spots',
        value: 'Getting whitelist spots',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Giving whitelists spots',
        value: 'Giving whitelists spots',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Hosting AMAs',
        value: 'Hosting AMAs',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Integrating branded game assets',
        value: 'Integrating branded game assets',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Integrating your own branded assets',
        value: 'Integrating your own branded assets',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Getting early alpha',
        value: 'Getting early alpha',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
    {
        label: 'Sharing early alpha',
        value: 'Sharing early alpha',
        tooltip: 'Integrating branded game assets from other Web3 brands in our project for cross-pollination of audiences'
    },
]


const ProjectManagerEdit = () => {
    const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false)
    const [whoAccessToSynergySide, setWhoAccessToSynergySide] = useState('All Users');
    const [whoAccessToInvestmentSide, setWhoAccessToInvestmentSide] = useState('All Users');
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams();
    const projectData = useSelector(state => state.project.projects.find(project => project.project_id == projectId))
    const userData = useSelector(state => state.user.users);

    const initialValues = {
        project_name: '',
        tags: '',
        twitter_username: '',
        discord_username: '',
        members: [{
            name: '',
            position: ''
        }],
        description: '',
        synergy_angles: [{
            synergy_angle0: ''
        }],
        image: null,
        invesments: [
            {
                property: '',
                price: ''
            }
        ],
        opentoinvest: false
    }

    const formik = useFormik({
        initialValues: initialValues
    })

    const { values, setFieldValue, setValues, handleChange } = formik

    const handleUploadImage = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                let base64Url = reader.result;
                setFieldValue('image', {
                    file: file,
                    base64Url: base64Url,
                })
            }
            img.src = reader.result;
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    }

    const handleAddProject = () => {
        const date = new Date();

        const synergy_obj = {};

        values.synergy_angles.forEach((synergy_angle, index) => {
            synergy_obj[`synergy_angle${index}`] = synergy_angle[`synergy_angle${index}`];
        });

        const investment_obj = {};

        values.invesments.forEach(({ property, price }) => {
            investment_obj[property] = price;
        });

        const data = {
            "project_name": values.project_name,
            "project_info": values.tags,
            "website": "",
            "discord_link": values.discord_username,
            "description": values.description,
            "twitter": values.twitter_username,
            "rating": 0,
            "featured": 0,
            "image": values.image.base64Url,
            "date": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
            "synergy_access": true,
            "synergy_angles": synergy_obj,
            "investments_access": true,
            "investments": investment_obj
        }

        dispatch(addProjectAPI(data)).then((res) => {

            const resArr = values.members.map((member) => {
                const data = {
                    "userId": member.userId,
                    "projectId": res.payload.response.data.insertId,
                    "roles": member.position,
                }
                return dispatch(addMemberAPI(data))
            })

            Promise.allSettled(resArr).then(() => {
                navigate('/project-manager');
            });
        });
    }

    const handleSaveChanges = () => {
        const date = new Date();

        const synergy_obj = {};

        values.synergy_angles.forEach((synergy_angle, index) => {
            synergy_obj[`synergy_angle${index}`] = synergy_angle[`synergy_angle${index}`];
        });


        const investment_obj = {};

        values.invesments.forEach(({ property, price }) => {
            investment_obj[property] = price;
        });

        const data = {
            "project_id": projectId - 0,
            "project_name": values.project_name,
            "project_info": values.tags,
            "website": "",
            "discord_link": values.discord_username,
            "description": values.description,
            "twitter": values.twitter_username,
            "rating": 0,
            "image": values.image.base64Url,
            "date": `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
            "synergy_access": true,
            "synergy_angles": synergy_obj,
            "investments_access": true,
            "investments": investment_obj
        }

        dispatch(updateProjectAPI({
            "projectId": projectId - 0,
            "projectData": data
        }));
        navigate('/project-manager');
    }

    const handleProjectDelete = () => {
        dispatch(deleteProjectAPI({
            "projectIds": [
                projectId - 0
            ]
        })).then(() => {
            navigate('/project-manager')
        })
        setIsDeleteConfirmPopupOpen(false);
    }



    useEffect(() => {
        if (projectId && projectId !== 'ADD') {
            let synergy_angles = [];
            if (projectData?.synergy_angles)
                Object.keys(projectData?.synergy_angles).forEach((key, index) => {
                    synergy_angles.push({ [`synergy_angle${index}`]: projectData.synergy_angles[key] });
                });

            let investments = [];

            Object.keys(projectData?.investments).forEach((key) => {
                investments.push({
                    property: key,
                    price: projectData.investments[key]
                })
            })

            const obj = {
                project_name: projectData.project_name,
                tags: projectData.project_info,
                twitter_username: projectData.twitter,
                discord_username: projectData.discord_link,
                members: [{
                    name: '',
                    position: ''
                }],
                description: projectData.description,
                synergy_angles: synergy_angles,
                image: {
                    file: null,
                    base64Url: projectData.image,
                },
                invesments: investments,
                opentoinvest: false
            }
            setValues(obj);
        }

        dispatch(getUsersAPI());
    }, [projectId])

    useEffect(() => {
        dispatch(getUsersAPI());
    }, [])


    return (
        <>
            <div className="content_header">
                <div className="content_left">
                    <h2>Projects Manager</h2>
                    <div className="search_box">
                        <img className="search_icon" src={searchIcon} alt="Search" />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="page_data">
                <div className="page_header">
                    <div className="pagination">
                        <Link to={'/project-manager'}>Project manager</Link>
                        <span>
                            <img src={arrowRight} alt="" />
                        </span>
                        <p>{values.project_name}</p>
                    </div>
                    {projectId !== 'ADD' && <button className="btn_gray" onClick={handleSaveChanges}>Save changes</button>}
                    {projectId === 'ADD' && <button className="btn_gray" onClick={handleAddProject}>Add Project</button>}
                </div>
                <div className="page_content">
                    <div className="project_author">
                        <span className="created_by">Created by</span>
                        <img className="auther_profile" src={autherProfile} alt="Author" />
                        <span className="auther_name">Joan of Arc</span>
                        <span className="auther_post_date">17/11/2023</span>
                        <span className="auther_time">16:07</span>
                    </div>
                    <div className="project_profile">
                        {values.image?.base64Url && <>
                            <div className="project_image">
                                <img src={values.image.base64Url} alt="Project" />
                            </div>
                            <div className="project_profile_btn">
                                <button className="btn-gray" onClick={() => {
                                    let input = document.createElement('input');
                                    input.type = 'file';
                                    input.multiple = false
                                    input.accept = '.jpg, .png, .svg, .jpeg';
                                    input.onchange = () => {
                                        let files = Array.from(input.files);
                                        handleUploadImage(files[0]);
                                    }
                                    input.click()
                                }}>
                                    <img src={uploadIcon} alt="" /> Replace photo</button>
                                <button className="btn-red" onClick={() => {
                                    setFieldValue('image', null);
                                }}>
                                    <img src={trashIcon} alt="" /> Delete</button>
                            </div>
                        </>}
                        {!values.image && <>
                            <div className="upload_profile">
                                <img src={uploadIcon} alt="" />
                                <input type="file" multiple={false} accept=".png, .jpeg, .svg, .jpg" onChange={(e) => {
                                    handleUploadImage(e.target.files[0]);
                                }} />
                                <p className="upload_document_title">Click to upload</p>
                                <span className="drag_file">or drag and drop</span>
                                <div className="file_type">SVG, PNG, JPG (max. 800x400px)</div>
                            </div>
                        </>}
                    </div>


                    <div className="project_description_form">
                        <div className="project_author">
                            <span className="created_by">Created by</span>
                            <img className="auther_profile" src={autherProfile} alt="Author" />
                            <span className="auther_name">Joan of Arc</span>
                            <span className="auther_post_date">17/11/2023</span>
                            <span className="auther_time">16:07</span>
                        </div>
                        <div className="form_box">
                            <h3 className="project_title">Project details</h3>
                            <div className="form_group">
                                <label htmlFor="projectName">Project Name</label>
                                <input type="text" id="projectName" name="project_name" value={values.project_name} placeholder="Add project name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form_group">
                                <label>Tags</label>
                                <div className="tag_box">
                                    {/* <span>#Gaming</span>
                                    <span>#AI</span>
                                    <span>#Metaverse</span> */}
                                    <input type="text" name="tags" id="tag" value={values.tags} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form_item_box">
                                <div className="form_group">
                                    <label htmlFor="arc">Twitter</label>
                                    <input type="text" id="twitter_username" name="twitter_username" value={values.twitter_username} placeholder="twitter.com/username" onChange={handleChange} />
                                </div>
                                <div className="form_group">
                                    <label htmlFor="owner">Discord</label>
                                    <input type="text" id="discord_username" name="discord_username" value={values.discord_username} placeholder="discordapp.com/users/xxxx/" onChange={handleChange} />
                                </div>
                            </div>
                            {
                                values.members.map((member, index) => {
                                    return (
                                        <>
                                            <div className="form_item_box">
                                                <div className="form_group">
                                                    <label htmlFor="arc">Members</label>
                                                    <Select
                                                        options={userData.map((user) => {
                                                            return {
                                                                label: user.twitter,
                                                                value: user.id
                                                            }
                                                        })
                                                        }
                                                        value={member.userId}
                                                        onChange={(value) => {
                                                            setFieldValue('members', [...values.members.slice(0, index), {
                                                                'name': value.label,
                                                                'userId': value.value,
                                                                'position': member.position
                                                            }, ...values.members.slice(index + 1)])
                                                        }}
                                                    />
                                                </div>
                                                <div className="form_group">
                                                    <label htmlFor="owner">Owner</label>
                                                    <Select
                                                        options={[
                                                            { label: 'Owner', value: 'Owner' },
                                                            { label: 'Joan of Arc', value: 'Joan of Arc' },
                                                        ]}
                                                        value={member.position}
                                                        onChange={(value) => {
                                                            setFieldValue('members', [...values.members.slice(0, index), {
                                                                'name': member.name,
                                                                'position': value.value,
                                                            }, ...values.members.slice(index + 1)])
                                                        }}
                                                    />
                                                </div>
                                                <button className="btn_delete" onClick={() => {
                                                    setFieldValue('members', [...values.members.slice(0, index), ...values.members.slice(index + 1)])
                                                }}>
                                                    <img src={trashIcon} alt="Delete" />
                                                </button>
                                            </div>
                                        </>
                                    );
                                })
                            }
                            <button className="btn_gray" onClick={() => {
                                setFieldValue('members', [...values.members, {
                                    member: '',
                                    position: ''
                                }])
                            }}>
                                Add member
                                <img src={addIcon} alt="Add" />
                            </button>
                            <br />
                            <div className="form_group">
                                <label htmlFor="description">Project Description</label>
                                <textarea id="description" value={values.description} name="description" rows="7" cols="60" placeholder="Add project Description" onChange={handleChange}>
                                    {values.description}
                                </textarea>
                            </div>
                            <div className="seprator-image">
                                <img src={sepratorImage} alt="Separator" />
                            </div>
                            <h3 className="project_title">Synergy</h3>
                            <div className="form_box synergy">
                                <label htmlFor="synergy">Who has access to synergy side?</label>
                                <Select
                                    options={[
                                        { label: 'All Users', value: 'All Users' },
                                        { label: 'Joan of Arc', value: 'Joan of Arc' },
                                    ]}
                                    value={whoAccessToSynergySide}
                                    onChange={(value) => {
                                        setWhoAccessToSynergySide(value.value)
                                    }}
                                />
                            </div>

                            {
                                values.synergy_angles.map((synergy_angle, index) => {
                                    return (<>
                                        <div className="custom_select">
                                            <div className="form_box synergy_selected">
                                                {index === 0 && <label>Synergy angles</label>}
                                                <Select
                                                    name='synergy_angles'
                                                    options={synergyAnglesOptions}
                                                    placeholder='Select synergy angel'
                                                    hasAddButton={true}
                                                    onAdd={() => setIsAddAngelPopupOpen(true)}
                                                    value={synergy_angle[`synergy_angle${index}`]}
                                                    addButtonLabel='Add new angle'
                                                    onChange={(value) => {
                                                        setFieldValue('synergy_angles', [...values.synergy_angles.slice(0, index), {
                                                            [`synergy_angle${index}`]: value.value
                                                        }, ...values.synergy_angles.slice(index + 1)])
                                                    }}
                                                />
                                            </div>
                                            <button className="btn_delete"
                                                onClick={() => {
                                                    setFieldValue('synergy_angles', [...values.synergy_angles.slice(0, index), ...values.synergy_angles.slice(index + 1)])
                                                }}
                                            >
                                                <img src={trashIcon} alt="Delete" />
                                            </button>
                                        </div>
                                    </>)
                                })
                            }

                            <button className="btn_gray" onClick={() => {
                                setFieldValue(`synergy_angles`, [...values.synergy_angles, {
                                    synergy_angle: ''
                                }])
                            }}>
                                Add synergy angel
                                <img src={addIcon} alt="Add" />
                            </button>
                            <div className="invostments-group">
                                <div className="seprator-image">
                                    <img src={sepratorImage} alt="Separator" />
                                </div>
                                <h3 className="project_title">Investments</h3>
                                <div className="toogle-switch">
                                    <h3>Open to investments</h3>
                                    <span className="switch">
                                        <input id="switch-rounded" type="checkbox" onChange={(e) => {
                                            setFieldValue('opentoinvest', e.target.checked);
                                        }} />
                                        <label htmlFor="switch-rounded"></label>
                                    </span>
                                </div>
                                <div className="form_box synergy">
                                    <label htmlFor="synergy">Who has access to investments side?</label>
                                    <Select
                                        options={[
                                            { label: 'All Users', value: 'All Users' },
                                            { label: 'Joan of Arc', value: 'Joan of Arc' },
                                        ]}
                                        value={whoAccessToInvestmentSide}
                                        onChange={(value) => {
                                            setWhoAccessToInvestmentSide(value.value)
                                        }}
                                    />
                                </div>
                                <div className="invostments-pro-wrap">
                                    <label htmlFor="arc">Investment properties</label>
                                    {
                                        values.invesments.map((investment, index) => {
                                            return (
                                                <>
                                                    <div className="form_item_box investment_item_box">
                                                        <div className="form_group">

                                                            <Select
                                                                options={[
                                                                    { label: 'FDV', value: 'FDV' },
                                                                    { label: 'FDV 2', value: 'FDV 2' },
                                                                    { label: 'FDV 3', value: 'FDV 3' },
                                                                ]}
                                                                value={investment.property}
                                                                onChange={(value) => {
                                                                    setFieldValue('invesments', [...values.invesments.slice(0, index), {
                                                                        property: value.value,
                                                                        price: investment.price
                                                                    }, ...values.invesments.slice(index + 1)])
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="form_group">
                                                            <input type="text" id="property_price" name="property_price" value={investment.price}
                                                                onChange={(e) => {
                                                                    setFieldValue('invesments', [...values.invesments.slice(0, index), {
                                                                        property: investment.property,
                                                                        price: e.target.value
                                                                    }, ...values.invesments.slice(index + 1)])
                                                                }}
                                                            />
                                                        </div>

                                                        <button className="btn_delete" onClick={
                                                            () => {
                                                                setFieldValue('invesments', [...values.invesments.slice(0, index), ...values.invesments.slice(index + 1)])
                                                            }
                                                        }>
                                                            <img src={trashIcon} alt="Delete" />
                                                        </button>
                                                    </div>
                                                </>
                                            );
                                        })
                                    }


                                    <button className="btn_gray" onClick={() => {
                                        setFieldValue('invesments', [...values.invesments, {
                                            property: '',
                                            price: ''
                                        }])
                                    }}>
                                        Add property
                                        <img src={addIcon} alt="Add" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="delete_project_btn">
                <button className="btn_delete" disabled={projectId === 'ADD'} onClick={() => {
                    setIsDeleteConfirmPopupOpen(true);
                }}>
                    <img src={trashIcon} alt="Delete" /> Delete project
                </button>
                {projectId !== 'ADD' && <button className="btn_gray" onClick={handleSaveChanges}>Save changes</button>}
                {projectId === 'ADD' && <button className="btn_gray" onClick={handleAddProject}>Add Project</button>}
            </div>

            <DeleteConfirmPopup
                title='Are You Sure ?'
                description={`After once a delete project can't be recover...`}
                open={isDeleteConfirmPopupOpen}
                handleClose={() => {
                    setIsDeleteConfirmPopupOpen(false);
                }}
                handleDelete={handleProjectDelete}
            />

            <AddAngelPopup
                open={isAddAngelPopupOpen}
                handleClose={() => setIsAddAngelPopupOpen(false)}

            />

        </>
    )
}

export default ProjectManagerEdit