export const apiRoutes = {
    BASE: import.meta.env.VITE_APP_BASE_URL,
    CHATBASEURL: import.meta.env.CHAT_VITE_APP_BASE_URL,
    PROJECT: '/projects',
    USER_PROJECT: '/userprojects',
    USER: '/users',

    CHAT: '/chat/group/fetch',
    CHATGROUP: '/chat/group/create',
    ADDMEMBER: '/chat/group/addtogroup',
    CREATE_CHAT_USER: '/user/create',

    CHATALLUSER: '/user/all',
    CHATMSG: '/message/all',
    SENDMSG: '/message/send',
    PROJECTUSER: 'projectusers',
    SYNERGY: '/synergies'
}
