import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => ({
                url: "/user"
            }),
            providesTags: ["user"]
        }),
        unblockUser: builder.mutation({
            query: (id) => ({
                url: `/user/un-block/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({ id, updateData }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body: updateData
            }),
            invalidatesTags: ["user"]
        }),
    })
})
export const { useGetAllUserQuery, useUpdateUserMutation, useUnblockUserMutation } = userApi