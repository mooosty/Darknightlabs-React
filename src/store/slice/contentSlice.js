import { createSlice } from "@reduxjs/toolkit"
import { createContentAPI, deleteContentAPI, getProjectContentAPI, updateContentAPI, updateContentStatusAPI } from "../../api-services/contentApis"


const initialState = {
    contents: [],
    isLoading: false
}


const contentSlice = createSlice({
    name: 'content',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjectContentAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                contents: []
            }
        })
        builder.addCase(getProjectContentAPI.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                contents: action?.payload ?? []
            }
        })
        builder.addCase(getProjectContentAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                contents: []
            }
        })
        builder.addCase(createContentAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
            }
        })
        builder.addCase(createContentAPI.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                contents: action?.payload ?? []
            }
        })
        builder.addCase(createContentAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(updateContentAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
            }
        })
        builder.addCase(updateContentAPI.fulfilled, (state, action) => {
            return {
                ...state,
                contents: action?.payload ?? [],
                isLoading: false,
            }
        })
        builder.addCase(updateContentAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(deleteContentAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
            }
        })
        builder.addCase(deleteContentAPI.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                contents: action?.payload ?? []
            }
        })
        builder.addCase(deleteContentAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(updateContentStatusAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
            }
        })
        builder.addCase(updateContentStatusAPI.fulfilled, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })
        builder.addCase(updateContentStatusAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
            }
        })
    }
})

export default contentSlice.reducer