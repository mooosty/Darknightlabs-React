import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDgwM2JiODM2NzAyYTYwNDg0ZjM1ZSIsImlhdCI6MTcyNTUxNzM1MCwiZXhwIjoxNzI4MTA5MzUwfQ.mTDntKCFVTj__gLSy1lvnZn7TVuxgzr7ejfb61LNfYM',
    userId: "66d803bb836702a60484f35e",
    name:'Test',
    email:'test@gmail.com'
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
})

export default authSlice.reducer