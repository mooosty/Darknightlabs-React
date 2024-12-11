import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJpYXQiOjE3MzEzOTExNjUsImV4cCI6MTczMzk4MzE2NX0.5mFJ_6QusnqM86nljTnKwhtpOUbDR25elCBFnWYtFco",
  userId: "66d803bb836702a60484f35e",
  name: "Test",
  email: "test123@gmail.com",
  profile_picture: "",
  authDetails: null,
};

// const initialState = {
//   user: {},
//   authDetails: null,
// };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    storeAuthData: (state, action) => {
      const userId = action?.payload?.user.id   ;
      const name = action?.payload?.user.firstname;
      const email = action?.payload?.user.email;
      const profile_picture = action?.payload?.user.profile_picture;

      return {
        ...state,
        authDetails: action?.payload?.response,
        userId,
        name,
        email,
        profile_picture,
      };
    },
  },
});

export const { storeAuthData } = authSlice.actions;
export default authSlice.reducer;
