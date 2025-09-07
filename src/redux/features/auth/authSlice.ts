import { createSlice } from "@reduxjs/toolkit";

interface AuthState{
    user: {
        _id: string,
        name: string,
        email: string,
        role: string
    } | null,
    accessToken: string | null
    refreshToken: string | null
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        removeUser: (state) => {
            state.user = null
            state.accessToken = null
            state.refreshToken = null
        }
    }
})

export const { setUser, removeUser } = authSlice.actions
export default authSlice.reducer