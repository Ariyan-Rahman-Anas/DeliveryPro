import { baseApi } from "../baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (data) => ({
                url: "/parcel/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["parcel"]
        }),
        getParcelsByUserId: builder.query({
            query: (id) => ({
                url: `/parcel/my-sent/${id}`
            }),
            providesTags: ["parcel"]
        })
    })
})

export const { useCreateParcelMutation, useGetParcelsByUserIdQuery } = parcelApi    