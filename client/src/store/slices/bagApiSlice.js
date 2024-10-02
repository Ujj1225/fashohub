import { apiSlice } from "./apiSlice";

const BAG_URL = "/api/users/bag";

export const bagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToBag: builder.mutation({
      query: ({ pid, size, quantity }) => ({
        url: `${BAG_URL}/${pid}`,
        method: "POST",
        body: { size, quantity },
        credentials: "include",
      }),
      invalidatesTags: ["Bag"],
    }),
    removeFromBag: builder.mutation({
      query: (pid) => ({
        url: `${BAG_URL}/${pid}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Bag"],
    }),
    removeAll: builder.mutation({
      query: () => ({
        url: `${BAG_URL}/remove/all`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Bag"],
    }),
    getBagItems: builder.query({
      query: () => ({
        url: `${BAG_URL}/mine`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Bag"],
    }),
  }),
});

export const {
  useAddToBagMutation,
  useRemoveFromBagMutation,
  useRemoveAllMutation,
  useGetBagItemsQuery,
} = bagApiSlice;
