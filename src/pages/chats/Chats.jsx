import './chats.scss';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getGroupsAPI } from '../../api-services/chatApis';
import { DownAccordionIcon, HashTag, synergy1, synergy2, synergy3, synergy4, synergy5, UserIcon } from '../../utils/constants/images';
import { AddChatMemberPopup, ChatMembers, Loader, MessagesPanel } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER } from '../../utils/routes/routes';
import { useSocket } from '../../utils/socket-provider/SocketContext';

const chatSynergies = [{ "img": synergy1 }, { "img": synergy2 }, { "img": synergy3 }, { "img": synergy4 }, { "img": synergy5 }]


const Chats = () => {
    const { id } = useParams()
    const socket = useSocket()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [chatNumber, setChatNumber] = useState(false);
    const [openChatIndex, setOpenChatIndex] = useState(0);
    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [isMemberListOpen, setIsMemberListOpen] = useState(false);
    const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
    const [isChatMembersOpen, setIsChatMembersOpen] = useState(false);
    const [unreadMessageCount, setUnreadMessageCount] = useState({});

    const groupData = useSelector((state) => state.group.groups)
    const chatApiLoading = useSelector((state) => state.chat.isLoading)
    const groupApiLoading = useSelector((state) => state.group.isLoading)
    const userData = useSelector((state) => state.auth)




    const handleChannelOpen = () => {
        setIsChannelOpen(!isChannelOpen);
    }

    const handleChatOpen = (index) => {
        navigate(`/${ROUTER.chat}/${index}`)
    }
    const handleMenberListOpen = () => {
        setIsMemberListOpen(!isMemberListOpen);
        setIsChatMembersOpen(true);
    }


    useEffect(() => {
        if (id) {
            setOpenChatIndex(id);
            setChatNumber(true)
        } else {
            setChatNumber(false)
        }
    }, [id])

    useEffect(() => {
        dispatch(getGroupsAPI())
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {

        if (socket) {

            socket.on('message count', ({ chatId, count }) => {
                console.log('message count', chatId, count)
                setUnreadMessageCount(prev => ({
                    ...prev,
                    [chatId]: count
                }));
            });

            socket.on('new message count', ({ chatId, count }) => {
                console.log('new message count', chatId, count)
                setUnreadMessageCount(prev => ({
                    ...prev,
                    [chatId]: (prev[chatId] || 0) + count
                }));
            });

            socket.on('messages marked read', ({ chatId }) => {
                console.log('messages marked read', chatId)
                setUnreadMessageCount(prev => ({
                    ...prev,
                    [chatId]: 0
                }));
            });


            return () => {
                socket.off('message count');
                socket.off('new message count');
                socket.off('messages marked read');
            };
        }
    }, [socket]);

    useEffect(() => {
        if (socket && openChatIndex && groupData[openChatIndex]) {
            socket.emit('mark messages read', {
                chatId: groupData[openChatIndex]._id,
                userId: userData.userId
            });
        }
    }, [socket, openChatIndex, userData])

    useEffect(() => {
        if (socket && groupData.length > 0 && userData.userId) {
            groupData.forEach(group => {
                console.log('group', group)
                socket.emit('fetch message count', {
                    chatId: group._id,
                    userId: userData.userId
                });
            });
        }
    }, [groupData.length, userData.userId])


    return (
        <div className={`chat_main_wrap ${chatNumber ? 'hide' : ''}`}>
            <div className="chat_content_header">
                <div className="content_left">
                    <h2>Chat</h2>
                </div>
                <div className="content_right">
                    <a href="#">Darknight Labs</a>
                </div>
            </div>

            <div className="chat_wrap">
                <div className="chat_conternt">
                    <div className={`synergies ${chatNumber ? 'active' : ''}`}>
                        {groupData.map((data, index) => {
                            const imageIndex = index % chatSynergies.length
                            return (
                                <div key={index} className='avtar_img'
                                    onClick={() => {
                                        handleChatOpen(index)
                                    }}
                                    title={data.chatName}
                                >
                                    <img src={chatSynergies[imageIndex].img} alt="" />
                                    <div className={data.message ? "notification" : ''}>{data.message}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`channels ${chatNumber ? 'active' : ''}`}>
                        <div className='channels_avatar'>
                            <img src={chatSynergies[openChatIndex % chatSynergies?.length].img} alt="" />
                        </div>
                        <div className="channels_list">
                            <div className="channels_list_head">
                                <span>Synergy name</span>
                                {/* <div className="btn_gray" onClick={handleMenberListOpen}>
                                    <UserIcon />
                                    <span>128 </span>
                                </div> */}
                            </div>
                            <div className="channels_list_separator "></div>
                            <div className="channels_list_data">
                                <div className="data_header" onClick={handleChannelOpen}>
                                    <span>Channels</span>
                                    <div className={`arrow ${isChannelOpen ? 'active' : ''}`}><DownAccordionIcon /></div>
                                </div>
                                {!isChannelOpen ?
                                    <div className='data_list'>
                                        {groupData.map((data, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <div key={index} className={`data_list_item ${openChatIndex == index ? 'active' : ''}`} onClick={() => {
                                                        handleChatOpen(index)
                                                    }}>
                                                        <HashTag />
                                                        <span>{data.chatName}</span>
                                                        {unreadMessageCount[data._id] > 0 ? <span className='notification'>{unreadMessageCount[data._id]}</span> : ''}
                                                    </div>
                                                </Fragment>
                                            )
                                        })}
                                    </div> : ''
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`chat_main ${chatNumber ? 'active' : ''}`} >
                        <div className="chat_main_head">
                            <button className="back_arrow" onClick={() => setChatNumber(false)}>
                                <DownAccordionIcon />
                            </button>
                            <div className="head_left">
                                <HashTag />
                                <span>{groupData.length > 0 && groupData[openChatIndex]['chatName']}</span>
                            </div>
                            <div className="head_right">
                                <div className="btn_gray" onClick={handleMenberListOpen}>
                                    <UserIcon />
                                    <span>{groupData.length > 0 && groupData[openChatIndex].users.length} </span>
                                </div>
                            </div>
                        </div>

                        <MessagesPanel
                            openChatIndex={openChatIndex}
                            groupData={groupData}
                            setIsAddChatMemberPopupOpen={setIsAddChatMemberPopupOpen}
                            isMemberListOpen={isMemberListOpen}
                            setIsMemberListOpen={setIsMemberListOpen}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            {isAddChatMemberPopupOpen && <AddChatMemberPopup
                open={isAddChatMemberPopupOpen}
                handleClose={() => setIsAddChatMemberPopupOpen(false)}
                chatId={groupData[openChatIndex]?.['_id']}
            />}

            <ChatMembers
                open={isChatMembersOpen}
                handleClose={() => setIsChatMembersOpen(false)}
                handleOpenAddMemberPopup={() => {
                    setIsAddChatMemberPopupOpen(true)
                    setIsChatMembersOpen(false);
                }}
                groupData={groupData}
                openChatIndex={openChatIndex}
            />

            <Loader loading={chatApiLoading || groupApiLoading || loading} />
        </div>
    )
}

export default Chats
