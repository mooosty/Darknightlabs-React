import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import projectSlice from "./slice/projectSlice";
import authSlice from "./slice/authSlice";

const persistConfig = {
    key: 'darknight',
    storage,
    whitelist: ['auth']
}

const tempRootReducer = combineReducers({
    auth: authSlice,
    project: projectSlice,
})

export const rootReducer = persistReducer(persistConfig, tempRootReducer)