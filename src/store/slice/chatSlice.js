import { createSlice } from "@reduxjs/toolkit";
import { addMemberIntoGroup, getAllUsers, getChatMessages, getGroupsAPI, sendMsg } from "../../api-services/chatApis";

const initialState = {
    groups: [],
    isLoading: false,
    users: [],
    groupMsg: {
        groupId: null,
        messages: []
    }
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        addMessage: (state, action) => {
            console.log('action.payload :>> ', action.payload);
            return {
                ...state,
                groupMsg: {
                    ...state.groupMsg,
                    messages: [...state.groupMsg.messages, {
                        ...action.payload
                    }]
                }
            }
        }
    },
    extraReducers: (builder) => {
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

        builder.addCase(getChatMessages.pending, (state,action) => {
            return {
                ...state,
                groupId: action.meta.arg!==state.groupMsg.groupId?null:state.groupMsg.groupId,
                messages: action.meta.arg!==state.groupMsg.groupId?[]:state.groupMsg.messages,
                isLoading: action.meta.arg!==state.groupMsg.groupId?true:false
            }
        })
        builder.addCase(getChatMessages.fulfilled, (state, action) => {
            return {
                ...state,
                isLoading: false,
                groupMsg: {
                    ...state.groupMsg,
                    groupId: action.payload.groupId,
                    messages: [...action.payload.response]
                }
            };
        });
        
        builder.addCase(getChatMessages.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                groupMsg:{
                    ...initialState
                }
            }
        });

        builder.addCase(sendMsg.pending, (state) => {
            return {
                ...state,
            }
        })
        builder.addCase(sendMsg.fulfilled, (state, action) => {
            return {
                ...state,
            };
        });
        builder.addCase(sendMsg.rejected, (state) => {
            return {
                ...state
            }
        });

        builder.addCase(addMemberIntoGroup.pending, (state) => {
            return {
                ...state
            }
        })
        builder.addCase(addMemberIntoGroup.fulfilled, (state, action) => {
            console.log('action.payload :>> ', action.payload);
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

export default chatSlice.reducer
export const { addMessage } = chatSlice.actions