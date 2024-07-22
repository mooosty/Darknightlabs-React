import searchIcon from "../../assets/search-icon.png"
import projectImageProfile from "../../assets/project-image-profile.png"
import autherProfile from "../../assets/auther-profile.png"
import trashIcon from "../../assets/trash-icon.png"
import addIcon from "../../assets/add-icon.png"
import sepratorImage from "../../assets/seprator-image.png"
import uploadIcon from "../../assets/document-upload.png"
import "./projectmanager.scss"
import Select from "../../components/select/Select"
import arrowRight from "../../assets/arrow-right.png"
import projectIcon from "../../assets/project-icon.png"
import pendingIcon from "../../assets/pending-icon.png"
import synergiesIcon from "../../assets/synergies-icon.png"
import chatIcon from "../../assets/chat-icon.png"
import profileIcon from "../../assets/profile-icon.png"
import AddAngelPopup from "../../components/popup/add-angel-popup/AddAngelPopup"
import { useState } from "react"


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

const ProjectManager = () => {
    const [isAddAngelPopupOpen, setIsAddAngelPopupOpen] = useState(false)

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
                    <a href="#">Darknight</a>
                    <a href="#">Labs</a>
                </div>
            </div>
            <div className="page_data">
                <div className="page_header">
                    <div className="pagination">
                        <a href="#">Project manager</a>
                        <span>
                            <img src={arrowRight} alt="" />
                        </span>
                        <p>Project name 111</p>
                    </div>
                    <button className="btn_gray">Save changes</button>
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
                        {/* <>
                            <div className="project_image">
                                <img src={projectImageProfile} alt="Project" />
                            </div>
                            <div className="project_profile_btn">
                                <button className="btn-gray">
                                    <img src={uploadIcon} alt="" /> Replace photo</button>
                                <button className="btn-red">
                                    <img src={trashIcon} alt="" /> Delete</button>
                            </div>
                        </> */}
                        <div className="upload_profile">
                            <img src={uploadIcon} alt="" />
                            <input type="file" />
                            <p className="upload_document_title">Click to upload</p>
                            <span className="drag_file">or drag and drop</span>
                            <div className="file_type">SVG, PNG, JPG (max. 800x400px)</div>
                        </div>
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
                                <input type="text" id="projectName" value="Project 1581" placeholder="Add project name" />
                            </div>
                            <div className="form_group">
                                <label>Tags</label>
                                <div className="tag_box">
                                    <span>#Gaming</span>
                                    <span>#AI</span>
                                    <span>#Metaverse</span>
                                    <input type="text" name="" id="" />
                                </div>
                            </div>
                            <div className="form_item_box">
                                <div className="form_group">
                                    <label htmlFor="arc">Joan of Arc</label>
                                    <Select
                                        options={[
                                            { label: 'Owner', value: 'Owner' },
                                            { label: 'Joan of Arc', value: 'Joan of Arc' },
                                        ]}
                                        value='Joan of Arc'
                                    />
                                </div>
                                <div className="form_group">
                                    <label htmlFor="owner">Owner</label>
                                    <Select
                                        options={[
                                            { label: 'Owner', value: 'Owner' },
                                            { label: 'Joan of Arc', value: 'Joan of Arc' },
                                        ]}
                                        value='Owners'
                                    />
                                </div>
                                <button className="btn_delete">
                                    <img src={trashIcon} alt="Delete" />
                                </button>
                            </div>
                            <button className="btn_gray">
                                Add member
                                <img src={addIcon} alt="Add" />
                            </button>
                            <br />
                            <div className="form_group">
                                <label htmlFor="description">Project Description</label>
                                <textarea id="description" rows="7" cols="60" placeholder="Add project Description">
                                    Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
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
                                    value='All Users'
                                />
                            </div>
                            <div className="custom_select">
                                <div className="form_box synergy_selected">
                                    <label>Synergy angles</label>
                                    <Select
                                        name='synergy_angles'
                                        options={synergyAnglesOptions}
                                        placeholder='Select synergy angel'
                                        hasAddButton={true}
                                        onAdd={() => setIsAddAngelPopupOpen(true)}
                                        addButtonLabel='Add new angle'
                                    />
                                </div>
                                <button className="btn_delete">
                                    <img src={trashIcon} alt="Delete" />
                                </button>
                            </div>
                            <button className="btn_gray">
                                Add member
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
                                        <input id="switch-rounded" type="checkbox" />
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
                                        value='All Users'
                                    />
                                </div>
                                <div className="invostments-pro-wrap">
                                    <div className="form_item_box investment_item_box">
                                        <div className="form_group">
                                            <label htmlFor="arc">Investment properties</label>
                                            <Select
                                                options={[
                                                    { label: 'FDV', value: 'FDV' },
                                                    { label: 'FDV 2', value: 'FDV 2' },
                                                    { label: 'FDV 3', value: 'FDV 3' },
                                                ]}
                                                value='FDV'
                                            />
                                        </div>
                                        <div className="form_group">
                                            <label htmlFor="owner">Investment properties</label>
                                            <Select
                                                options={[
                                                    { label: '20mil', value: '20mil' },
                                                    { label: '20mil 2', value: '20mil 2' },
                                                    { label: '20mil 3', value: '20mil 3' },
                                                ]}
                                                value='20mil'
                                            />
                                        </div>
                                        <button className="btn_delete">
                                            <img src={trashIcon} alt="Delete" />
                                        </button>
                                    </div>
                                    <div className="form_item_box investment_item_box">
                                        <div className="form_group">
                                            <label htmlFor="arc">Token price</label>
                                            <Select
                                                options={[
                                                    { label: 'Token Price', value: 'Token Price' },
                                                    { label: 'Token Price 2', value: 'Token Price 2' },
                                                    { label: 'Token Price 3', value: 'Token Price 3' },
                                                ]}
                                                value='Token Price'
                                            />
                                        </div>
                                        <div className="form_group">
                                            <label htmlFor="owner">Price</label>
                                            <Select
                                                options={[
                                                    { label: '0.05$', value: '0.05$' },
                                                    { label: '0.06$', value: '0.06$' },
                                                    { label: '0.07$', value: '0.07$' },
                                                ]}
                                                value='0.05$'
                                            />
                                        </div>
                                        <button className="btn_delete">
                                            <img src={trashIcon} alt="Delete" />
                                        </button>
                                    </div>
                                    <button className="btn_gray">
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
                <button className="btn_delete">
                    <img src={trashIcon} alt="Delete" /> Delete project
                </button>
                <button className="btn_gray">
                    Save changes
                </button>
            </div>
            <div className="mobile_bottom_footer">
                <ul>
                    <li className="active">
                        <a href="#">
                            <img src={projectIcon} alt="" />
                            <span>Projects manager</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={pendingIcon} alt="" />
                            <span>Pending Synergies</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={synergiesIcon} alt="" />
                            <span>Synergies Manager</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={chatIcon} alt="" />
                            <span className="chat">Chat <p className="chat_count">1</p></span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src={profileIcon} alt="" />
                            <span>Profile</span>
                        </a>
                    </li>
                </ul>
            </div>

            <AddAngelPopup
                open={isAddAngelPopupOpen}
                handleClose={() => setIsAddAngelPopupOpen(false)}
            />

        </>
    )
}

export default ProjectManager