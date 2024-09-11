import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRoutes } from "../utils/constants/apiUrl"
import { chatAxiosApi } from './index'

export const getGroupsAPI = createAsyncThunk('chat/group/get',
    async (thunkAPI) => {
        const response = await chatAxiosApi.get(apiRoutes.chat )
        if (response?.status)
            return response.data;
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const addUserToChat = createAsyncThunk('chat/add_user',
    async (data, thunkAPI) => {
        const response = await chatAxiosApi.post(apiRoutes.chat + '/addtogroup', { data: data })
        if (response?.statusText === 'OK') return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const getAllUsers = createAsyncThunk('chat/user/get',
    async (thunkAPI) => {
        const response = await chatAxiosApi.get(apiRoutes.CHATALLUSER)
        if (response?.data.status)
            return response.data;
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const getChatMessages = createAsyncThunk('chat/message/get',
    async (data, thunkAPI) => {
        const response = await chatAxiosApi.get(apiRoutes.CHATMSG + `/${data}`)
        if (response?.status)
            return {
                response: response.data,
                groupId:data
            };
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const sendMsg = createAsyncThunk('chat/message/send',
    async (data, thunkAPI) => {
        const response = await chatAxiosApi.post(apiRoutes.SENDMSG,data)
        if (response?.status)
            return response.data;
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const addMemberIntoGroup = createAsyncThunk('grouop/member/add',
    async (data, thunkAPI) => {
        const response = await chatAxiosApi.post(apiRoutes.ADDMEMBER,data)
        if (response?.status)
            return response.data;
        else return thunkAPI.rejectWithValue(response?.data)
    }
)