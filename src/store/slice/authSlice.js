import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRubEJvdCIsImlhdCI6MTY5NDU0NTE0M30.-1kktNej16aURKwdXa1K-4-zwC9b_t0EkAmEewJFF5c',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
})

export default authSlice.reducer