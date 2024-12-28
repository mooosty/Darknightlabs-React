import { createSlice } from "@reduxjs/toolkit"
import { editUserProfileAPI, getUsersAPI, getUsersDetailsAPI } from "../../api-services/userApis";

const initialState = {
    users: [],
    isLoading: false,
    userDetails: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        clearUserDetails: (state) => {
            state.userDetails = null;
        },
        updateKarma: (state, action) => {
            if (state.userDetails) {
                state.userDetails.currency_b = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersAPI.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getUsersAPI.fulfilled, (state, action) => {
            state.users = action.payload.data;
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(getUsersAPI.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        builder.addCase(getUsersDetailsAPI.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getUsersDetailsAPI.fulfilled, (state, action) => {
            state.userDetails = action.payload.data[0];
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(getUsersDetailsAPI.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

        builder.addCase(editUserProfileAPI.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(editUserProfileAPI.fulfilled, (state, action) => {
            // Update the userDetails with the new data
            if (action.payload?.data) {
                state.userDetails = {
                    ...state.userDetails,
                    ...action.payload.data
                };
            }
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(editUserProfileAPI.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export const { clearUserDetails, updateKarma } = userSlice.actions;
export default userSlice.reducer;

