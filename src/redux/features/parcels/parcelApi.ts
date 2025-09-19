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
        getAllParcel: builder.query({
            query: ({ page = 1, limit = 10, status, search, ...otherParams }) => {
                const params = {
                    page,
                    limit,
                    ...(status && { status }),
                    ...(search && { search }),
                    ...otherParams
                };

                return {
                    url: "/parcel",
                    params
                };
            },
            providesTags: ["parcel"]
        }),
        changeParcelStatus: builder.mutation({
            query: ({ id, updatedData }) => ({
                url: `/parcel/status/${id}`,
                method: "PATCH",
                body: updatedData
            }),
            invalidatesTags: ["parcel"]
        }),
        blockUnblockParcel: builder.mutation({
            query: (id) => ({
                url: `/parcel/is-blocked/${id}`,
                method: "PATCH"
            }),
            invalidatesTags: ["parcel"]
        }),
        parcelTracking: builder.query({
            query: (id) => ({
                url: `/parcel/track/${id}`
            }),
            providesTags: ["parcel"]
        }),
        getParcelByParcelId: builder.query({
            query: (id) => ({
                url: `/parcel/${id}`
            }),
            providesTags: ["parcel"]
        })
    })
})

export const {
    useCreateParcelMutation,
    useGetParcelsBySenderIdQuery,
    useParcelCancellationMutation,
    useGetParcelsByReceiverIdQuery,
    useConfirmParcelDeliveryMutation,
    useGetAllParcelQuery,
    useChangeParcelStatusMutation,
    useBlockUnblockParcelMutation,
    useParcelTrackingQuery,
    useGetParcelByParcelIdQuery
} = parcelApi    