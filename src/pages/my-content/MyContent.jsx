import { useEffect, useState } from 'react';
import './myContent.scss'
import { PlusIcon, CopyIcon, editIcon, SearchIcon, DeleteIcon, CheckIcon } from "../../utils/constants/images";
import { AmbassadorAccordion, AddContentPopup, DeleteConfirmPopup, SuccessfullyPopup, Loader, CustomSearch, EmptyData } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteContentAPI, getContentAPI } from '../../api-services/contentApis';


const MyContent = () => {

    const dispatch = useDispatch()
    const { userId } = useSelector((state) => state.auth)
    const { contents } = useSelector((state) => state.content)
    const { isLoading: projectApiLoading } = useSelector((state) => state.project)
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchStr, setSearchStr] = useState('')

    const [isAddContentPopupOpen, setIsAddContentPopupOpen] = useState(false);
    const [activeContentLayout, setActiveContentLayout] = useState('Tweet');
    const [isEditContent, setIsEditContent] = useState(false)
    const [editableContentData, setEditableContentData] = useState({})
    const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
    const [deleteContentId, setDeleteContentId] = useState('')
    const [isSuccessfullyPopupOpen, setIsSuccessfullyPopupOpen] = useState(false);
    const [filteredContents, setFilteredContents] = useState([])
    const [isCopyLink, setIsCopyLink] = useState(null);
    const [filter, setFilter] = useState({
        synergyAngleValues: [],
        status: "",
        sortBy: "",
        types: [],
        searchBy: "",
    });

    const handleActive = (key) => {
        setActiveContentLayout(key);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const copySelectedText = (data) => {
        setIsCopyLink(data?.content_id)
        if (data?.url) {
            navigator.clipboard.writeText(data.url)
                .then(() => {
                    toast.success('URL Copied')
                })
        } else {
            toast.error('URL Not Found')
        }
        setTimeout(() => {
            setIsCopyLink(null);
        }, 1000);
    }
    const handleDeleteContentData = () => {
        dispatch(deleteContentAPI(deleteContentId))
            .then((response) => {
                setIsDeleteConfirmPopupOpen(false);
                if (response?.payload) {
                    toast.success('Content Deleted Successfully')
                } else {
                    toast.error('Content Not Deleted')

                }
            })
            .catch((error) => {
                toast.error(error)
            })
    }

    useEffect(() => {
        let data = contents;

        if (filter.searchBy !== "") {
            const searchKeyword = filter.searchBy.toLowerCase();
            data = data.filter(
                (project) =>
                    project?.subject?.toLowerCase().includes(searchKeyword)
            );
        }
        setFilteredContents([...data]);
    }, [filter]);

    useEffect(() => {
        setFilteredContents([...contents]);
    }, [contents])

    const handleSearchChange = (value) => {
        setSearchStr(value)
    }

    const handleGetProjectContent = () => {
        dispatch(getContentAPI(userId))
            .then((response) => {
                setFilteredContents(response?.payload ?? [])
            })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFilter((prevFilter) => ({
                ...prevFilter,
                searchBy: searchStr,
            }));
        }, 500)
        return () => clearTimeout(timer)
    }, [searchStr])

    useEffect(() => {
        handleGetProjectContent()
    }, [])

    return (
        <>
            <div className="my_content_Wraper">
                <div className="my_content_header">
                    <div className="my_content_left">
                        <h2>My Content</h2>
                        <div className="search_wrap">
                            <CustomSearch placeholder="Search" value={searchStr} onSearchChange={(e) => handleSearchChange(e.target.value)} isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
                        </div>
                    </div>
                    {isSearchOpen && <div className="mobile_search">
                        <span className="icon"><SearchIcon /></span>
                        <input type="text" value={searchStr} placeholder="Search" onChange={(e) => handleSearchChange(e.target.value)} />
                    </div>}
                    <div className="my_content_right">
                        <a href="#">Darknight Labs</a>
                    </div>
                </div>
                <div className={`my_content_body ${isSearchOpen ? 'search_open' : ''}`}>
                    <div className="content_count_wrap">
                        <div className="content_count_box_wrap">
                            <div className="content_count_box">
                                <div className="text">My Tweets</div>
                                <div className="number">{filteredContents?.filter((item) => item?.type == 'Tweet').length}</div>
                            </div>
                        </div>
                        <div className="content_count_box_wrap">
                            <div className="content_count_box">
                                <div className="text">My Videos</div>
                                <div className="number">{filteredContents?.filter((item) => item?.type == 'Video').length}</div>
                            </div>
                        </div>
                    </div>
                    <div className="all_my_page_data">
                        <div className="all_projects_card_box">
                            <div className="all_projects_card_header">
                                <div className="all_projects_card_header_bottom">
                                    <div className="btns">
                                        <button
                                            className={`btn ${activeContentLayout === "Tweet"
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleActive("Tweet")
                                            }
                                        >
                                            Tweets
                                        </button>
                                        <button
                                            className={`btn ${activeContentLayout === "Video"
                                                ? "active"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleActive("Video")
                                            }
                                        >
                                            Videos
                                        </button>
                                    </div>
                                    <div className="button">
                                        <div className="btn_gray add_btn"
                                            onClick={() => {
                                                setIsAddContentPopupOpen(true);
                                                setIsEditContent(false)
                                            }}
                                        >
                                            Add New {activeContentLayout === 'Tweet' && <>Tweet</>} {activeContentLayout === 'Video' && <>Video</>}
                                            <PlusIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my_content_table">
                                {filteredContents.length == 0 ?
                                    <EmptyData />
                                    :
                                    <>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        {activeContentLayout === "Tweet"
                                                            ? "Subject"
                                                            : "Title"
                                                        }
                                                    </th>
                                                    <th>
                                                        {activeContentLayout === "Tweet"
                                                            ? "Tweet text"
                                                            : "Description"
                                                        }
                                                    </th>
                                                    <th className='center'>URL</th>
                                                    <th className='center'>Status</th>
                                                    <th className='center'>Created at</th>
                                                    <th className='center'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredContents?.filter((item) => item.type == activeContentLayout).map((rowData) => {
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
                                                                        <span className='text'>{rowData.url}</span>
                                                                        <div className='icon' onClick={() => copySelectedText(rowData)}>
                                                                            {isCopyLink === rowData?.content_id ? <CheckIcon /> : <CopyIcon />}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={`status ${rowData.status === 'approved' ? 'approved' : 'submitted'}`}>
                                                                        <span> {rowData.status}</span>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <span className='date'>{formatDate(rowData.created_at)}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="actions">
                                                                        <button className='btn'
                                                                            onClick={() => {
                                                                                setEditableContentData(rowData)
                                                                                setIsEditContent(true)
                                                                                setIsAddContentPopupOpen(true);
                                                                            }}
                                                                        >
                                                                            <img src={editIcon} alt=" " />
                                                                        </button>
                                                                        <button className='btn'
                                                                            onClick={() => {
                                                                                setIsDeleteConfirmPopupOpen(true);
                                                                                setDeleteContentId(rowData.content_id)
                                                                            }}
                                                                        >
                                                                            <DeleteIcon />
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
                                                filteredContents?.filter((item) => item.type == activeContentLayout).map((rowData) => {
                                                    return (<>
                                                        <AmbassadorAccordion
                                                            URL={rowData.url}
                                                            date={formatDate(rowData.created_at)}
                                                            subject={rowData.subject}
                                                            tweetText={rowData.tweetText ?? '-'}
                                                            status={rowData.status}
                                                            onEdit={() => {
                                                                setEditableContentData(rowData)
                                                                setIsEditContent(true)
                                                                setIsAddContentPopupOpen(true);
                                                            }}
                                                            onDelete={() => {
                                                                setIsDeleteConfirmPopupOpen(true);
                                                                setDeleteContentId(rowData.content_id)
                                                            }}
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

            <Loader loading={projectApiLoading} />
            <AddContentPopup
                open={isAddContentPopupOpen}
                handleClose={() => setIsAddContentPopupOpen(false)}
                isEdit={isEditContent}
                editableData={editableContentData}
                getData={() => { handleGetProjectContent() }}
                openSuccessPopup={() => setIsSuccessfullyPopupOpen(true)}
                isDisableProjectSelect={false}
            />
            <DeleteConfirmPopup
                title="Are You Sure ?"
                description={`After once a delete content can't be recover...`}
                open={isDeleteConfirmPopupOpen}
                handleClose={() => {
                    setIsDeleteConfirmPopupOpen(false);
                }}
                handleDelete={() => handleDeleteContentData()}
                isLoading={projectApiLoading && isDeleteConfirmPopupOpen}
            />
            <SuccessfullyPopup
                description={'The team will review and validate it. Feedback will be sent to your inbox.'}
                header={'Thank you for your contribution'}
                open={isSuccessfullyPopupOpen}
                handleClose={() => setIsSuccessfullyPopupOpen(false)}
            />
        </>
    )
}

export default MyContent