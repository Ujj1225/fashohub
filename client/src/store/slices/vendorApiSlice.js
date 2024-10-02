import { apiSlice } from "./apiSlice";

const VENDOR_URL = "/api/vendors";

export const vendorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVendorDetails: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}/vendorDetails`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getVendorDetails: builder.query({
      query: (vid) => ({
        url: `${VENDOR_URL}/vendorDetails/${vid}`,
        method: "GET",
      }),
    }),
    requestVendorship: builder.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}/vendorRequest`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getMyRequest: builder.query({
      query: () => ({
        url: `${VENDOR_URL}/myRequest`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllRequests: builder.query({
      query: () => ({
        url: `${VENDOR_URL}/vendorRequest`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Request"],
    }),
    getRequestById: builder.query({
      query: (rid) => ({
        url: `${VENDOR_URL}/vendorRequest/${rid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Request"],
    }),
    approveVendorship: builder.mutation({
      query: (rid) => ({
        url: `${VENDOR_URL}/vendorRequest/${rid}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Request"],
    }),
    deleteRequest: builder.mutation({
      query: (rid) => ({
        url: `${VENDOR_URL}/vendorRequest/${rid}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Request"],
    }),
  }),
});

export const {
  useAddVendorDetailsMutation,
  useGetVendorDetailsQuery,
  useRequestVendorshipMutation,
  useGetMyRequestQuery,
  useGetAllRequestsQuery,
  useGetRequestByIdQuery,
  useApproveVendorshipMutation,
  useDeleteRequestMutation,
} = vendorApiSlice;
