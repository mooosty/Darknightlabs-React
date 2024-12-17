import './ambassadorProjectDetails.scss'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsApiById } from '../../../api-services/projectApis';
import { AmbassadorAccordion, Loader } from '../../../components';
import { addIcon, arrowRight, autherProfile, editIcon, fallBackImage, infoCircle, trashIcon } from '../../../utils/constants/images';
import { DescriptionIcon, GradientGraphIcon, GradientInfiniteIcon, GrammerlyIcon, GredientGlobalIcon, HealthIcon, InvestmentIcon, StarIcon, RankingIcon, CopyIcon } from '../../../utils/SVGs/SVGs'
import { AddContentPopup } from '../../../components';


const synergiesAnglesIcons = [
    { icon: <GredientGlobalIcon /> },
    { icon: <GradientGraphIcon /> },
    { icon: <GrammerlyIcon /> },
    { icon: <HealthIcon /> },
    { icon: <StarIcon /> },
]

const tweetsData = [
    {
        id: 1,
        subject: "React Development",
        tweetText: "Just finished building a new React app! #ReactJS #Frontend",
        URL: "https://twitter.com/example1",
        status: "approved",
        date: "2024-12-15T10:00:00Z",
        label: "Development"
    },
    {
        id: 2,
        subject: "JavaScript Tips",
        tweetText: "Check out these JavaScript tips for cleaner code! #JavaScript #Coding",
        URL: "https://twitter.com/example2",
        status: "submitted",
        date: "2024-12-14T15:30:00Z",
        label: "JavaScript"
    },
    {
        id: 3,
        subject: "Tech News",
        tweetText: "Excited about the latest tech trends in 2024! #TechNews #Innovation",
        URL: "https://twitter.com/example3",
        status: "submitted",
        date: "2024-12-13T08:45:00Z",
        label: "News"
    },
    {
        id: 4,
        subject: "React Hooks",
        tweetText: "Learn the basics of React Hooks in this new tutorial! #ReactHooks #WebDev",
        URL: "https://twitter.com/example4",
        status: "approved",
        date: "2024-12-12T12:00:00Z",
        label: "React"
    },
    {
        id: 5,
        subject: "Tech News",
        tweetText: "Excited about the latest tech trends in 2024! #TechNews #Innovation",
        URL: "https://twitter.com/example3",
        status: "submitted",
        date: "2024-12-13T08:45:00Z",
        label: "News"
    },
    {
        id: 6,
        subject: "Web Development",
        tweetText: "Web development trends you should know about in 2024! #WebDev #Trends",
        URL: "https://twitter.com/example5",
        status: "approved",
        date: "2024-12-11T18:20:00Z",
        label: "Web"
    }
];

const videosData = [
    {
        id: 1,
        subject: "React Development",
        tweetText: "Just finished building a new React app! #ReactJS #Frontend",
        URL: "https://twitter.com/example1",
        status: "approved",
        date: "2024-12-15T10:00:00Z",
        label: "Development"
    },
    {
        id: 2,
        subject: "JavaScript Tips",
        tweetText: "Check out these JavaScript tips for cleaner code! #JavaScript #Coding",
        URL: "https://twitter.com/example2",
        status: "submitted",
        date: "2024-12-14T15:30:00Z",
        label: "JavaScript"
    },
    {
        id: 3,
        subject: "Tech News",
        tweetText: "Excited about the latest tech trends in 2024! #TechNews #Innovation",
        URL: "https://twitter.com/example3",
        status: "submitted",
        date: "2024-12-13T08:45:00Z",
        label: "News"
    },
    {
        id: 4,
        subject: "React Hooks",
        tweetText: "Learn the basics of React Hooks in this new tutorial! #ReactHooks #WebDev",
        URL: "https://twitter.com/example4",
        status: "approved",
        date: "2024-12-12T12:00:00Z",
        label: "React"
    }
];


