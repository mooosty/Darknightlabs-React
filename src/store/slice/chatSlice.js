import { createSlice } from "@reduxjs/toolkit";
import { getGroupsAPI } from "../../api-services/chatApis";

const initialState={
    groups:[],
    isLoading:false   
}

const chatSlice=createSlice({
    name:'chat',
    initialState:initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder.addCase(getGroupsAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getGroupsAPI.fulfilled, (state, action) => {
            console.log('action.payload :>> ', action.payload);
            return {
                ...state,
                isLoading: false,
            };
        });
        builder.addCase(getGroupsAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default chatSlice.reducer