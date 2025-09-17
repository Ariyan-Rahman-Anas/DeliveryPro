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
        }),
        parcelCancellation: builder.mutation({
            query: ({ id, cancelReason }) => ({
                url: `/parcel/cancel/${id}`,
                method: "PATCH",
                body: cancelReason,
            }),
            invalidatesTags: ["parcel"]
        }),
        getParcelsByReceiverId: builder.query({
            query: ({ id, ...params }) => ({
                url: `/parcel/my-received/${id}`,
                params,
            }),
            providesTags: ["parcel"]
        }),
        confirmParcelDelivery: builder.mutation({
            query: (id) => ({
                url: `/parcel/confirm-delivery/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["parcel"]
        }),

    })
})

export const { useCreateParcelMutation, useGetParcelsBySenderIdQuery, useParcelCancellationMutation, useGetParcelsByReceiverIdQuery, useConfirmParcelDeliveryMutation, } = parcelApi    