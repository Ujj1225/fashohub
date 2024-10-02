import { apiSlice } from "./apiSlice";

const WISHLIST_URL = "/api/users";

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWishlist: builder.mutation({
      query: (productId) => ({
        url: `${WISHLIST_URL}/wishlist/${productId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeWishlist: builder.mutation({
      query: (wid) => ({
        url: `${WISHLIST_URL}/wishlist/${wid}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Wishlist"],
    }),
    getWishlist: builder.query({
      query: () => ({
        url: `${WISHLIST_URL}/wishlist/mine`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Wishlist"],
    }),
    getWishlistItemById: builder.query({
      query: (pid) => ({
        url: `${WISHLIST_URL}/wishlist/mine/${pid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistMutation,
  useGetWishlistItemByIdQuery,
} = wishlistApiSlice;
