import './chats.scss';
import chatSynergies1 from '../../assets/chat-synergies-1.png'
import chatSynergies2 from '../../assets/chat-synergies-2.png'
import chatSynergies3 from '../../assets/chat-synergies-3.png'
import chatSynergies4 from '../../assets/chat-synergies-4.png'
import chatSynergies5 from '../../assets/chat-synergies-5.png'
import chatSynergies6 from '../../assets/chat-synergies-6.png'
import chatSynergies7 from '../../assets/chat-synergies-7.png'
import chatSynergies8 from '../../assets/chat-synergies-8.png'
import member1 from '../../assets/member_img1.png'
import member2 from '../../assets/member_img2.png'
import member3 from '../../assets/member_img3.png'
import member4 from '../../assets/member_img4.png'
import member5 from '../../assets/member_img5.png'
import member6 from '../../assets/member_img6.png'
import member7 from '../../assets/member_img7.png'
import member8 from '../../assets/member_img8.png'
import member9 from '../../assets/member_img9.png'
import member10 from '../../assets/member_img10.png'
import member11 from '../../assets/member_img11.png'
import member12 from '../../assets/member_img12.png'
import member13 from '../../assets/member_img13.png'
import chatAvtar from '../../assets/chat-avtar.png'
import chatMassageDP from '../../assets/chat-message-dp.png'
import chatMassageDP1 from '../../assets/chat-message-dp1.png'
import sharedImg from '../../assets/chat_shared-image.png'
import { AddUserIcon, AttechmentIcon, DownAccordionIcon, EmojiFiiledIcon, HashTag, MicrophoneIcon, UserIcon } from '../../utils/SVGs/SVGs';
import { useEffect, useState } from 'react';
import AddChatMemberPopup from '../../components/popup/add-chat-menber-popup/AddChatMemberPopup'
import ChatMembers from '../../components/chat-members/ChatMembers';
import { getGroupsAPI } from '../../api-services/chatApis';
import { useDispatch,useSelector } from 'react-redux';

const chatSynergies = [
    {
        "img": chatSynergies1,
        "message": 1
    },
    {
        "img": chatSynergies2,
        "message": null
    },
    {
        "img": chatSynergies3,
        "message": null
    },
    {
        "img": chatSynergies4,
        "message": null
    },
    {
        "img": chatSynergies5,
        "message": null
    },
    {
        "img": chatSynergies6,
        "message": null
    },
    {
        "img": chatSynergies7,
        "message": 16
    },
    {
        "img": chatSynergies8,
        "message": 22
    },
]
const channelsList = [
    {
        name: 'General discution',
        message: 1
    },
    {
        name: 'Lorem ipsum',
        message: null
    },
    {
        name: 'Lorem ipsum',
        message: null
    },
    {
        name: 'Lorem ipsum',
        message: null
    },
]

const moderatorList = [
    {
        img: member1,
        name: 'James Rich',
        project: 'Darknight Labs',
        tpye: 'auto'
    },
    {
        img: member2,
        name: 'Julia Sunny',
        project: 'Darknight Labs',
        tpye: 'auto'
    },
    {
        img: member3,
        name: 'Moana Smith',
        project: '“Synergy name”',
        tpye: 'auto'
    },
    {
        img: member4,
        name: 'Fiona Adams',
        project: 'Moderator',
        tpye: 'auto'
    },
]

const participantList = [
    {
        img: member5,
        name: 'Sir Lancelot',
        tpye: 'MANUAL'
    },
    {
        img: member6,
        name: 'Joan of Arc',
        tpye: 'AUTO'
    },
    {
        img: member7,
        name: 'Phoenix',
        tpye: 'AUTO'
    },
    {
        img: member8,
        name: 'Robin Hood',
        tpye: 'MANUAL'
    },
    {
        img: member9,
        name: 'supero',
        tpye: 'AUTO'
    },
    {
        img: member7,
        name: 'Phoenix',
        tpye: 'AUTO'
    },
    {
        img: member8,
        name: 'Robin Hood',
        tpye: 'MANUAL'
    },
    {
        img: member9,
        name: 'supero',
        tpye: 'AUTO'
    },
    {
        img: member10,
        name: 'meowart',
        tpye: 'MANUAL'
    },
    {
        img: member11,
        name: 'punicher',
        tpye: 'AUTO'
    },
    {
        img: member12,
        name: 'kitycatty',
        tpye: 'MANUAL'
    },
    {
        img: member13,
        name: 'blazerrr',
        tpye: 'auto'
    },
    {
        img: member11,
        name: 'punicher',
        tpye: 'AUTO'
    },
    {
        img: member12,
        name: 'kitycatty',
        tpye: 'MANUAL'
    },
    {
        img: member13,
        name: 'blazerrr',
        tpye: 'auto'
    },
    {
        img: member12,
        name: 'kitycatty',
        tpye: 'MANUAL'
    },
]

