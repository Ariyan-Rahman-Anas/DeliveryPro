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
        })
    })
})

export const {
    useCreateUserMutation,
    useUserLoginMutation
} = authApi