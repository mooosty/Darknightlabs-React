import PropTypes from 'prop-types';
import closeIcon from '../../../assets/X-icon.png'
import searchIcon from "../../../assets/search-icon.png"
import member from '../../../assets/member_img1.png'
import './addChatMemberPopup.scss'
import { AddUserIcon, LoadingIcon } from '../../../utils/SVGs/SVGs';
import { useState } from 'react';
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
const AddChatMemberPopup = ({ open, handleClose }) => {
    const [isMemberInvited, setIsMemberInvited] = useState(null);

    const handleInvite = (index) => {
        setIsMemberInvited(index)
    }

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
                                    <input type="text" placeholder="Search" />
                                </div>
                                <div className="member_list_box">
                                    <div className="list">
                                        {memberList.map((data, index) => {
                                            return (
                                                <div key={index} className="member_list_item">
                                                    <div className="item_left">
                                                        <div className="costum_checkbox">
                                                            <input type="checkbox" id={`checkBox_${index}`} className='costum_checkbox_input' />
                                                            <label htmlFor={`checkBox_${index}`} className='costum_checkbox_label'></label>
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
                            <button className='add_btn' onClick={() => { handleClose() }}>Add members</button>
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
                                    <input type="text" placeholder="Search" />
                                </div>
                                <div className="member_list_box">
                                    <div className="list">
                                        {memberList.map((data, index) => {
                                            return (
                                                <div key={index} className="member_list_item">
                                                    <div className="item_left">
                                                        <div className="costum_checkboxs">
                                                            <input type="checkbox" id={`add_member_checkbox_${index}`} checked={true} name='add_member_checkbox' className='costum_checkbox_inputs' />
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
}

export default AddChatMemberPopup