import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import searchIcon from "../../../assets/search-icon.png"
import member from '../../../assets/member_img1.png'
import './addChatMemberPopup.scss'
import { AddUserIcon, LoadingIcon } from '../../../utils/SVGs/SVGs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberIntoGroup } from '../../../api-services/chatApis';

const memberList = [
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },
    {
        img: member,
        name: 'James Rich',
        mail: 'jamesrich@gmail.com'
    },

]
const AddChatMemberPopup = ({ chatId, open, handleClose }) => {
    const [isMemberInvited, setIsMemberInvited] = useState(null);
    const [selectedMember, setSelectedMember] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [filteredMember, setFilteredMember] = useState([]);
    const [initialMember, setInitialMember] = useState([]);
    const memberList = useSelector((state) => {
        return state.group.users;
    })

    const groupUser = useSelector((state) => {
        return state.group.groups.filter((group) => {
            return group['_id'] === chatId;
        });
    })

    const dispatch = useDispatch();

    const handleSelcteMember = (userId) => {
        let tmpSelectedMember = [...selectedMember]
        const project = tmpSelectedMember.find((id) => id === userId)
        if (project) {
            tmpSelectedMember = tmpSelectedMember.filter((item) => item !== userId)
        } else {
            tmpSelectedMember.push(userId)
        }
        setSelectedMember([...tmpSelectedMember])
    }

    const handleAddmember = () => {
        const responseArr = selectedMember.map((memberId) => {
            const data = {
                "chatId": chatId,
                "userId": memberId
            }
            dispatch(addMemberIntoGroup(data));
        })

        Promise.allSettled(responseArr).then(() => setSelectedMember([]));
        handleClose();
    }

    const handleInvite = (index) => {
        setIsMemberInvited(index)
    }

    const handleSearch = (value) => {
        setSearchUser(value);
        if (value !== '') {
            const tempArr = initialMember.filter((member) => {
                return member.name.indexOf(value) !== -1;
            })
            setFilteredMember([...tempArr]);
        }
        else {
            setFilteredMember([...initialMember])
        }
    }

    useEffect(() => {
        if (searchUser !== '')
            handleSearch(searchUser);
    }, [initialMember])

    useEffect(() => {
        const userIdArr = groupUser?.[0]?.users?.map((user) => user['_id']);
        const tmpArr = memberList.filter((member) => {
            return !userIdArr?.includes(member?.['_id']);
        });
        setFilteredMember([...tmpArr])
        setInitialMember([...tmpArr])
    }, [memberList, groupUser.length])


    return (
        <>
            <div className={`model_bg ${open ? 'active' : ''} `}>
                <div
                    className={`add_angel_popup`}
                >
                    <div className='model_box'>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new member</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <img src={closeIcon} alt="close" />
                                </button>
                            </div>
                            <div className="member_list_main">
                                <div className="search_box">
                                    <img className="search_icon" src={searchIcon} alt="Search" />
                                    <input type="text" placeholder="Search" onChange={(e) => {
                                        console.log('searching :>> ', );
                                        handleSearch(e.target.value)
                                    }} />
                                </div>
                                <div className="member_list_box">
                                    <div className="list">
                                        {filteredMember.map((data, index) => {
                                            return (
                                                <div key={index} className="member_list_item">
                                                    <div className="item_left">
                                                        <div className="costum_checkbox">
                                                            <input type="checkbox" id={`checkBox_${index}`} className='costum_checkbox_input' defaultChecked={selectedMember.includes(data['_id'])} onClick={() => handleSelcteMember(data['_id'])} />
                                                            <label htmlFor={`checkBox_${index}`} className='costum_checkbox_label'></label>
                                                        </div>
                                                        <div className="item_name">
                                                            <div className="image">
                                                                <img src={member} alt="" />
                                                            </div>
                                                            <div className="name">
                                                                <div className="top">{data.name}</div>
                                                                <div className="bottom">{data.mail}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item_right">
                                                        <button className='add_btn' onClick={() => handleInvite(index)} >
                                                            {isMemberInvited === index ?
                                                                <span className='processing'>
                                                                    <span>Pending</span>
                                                                    <LoadingIcon />
                                                                </span>
                                                                :
                                                                <span className='invite'>
                                                                    <span>Invite</span>
                                                                    <AddUserIcon />
                                                                </span>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='model_footer'>
                            <button className='cancel_btn' onClick={() => { handleClose() }}>Cancel</button>
                            <button className='add_btn' onClick={handleAddmember}>Add members</button>
                        </div>
                    </div>

                    <div className='mobile_view'>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new member</h3>
                            </div>
                            <div className="member_list_main">
                                <div className="search_box">
                                    <img className="search_icon" src={searchIcon} alt="Search" />
                                    <input type="text" placeholder="Search" onChange={(e) => {
                                        handleSearch(e.target.value)
                                    }}/>
                                </div>
                                <div className="member_list_box">
                                    <div className="list">
                                        {filteredMember.map((data, index) => {
                                            return (
                                                <div key={index} className="member_list_item">
                                                    <div className="item_left">
                                                        <div className="costum_checkboxs">
                                                            <input type="checkbox" id={`add_member_checkbox_${index}`} defaultChecked={selectedMember.includes(data['_id'])} name='add_member_checkbox' className='costum_checkbox_inputs' />
                                                            <label htmlFor={`add_member_checkbox_${index}`} className='costum_checkbox_labels'></label>
                                                        </div>
                                                        <div className="item_name">
                                                            <div className="image">
                                                                <img src={data.img} alt="" />
                                                            </div>
                                                            <div className="name">
                                                                <div className="top">{data.name}</div>
                                                                <div className="bottom">{data.mail}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item_right">
                                                        <button className='add_btn' onClick={() => handleInvite(index)}>
                                                            {isMemberInvited === index ?
                                                                <span className='processing'>
                                                                    <span>Pending</span>
                                                                    <LoadingIcon />
                                                                </span>
                                                                :
                                                                <span className='invite'>
                                                                    <span>Invite</span>
                                                                    <AddUserIcon />
                                                                </span>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='model_footer'>
                            <button className='cancel_btn' onClick={() => { handleClose() }}>Cancel</button>
                            <button className='add_btn' onClick={() => { handleClose() }}>Add members</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AddChatMemberPopup.propTypes = {
    open: PropTypes.bool,   
    handleClose: PropTypes.func,
    chatId: PropTypes.string
}

export default AddChatMemberPopup