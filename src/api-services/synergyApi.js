import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRoutes } from "../utils/constants/apiUrl"
import { axiosApi } from './index'

export const getSynergyApi=createAsyncThunk('synergy/get',
    async (data, thunkAPI)=>{
        const response = await axiosApi.get(apiRoutes.SYNERGY, data)
        if (response?.data?.success) return response?.data?.data
        else return thunkAPI.rejectWithValue(response?.data)
    }
)

export const deleteSynergyApi = createAsyncThunk('synergy/delete',
    async (data, thunkAPI) => {
        const response = await axiosApi.delete(apiRoutes.SYNERGY, { data: data })
        if (response?.data?.success) return {
            response: response?.data,
            synergyId:data['synergy_id']
        }
        else return thunkAPI.rejectWithValue(response?.data)
    }
)