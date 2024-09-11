import { createSlice } from "@reduxjs/toolkit"
import { getProjectsAPI, addProjectAPI, addMemberAPI, deleteProjectAPI, updateProjectAPI } from "../../api-services/projectApis"

const initialState = {
    projects: [],
    isLoading: false
}

const projectSlice = createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
        updateProject: (state, action) => {
            return {
                ...state,
                projects: [
                    ...state.projects.map((project) => {
                        if (project.project_id === action.payload.project_id) {
                            return { ...action.payload }
                        }
                        return project;
                    })
                ]
            };
        },

        addFeature: (state, action) => {
            return {
                ...state,
                projects: [...state.projects.map(project => {
                    if (action.payload.includes(project.project_id)) {
                        return {
                            ...project,
                            featured: 1
                        };
                    }
                    return project;
                })]
            };
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getProjectsAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                projects: [],
            }
        })

        builder.addCase(
            getProjectsAPI.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    projects: [...action.payload],
                }
            }
        )

        builder.addCase(getProjectsAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                projects: [],
            }
        })

        builder.addCase(addProjectAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(
            addProjectAPI.fulfilled, (state, action) => {
                return {
                    ...state,
                    isLoading: false,
                    projects: [...state.projects, { ...action.payload.data, project_id: action.payload.response.data.insertId, featured: 0 }]
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
            updateProjectAPI.fulfilled, (state, action) => {
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
        builder.addCase(addMemberAPI.fulfilled, (state, action) => {
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
        builder.addCase(deleteProjectAPI.fulfilled, (state, action) => {
            const projectIdsToRemove = action.payload.data?.projectIds ?? [];

            return {
                ...state,
                isLoading: false,
                projects: state.projects.filter(project => !projectIdsToRemove.includes(project.project_id))
            };
        });
        builder.addCase(deleteProjectAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        })
    }
})

export const { updateProject, addFeature } = projectSlice.actions
export default projectSlice.reducer