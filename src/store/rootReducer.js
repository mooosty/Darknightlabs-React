import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import projectSlice from "./slice/projectSlice";
import authSlice from "./slice/authSlice";
import userSlice from "./slice/userSlice";
import chatSlice from "./slice/chatSlice";

const persistConfig = {
    key: 'darknight',
    storage,
    whitelist: ['auth']
}

const tempRootReducer = combineReducers({
    auth: authSlice,
    project: projectSlice,
    user:userSlice,
    chat:chatSlice
})

export const rootReducer = persistReducer(persistConfig, tempRootReducer)