import type { RootState } from "@/redux/store";
import type { AuthState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

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
            state.user = action.payload.user
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
export const loggedInUser = (state: RootState) => state.auth.user;