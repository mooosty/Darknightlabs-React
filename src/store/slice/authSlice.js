import { createSlice } from "@reduxjs/toolkit";
import { editUserProfileAPI } from "../../api-services/userApis";

const initialState = {
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
    handleLogout: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editUserProfileAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload.payload?.userData ?? {};
      return {
        ...state,
        name: `${updatedUser.firstname} ${updatedUser.lastname}`,
        email: updatedUser.email,
        profile_picture: updatedUser.profile_picture,
      };
    })
  }
});

export const { storeAuthData, setWalletAddress, setWhitelistMessage, setMaxContributions, handleLogout } = authSlice.actions;
export default authSlice.reducer;
