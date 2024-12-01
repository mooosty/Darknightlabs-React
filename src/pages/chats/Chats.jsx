import './chats.scss';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getGroupsAPI } from '../../api-services/chatApis';
import { DownAccordionIcon, HashTag, UserIcon } from '../../utils/SVGs/SVGs';
import { synergy1, synergy2, synergy3, synergy4, synergy5 } from '../../utils/constants/images';
import { AddChatMemberPopup, ChatMembers, Loader, MessagesPanel } from '../../components';

const chatSynergies = [{ "img": synergy1 }, { "img": synergy2 }, { "img": synergy3 }, { "img": synergy4 }, { "img": synergy5 }]


const Chats = () => {
    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [openChatIndex, setOpenChatIndex] = useState(0);
    const [isMemberListOpen, setIsMemberListOpen] = useState(false);
    const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
    const [chatNumber, setChatNumber] = useState(false);
    const [isChatMembersOpen, setIsChatMembersOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const groupData = useSelector((state) => state.group.groups)
    const chatApiLoading = useSelector((state) => state.chat.isLoading)
    const groupApiLoading = useSelector((state) => state.group.isLoading)

    const dispatch = useDispatch();


    const handleChannelOpen = () => {
        setIsChannelOpen(!isChannelOpen);
    }

    const handleChatOpen = (index) => {
        setOpenChatIndex(index);
        setChatNumber(true)
    }

    const handleMenberListOpen = () => {
        setIsMemberListOpen(!isMemberListOpen);
        setIsChatMembersOpen(true);
    }


    useEffect(() => {
        dispatch(getGroupsAPI())
        dispatch(getAllUsers())
    }, [])


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
        </>
    )
}

export default Chats
