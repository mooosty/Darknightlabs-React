import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRoutes } from "../utils/constants/apiUrl"
import { axiosApi } from './index'

export const getProjectsAPI = createAsyncThunk('project/get',
    async (data, thunkAPI) => {
        const response = await axiosApi.get(apiRoutes.PROJECT, data)
        if (response?.statusText === 'OK') return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const addProjectAPI = createAsyncThunk('project/add',
    async (data, thunkAPI) => {
        const response = await axiosApi.post(apiRoutes.PROJECT, data)
        if (response?.data?.success) return {
            response: response?.data,
            data: data
        }
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const updateProjectAPI = createAsyncThunk('project/update',
    async (data, thunkAPI) => {
        const response = await axiosApi.patch(apiRoutes.PROJECT, data)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const addMemberAPI = createAsyncThunk('userproject/add',
    async (data, thunkAPI) => {
        const response = await axiosApi.post(apiRoutes.USER_PROJECT, data)
        if (response?.data?.success) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const deleteProjectAPI = createAsyncThunk('project/delete',
    async (data, thunkAPI) => {
        const response = await axiosApi.delete(apiRoutes.PROJECT, { data: data })
        if (response?.data?.success) return {
            response: response?.data,
            data: data
        }
        else return thunkAPI.rejectWithValue(response?.data)
    }
)