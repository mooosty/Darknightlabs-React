import "./messagesPanel.scss";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import { getChatMessages } from "../../../api-services/chatApis";
import { addMessage, removeMessage } from "../../../store/slice/chatSlice";
import { useSocket } from "../../../utils/socket-provider/SocketContext";
import { AddUserIcon, AttachmentIcon, DeleteIcon, EmojiFilledIcon, member1, member2, MicrophoneIcon, SendChatIcon } from "../../../utils/constants/images";
import { formatDateTime, isEqualDate, dayWiseFormat } from "../../../utils/helper/helper";
import DeleteConfirmPopup from "../../popup/delete-confirm-popup/DeleteConfirmPopup";

const MessagesPanel = ({
  openChatIndex,
  groupData,
  setIsAddChatMemberPopupOpen,
  isMemberListOpen,
  setIsMemberListOpen,
}) => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const typingTimeoutRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [isDeletingMessagePopupOpen, setIsDeletingMessagePopupOpen] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState(null);

  const userData = useSelector((state) => state.auth);
  const groupMsg = useSelector((state) => state.chat.groupMsg);
  const groupId = groupData?.[openChatIndex]?.["_id"];
  const messages = groupId && groupMsg ? groupMsg[groupId] ?? [] : [];

  const handleMemberPopupOpen = () => {
    setIsAddChatMemberPopupOpen(true);
    setIsMemberListOpen(!isMemberListOpen);
  };

  const getMessages = () => {
    if (groupId) {
      dispatch(getChatMessages(groupId))
        .then(() => { })
        .finally(() => {
          scrollToBottom();
        });
    }
  };

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      const elements = lastMessageRef.current;
      if (elements) {
        elements.scrollIntoView();
      }
      setTimeout(() => {
        if (elements) {
          elements.scrollIntoView();
        }
      }, 0);
    }
  };

  const handleSendMsg = () => {
    if (message.trim() !== "") {
      const messageData = {
        content: message.trim(),
        chatId: groupId,
        readBy: [],
        sender: {
          email: userData.email,
          name: userData.name,
          _id: userData.userId,
        },
        chat: groupData[openChatIndex],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
        _id: uuidv4(),
      };

      socket.emit("new message", messageData);

      // dispatch(addMessage({
      //   message: messageData,
      //   groupId: groupId
      // }));

      setMessage("");
      scrollToBottom();
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        room: groupId,
        username: userData.name,
      });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop typing", groupId);
      setIsTyping(false);
    }, 3000);
  };

  const deleteMessage = (messageId, chatId) => {
    dispatch(removeMessage({ messageId, chatId }));
    socket.emit("message unsent", { messageId, chatId });
  };

  useEffect(() => {
    if (socket && groupData[openChatIndex]) {
      // Join the chat room
      socket.emit("join chat", groupId);

      // Listen for new messages
      socket.on("message received", (newMessage) => {
        dispatch(
          addMessage({
            message: newMessage,
            groupId: groupId,
          })
        );
        scrollToBottom();
      });

      // Listen for typing events
      socket.on("typing", ({ username }) => {
        setIsTyping(true);
        setTypingUser(username);
      });

      socket.on("stop typing", () => {
        setIsTyping(false);
        setTypingUser("");
      });

      // Listen for unsent messages
      socket.on("message unsent", ({ messageId, chatId }) => {
        dispatch(removeMessage({ messageId, chatId }));
      });

      return () => {
        socket.off("message received");
        socket.off("typing");
        socket.off("stop typing");
        socket.off("message unsent");
        socket.off("reaction added");
      };
    }
  }, [socket, openChatIndex, groupData]);

  useEffect(() => {
    getMessages();
  }, [openChatIndex, groupData]);
  return (
    <>
      <div className="chat_main_body">
        <div className="chat_container">
          {messages.map((message, index) => {
            
            return (
              <Fragment key={index}>
                {(index === 0 || !isEqualDate(message.createdAt, messages[index - 1].createdAt)) && (
                  <div className="date_separator ">
                    <div className="left"></div>
                    <div className="date">{formatDateTime(message.createdAt)}</div>
                    <div className="right"></div>
                  </div>
                )}
                {
                  <div>
                    <div
                      ref={index === messages.length - 1 ? lastMessageRef : null}
                      className={`message_wrap ${userData.userId == message.sender["_id"] ? "message_send" : "message_received"
                        }`}
                    >
                      <div className="message">
                        <div className="message_left">
                          <div className='user_name'>
                            {message.sender.name[0].toUpperCase()}
                          </div>
                          {/* <img src={userData.profile_picture} alt="" /> */}
                        </div>
                        <div className="message_right">
                          <div className="messenger_info">
                            <div className="messenger_name">{message.sender.name}</div>
                            <div className="time">{dayWiseFormat(message.createdAt)}</div>
                            <div
                              className="delete_icon"
                              onClick={() => {
                                setIsDeletingMessagePopupOpen(true);
                                setDeletingMessageId(message._id);
                              }}
                            >
                              <DeleteIcon />
                            </div>
                          </div>
                          <div className="message_text">{message.content}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </Fragment>
            );
          })}

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
                  <div className="messenger_info">
                    <div className="messenger_name">Sir Lancelot</div>
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
                  <div className="messenger_info">
                    <div className="messenger_name">Robin Hood</div>
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
                  <div className="messenger_info">
                    <div className="messenger_name">Joan of Arc</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Sir Lancelot</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Phoenix </div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Joan of Arc</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Sir Lancelot</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Phoenix </div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Joan of Arc</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Sir Lancelot</div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Phoenix </div>
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
                <div className="messenger_info">
                  <div className="messenger_name">Joan of Arc</div>
                  <div className="time">Friday 2:20pm</div>
                </div>
                <div className="message_text">Borem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <div className="images">
                  <img src={sharedImg} alt="" />
                  <img src={chatAvtar} alt="" />
                </div>
              </div>
            </div> */}

          <div className={`chat_input_container ${isMemberListOpen ? "active" : ""}`}>
            <div className="chat_input">
              <MicrophoneIcon />
              <input
                id="messageInput"
                type="text"
                className="input_chat_fild"
                placeholder="Start typing"
                value={message}
                onChange={handleTyping}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleSendMsg()
                }}
              />
              <AttachmentIcon />
              <EmojiFilledIcon />
              <div className={'chat_icon_wrp'} onClick={() => {
                handleSendMsg();
              }}>
                <SendChatIcon />
              </div>

              {isTyping && typingUser && (
                <div className="typing_indicator">
                  <div>
                    <span className="typing_user">{typingUser ?? "Someone"}</span> is typing...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMemberListOpen ? (
          <div className="members">
            <div className="head"> Chat members </div>

            <div className="members_list">
              <button className="btn_gray" onClick={handleMemberPopupOpen}>
                <span>Add user</span>
                <AddUserIcon />
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
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <DeleteConfirmPopup
        title="Are You Sure ?"
        description={`After once a delete message can't be recover...`}
        open={isDeletingMessagePopupOpen}
        handleClose={() => {
          setIsDeletingMessagePopupOpen(false);
        }}
        handleDelete={() => {
          deleteMessage(deletingMessageId, groupId);
          setIsDeletingMessagePopupOpen(false);
        }}
      />
    </>
  );
};

MessagesPanel.propTypes = {
  openChatIndex: PropTypes.number,
  groupData: PropTypes.array,
  isAddChatMemberPopupOpen: PropTypes.bool,
  setIsAddChatMemberPopupOpen: PropTypes.func,
  isMemberListOpen: PropTypes.bool,
  setIsMemberListOpen: PropTypes.func,
  setLoading: PropTypes.func,
  loading: PropTypes.bool,
};

export default MessagesPanel;
