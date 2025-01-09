import './chatsMembers.scss'
import PropTypes from 'prop-types';
import { AddUserIcon, CloseIcon, member1, member2 } from '../../../utils/constants/images';
import { useClickOutside } from '../../../utils/hooks/useClickOutside';

const ChatMembers = ({ open, handleClose, groupData, openChatIndex, handleOpenAddMemberPopup }) => {

    const closeRef = useClickOutside(() => {
        handleClose()
    })

    return (
        <>
            <div className={`menu_contianer ${open ? 'active' : ''} `}>

                <div className="menu" ref={closeRef}>
                    <div className="members">
                        <div className="head">
                            Chat members
                            <button
                                onClick={() => {
                                    handleClose()
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>
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
                                <AddUserIcon />
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
    openChatIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    handleOpenAddMemberPopup: PropTypes.func
}

export default ChatMembers
