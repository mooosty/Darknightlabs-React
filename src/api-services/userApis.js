import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "../utils/constants/apiUrl";
import { axiosApi } from "./service";

export const getUsersAPI = createAsyncThunk("/users", async (thunkAPI) => {
    const response = await axiosApi.get(apiRoutes.USER);
    if (response?.data?.success) return response?.data;
    else return thunkAPI.rejectWithValue(response?.data);
});

export const getTwitterUserAPI = createAsyncThunk(
    "/users/key/:id",
    async (id, thunkAPI) => {
        const response = await axiosApi.get(`${apiRoutes.TWITTER_USER}/${id}`);
        if (response?.status) return response.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);
export const createTwitterUserAPI = createAsyncThunk(
    "/users/key",
    async (data, thunkAPI) => {

        const response = await axiosApi.post(apiRoutes.TWITTER_USER, data);
        if (response?.status) return response.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const getUsersDetailsAPI = createAsyncThunk(
    "/users/:id",
    async (id, thunkAPI) => {
        const response = await axiosApi.get(`${apiRoutes.USER}/${id}`);
        if (response?.data?.success) return response?.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const editUserProfileAPI = createAsyncThunk(
    "/user",
    async (data, thunkAPI) => {
        console.log("data");
        console.log(data);
        const response = await axiosApi.patch(apiRoutes.USER, data);
        if (response?.data?.success) return { ...response?.data, payload: data };
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const updatePasswordAPI = createAsyncThunk(
    "/users/change-password",
    async (data, thunkAPI) => {
        const response = await axiosApi.patch(apiRoutes.CHANGE_PASSWORD, data);
        if (response?.data?.success) return response?.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const getUserWalletAPI = createAsyncThunk(
    "/users/:id",
    async (id, thunkAPI) => {
        const response = await axiosApi.get(`${apiRoutes.USER}/${id}`);
        if (response?.status) return response.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const updateUserWalletAPI = createAsyncThunk(
    "/users/wallet",
    async (data, thunkAPI) => {
        const response = await axiosApi.patch(apiRoutes.USER_WALLET, data);
        if (response?.status) return response.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);

export const createInviteAPI = createAsyncThunk(
    "/invites",
    async (data, thunkAPI) => {
        const response = await axiosApi.post(apiRoutes.INVITES, data);
        if (response?.status) return response.data;
        else return thunkAPI.rejectWithValue(response?.data);
    }
);
