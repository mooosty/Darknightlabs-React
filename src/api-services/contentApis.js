import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosApi } from "./service"
import { apiRoutes } from "../utils/constants/apiUrl"

export const getProjectContentAPI = createAsyncThunk('content/get',
    async (data, thunkAPI) => {
        const response = await axiosApi.get(`${apiRoutes.CONTENT}/project/${data}`)
        if (!response?.data?.success || response?.data?.success !== 0) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const createContentAPI = createAsyncThunk('content/create',
    async (data, thunkAPI) => {
        const store = thunkAPI.getState();
        const response = await axiosApi.post(`${apiRoutes.CONTENT}`, { ...data })
        const updatedResponse = [...store?.content?.contents || []]
        updatedResponse.push(response?.data)
        if (!response?.data?.success || response?.data?.success !== 0) return updatedResponse
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const updateContentAPI = createAsyncThunk('content/update',
    async (data, thunkAPI) => {
        const store = thunkAPI.getState();
        const response = await axiosApi.put(`${apiRoutes.CONTENT}/${data?.content_id}`, { ...data })
        const updatedResponse = store?.content?.contents?.map((data) => {
            if (data?.content_id == data?.content_id) {
                return response?.data
            } else return data
        })
        if (!response?.data?.success || response?.data?.success !== 0) return updatedResponse
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const deleteContentAPI = createAsyncThunk('content/delete',
    async (data, thunkAPI) => {
        const store = thunkAPI.getState();
        const response = await axiosApi.delete(`${apiRoutes.CONTENT}/${data}`)
        let updatedResponse = store?.content?.contents
        if (response?.data?.deletedCount == 1) {
            updatedResponse = store?.content?.contents?.filter((item) => item?.content_id != data)
        }
        if (!response?.data?.success || response?.data?.success !== 0) return updatedResponse
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const updateContentStatusAPI = createAsyncThunk('content/updateStatus',
    async ({ data }, thunkAPI) => {

        const response = await axiosApi.patch(`${apiRoutes.CONTENT}/${data?.content_id}/status`, { data })
        if (!response?.data?.success || response?.data?.success !== 0) return response?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)