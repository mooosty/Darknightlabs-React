import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRoutes } from "../utils/constants/apiUrl"
import { axiosApi } from './index'

export const getUsersAPI = createAsyncThunk('/users',
    async (thunkAPI) => {
        const response = await axiosApi.get(apiRoutes.USER)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const getUsersDetailsAPI = createAsyncThunk('/users/:id',
    async (id, thunkAPI) => {
        const response = await axiosApi.get(`${apiRoutes.USER}/${id}`)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const editUserProfileAPI = createAsyncThunk('/user',
    async (data, thunkAPI) => {
        const response = await axiosApi.patch(apiRoutes.USER, data)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const updatePasswordAPI = createAsyncThunk('/users/change-password',
    async (data, thunkAPI) => {
        const response = await axiosApi.patch(apiRoutes.CHANGE_PASSWORD, data)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)
