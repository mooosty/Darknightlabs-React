import { createSlice } from '@reduxjs/toolkit';
import { getUserWalletAPI } from '../../api-services/userApis';

const initialState = {
    currency_b: null,
    loading: false,
    error: null
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserWalletAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserWalletAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.currency_b = action.payload.currency_b;
            })
            .addCase(getUserWalletAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default walletSlice.reducer; 