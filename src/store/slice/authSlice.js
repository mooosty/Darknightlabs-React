import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJpYXQiOjE3MzEzOTExNjUsImV4cCI6MTczMzk4MzE2NX0.5mFJ_6QusnqM86nljTnKwhtpOUbDR25elCBFnWYtFco',
    userId: "66d803bb836702a60484f35e",
    name:'Test',
    email:'test123@gmail.com'
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
})

export default authSlice.reducer