import { createSlice } from "@reduxjs/toolkit"
import { getProjectsAPI } from "../../api-services/projectApis"

const initialState = {
    projects: [],
    isLoading: false
}

const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjectsAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(
            getProjectsAPI.fulfilled, (state) => {
                return {
                    ...state,
                    isLoading: false
                }
            }
        )
        builder.addCase(getProjectsAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default projectSlice.reducer