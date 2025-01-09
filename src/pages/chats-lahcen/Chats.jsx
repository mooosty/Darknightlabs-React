import "./chats.scss";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getGroupsAPI } from "../../api-services/chatApis";
import {
  DownAccordionIcon,
  HashTag,
  synergy1,
  synergy2,
  synergy3,
  synergy4,
  synergy5,
  UserIcon,
} from "../../utils/constants/images";
import { AddChatMemberPopup, ChatMembers, Loader, MessagesPanel } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../../utils/routes/routes";
import { useSocket } from "../../utils/socket-provider/SocketContext";

const chatSynergies = [{ img: synergy1 }, { img: synergy2 }, { img: synergy3 }, { img: synergy4 }, { img: synergy5 }];

const Chats = () => {
  const { id } = useParams();
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chatNumber, setChatNumber] = useState(false);
  const [openChatIndex, setOpenChatIndex] = useState(0);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isMemberListOpen, setIsMemberListOpen] = useState(false);
  const [isAddChatMemberPopupOpen, setIsAddChatMemberPopupOpen] = useState(false);
  const [isChatMembersOpen, setIsChatMembersOpen] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState({});

  const groupData = useSelector((state) => state.group.groups);
  const chatApiLoading = useSelector((state) => state.chat.isLoading);
  const groupApiLoading = useSelector((state) => state.group.isLoading);
  const userData = useSelector((state) => state.auth);

  const handleChannelOpen = () => {
    setIsChannelOpen(!isChannelOpen);
  };

  const handleChatOpen = (index) => {
    navigate(`/${ROUTER.chat}/${index}`);
  };

  const handleMenberListOpen = () => {
    setIsMemberListOpen(!isMemberListOpen);
    setIsChatMembersOpen(true);
  };

  useEffect(() => {
    if (id) {
      setOpenChatIndex(id);
      setChatNumber(true);
    } else {
      setChatNumber(false);
    }
  }, [id]);

  useEffect(() => {
    dispatch(getGroupsAPI());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message count", ({ chatId, count }) => {
        console.log("message count", chatId, count);
        setUnreadMessageCount((prev) => ({
          ...prev,
          [chatId]: count,
        }));
      });

      socket.on("new message count", ({ chatId, count }) => {
        console.log("new message count", chatId, count);
        setUnreadMessageCount((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] || 0) + count,
        }));
      });

      socket.on("messages marked read", ({ chatId }) => {
        console.log("messages marked read", chatId);
        setUnreadMessageCount((prev) => ({
          ...prev,
          [chatId]: 0,
        }));
      });

      return () => {
        socket.off("message count");
        socket.off("new message count");
        socket.off("messages marked read");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket && openChatIndex && groupData[openChatIndex]) {
      socket.emit("mark messages read", {
        chatId: groupData[openChatIndex]._id,
        userId: userData.userId,
      });
    }
  }, [socket, openChatIndex, userData]);

  useEffect(() => {
    if (socket && groupData.length > 0 && userData.userId) {
      groupData.forEach((group) => {
        console.log("group", group);
        socket.emit("fetch message count", {
          chatId: group._id,
          userId: userData.userId,
        });
      });
    }
  }, [groupData.length, userData.userId]);


  const [openChatIndexNew , setOpenChatIndexNew] = useState(0);

  const [chats, setChats] = useState(
    [...Array(15)].map((_, index) => ({
      id: index + 1,
      name: `Chat ${index + 1}`,
      unread: Math.floor(Math.random() * 10),
      image: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 100)}`,
    }))
  );



  const [messages, setMessages] = useState(
    chats.map((chat) => Array.from({ length: Math.floor(Math.random() * 15) + 1 }, (_, index) => ({
      text: `Chat ${chat.id} message ${index + 1}`,
      me: Math.random() < 0.5,
    })))
  );



const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);


  return (
    // <div className={`chat_main_wrap ${chatNumber ? "hide" : ""}`}>
    //   <div className="chat_content_header">
    //     <div className="content_left">
    //       <h2>Chat</h2>
    //     </div>
    //     <div className="content_right">
    //       <a href="#">Darknight Labs</a>
    //     </div>
    //   </div>

    //   <div className="chat_wrap">
    //     <div className="chat_conternt">
    //       <div className={`channels ${chatNumber ? "active" : ""}`}>
    //         <div className="channels_avatar">
    //           <img src={chatSynergies[openChatIndex % chatSynergies?.length].img} alt="" />
    //         </div>
    //         <div className="channels_list">
    //           <div className="channels_list_data">
    //             <div className="data_header" onClick={handleChannelOpen}>
    //               <span>Channels</span>
    //               <div className={`arrow ${isChannelOpen ? "active" : ""}`}>
    //                 <DownAccordionIcon />
    //               </div>
    //             </div>
    //             {!isChannelOpen ? (
    //               <div className="data_list">
    //                 {groupData.map((data, index) => {
    //                   return (
    //                     <Fragment key={index}>
    //                       <div
    //                         key={index}
    //                         className={`data_list_item ${openChatIndex == index ? "active" : ""}`}
    //                         onClick={() => {
    //                           handleChatOpen(index);
    //                         }}
    //                       >
    //                         <HashTag />
    //                         <span>{data.chatName}</span>
    //                         {unreadMessageCount[data._id] > 0 ? (
    //                           <span className="notification">{unreadMessageCount[data._id]}</span>
    //                         ) : (
    //                           ""
    //                         )}
    //                       </div>
    //                     </Fragment>
    //                   );
    //                 })}
    //               </div>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </div>
    //       </div>

    //       <div className={`chat_main ${chatNumber ? "active" : ""}`}>
    //         <div className="chat_main_head">
    //           <button className="back_arrow" onClick={() => setChatNumber(false)}>
    //             <DownAccordionIcon />
    //           </button>
    //           <div className="head_left">
    //             <HashTag />
    //             <span>{groupData.length > 0 && groupData[openChatIndex]["chatName"]}</span>
    //           </div>
    //           <div className="head_right">
    //             <div className="btn_gray" onClick={handleMenberListOpen}>
    //               <UserIcon />
    //               <span>{groupData.length > 0 && groupData[openChatIndex].users.length} </span>
    //             </div>
    //           </div>
    //         </div>

    //         <MessagesPanel
    //           openChatIndex={openChatIndex}
    //           groupData={groupData}
    //           setIsAddChatMemberPopupOpen={setIsAddChatMemberPopupOpen}
    //           isMemberListOpen={isMemberListOpen}
    //           setIsMemberListOpen={setIsMemberListOpen}
    //           setLoading={setLoading}
    //           loading={loading}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   {isAddChatMemberPopupOpen && (
    //     <AddChatMemberPopup
    //       open={isAddChatMemberPopupOpen}
    //       handleClose={() => setIsAddChatMemberPopupOpen(false)}
    //       chatId={groupData[openChatIndex]?.["_id"]}
    //     />
    //   )}

    //   <ChatMembers
    //     open={isChatMembersOpen}
    //     handleClose={() => setIsChatMembersOpen(false)}
    //     handleOpenAddMemberPopup={() => {
    //       setIsAddChatMemberPopupOpen(true);
    //       setIsChatMembersOpen(false);
    //     }}
    //     groupData={groupData}
    //     openChatIndex={openChatIndex}
    //   />

    //   <Loader loading={chatApiLoading || groupApiLoading || loading} />
    // </div>

    <div style={{ width: "100%", height: `calc(100vh - ${windowWidth < 985 ? "180px" : "130px"})`, background: "rgba(255, 0, 0, 0.3)" }}>
      <div>
        <h1>Chats</h1>
      </div>
      <div style={{ background: "rgba(0, 255, 0, 0.3)", height: "calc(100% - 64px)", width: "100%", display: "flex", flexDirection: "row", }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
          <div style={{ width: "100%", height: "150px" }}>
            <img src={synergy1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ backgroundColor: "gray", height: "calc(100% - 150px)", overflowY: "auto" }}>
            {chats.map((_, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", padding: "10px", color: index === openChatIndexNew ? "#DAA520" : "black", cursor: "pointer" }}
                onClick={() => setOpenChatIndexNew(index)}
              >
              
                {window.innerWidth < 985 ? (
                  <img src={chatSynergies[index % chatSynergies.length].img} alt="" style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
                ) : (
                  <span># Chat Channel {index + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 8 }}>



        <div style={{ flex: 8, display: 'flex', flexDirection: 'column', background: 'rgba(0, 0, 255, 0.1)', height: `calc(100vh - ${windowWidth < 985 ? "220px" : "180px"})`, }}>
          <div style={{ height: '50px', backgroundColor: '#f1f1f1', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
            <h2>Chat Channel {openChatIndexNew + 1}</h2>  
          </div>
          <div style={{ flex: 1, height: '100px', padding: '20px', backgroundColor: 'rgba(0, 0, 255, 0.4)', overflowY: "auto" }}>
            {/* {JSON.stringify(messages)} */}
            {messages.map((_, index) => (
              <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                {index % 2 === 0 ? (
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#f1f1f1', padding: '10px', borderRadius: '10px' ,    marginRight: '10px'   }}>
                      Hello, this is a message!
                    </div>
                    <img src={chatSynergies[Math.floor(Math.random() * chatSynergies.length)].img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <img src={chatSynergies[Math.floor(Math.random() * chatSynergies.length)].img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', border: '2px solid #DAA520' }} />
                    <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '15px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', maxWidth: '70%' }}>
                      <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>Hello, this is a message!</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ height: '50px', display: 'flex', alignItems: 'center', padding: '0 20px', backgroundColor: '#f1f1f1' }}>
            <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '10px', marginRight: '10px' }} />
            <button style={{ padding: '10px 20px' }}>Send</button>
          </div>
        </div>



 
        </div>
      </div>
    </div>
  );
};

export default Chats;
