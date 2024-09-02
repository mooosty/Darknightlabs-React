import { createSlice } from "@reduxjs/toolkit"
import { getProjectsAPI, addProjectAPI, addMemberAPI, deleteProjectAPI, updateProjectAPI} from "../../api-services/projectApis"

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
            getProjectsAPI.fulfilled, (state,action) => {
                return {
                    projects:[...action.payload],
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

        builder.addCase(addProjectAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(
            addProjectAPI.fulfilled, (state,action) => {
                return {
                    ...state,
                    isLoading: false
                }
            }
        )
        builder.addCase(addProjectAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })

        builder.addCase(updateProjectAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(
            updateProjectAPI.fulfilled, (state,action) => {
                return {
                    ...state,
                    isLoading: false
                }
            }
        )
        builder.addCase(updateProjectAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
        
        builder.addCase(addMemberAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(addMemberAPI.fulfilled, (state,action) => {
                return {
                    ...state,
                    isLoading: false
                }
            }
        )
        builder.addCase(addMemberAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })


        builder.addCase(deleteProjectAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(deleteProjectAPI.fulfilled, (state,action) => {
                return {
                    ...state,
                    isLoading: false
                }
            }
        )
        builder.addCase(deleteProjectAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export default projectSlice.reducer