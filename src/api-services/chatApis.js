import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "../utils/constants/apiUrl";
import { chatAxiosApi } from "./service";

export const createGroupAPI = createAsyncThunk("chat/group/create", async (data, thunkAPI) => {
  const response = await chatAxiosApi.post(apiRoutes.CHAT_GROUP, data);
  if (response?.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});

export const getGroupsAPI = createAsyncThunk("chat/group/get", async (thunkAPI) => {
  const response = await chatAxiosApi.get(apiRoutes.CHAT);
  if (response?.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});


export const createUserAPI = createAsyncThunk("chat/user/create", async (data, thunkAPI) => {
  const response = await chatAxiosApi.post(apiRoutes.CREATE_CHAT_USER, data);
  console.log("response", response);
  if (response?.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});

export const addUserToChat = createAsyncThunk("chat/add_user", async (data, thunkAPI) => {
  const response = await chatAxiosApi.post(apiRoutes.CHAT + "/addtogroup", { data: data });
  if (response?.statusText === "OK") return response?.data;
  else return thunkAPI.rejectWithValue(response?.data);
});

export const getAllUsers = createAsyncThunk("chat/user/get", async (thunkAPI) => {
  const response = await chatAxiosApi.get(apiRoutes.CHAT_ALL_USER);
  if (response?.data.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});

export const getChatMessages = createAsyncThunk("chat/message/get", async (data, thunkAPI) => {
  const response = await chatAxiosApi.get(apiRoutes.CHAT_MSG + `/${data}`);
  if (response?.status)
    return {
      response: response.data,
      groupId: data,
    };
  else return thunkAPI.rejectWithValue(response?.data);
});

// Not in use (Integrated with socket)
export const sendMsg = createAsyncThunk("chat/message/send", async (data, thunkAPI) => {
  const response = await chatAxiosApi.post(apiRoutes.SEND_MSG, data);
  if (response?.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});

export const addMemberIntoGroup = createAsyncThunk("grouop/member/add", async (data, thunkAPI) => {
  const response = await chatAxiosApi.post(apiRoutes.ADD_MEMBER, data);
  if (response?.status) return response.data;
  else return thunkAPI.rejectWithValue(response?.data);
});
