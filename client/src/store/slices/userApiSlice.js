import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Bag", "Wishlist", "Order", "User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Order", "User", "Bag", "Wishlist"],
    }),
    requestOtpMobile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/requestOTPMobile`,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order", "User"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "get",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "Delete",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.uid}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getDeliveryPartners: builder.query({
      query: () => ({
        url: `${USERS_URL}/deliveryPartners`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRequestOtpMobileMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetDeliveryPartnersQuery,
} = userApiSlice;
