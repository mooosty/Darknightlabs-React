import PropTypes from 'prop-types';
import './chatsMembers.scss'
import { member1, member2 } from '../../../utils/constants/images'
import { AddUserIcon } from '../../../utils/SVGs/SVGs'

const ChatMembers = ({ open, groupData, openChatIndex, handleOpenAddMemberPopup }) => {

    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>

                <div className="menu">
                    <div className="members">
                        <div className="head"> Chat members </div>

                        <div className="members_list">
                            <div className="list_container">
                                <div className="list_header"> Moderators - {1} </div>
                                <div className="list_body">
                                    {/* {moderatorList.map((data, index) => {
                                        return ( */}
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
                                    {/* )
                                    })} */}
                                </div>
                                <div className="list_header"> Participants - {groupData[openChatIndex]?.users.length} </div>
                                <div className="list_body">
                                    {groupData?.[openChatIndex]?.users.map((data, index) => {
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
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <button className="btn_gray" onClick={handleOpenAddMemberPopup}>
                                <span>Add user</span>
                                < AddUserIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
ChatMembers.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    groupData: PropTypes.array,
    openChatIndex: PropTypes.number,
    handleOpenAddMemberPopup: PropTypes.func
}

export default ChatMembers
