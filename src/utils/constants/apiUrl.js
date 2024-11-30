export const apiRoutes = {
    BASE: import.meta.env.VITE_APP_BASE_URL,
    CHAT_BASE_URL: import.meta.env.VITE_CHAT_APP_BASE_URL,
    PROJECT: '/projects',
    USER_PROJECT: '/userprojects',
    USER: '/users',

    CHAT: '/chat/group/fetch',
    CHAT_GROUP: '/chat/group/create',
    ADD_MEMBER: '/chat/group/addtogroup',
    CREATE_CHAT_USER: '/user/create',

    CHAT_ALL_USER: '/user/all',
    CHAT_MSG: '/message/all',
    SEND_MSG: '/message/send',
    PROJECT_USER: 'projectusers',
    SYNERGY: '/synergies',

    ADD_SYNERGY_REQUEST: '/synergyrequests/',
    GET_SYNERGY_REQUEST: '/synergyrequests/'

}
