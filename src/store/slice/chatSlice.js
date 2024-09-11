import { createSlice } from "@reduxjs/toolkit";
import { addMemberIntoGroup, getAllUsers, getChatMessages, getGroupsAPI, sendMsg } from "../../api-services/chatApis";

const initialState = {
    isLoading: false,
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

        builder.addCase(getChatMessages.pending, (state, action) => {
            return {
                ...state,
                groupId: action.meta.arg !== state.groupMsg.groupId ? null : state.groupMsg.groupId,
                messages: action.meta.arg !== state.groupMsg.groupId ? [] : state.groupMsg.messages,
                isLoading: action.meta.arg !== state.groupMsg.groupId ? true : false
            }
        })
        builder.addCase(getChatMessages.fulfilled, (state, action) => {
            if ((state.groupMsg.messages.length < action.payload.response.length) || (action.payload.groupId !== state.groupMsg.groupId)) {
                return {
                    ...state,
                    isLoading: false,
                    groupMsg: {
                        ...state.groupMsg,
                        groupId: action.payload.groupId,
                        messages: [...action.payload.response]
                    }
                };
            }
            return {
                ...state,
                isLoading: false
            }
        });

        builder.addCase(getChatMessages.rejected, (state) => {
            return {
                ...state,
                isLoading: false,
                groupMsg: {
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

    }
})

export default chatSlice.reducer
export const { addMessage } = chatSlice.actions