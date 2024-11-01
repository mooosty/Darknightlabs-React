import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDgwM2JiODM2NzAyYTYwNDg0ZjM1ZSIsImlhdCI6MTcyNTUxNzM1MCwiZXhwIjoxNzI4MTA5MzUwfQ.mTDntKCFVTj__gLSy1lvnZn7TVuxgzr7ejfb61LNfYM',
    // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRubEJvdCIsImlhdCI6MTY5NDU0NTE0M30.-1kktNej16aURKwdXa1K-4-zwC9b_t0EkAmEewJFF5c',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWYyYjljOWZhYmMyNDIwYTdmZjQwOCIsImlhdCI6MTczMDA5NjA4MCwiZXhwIjoxNzMyNjg4MDgwfQ.nrZJyWph7OoWA8I09IOxnfPLyWZY43ri-4gSYcWvFvQ',
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