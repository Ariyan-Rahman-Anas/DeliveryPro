/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { removeUser } from "./auth/authSlice"
import { toast } from "sonner"

const baseQuery = fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: "include"
})

const baseQueryWithReauth = async (arg: any, api: any, extraOptions: any) => {
    const result = await baseQuery(arg, api, extraOptions)

    if (result.error) {
        const { status, data } = result.error
        if (
            status === 401 ||
            status === 403 ||
            ((data as any)?.success === false && (data as any)?.message === "jwt expired")
        ) {

            toast.error("Your session has expired. Please login again.");
            api.dispatch(removeUser());
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
        }
    }
    return result
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ["auth", "user", "parcel"]
})