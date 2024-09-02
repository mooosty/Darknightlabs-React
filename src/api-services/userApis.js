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
