import './addChatMemberPopup.scss'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Loader } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberIntoGroup } from '../../../api-services/chatApis';
import { AddUserIcon, CloseIcon, member, SearchIcon } from '../../../utils/constants/images';
import { useClickOutside } from '../../../utils/hooks/useClickOutside';


const AddChatMemberPopup = ({ chatId, open, handleClose }) => {
    const dispatch = useDispatch();
    const [isMemberInvited, setIsMemberInvited] = useState(null);
    const [selectedMember, setSelectedMember] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [filteredMember, setFilteredMember] = useState([]);
    const [initialMember, setInitialMember] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const memberList = useSelector((state) => state.group.users)
    const groupUser = useSelector((state) => {
        return state.group.groups.filter((group) => {
            return group['_id'] === chatId;
        });
    })

    const closeRef = useClickOutside(() => {
        handleClose()
    })

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
            return dispatch(addMemberIntoGroup(data));
        })

        setIsLoading(true);
        Promise.allSettled(responseArr).then(() => {
            setSelectedMember([])
            handleClose();
        }).finally(() => {
            setIsLoading(false);
        })

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
        const userIdArr = groupUser?.[0]?.users?.map((user) => user['_id']) ?? [];
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
                    className={`add_chatMember_popup`}
                >
                    <div className='model_box' ref={closeRef}>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new member</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className="member_list_main">
                                <div className="search_box">
                                    <span className="search_icon"><SearchIcon /></span>
                                    <input type="text" placeholder="Search" onChange={(e) => {
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
                                                                    {/* <LoadingIcon /> */}
                                                                    <Loader isItForButton={true} loading={true} />
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
                            <button className='add_btn' onClick={handleAddmember} disabled={isLoading}>{isLoading && <Loader isItForButton={true} loading={isLoading} />} Add members</button>
                        </div>
                    </div>

                    <div className='mobile_view' ref={closeRef}>
                        <div className='model_body'>
                            <div className='model_header'>
                                <h3>Add new member</h3>
                                <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <CloseIcon />
                                </button>
                            </div>

                            {/* <button
                                    onClick={() => {
                                        handleClose()
                                    }}
                                >
                                    <CloseIcon />
                                </button> */}
                            <div className="member_list_main">
                                <div className="search_box">
                                    <span className="search_icon"><SearchIcon /></span>
                                    <input type="text" placeholder="Search" onChange={(e) => {
                                        handleSearch(e.target.value)
                                    }} />
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
                                                                    {/* <LoadingIcon /> */}
                                                                    <Loader isItForButton={true} loading={true} />
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
                            <button className='add_btn' onClick={() => { handleClose() }} disabled={isLoading}>
                                {isLoading && <Loader isItForButton={true} loading={isLoading} />} Add members
                            </button>
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