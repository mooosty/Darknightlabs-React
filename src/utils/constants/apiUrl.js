export const apiRoutes = {
    BASE: import.meta.env.VITE_APP_BASE_URL,
    CHATBASEURL: import.meta.env.CHAT_VITE_APP_BASE_URL,
    PROJECT: '/projects',
    USER_PROJECT:'/userprojects',
    USER:'/users',
    chat: '/chat/group/fetch',
    CHATALLUSER:'/user/all',
    CHATMSG:'/message/all',
    SENDMSG:'/message/send',
    ADDMEMBER:'/chat/group/addtogroup'
}
