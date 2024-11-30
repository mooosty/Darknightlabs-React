import { createSlice } from "@reduxjs/toolkit";
import { createGroupAPI, getChatMessages, sendMsg } from "../../api-services/chatApis";

const initialState = {
    isLoading: false,
    groupMsg: {
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
                    [action.payload.groupId]: [...state.groupMsg[action.payload.groupId], {
                        ...action.payload.message
                    }]
                }
            }
        },
        removeMessage: (state, action) => {
            return {
                ...state,
                groupMsg: {
                    ...state.groupMsg,
                    [action.payload.chatId]: state.groupMsg[action.payload.chatId]?.filter((message) => {
                        if (!message._id || !action.payload.messageId) {
                            return true
                        }
                        return (message._id !== action.payload.messageId)
                    }) ?? []
                }
            }
        }
    },
    extraReducers: (builder) => {

        builder.addCase(createGroupAPI.pending, (state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        builder.addCase(createGroupAPI.fulfilled, (state) => {
            return {
                ...state,
                isLoading: false
            }
        });

        builder.addCase(createGroupAPI.rejected, (state) => {
            return {
                ...state,
                isLoading: false
            }
        });


        builder.addCase(getChatMessages.pending, (state) => {
            return {
                ...state,
            }
        })
        builder.addCase(getChatMessages.fulfilled, (state, action) => {
            return {
                ...state,
                groupMsg: {
                    ...state.groupMsg,
                    [action.payload.groupId]: [...action.payload.response]
                }
            };
        });

        builder.addCase(getChatMessages.rejected, (state) => {
            return {
                ...state,
                groupMsg: {
                    ...state.groupMsg,
                }
            }
        });


        // Not in use (integrated with socket)
        builder.addCase(sendMsg.pending, (state) => {
            return {
                ...state,
            }
        })
        builder.addCase(sendMsg.fulfilled, (state) => {
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
export const { addMessage, removeMessage } = chatSlice.actions