const AmbassadorProjectDetails = () => {

    const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false);
    const [activeLayout, setActiveLayout] = useState('DESCRIPTION');
    const [activeContentLayout, setActiveContentLayout] = useState('TWEETS');
    const { projectDetails, isLoading: projectApiLoading } = useSelector((state) => state.project)

    const params = useParams();
    const dispatch = useDispatch();

    // -- Used projectDetails in this page --
    // 1.  project_id 
    // 2.  project_name 
    // 3.  image
    // 4.  featured 
    // 5.  description
    // 6.  investments_access 

    const handleActive = (key) => {
        setActiveLayout(key);
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        dispatch(getProjectsApiById(params.projectId))
    }, [])


    return (
        <>
            <div className="ambassador_content_header">
                <div className="content_left">
                    <h2>Projects</h2>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>
            <div className="ambassador_project_page_data">
                <div className="page_data">
                    <div className="page_header">
                        <div className="pagination">
                            <Link to={'/projects'}>Ambassador-exclusive projects</Link>
                            <span>
                                <img src={arrowRight} alt="" />
                            </span>
                            <p>{projectDetails?.project_name}</p>
                        </div>
                    </div>
                    <div className="page_body">
                        <div className="page_content">
                            <div className="ambassador_project_profile">
                                <div className="ambassador_project_image">
                                    <img
                                        onError={e => {
                                            e.target.src = fallBackImage
                                            e.onerror = null
                                        }} src={projectDetails?.image ?? fallBackImage} alt="Project" />
                                </div>
                            </div>
                            <div className="ambassador_project_page_content">
                                <div className="header">
                                    <div className="left">
                                        <p className="ambassador_project_title">{projectDetails?.project_name}</p>
                                    </div>
                                    {<div className="right">
                                        <div className="time_frame_wrap">
                                            <div className="time_frame">
                                                <div className="text">
                                                    <span>From</span>
                                                    {'12/12/2024'}
                                                    <span>to</span>
                                                    {'12/12/2025'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className="ambassador_project_author">
                                    <span className="created_by">Created by</span>
                                    <img className="auther_profile" src={autherProfile} alt="Author" />
                                    <span className="auther_name">Joan of Arc</span>
                                </div>
                                <div className='synergize_btn'>
                                    <GradientInfiniteIcon /> <span className='text'>Synergize</span>
                                </div>
                                <div className="tags">
                                    {
                                        projectDetails?.project_info?.split('#')?.filter((item) => item)?.map((data, index) => {
                                            return <div key={index} className="tag">#{data}</div>
                                        })
                                    }
                                </div>
                                <div className="toggleButtons">
                                    <button className={`toggle_btn ${activeLayout === 'DESCRIPTION' ? 'active' : ''}`} onClick={() => handleActive('DESCRIPTION')} >
                                        <span>Description</span>
                                    </button>
                                    <button className={`toggle_btn ${activeLayout === 'SYNERGY' ? 'active' : ''}`} onClick={() => handleActive('SYNERGY')} >
                                        <span>Synergy</span>
                                    </button>
                                    <button className={`toggle_btn ${activeLayout === 'INVESTMENT' ? 'active' : ''}`} onClick={() => handleActive('INVESTMENT')} >
                                        <span>Investment</span>
                                    </button>
                                </div>
                                {activeLayout === 'DESCRIPTION' && <div className="description_container_wrap">
                                    <div className="description_container">
                                        <div className="description_header">
                                            <DescriptionIcon />
                                            <span>Description</span></div>
                                        <div className="description_body">
                                            {projectDetails?.description}
                                        </div>
                                    </div>
                                    <div className="content_container">
                                        <div className="content_head">
                                            <div className="left">
                                                <RankingIcon />
                                                <span>Сontent requirements</span>
                                            </div>
                                            <div className="btn_gray" onClick={() => setIsAddContentPopupOpen(true)}>
                                                Add Content
                                                <img src={addIcon} alt="" />
                                            </div>
                                        </div>
                                        <div className="content_body">

                                            <div className="content_body_top">
                                                <div className="toggle_btns">
                                                    <button
                                                        className={`btn ${activeContentLayout === "TWEETS"
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        onClick={() =>
                                                            setActiveContentLayout("TWEETS")
                                                        }
                                                    >
                                                        Tweets
                                                    </button>
                                                    <button
                                                        className={`btn ${activeContentLayout === "VIDEOS"
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        onClick={() =>
                                                            setActiveContentLayout("VIDEOS")
                                                        }
                                                    >
                                                        Videos
                                                    </button>
                                                </div>
                                                <div className="count_warp">
                                                    <div className="count_box">
                                                        <div className="left">
                                                            <div className="text">
                                                                <div className="top">Tweets</div>
                                                                <div className="bottom">Each week</div>
                                                            </div>
                                                            <div className="icon">
                                                                <img src={infoCircle} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="right">
                                                            <div className="current">{'5'}</div>
                                                            <div className="total">/{'10'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="count_box">
                                                        <div className="left">
                                                            <div className="text">
                                                                <div className="top">Videos</div>
                                                                <div className="bottom">Each month</div>
                                                            </div>
                                                            <div className="icon">
                                                                <img src={infoCircle} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="right">
                                                            <div className="current">{'1'}</div>
                                                            <div className="total">/{'5'}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="content_body_table">
                                                {activeContentLayout === 'TWEETS' && <>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Subject</th>
                                                                <th>Tweet text</th>
                                                                <th className='center'>URL</th>
                                                                <th className='center'>Status</th>
                                                                <th className='center'>Created at</th>
                                                                <th className='center'>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                tweetsData.map((rowData) => {
                                                                    return (
                                                                        <tr key={rowData.id} className={`${rowData.id === 1 || rowData.id === 3 || rowData.id === 6 ? 'highlighted' : ''}`}>
                                                                            <td>
                                                                                <div className='subject'>
                                                                                    <span>{rowData.subject}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='tweetText'>
                                                                                    <span>{rowData.tweetText}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="url">
                                                                                    <span className='text'>{rowData.URL}</span>
                                                                                    <div className='icon'><CopyIcon /></div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className={`status ${rowData.status === 'approved' ? 'approved' : 'submitted'}`}>
                                                                                    <span> {rowData.status}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <span className='date'>{formatDate(rowData.date)}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="actions">
                                                                                    <button className='btn'
                                                                                    // onClick={() => {
                                                                                    // navigate(`/project-manager/${rowData.projectId}`)
                                                                                    // }}
                                                                                    >
                                                                                        <img src={editIcon} alt=" " />
                                                                                    </button>
                                                                                    <button className='btn'
                                                                                    //  onClick={() => {
                                                                                    // setIsDeleteConfirmPopupOpen(true);
                                                                                    // setDltId(rowData.projectId)
                                                                                    // }}
                                                                                    >
                                                                                        <img src={trashIcon} alt=" " />
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>

                                                    <div className="accordion_warp">
                                                        {
                                                            tweetsData.map((rowData) => {
                                                                return (<>
                                                                    <AmbassadorAccordion
                                                                        URL={rowData.URL}
                                                                        date={formatDate(rowData.date)}
                                                                        subject={rowData.subject}
                                                                        tweetText={rowData.tweetText}
                                                                        status={rowData.status}
                                                                    /> </>)
                                                            })}
                                                    </div>
                                                </>
                                                }

                                                {activeContentLayout === 'VIDEOS' && <>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Description</th>
                                                                <th className='center'>URL</th>
                                                                <th className='center'>Status</th>
                                                                <th className='center'>Created at</th>
                                                                <th className='center'>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                videosData.map((rowData) => {
                                                                    return (
                                                                        <tr key={rowData.id} className={`${rowData.id === 1 || rowData.id === 3 || rowData.id === 6 ? 'highlighted' : ''}`}>
                                                                            <td>
                                                                                <div className='subject'>
                                                                                    <span>{rowData.subject}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className='tweetText'>
                                                                                    <span>{rowData.tweetText}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="url">
                                                                                    <span className='text'>{rowData.URL}</span>
                                                                                    <div className='icon'><CopyIcon /></div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className={`status ${rowData.status === 'approved' ? 'approved' : 'submitted'}`}>
                                                                                    <span> {rowData.status}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <span className='date'>{formatDate(rowData.date)}</span>
                                                                            </td>
                                                                            <td>
                                                                                <div className="actions">
                                                                                    <button className='btn'
                                                                                    // onClick={() => {
                                                                                    // navigate(`/project-manager/${rowData.projectId}`)
                                                                                    // }}
                                                                                    >
                                                                                        <img src={editIcon} alt=" " />
                                                                                    </button>
                                                                                    <button className='btn'
                                                                                    //  onClick={() => {
                                                                                    // setIsDeleteConfirmPopupOpen(true);
                                                                                    // setDltId(rowData.projectId)
                                                                                    // }}
                                                                                    >
                                                                                        <img src={trashIcon} alt=" " />
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <div className="accordion_warp">
                                                        {
                                                            videosData.map((rowData) => {
                                                                return (<>
                                                                    <AmbassadorAccordion
                                                                        URL={rowData.URL}
                                                                        date={formatDate(rowData.date)}
                                                                        subject={rowData.subject}
                                                                        tweetText={rowData.tweetText}
                                                                        status={rowData.status}
                                                                    /> </>)
                                                            })}
                                                    </div>
                                                </>}
                                            </div>
                                            {/* pagination  */}
                                            {/* <div className="my_page_pagination">
                                                <div className="my_page_pagination_content">
                                                    <div className="my_page_pagination_content_text">
                                                        <span className='pagination_head'>Row per page:</span>
                                                        <span className='pagination_dropdown'>
                                                            <select name="cars" id="cars" >
                                                                <option value="10">12</option>
                                                                <option value="11">11</option>
                                                                <option value="12">10</option>
                                                                <option value="13">9</option></select></span>
                                                        <span className='pagination_pages'>1-5 of 13</span>
                                                        <div className="my_page_pagination_content_arrows">
                                                            <button className={`table_pagination_content_button`}>
                                                                <LeftIcon />
                                                            </button>
                                                            <button className={`table_pagination_content_button`}>
                                                                <RightIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                }
                                {activeLayout === 'SYNERGY' && <div className="synergy_container">
                                    <div className="synergy_header">
                                        <GradientInfiniteIcon />
                                        <span>Synergy angles</span></div>
                                    <div className="synergy_body">
                                        {projectDetails?.synergy_angles?.map((data, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="left">
                                                        <div className={`tag ${index == 0 ? 'global' : index == 1 ? 'graph' : 'white_icon'}`}> {synergiesAnglesIcons[index % 5].icon}
                                                            <span className="text"> {data[1]}</span> </div>
                                                    </div>
                                                    <div className="right">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>}
                                {activeLayout === 'INVESTMENT' && <div className="investment_container">
                                    <div className="investment_header">
                                        <InvestmentIcon />
                                        <span>Investment info</span></div>
                                    <div className="investment_body">
                                        {projectDetails?.investments_access ? <>
                                            {
                                                projectDetails?.investments?.map((data, index) => {
                                                    return (

                                                        <div key={index} className="row">
                                                            <div className="left">
                                                                {data[0]} :
                                                            </div>
                                                            <div className="right">{data[1]}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                            : <span>This project is not open for Investments at the moment</span>}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            <Loader loading={projectApiLoading} />
            {isAddContentPopupOpen &&
                <AddContentPopup
                    open={isAddContentPopupOpen}
                    handleClose={() => setIsAddContentPopupOpen(false)}
                />
            }
        </>
    )
}

export default AmbassadorProjectDetails
