import { createSlice } from "@reduxjs/toolkit"
import { editUserProfileAPI, getUsersAPI, getUsersDetailsAPI } from "../../api-services/userApis";

const initialState = {
    users: [],
    isLoading: false,
    userDetails: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getUsersAPI.fulfilled, (state, action) => {
            return {
                users: [...action.payload.data],
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

        builder.addCase(getUsersDetailsAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(getUsersDetailsAPI.fulfilled, (state, action) => {
            return {
                userDetails: action.payload.data[0],
                isLoading: false
            }
        })
        builder.addCase(getUsersDetailsAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })

        builder.addCase(editUserProfileAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(editUserProfileAPI.fulfilled, (state) => {
            return {
                ...state,
                isLoading: false
            }
        }
        )
        builder.addCase(editUserProfileAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default userSlice.reducer;

