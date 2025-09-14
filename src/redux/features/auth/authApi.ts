import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (userInfo) => ({
                url: "/user/create",
                method: "POST",
                body: userInfo
            }),
            invalidatesTags: ["user"]
        }),
        userLogin: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo
            }),
            invalidatesTags: ["auth"]
        }),
        userLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: ["user", "auth"]
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET"
            }),
            providesTags: ["user"]
        })
    })
})

export const {
    useCreateUserMutation,
    useUserLoginMutation,
    useUserLogoutMutation,
    useGetAllUserQuery
} = authApi