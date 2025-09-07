import { config } from "@/config"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: config.baseUrl,
    credentials: "include"
})

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery,
    endpoints: () => ({}),
    tagTypes:["auth", "parcel"]
})