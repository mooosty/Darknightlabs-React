import PropTypes from 'prop-types';
import { AddUserIcon } from '../../utils/SVGs/SVGs'
import './chatsMembers.scss'
import { useState } from 'react';
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
import AddChatMemberPopup from '../popup/add-chat-menber-popup/AddChatMemberPopup';
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
        img: member10,
        name: 'meowart',
        tpye: 'MANUAL'
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

const ChatMembers = ({ open, handleClose }) => {
    const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
    const handlePopup = () => {
        setIsAddChatMemberPopupOpen(true)
        handleClose()
    }

    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>

                <div className="menu">
                    <div className="members">
                        <div className="head"> Chat members </div>

                        <div className="members_list">

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
                            <button className="btn_gray" onClick={handlePopup}>
                                <span>Add user</span>
                                < AddUserIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AddChatMemberPopup
                open={isAddChatMemberPopupOpen}
                handleClose={() => setIsAddChatMemberPopupOpen(false)}
            />
        </>
    )
}
ChatMembers.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default ChatMembers
