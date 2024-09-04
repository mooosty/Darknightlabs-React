import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRoutes } from "../utils/constants/apiUrl"
import { axiosApi } from './index'

export const getGroupsAPI = createAsyncThunk('chat/group/get',
    async (thunkAPI) => {
        const response = await axiosApi.get(apiRoutes.chat+'/get')
        if (response?.statusText === 'OK') return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const addUserToChat= createAsyncThunk('chat/add_user',
    async (data,thunkAPI) => {
        const response = await axiosApi.post(apiRoutes.chat+'/addtogroup',{data:data})
        if (response?.statusText === 'OK') return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)