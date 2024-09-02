import { createSlice } from "@reduxjs/toolkit"
import { getUsersAPI } from "../../api-services/userApis";

const initialState = {
    users: [],
    isLoading: false
}

const userSlice=createSlice({
    name:'user',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsersAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getUsersAPI.fulfilled, (state,action) => {
            // console.log('action :>> ', action.payload);
                return {
                    users:[...action.payload.data],
                    isLoading: false
                }
            }
        )
        builder.addCase(getUsersAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })  
    }
})

export default userSlice.reducer;

