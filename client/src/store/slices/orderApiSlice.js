import { apiSlice } from "./apiSlice";

const ORDER_URL = "/api/orders";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateOrderToPaid: builder.mutation({
      query: (oid) => ({
        url: `${ORDER_URL}/${oid}/pay`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
    updateOrderToDelivered: builder.mutation({
      query: (oid) => ({
        url: `${ORDER_URL}/${oid}/deliver`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    assignOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/assign`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
    getMyProductOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my/productOrders`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAssignedOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/my/assignedOrders`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderToPaidMutation,
  useGetAllOrdersQuery,
  useUpdateOrderToDeliveredMutation,
  useAssignOrderMutation,
  useGetMyProductOrdersQuery,
  useGetAssignedOrdersQuery,
} = orderApiSlice;
