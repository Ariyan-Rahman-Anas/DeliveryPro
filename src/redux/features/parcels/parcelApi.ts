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
        getParcelsBySenderId: builder.query({
            query: ({ id, ...params }) => ({
                url: `/parcel/my-sent/${id}`,
                params,
            }),
            providesTags: ["parcel"]
        })
    })
})

export const { useCreateParcelMutation, useGetParcelsBySenderIdQuery } = parcelApi    