const Chats = () => {
    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(0);
    const [isMenberListOpen, setIsMenberListOpen] = useState(false);
    const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
    const [chatNumber, setchatNumber] = useState(false);
    const [isChatMembersOpen, setIsChatMembersOpen] = useState(false);

    const data=useSelector((state)=>{return state.auth})
    console.log('data :>> ', data);

    const dispatch = useDispatch();


    const handleChannelOpen = () => {
        setIsChannelOpen(!isChannelOpen);
    }

    const handleChatOpen = (index) => {
        setIsChatOpen(index);
        setchatNumber(true)
    }

    const handleMenberListOpen = () => {
        setIsMenberListOpen(!isMenberListOpen);
        setIsChatMembersOpen(true);
    }
    const handleMemberPopupOpen = () => {
        setIsAddChatMemberPopupOpen(true)
        setIsMenberListOpen(!isMenberListOpen);

    }

    useEffect(()=>{
        dispatch(getGroupsAPI())
    },[])


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
                        {
                            chatSynergies.map((data, index) => {
                                return (
                                    <div key={index} className='avtar_img'>
                                        <img src={data.img} alt="" />
                                        <div className={data.message ? "notification" : ''}>{data.message}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`channels ${chatNumber ? 'active' : ''}`}>
                        <div className='channels_avtar'>
                            <img src={chatAvtar} alt="" />
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
                                        {channelsList.map((data, index) => {
                                            return (
                                                <>
                                                    {isChatOpen === index ?
                                                        <div key={index} className='data_list_item active' onClick={() => handleChatOpen(index)}>
                                                            <HashTag />
                                                            <span>{data.name}</span>
                                                            {data.message ? <span className='notification'>{data.message}</span> : ''}
                                                        </div>
                                                        :
                                                        <div key={index} className={'data_list_item'} onClick={() => handleChatOpen(index)}>
                                                            <HashTag />
                                                            <span>{data.name}</span>
                                                            {data.message ? <span className='notification'>{data.message}</span> : ''}
                                                        </div>}
                                                </>
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
                                <span>General discution</span>
                            </div>
                            <div className="head_right">
                                <div className="btn_gray" onClick={handleMenberListOpen}>
                                    <UserIcon />
                                    <span>128 </span>
                                </div>
                            </div>
                        </div>
                        <div className="chat_main_body">
                            <div className="chat_container">
                                <div className="date_separator ">
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
                                    </div>
                                </div>
                            
                            <div className={`chat_input_container ${isMenberListOpen ? 'active':''}`}>
                                <div className="chat_input">
                                    <MicrophoneIcon />
                                    <input type="text" name="" className='input_chat_fild ' id="" placeholder='Start typing' />
                                    <AttechmentIcon />
                                    <EmojiFiiledIcon />
                                </div>
                            </div></div>
                            {isMenberListOpen ?
                                <div className="members">
                                    <div className="head"> Chat members </div>

                                    <div className="members_list">
                                        <button className="btn_gray" onClick={handleMemberPopupOpen }>
                                            <span>Add user</span>
                                            < AddUserIcon />
                                        </button>
                                        <div className="list_container">
                                            <div className="list_header"> Moderators - {moderatorList.length} </div>
                                            <div className="list_body">
                                                {moderatorList.map((data, index) => {
                                                    return (
                                                        <div key={index} className="list_items">
                                                            <div className="img">
                                                                <img src={data.img} alt=" " />
                                                            </div>
                                                            <div className="name">
                                                                <div className="top">
                                                                    <div className="top_left">{data.name} </div>
                                                                    <div className="top_right">{data.tpye}</div>
                                                                </div>
                                                                <div className="bottom">{data.project}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="list_header"> Participants - {participantList.length} </div>
                                            <div className="list_body">
                                                {participantList.map((data, index) => {
                                                    return (
                                                        <div key={index} className="list_items">
                                                            <div className="img">
                                                                <img src={data.img} alt=" " />
                                                            </div>
                                                            <div className="name">
                                                                <div className="top">
                                                                    <div className="top_left">{data.name} </div>
                                                                    <div className="top_right">{data.tpye}</div>
                                                                </div>
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

            <AddChatMemberPopup
                open={isAddChatMemberPopupOpen}
                handleClose={() => setIsAddChatMemberPopupOpen(false)}
            />
            <ChatMembers
                open={isChatMembersOpen}
                handleClose={() => setIsChatMembersOpen(false)}
            />
        </>
    )
}

export default Chats
