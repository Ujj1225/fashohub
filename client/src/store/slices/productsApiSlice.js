import { apiSlice } from "./apiSlice";

const PRODUCTS_URL = "/api/products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductByVendor: builder.query({
      query: (vid) => ({
        url: `${PRODUCTS_URL}/mine/${vid}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    deleteProductByAdmin: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/admin/${productId}`,
        method: "DELETE",
        credentials: "include",
      }),
      providesTags: ["Product"],
    }),
    getPrimaryCategoryProducts: builder.query({
      query: ({ primary, sort, discounts, priceRanges }) => ({
        url: `${PRODUCTS_URL}/primary/${primary}`,
        params: { sort, discounts, priceRanges },
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getSecondaryCategoryProducts: builder.query({
      query: ({ primary, secondary, sort, discounts, priceRanges }) => ({
        url: `${PRODUCTS_URL}/secondary/${primary}/${secondary}`,
        params: { sort, discounts, priceRanges },
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getTertiaryCategoryProduct: builder.query({
      query: ({
        primary,
        secondary,
        tertiary,
        sort,
        discounts,
        priceRanges,
      }) => ({
        url: `${PRODUCTS_URL}/tertiary/${primary}/${secondary}/${tertiary}`,
        params: { sort, discounts, priceRanges },
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    writeAReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUploadProductImageMutation,
  useGetAllProductsQuery,
  useGetProductByVendorQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetPrimaryCategoryProductsQuery,
  useGetSecondaryCategoryProductsQuery,
  useGetTertiaryCategoryProductQuery,
  useWriteAReviewMutation,
  useDeleteProductByAdminMutation,
} = productsApiSlice;
