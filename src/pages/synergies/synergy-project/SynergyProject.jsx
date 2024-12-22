
import './synergyProject.scss'
import { Tooltip } from "react-tooltip"
import { Select } from "../../../components"
import { DownIcon, Download, GradientGraphIcon, GredientGlobalIcon, HalfEmoji, Health, InfiniteIcon, InfoCircleIcon, project, SearchIcon } from "../../../utils/constants/images"


const SynergyProject = () => {

    return (
        <>
            <div className="synergies_projects_content_Wrapper">
                <div className="synergies_content_header">
                    <div className="synergies_content_left">
                        <h2>Synergies</h2>
                        <div className="search_box">
                            <span className="search_icon"><SearchIcon /></span>
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    <div className="synergies_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>

                <div className="synergies_project_page_data">
                    <div className="page_header">
                        <div className='bread_crumb'>
                            <span className="parent">Synergies</span>
                            <DownIcon className="arrow_right" />
                            <span>Project name </span>
                        </div>
                    </div>
                    <div className="page_content">
                        <div className="content_left">
                            <div className="image">
                                <img src={project} alt=" " />
                            </div>
                        </div>
                        <div className="content_right">
                            <div className='header'>
                                <div className="sub_left">
                                    <span className="title">Project name </span>
                                    <div className="info_container">
                                        <span className="status_tag refused">Refused</span>
                                        <span className="info" id="refuse_tooltip">
                                            <InfoCircleIcon />
                                        </span>
                                        <Tooltip
                                            place="top"
                                            style={{
                                                maxWidth: '200px',
                                                boxShadow: '0px 3px 10.3px -4px rgba(229, 229, 229, 0.1)',
                                                background: 'rgba(79, 79, 79, 1)',
                                                opacity: '1',
                                            }}
                                            anchorSelect={`#refuse_tooltip`}
                                        >
                                            The reason why it has been refused
                                        </Tooltip>
                                    </div>
                                </div>
                                <button className="goto_chat">
                                    Go to Chat
                                </button>
                            </div>
                            <div className='angel_data'>
                                <div className='angel_data_header'>
                                    <span className="table_title">
                                        <InfiniteIcon />
                                        <span>Synergy angles</span>
                                    </span>
                                    <Select
                                        placeholder={'All synergies angles'}
                                        options={[
                                            { label: 'Description', value: 'description' },
                                            { label: 'Description 2', value: 'description 2' }
                                        ]}
                                    />
                                </div>
                                <div className='angel_data_body'>
                                    <div className="data_row">
                                        <div className="tag">
                                            <div className={`global`}>
                                                <div className='angle_tag'>
                                                    <><GredientGlobalIcon /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row">
                                        <div className="tag">
                                            <div className={`graph`}>
                                                <div className='angle_tag'>
                                                    <><GradientGraphIcon /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><HalfEmoji /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Health /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row disabled">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row disabled">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row disabled">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row disabled">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                    <div className="data_row disabled">
                                        <div className="tag">
                                            <div className={``}>
                                                <div className='angle_tag'>
                                                    <><Download /> </>
                                                    <span className='text'>
                                                        <span>IP integration</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="desc">Norem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SynergyProject