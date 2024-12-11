import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJpYXQiOjE3MzEzOTExNjUsImV4cCI6MTczMzk4MzE2NX0.5mFJ_6QusnqM86nljTnKwhtpOUbDR25elCBFnWYtFco",
  userId: '',
  name: '',
  email: '',
  profile_picture: '',
  authDetails: null,

  walletAddress: '',
  isWalletVerified: false,
  whitelistMessage: '',
};


const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    storeAuthData: (state, action) => {
      const userId = action?.payload?.user.id;
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
    setWalletAddress: (state, action) => {
      return {
        ...state,
        walletAddress: action?.payload?.walletAddress,
      };
    },
    setWhitelistMessage: (state, action) => {
      return {
        ...state,
        whitelistMessage: action?.payload?.whitelistMessage,
        isWalletVerified: true,
      };
    },
    setMaxContributions: (state, action) => {
      return {
        ...state,
        maxContributions: action?.payload?.maxContributions,
      };
    },
  },
});

export const { storeAuthData, setWalletAddress, setWhitelistMessage, setMaxContributions } = authSlice.actions;
export default authSlice.reducer;
