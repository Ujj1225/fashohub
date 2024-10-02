import { apiSlice } from "./apiSlice";

const DELIVERY_URL = "/api/delivery";

export const deliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveAddress: builder.mutation({
      query: (data) => ({
        url: DELIVERY_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    editAddress: builder.mutation({
      query: (data) => ({
        url: DELIVERY_URL,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getAddress: builder.query({
      query: () => ({
        url: DELIVERY_URL,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSaveAddressMutation,
  useEditAddressMutation,
  useGetAddressQuery,
} = deliveryApiSlice;
