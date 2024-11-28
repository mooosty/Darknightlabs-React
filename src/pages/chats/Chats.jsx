import './chats.scss';
import { AddUserIcon, AttechmentIcon, DownAccordionIcon, EmojiFiiledIcon, HashTag, MicrophoneIcon, UserIcon } from '../../utils/SVGs/SVGs';
import { Fragment, useEffect, useRef, useState } from 'react';
import AddChatMemberPopup from '../../components/popup/add-chat-menber-popup/AddChatMemberPopup'
import ChatMembers from '../../components/chat-members/ChatMembers';
import { getAllUsers, getGroupsAPI, getChatMessages, sendMsg } from '../../api-services/chatApis';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/slice/chatSlice';
import Loader from '../../components/loader/Loader';
import { formatDateTime, isEqualDate } from '../../utils/helper/helper';
import { synergy1, synergy2, synergy3, synergy4, synergy5, member1, member2, chatMassageDP } from '../../utils/constants/images';

const chatSynergies = [{ "img": synergy1 }, { "img": synergy2 }, { "img": synergy3 }, { "img": synergy4 }, { "img": synergy5 }]


const Chats = () => {
    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [openChatIndex, setOpenChatIndex] = useState(0);
    const [isMenberListOpen, setIsMenberListOpen] = useState(false);
    const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
    const [chatNumber, setchatNumber] = useState(false);
    const [isChatMembersOpen, setIsChatMembersOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const groupData = useSelector((state) => state.group.groups)
    const messageDetails = useSelector((state) => state.chat.groupMsg)
    const userData = useSelector((state) => state.auth)
    const chatApiLoading = useSelector((state) => state.chat.isLoading)
    const groupApiLoading = useSelector((state) => state.group.isLoading)

    const dispatch = useDispatch();
    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);


    const handleChannelOpen = () => {
        setIsChannelOpen(!isChannelOpen);
    }

    const handleChatOpen = (index) => {
        setOpenChatIndex(index);
        setchatNumber(true)
        setLoading(true);
    }

    const handleMenberListOpen = () => {
        setIsMenberListOpen(!isMenberListOpen);
        setIsChatMembersOpen(true);
    }

    const handleMemberPopupOpen = () => {
        setIsAddChatMemberPopupOpen(true)
        setIsMenberListOpen(!isMenberListOpen);
    }


    const dayWiseFormat = (isoString) => {
        const date = new Date(isoString);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedTime = `${hours}:${minutes} ${period}`;
        const today = new Date();
        return isEqualDate(isoString, today.toISOString()) ? `${formattedTime}` : `${dayOfWeek} ${formattedTime}`;
    }

    const handleSendMsg = (e) => {
        if (e.key === 'Enter' && msg.trim() !== '') {
            const data = {
                "content": msg.trim(),
                "chatId": groupData[openChatIndex]['_id'],
                "readBy": []
            }
            dispatch(sendMsg(data))

            dispatch(addMessage({
                chat: {
                    ...groupData[openChatIndex]
                },
                content: msg.trim(),
                createdAt: new Date().toISOString(),
                readBy: [],
                sender: {
                    email: userData.email,
                    name: userData.name,
                    _id: userData.userId
                },
                updatedAt: new Date().toISOString(),
                __v: 0
            }))

            setMsg('')

            setTimeout(() => {
                const elements = lastMessageRef.current;
                if (elements) {
                    elements.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                }
            }, 0)
        }
    }

    const getMessages = () => {
        dispatch(getChatMessages(groupData[openChatIndex]['_id'])).then(() => {
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }


    useEffect(() => {
        dispatch(getGroupsAPI())
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        let interval;
        if (groupData.length > 0) {
            interval = setInterval(() => {
                getMessages()
            }, 500)
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [openChatIndex, groupData])


    useEffect(() => {
        if (!loading && chatContainerRef.current) {
            setTimeout(() => {
                const container = chatContainerRef.current;
                let lastElement = container.childNodes[container.childNodes.length - 2];
                lastElement?.scrollIntoView();
            }, 200);
        }
    }, [loading]);


    return (
        <>
            <div className="content_header">
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
                                <div key={index} className='avtar_img' onClick={() => {
                                    handleChatOpen(index)
                                }}>
                                    <img src={chatSynergies[imageIndex].img} alt="" />
                                    <div className={data.message ? "notification" : ''}>{data.message}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`channels ${chatNumber ? 'active' : ''}`}>
                        <div className='channels_avatar'>
                            <img src={chatSynergies[openChatIndex % chatSynergies.length].img} alt="" />
                        </div>
                        <div className="channels_list">
                            <div className="channels_list_head">
                                <span>Synergy name</span>
                                <div className="btn_gray" onClick={handleMenberListOpen}>
                                    <UserIcon />
                                    <span>128 </span>
                                </div>
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
                                                    <div key={index} className={`data_list_item ${openChatIndex === index ? 'active' : ''}`} onClick={() => {
                                                        handleChatOpen(index)
                                                    }}>
                                                        <HashTag />
                                                        <span>{data.chatName}</span>
                                                        {data.message ? <span className='notification'>{data.message}</span> : ''}
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
                            <button className="back_arrow" onClick={() => setchatNumber(false)}>
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
                        <div className="chat_main_body">
                            <div className="chat_container" ref={chatContainerRef}>
                                {
                                    messageDetails.messages.map((msg, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {
                                                    (index === 0 || !isEqualDate(msg.createdAt, messageDetails.messages[index - 1].createdAt)) && <div className="date_separator ">
                                                        <div className="left"></div>
                                                        <div className="date">{formatDateTime(msg.createdAt)}</div>
                                                        <div className="right"></div>
                                                    </div>
                                                }
                                                {
                                                    <div>
                                                        <div
                                                            ref={index === messageDetails.messages.length - 1 ? lastMessageRef : null}
                                                            className={`${userData.userId == msg.sender['_id'] ? 'message_send' : 'message_received'}`}
                                                        >
                                                            <div className="message">
                                                                <div className="message_left">
                                                                    <img src={chatMassageDP} alt="" />
                                                                </div>
                                                                <div className="message_right">
                                                                    <div className="messager_info">
                                                                        <div className="messager_name">{msg.sender.name}</div>
                                                                        <div className="time">{dayWiseFormat(msg.createdAt)}</div>
                                                                    </div>
                                                                    <div className="message_text">{msg.content}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </Fragment>
                                        )
                                    })
                                }
                                {/* <div className="date_separator ">
                                    <div className="left"></div>
                                    <div className="date">March 22th 2024</div>
                                    <div className="right"></div>
                                </div>

                                <div>
                                    <div className="message_received">
                                        <div className="message">
                                            <div className="message_left">
                                                <img src={chatMassageDP} alt="" />
                                            </div>
                                            <div className="message_right">
                                                <div className="messager_info">
                                                    <div className="messager_name">Sir Lancelot</div>
                                                    <div className="time">Friday 2:20pm</div>
                                                </div>
                                                <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message_received">
                                        <div className="message">
                                            <div className="message_left">
                                                <img src={chatMassageDP} alt="" />
                                            </div>
                                            <div className="message_right">
                                                <div className="messager_info">
                                                    <div className="messager_name">Robin Hood</div>
                                                    <div className="time">Friday 2:20pm</div>
                                                </div>
                                                <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                                <div className="images">
                                                    <img src={sharedImg} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="message_send">
                                        <div className="message">
                                            <div className="message_left">
                                                <img src={chatMassageDP} alt="" />
                                            </div>
                                            <div className="message_right">
                                                <div className="messager_info">
                                                    <div className="messager_name">Joan of Arc</div>
                                                    <div className="time">Friday 2:20pm</div>
                                                </div>
                                                <div className="message_text"> Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="date_separator ">
                                    <div className="left"></div>
                                    <div className="date">March 23th 2024</div>
                                    <div className="right"></div>
                                </div>

                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Sir Lancelot</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP1} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Phoenix </div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_send">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Joan of Arc</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="date_separator ">
                                    <div className="left"></div>
                                    <div className="date">March 23th 2024</div>
                                    <div className="right"></div>
                                </div>

                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Sir Lancelot</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP1} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Phoenix </div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_send">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Joan of Arc</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="date_separator ">
                                    <div className="left"></div>
                                    <div className="date">March 23th 2024</div>
                                    <div className="right"></div>
                                </div>

                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Sir Lancelot</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_received">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP1} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Phoenix </div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="message_send">
                                    <div className="message">
                                        <div className="message_left">
                                            <img src={chatMassageDP} alt="" />
                                        </div>
                                        <div className="message_right">
                                            <div className="messager_info">
                                                <div className="messager_name">Joan of Arc</div>
                                                <div className="time">Friday 2:20pm</div>
                                            </div>
                                            <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                            <div className="images">
                                                <img src={sharedImg} alt="" />
                                                <img src={chatAvtar} alt="" />
                                            </div>
                                        </div>
                                    </div> */}
                                {/* </div> */}

                                <div className={`chat_input_container ${isMenberListOpen ? 'active' : ''}`}>
                                    <div className="chat_input">
                                        <MicrophoneIcon />
                                        <input type="text" name="msg" className='input_chat_fild' id="" placeholder='Start typing' value={msg} onChange={(e) => {
                                            setMsg(e.target.value)
                                        }} onKeyDown={(e) => {
                                            handleSendMsg(e);
                                        }} />
                                        <AttechmentIcon />
                                        <EmojiFiiledIcon />
                                    </div>
                                </div>
                            </div>
                            {isMenberListOpen ?
                                <div className="members">
                                    <div className="head"> Chat members </div>

                                    <div className="members_list">
                                        <button className="btn_gray" onClick={handleMemberPopupOpen}>
                                            <span>Add user</span>
                                            < AddUserIcon />
                                        </button>
                                        <div className="list_container">
                                            <div className="list_header"> Moderators - 1 </div>
                                            <div className="list_body">

                                                <div className="list_items">
                                                    <div className="img">
                                                        <img src={member2} alt=" " />
                                                    </div>
                                                    <div className="name">
                                                        <div className="top">
                                                            <div className="top_left">{groupData[openChatIndex]?.groupAdmin?.name} </div>
                                                            {/* <div className="top_right">{data.tpye}</div> */}
                                                        </div>
                                                        {/* <div className="bottom">{data.project}</div> */}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="list_header"> Participants - {groupData[openChatIndex]?.users?.length} </div>
                                            <div className="list_body">
                                                {groupData[openChatIndex]?.users?.map((data, index) => {
                                                    return (
                                                        <div key={index} className="list_items">
                                                            <div className="img">
                                                                <img src={member1} alt=" " />
                                                            </div>
                                                            <div className="name">
                                                                <div className="top">
                                                                    <div className="top_left">{data.name} </div>
                                                                    {/* <div className="top_right">{data.tpye}</div> */}
                                                                </div>
                                                                {/* <div className="bottom">{data.project}</div> */}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div> : ''}
                        </div>
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
        </>
    )
}

export default Chats
