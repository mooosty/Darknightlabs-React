import { useCallback, useState } from 'react';
import './myContent.scss'
import { addIcon, editIcon, searchIcon, trashIcon } from "../../utils/constants/images";
import debounce from 'lodash.debounce';
import { CopyIcon } from '../../utils/SVGs/SVGs';
import { AmbassadorAccordion, AddContentPopup } from '../../components';

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

const MyContent = () => {
    const [activeLayout, setActiveLayout] = useState("TWEETS");
    const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false);

    const [filter, setFilter] = useState({
        synergyAngleValues: [],
        status: "",
        sortBy: "",
        types: [],
        searchBy: "",
    });
    console.log(filter);

    const handleActive = (key) => {
        setActiveLayout(key);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSearchChange = useCallback(
        debounce((value) => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                searchBy: value,
            }));
        }, 500),
        []
    );
    return (
        <>
            <div className="my_content_Wraper">
                <div className="my_content_header">
                    <div className="my_content_left">
                        <h2>My Content</h2>
                        <div className="search_box">
                            <img
                                className="search_icon"
                                src={searchIcon}
                                alt="Search"
                            />
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="my_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
                <div className="my_content_body">
                    <div className="content_count_wrap">
                        <div className="content_count_box_wrap">
                            <div className="content_count_box">
                                <div className="text">My Tweets</div>
                                <div className="number">{tweetsData.length}</div>
                            </div>
                        </div>
                        <div className="content_count_box_wrap">
                            <div className="content_count_box">
                                <div className="text">My Videos</div>
                                <div className="number">{videosData.length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="all_my_page_data">
                        <div className="all_projects_card_box">
                            <div className="all_projects_card_header">
                                <div className="all_projects_card_header_bottom">
                                    <div className="btns">
                                        <button
                                            className={`btn ${activeLayout === "TWEETS"
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleActive("TWEETS")
                                            }
                                        >
                                            Tweets
                                        </button>
                                        <button
                                            className={`btn ${activeLayout === "VIDEOS"
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleActive("VIDEOS")
                                            }
                                        >
                                            Videos
                                        </button>
                                    </div>
                                    <div className="button">
                                        <div className="btn_gray add_btn" onClick={() => setIsAddContentPopupOpen(true)}>
                                            Add New {activeLayout === 'TWEETS' && <>Tweet</>} {activeLayout === 'VIDEOS' && <>Video</>}
                                            <img src={addIcon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my_content_table">
                                {activeLayout === 'TWEETS' && <>
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
                                </>}

                                {activeLayout === 'VIDEOS' && <>
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

            <AddContentPopup
                open={isAddContentPopupOpen}
                handleClose={() => setIsAddContentPopupOpen(false)}
            />
        </>
    )
}

export default MyContent