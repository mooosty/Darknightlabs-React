import { createSlice } from "@reduxjs/toolkit";
import { addMemberIntoGroup, getAllUsers, getGroupsAPI} from "../../api-services/chatApis";

const initialState = {
    groups: [],
    users: [],
    isLoading: false
}

const groupSlice = createSlice({
    name: 'group',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder)=>{
        builder.addCase(getGroupsAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                groups: []
            }
        })
        builder.addCase(getGroupsAPI.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                groups: [...action.payload]
            };
        });
        builder.addCase(getGroupsAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                groups: []
            }
        });

        builder.addCase(getAllUsers.pending, (state) => {
            return {
                ...state,
                isLoading: true,
                users: []
            }
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                users: [...action.payload.data]
            };
        });
        builder.addCase(getAllUsers.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                users: []
            }
        });


        builder.addCase(addMemberIntoGroup.pending, (state) => {
            return {
                ...state
            }
        })
        builder.addCase(addMemberIntoGroup.fulfilled, (state, action) => {
            return {
                ...state,
                groups: [...state.groups.map((group) => {
                    if (group['_id'] === action.payload['_id']) {
                        return {
                            ...group,
                            users: [...action.payload.users]
                        }
                    }
                    return group;
                })]

            };
        });
        builder.addCase(addMemberIntoGroup.rejected, (state) => {
            return {
                ...state,
            }
        });

    }
})

export default groupSlice.reducer